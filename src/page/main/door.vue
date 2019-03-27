<template>
  <el-container class="wrapper_door">
    <!--<div class="main-loader">-->
      <!--<div :class="loadingFlag?'loader-1 loading': 'loader-1'">-->
        <!--<div class="imgRotate" >-->
          <!--<img src="../../../static/images/loading2.png">-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <head-top></head-top>
    <el-button class="login" @click="loginClick">login</el-button>
    <el-popover
      class="login2"
      placement="bottom"
      title="登录"
      width="300"
      trigger="click">
      <div id="login_container" style="height: 300px"></div>
      <el-button slot="reference">login2</el-button>
    </el-popover>
    <nav class="navigation active" router>
      <div class="list">
        <div style="margin-bottom: 8px" @click="arrowClick('pre')">
          <i class="el-icon-back arrowUp" ></i>
        </div>
        <a v-for="(item,index) in navList"
           :class="['num'+(index+1),{'active':(index+1)==currentNum}]"
            @click="navClick(index)">
          <div class="bannerSection"><span>{{item.title}}</span></div>
        </a>
        <div @click="arrowClick('next')">
          <i class="el-icon-back arrowDown"></i>
        </div>
      </div>
    </nav>
    <el-main class="center_view">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import {wechatLogin,doTestLogin,registerUser} from '../../api/user'
  import {setStore,getStore,clearStore,setSession,getSession} from '../../config/publicMethod'
  import headTop from '../../components/headTop.vue'
  export default {
    name: 'door',
    data () {
      return {
//        pageName:this.GLOBAL.getPageName,
        loadingFlag:false,
        video1:null,
        navList:[
          {
            title:'首页',
            route:'/',
            routename:'Home',
            index:1
          },{
            title:'娱乐',
            route:'/Amusement',
            routename:'Amusement',
            index:2
          },{
            title:'技术文档',
            route:'/Blog',
            routename:'Blog',
            index:3
          },{
            title:'大杂烩',
            route:'/AllMost',
            routename:'AllMost',
            index:4
          }
        ],
        currentNum:1,
        opacityFlag:false
      }
    },
    components:{
      headTop
    },
    beforeMount(){
      this.GLOBAL.getPageName = true;
    },
    mounted() {
      //调用微信登录接口
      var obj = new WxLogin({
        self_redirect:false,
        id:"login_container",
        appid: "wx68bd8e40de0fba53",
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent('http://www.rambogj.club/api/user/get_wx_access_token'),
        state: "STATE123",
        style: "black",
        href: ""
      });
      let _this = this;
      setTimeout(function(){
        _this.loadingFlag = true
      },3500);
      this.setNavNum();
      //监听页面事件
      this.windowAddMouseWheel();
    },
    watch:{
      'loadingFlag': function(cur,old){
        if(cur){
          var video1 = document.getElementById('animationVideo1');
          if(video1 && video1.paused){
            video1.play();
          }
        }
      },
    },
    methods:{
      loginClick(){
        let  url = '/api/user/wechat_login';
        let data={
          method: 'GET',
          mode: "no-cors",
        }
        fetch(url,data).then((res)=>{
          console.log(res)
        })
      },
      arrowClick(param){
        if(param == 'pre'){
          if(this.currentNum != 1){
            this.currentNum = this.currentNum-1;
            this.changePage();
          }
        }else {
          if(this.currentNum != this.navList.length){
            this.currentNum = this.currentNum+1;
            this.changePage();
          }
        }
      },
      navClick(index){
        this.currentNum=(index+1);
        this.changePage();
      },
      setNavNum(){
        let routename = this.$router.currentRoute.path.replace('\/','');//当前路由name
        let navList = this.navList;
        for(let i in navList){
          if(routename == navList[i].routename){
            this.currentNum = navList[i].index;
            break;
          }
        }
      },
      windowAddMouseWheel() {
        let _this = this;
        var time1 = 0;
        var scrollFunc = function (e) {
          e = e || window.event;
          let timeStamp = parseInt(e.timeStamp);//滚动的时间戳
          if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
              if(time1 != timeStamp){
                if(timeStamp-time1<100){
                  _this.scrollHandle('up');
                }
                time1 = timeStamp;
              }
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
              if(time1 != timeStamp){
                if(timeStamp-time1<100){
                  _this.scrollHandle('down');
                }
                time1 = timeStamp;
              }
            }
          } else if (e.detail) {  //Firefox滑轮事件
            if (e.detail> 0) { //当滑轮向上滚动时
              _this.scrollHandle('up');
            }
            if (e.detail< 0) { //当滑轮向下滚动时
              _this.scrollHandle('down');
            }
          }
        };
        //给页面绑定滑轮滚动事件,注册事件
        if (document.addEventListener) {
          document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        //滚动滑轮触发scrollFunc方法,IE、chrome、safira
        window.onmousewheel = document.onmousewheel = scrollFunc;
      },
      scrollHandle(direaction){
        if(this.GLOBAL.getPageName){
          console.log("direaction",direaction);
          if(direaction == 'up'){
            if(this.currentNum>1){
              this.currentNum = this.currentNum-1;
              this.changePage();
            }
          }else {
            if(this.currentNum < this.navList.length){
              this.currentNum = this.currentNum+1;
              this.changePage();
            }
          }
        }
      },
      changePage(){
        let _this = this;
        $(".wrapper_door").transition({
          opacity: 0.1,
          duration: 1000,
          easing: 'linear',
          complete:function(){
            let navList = _this.navList;
            for(let i in navList){
              if(_this.currentNum == navList[i].index){
                _this.$router.push({path:navList[i].route});
                break;
              }
            }
          }
        });
      }
    },
    destroyed(){
      this.GLOBAL.getPageName = false;
      console.warn('destroyed destroyed   destroyed-----destroyed----destroyed')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .wrapper_door{
    position: relative;
    min-height: 100vh;
    background-color: #fff;
    opacity:1;
    .main-loader{
      position: fixed;
      z-index: 15;
      pointer-events: none;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .loader-1{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #000000;
        transition: transform 1s;
        transition-timing-function: cubic-bezier(.85,0,.15,1);
        will-change: transform;
      }
      .loading{
        transform: translateX(-100%);
      }
      .imgRotate img{
        position: absolute;
        top:50%;
        left: 50%;
        width: 300px;
        height: 100px;
        margin: -50px 0 0 -150px;
        animation:rotating 2.5s linear forwards;
      }
      @keyframes rotating{
        from {transform:rotate(0deg) scale(1);}
        to {transform:rotate(360deg) scale(4);}
      }
    }
    .login{
      position: absolute;
      z-index: 100;
      right: 10px;
      top: 10px;
    }
    .login2{
      position: absolute;
      z-index: 100;
      right: 100px;
      top: 10px;
    }
    nav.navigation{
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: center;
      top: calc(50% - 120px);
      bottom: calc(50% - 120px);
      left: 15px;
      width: 40px;
      z-index: 14;
      opacity: 1;
      pointer-events: auto;
      transition: opacity .3s,transform .3s;
      will-change: opacity,transform;
      a{
        display: inline-block;
        position: relative;
        width:24px;
        height: 16px;
        padding: 0;
        cursor: pointer;
        transition: height .3s,transform .3s;
        .bannerSection{
          display: inline-block;
          position: relative;
          top: -8px;
          margin-top: 8px;
          height: 0px;
          line-height: 25px;
          border: 1px solid #d5d5d5;
          width: 100%;
          text-align: center;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          span{
            display: block;
            padding: 5px;
          }
        }
      }
      a:hover,a.active{
        border: 1px solid #9c9c9c;
        .bannerSection{
          border: none;
          height: 100%;
        }
      }
      .num1:hover,a.num1.active{
        height: 60px;
      }
      .num2:hover,a.num2.active{
        height: 60px;
      }
      .num3:hover,a.num3.active{
        height: 110px;
      }
      .num4:hover,a.num4.active{
        height: 90px;
      }
      .arrowUp{
        font-size: 22px;
        transform: rotate(90deg);
        color: darkgray;
        cursor: pointer;
      }
      .arrowDown{
        font-size: 22px;
        transform: rotate(-90deg);
        color: darkgray;
        cursor: pointer;
      }
    }
    .header_section{
      text-align: left;
    }
  }
  .center_view{
    /*width: 100%;*/
  }
</style>
