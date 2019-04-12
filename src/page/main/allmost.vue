/**大杂烩，喜欢的各种类型都放这里**/
<template>
  <div class="allmost">
    <div class="section_container">
      <h2>还没想好。。。</h2>
      <!--<div id="videoId">-->

      <!--</div>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getMovieList} from '../../api/tencent'
  import fetchJsonp from 'fetch-jsonp'
  export default {
    //data中放入初始默认值
    data() {
      return {
        movieList:[]
      }
    },
    computed: {
    },
    beforeMount(){
      let _this = this;
      $(".wrapper_door").transition({
        opacity: 1,
        duration: 1000,
        easing: 'linear'
      });
    },
    mounted(){

//      var otype='json',charge='0',vid='b0030ygim7a',format='2',platform='100001';
//      var URL1 = `http://vv.video.qq.com/getinfo?vids=${vid}&charge=${charge}&otype=${otype}`;
//      var url11 = `http://h5vv.video.qq.com/getinfo?callback=txplayerJsonpCallBack_getinfo_591513&isHLS=false&charge=0&vid=y00221a60w7&defn=hd&defnpayver=1&otype=json&platform=10901&sdtfrom=v1010&host=v.qq.com&_rnd=1479010822&fhdswitch=0&show1080p=1&_qv_rmt=sNk0sWZTA17002uQa%3D&_qv_rmt2=0Qs65I9%2B149182HOQ%3D`;
//      //电影的相关视频
//      var url2 = 'https://union.video.qq.com/fcgi-bin/data?otype=json&tid=682&appid=20001238&appkey=6c03bbe9658448a4&idlist=b0030ygim7a,c003070g88f,b0030ygim7a,v0030zv4zgt,x0030wec9v8,y0848lyby8b,y0030jgx3g3,l00302o0qmj,q00305j59gn,b0854xntn5v,h0836rt6q9k,d0830lydabs,h0836t5xkee,t0836x9t70o,a0829w1zo2v,h0834hmd9tm,o08349lz47a,w0835tufpw3,y0836ubf5x5,m0833q4w4ba,x0833tbopbf,f082250bune,t08335scayc,h0833sfecs0,c08337f7mq1,q08344ns46r,x08325fikua,s0826uyqot8,k083135xbz3,j0831ueombq&callback=jQuery1910863930670488332_1555034643536&_=1555034643544';
//      //热评
//      var url3 = 'https://mfm.video.qq.com/danmu?otype=json&callback=jQuery1910863930670488332_1555034643533&timestamp=15&target_id=3772146241%26vid%3Dc003070g88f&count=80&second_count=5&session_key=0%2C0%2C0&_=1555034643546';
//
//      /*
//       https://access.video.qq.com/danmu_manage/regist?vappid=97767206&vsecret=c0bdcbae120669fff425d0ef853674614aa659c605a613a4&raw=1
//      * type=2&bubble_flag=1&cid=lt0w27nj9tpfllw&targetid=3772146241&vid=c003070g88f
//      *
//      * */
//      fetchJsonp(URL1,{mode:'no-cors'})
//        .then((res)=>{
//        return res.json();
//      }).then((data)=>{
//        console.log(data)
//        let tempStr = data;
//        let url_1 = tempStr['vl']['vi'][0]['ul']['ui'][0]['url'].split('/').slice(0,-3).join('/');
//        let fn = tempStr['vl']['vi'][0]['fn'];
//        let keyid = tempStr['vl']['vi'][0]['cl']['keyid'];
//        console.log("keyid-->",keyid)
//        let fvkey = tempStr['vl']['vi'][0]['fvkey'];
//        let str1 = url_1 + '/' + fn +"?vkey=" + fvkey;
//        console.log(str1)
//        let filename = fn + 'mp4';
//        var url4 = `http://vv.video.qq.com/getkey?format=${format}&otype=${otype}&vt=150&vid=${vid}&charge=${charge}&filename=${fn}`;
//        getkey(url4)
//      });
//      function getkey(url){
//        console.log(url)
//        fetchJsonp(url,{mode:'no-cors'})
//          .then((res)=>{
//            return res.json();
//          }).then((data)=>{
//          console.log("getkey==>",data)
//        })
//      }




//      var videoSet={
//        vid:'b0030ygim7a',
//        poster:'',//手机端poster图
//        width:'600',
//        height:"330"
//      }
//      var video = new tvp.VideoInfo();
//      video.setVid(videoSet.vid);
//      var player = new tvp.Player();
//      player.create({
//        video: video,
//        modId: "videoId",
//        width:videoSet.width,
//        height:videoSet.height,
//        pic:videoSet.poster,
//        isHtml5ShowPosterOnEnd:true,
//        isiPhoneShowPosterOnPause:true,
//        vodFlashSkin:'http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf',//精简皮肤
//        onwrite: function() {
//          console.log("播放器显示完毕");
//        },
//        onpause:function(){
//          console.log('暂停了')
//        },
//        onallended:function(){
//          console.log('播放完了')
//        }
//      });
    },
    methods:{
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .allmost{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .section_container{
      position: absolute;
      top: 50px;
      bottom: 40px;
      left: 50px;
      right: 50px;
      padding: 40px;
      .movieSection{
        display: flex;
        flex-wrap: wrap;
        overflow-y:auto ;
        width: 100%;
        height: 100%;
        .cardPart{
          width: 200px;
          padding: 1em;
          text-align: left;
          .image {
            width: 100%;
            display: block;
          }
          .title{
            margin: 5px 0;
            font-size: 1em;
            font-weight: bolder;
          }
          .starts ,.num{
            font-size: 0.7em;
            color: darkgray;
            margin: 3px 0;
          }
          .starts{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
