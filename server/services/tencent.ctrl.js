/**
 * 爬虫，爬取腾讯视频的地址
 * Created by gaoju on 2019/4/3.
 */
var express = require('express');
var https = require('https');
var http = require('http');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
const tencentRouter = express.Router()

/*
 * 文件上传接口
 * pagesize:30,//每次查找数目
 *offset:0,//页面滑动偏移量，即刷新加载标志。可做页签，每次增加30
 * 以下标签默认值都是 -1
 *sort:--排序。18=最新热播，19=最新上架，21=豆瓣好评
 *itype:0,类型。100018=剧情，100004=喜剧，100061=动作，100005=爱情，4=犯罪，100009=悬疑，100006=战争，100012=科幻，
 *             100015=动画，100011=武侠，100021=历史，100020=记录，1=儿童，100007=恐怖
 *iarea:地区。100024=内地，100025=香港，100026=中国台湾，100029=美国，100032=欧洲，100027=日本，100028=韩国,100030=印度
 *          100031=泰国，3=英国，1=法国，2=德国，7=北欧，100033=其他
 *charge:资费。100001=免费，1=包月（VIP）
 * */

tencentRouter.get('/getMovieList',async(req, res) => {
  let reqs = req.query;
  let params={
    pagesize:reqs.pagesize || 30,
    offset:reqs.offset || 0,
    sort:reqs.isort || 18,
    itype:reqs.itype || -1,
    iarea:reqs.iarea || -1,
    charge:reqs.icharge || -1,
  }
  let Url = `https://v.qq.com/x/bu/pagesheet/list?_all=1&append=1&channel=movie&listpage=2&offset=${params.offset}&pagesize=${params.pagesize}&sort=${params.sort}&itype=${params.itype}&iarea=${params.iarea}&charge=${params.charge}`;
  https.get(Url,function(ress){
    var chunks = [];
    var size = 0;
    ress.on('data',function(chunk){
      chunks.push(chunk);
      size += chunk.length;
    });
    ress.on('end',function(){
      try{
        var Movie = [];
        var html = iconv.decode(Buffer.concat(chunks),'utf-8');
        var $ = cheerio.load(html, {decodeEntites: false});//cheerio模块开始处理 DOM处理
        $('.list_item').each(function(){
          let item = {};
          let ele = $(this);
          item.dataset = $(this)[0].firstChild.next.attribs['data-float'];
          item.title = $(this)[0].firstChild.next.attribs['title'];
          item.imgUrl = $(this).find('img') ? $(this).find('img')[0].attribs['src'] : '';
          item.alt = $(this).find('img') ? $(this).find('img')[0].attribs['alt'] : '';
          item.starts =  $(this).find('.figure_detail') ? $(this).find('.figure_detail')[0].attribs['title'] : '';
          item.num =  $(this).find('.figure_count') ? $(this).find('.figure_count')[0].lastChild.data : '';
          Movie.push(item);
        });
        res.json({code:200,movies:Movie});

      }catch(e){
        //TODO handle the exception
        res.json({
          code: 500,
          movies: []
        });
        throw new Error('错误信息:' + e);
      }

    })
  })

})

module.exports = tencentRouter;
