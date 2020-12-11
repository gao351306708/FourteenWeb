/*
 * 获取腾讯视频的接口
 * */
import fetch from '../config/fetch'
import fetchJsonp from '../config/fetchJsonp'
/*
 * 获取试题
 * */
export const getVideoList = (data) => fetch('/api/');


/*
https://v.qq.com/x/bu/pagesheet/list?_all=1&append=1&channel=movie&listpage=2&offset=150&pagesize=30&sort=21
//https://node.video.qq.com/x/api/float_vinfo2?cid=j3czmhisqin799r
//http://v.qq.com/txp/iframe/player.html?vid=t0029dmt201
//https://v.qq.com/x/bu/pagesheet/list?_all=1&append=0&channel=movie&listpage=2&offset=0&pagesize=30&sort=18&charge=-1&iarea=-1&itype=100004
//http://localhost:1004/api/tencent/getMovieList?pagesize=30&offset=0&sort=undefined&itype=-1&iarea=-1&charge=-1
* 查找视频列表信息
* 参数：
* pagesize:30,//每次查找数目
 *offset:0,//页面滑动偏移量，即刷新加载标志。可做页签，每次增加30
 * 以下标签默认值都是 -1
 *sort:--排序。18=最新热播，19=最新上架，21=豆瓣好评
 *itype:类型。100018=剧情，100004=喜剧，100061=动作，100005=爱情，4=犯罪，100009=悬疑，100006=战争，100012=科幻，
 *             100015=动画，100011=武侠，100021=历史，100020=记录，1=儿童，100007=恐怖
 *iarea:地区。100024=内地，100025=香港，100026=中国台湾，100029=美国，100032=欧洲，100027=日本，100028=韩国,100030=印度
 *          100031=泰国，3=英国，1=法国，2=德国，7=北欧，100033=其他
 *charge:资费。100001=免费，1=包月（VIP）
* */
export function getMovieList(data, callback) {
  fetch('/api/tencent/getMovieList', data, 'GET')
    .then((json) => {
      callback(json)
    })
}
//根据cid查找视频的信息
export function getMovieDetail(cid) {
  const url = `https://node.video.qq.com/x/api/float_vinfo2?cid=${cid}`;
  return fetchJsonp(url)
}

export function getMovieRealUrlList(vid) {
  return new Promise(async (resolve, reject) => {
    try {
      //根据cid查找视频的信息
      //参数中的defn为清晰度标识，可选值有sd（标清）、hd（高清）、shd（超清）、fhd（1080P）
      let url = `http://vv.video.qq.com/getinfo?vids=${vid}&platform=10201&charge=0&otype=json&defn=hd`;
      let json1 = await fetchJsonp(url);
      console.log("通过vid查询视频相关信息", json1);
      if (json1['fl']) {
        resolve(json1)
      } else {
        reject("getinfo获取失败")
      }
    } catch (error) {
      console.log("异常发生：", error)
      reject("异常发生")
    }
  })
}
export function getMovieRealUrl(json1, index = 0) {
  return new Promise(async (resolve, reject) => {
    try {
      //fi列表列出了各个视频码流，每一项中的id是码流的编号。
      //ui列表中的url是视频真实地址的前缀，选择ui列表第一个元素中的url即可。
      //ci列表列出了各个分段的相关信息，各个分段信息中的keyid在后面会用到。
      let fi = json1['fl']['fi'][1];
      let ui = json1['vl']['vi'][0]['ul']['ui'];
      let ci = json1['vl']['vi'][0]['cl']['ci']; //视频片段，每条视频都需要发送getkey来获取key值才能观看
      let keyid = ci[index]['keyid'].split('.'); //n0035vlygm7.10212.1
      let vid = json1['vl']['vi'][0]['vid'];

      let filename = keyid[0] + ".p" + keyid[1].slice(2, ) + "." + keyid[2] + ".mp4";
      let url2 = `http://vv.video.qq.com/getkey?format=${fi.id}&otype=json&vt=150&vid=${vid}&charge=0&filename=${filename}&platform=11`;
      let json2 = await fetchJsonp(url2);
      if (json2['key']) {
        let endurl = ui[0]['url'] + filename + '?' + "vkey=" + json2['key'];
        let obj = {
          time: ci[index]['cd'],
          idx: ci[index]['idx'],
          keyid: ci[index]['keyid'],
          url: endurl
        };
        resolve(obj)
      } else {
        reject("getkey获取失败")
      }
    } catch (error) {
      console.log("异常发生：", error)
      reject("异常发生")
    }
  })
}
