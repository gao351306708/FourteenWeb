<template>
  <el-container class="wrapper_door">
    <!--<div class="main-loader">-->
      <!--<div :class="loadingFlag?'loader-1 loading': 'loader-1'">-->
        <!--<div class="imgRotate" >-->
          <!--<img src="../../../static/images/loading2.png">-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <header :class="openFlag?'full-header active': 'full-header'">
      <div class="inner-1">
        <div class="inner-2">
          <a class="close" @click="openFlag=false">
            <i class="el-icon-close" style="font-size: 36px"></i>
          </a>
          <div class="center_container">
            <p style="margin-top:25%"><span style="width:180px">BLOG</span></p>
            <p><span style="width:280px">ABOUT ME</span></p>
            <p><span style="width:280px">CONTACT</span></p>
          </div>
        </div>
      </div>
    </header>
    <header class="main-header">
      <el-row>
        <el-col :span="12" class="header_section left"><a href="http://www.rambogj.club"><img src="../../../static/images/logo.png" /></a></el-col>
        <el-col :span="12" class="header_section right">
          <div class="open" @click="openFlag=true">
            <span class="icon">
                <span class="bar index-1"></span>
                <span class="bar index-2"></span>
                <span class="bar index-3"></span>
            </span>
          </div>
        </el-col>
      </el-row>
    </header>
    <nav class="navigation active" router>
      <div class="list">
        <div style="margin-bottom: 8px" @click="arrowClick('pre')">
          <i class="el-icon-back arrowUp" ></i>
        </div>
        <a v-for="(item,index) in navList"
           :class="['num'+(index+1),{'active':(index+1)==currentNum}]"
            @click="currentNum=(index+1)">
          <div class="bannerSection"><span>{{item}}</span></div>
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
  import {doLogin,doTestLogin,registerUser} from '../../api/user'
  import {setStore,getStore,clearStore,setSession,getSession} from '../../config/publicMethod'
  import {filterWebUrl} from '../../config/methods'
  export default {
    name: 'door',
    data () {
      return {
        openFlag:false,
        loadingFlag:false,
        video1:null,
        navList:['首页','技术文档','大杂烩','娱乐'],
        currentNum:1,
        opacityFlag:false
      }
    },
    mounted() {
      let _this = this;
      setTimeout(function(){
        _this.loadingFlag = true
      },3500);
      //监听页面事件
      this.windowAddMouseWheel();
    },
    watch:{
      'loadingFlag': function(cur,old){
        if(cur){
          var video1 = document.getElementById('animationVideo1');
          if(video1.paused){
            video1.play();
          }
        }
      },
    },
    methods:{
      arrowClick(param){
        if(param == 'pre'){
          if(this.currentNum != 1){
            this.currentNum = this.currentNum-1;
          }
        }else {
          if(this.currentNum != this.navList.length){
            this.currentNum = this.currentNum+1;
          }
        }
      },
      windowAddMouseWheel() {
        let _this = this;
        var time1 = 0;
        var scrollFunc = function (e) {
          e = e || window.event;
          let timeStamp = parseInt(e.timeStamp);//滚动的时间戳
          console.log("scrollFunc---->",timeStamp);
          if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            console.log("scrollFunc---->111111111111111111111111-->",time1);
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
              if(time1 != timeStamp){
                time1 = timeStamp;
                _this.scrollHandle('up');
              }
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
              if(time1 != timeStamp){
                time1 = timeStamp;
                _this.scrollHandle('down');
              }
            }
          } else if (e.detail) {  //Firefox滑轮事件
            console.log("scrollFunc---->222222222222222222222");
            if (e.detail> 0) { //当滑轮向上滚动时
              _this.scrollHandle('up');
            }
            if (e.detail< 0) { //当滑轮向下滚动时
              _this.scrollHandle('down');
            }
          }
        };
        //给页面绑定滑轮滚动事件
        if (document.addEventListener) {
          document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        //滚动滑轮触发scrollFunc方法
        window.onmousewheel = document.onmousewheel = scrollFunc;
      },
      scrollHandle(direaction){
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
      },
      changePage(){
        let _this = this;
        $(".wrapper_door").transition({
          opacity: 0.1,
          duration: 1000,
          easing: 'linear',
          complete:function(){
            switch (_this.currentNum)
            {
              case 1 :
                _this.$router.push({path:'/'});
                break;
              case 2 :
                _this.$router.push({path:'Amusement'});
                break;
              case 3 :
                _this.$router.push({path:'AllMost'});
                break;
              case 4 :
                _this.$router.push({path:'Blog'});
                break;
              default :
                _this.$router.push({path:'/'});
                break;
            }
          }
        });
      }
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
        height: 110px;
      }
      .num3:hover,a.num3.active{
        height: 90px;
      }
      .num4:hover,a.num4.active{
        height: 60px;
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
    .full-header{
      position: fixed;
      display: block;
      margin: 0;
      z-index: 8;
      pointer-events: none;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      overflow: hidden;
      .inner-1,.inner-2{
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      .inner-1{
        position: absolute;
        background: #0e0e0e;
        transition: transform 1s;
        transition-timing-function: cubic-bezier(.85,0,.15,1);
        will-change: transform;
        transform: translateY(-100%);
      }
      .center_container{
        position: absolute;
        width: 50%;
        height: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        p{
          text-align: center;
          font-size: 48px;
          margin: 30px 0;
          color: white;
          cursor: pointer;
        }
        p span{
          display: inline-block;
          position: relative;
          width: 300px;
        }
        p span::before{
          content: "";
          display: inline-block;
          position: absolute;
          width: 0px;
          height: 5px;
          color: red;
          background-color: white;
          margin-top: 30px;
          margin-left: -20px;
          z-index: 39;
          transition: width .5s;
        }
        p span:hover:before{
          width:100%
        }
      }
      .close{
        display: block;
        position: absolute;
        left: 50%;
        top: 31px;
        width: 50px;
        height: 50px;
        margin: 0 0 0 -25px;
        color: white;
        z-index: 8;
        cursor: pointer;
        i{
          transition: transform .4s;
        }
        i:hover{
          transform: rotate(180deg);
          transition-delay: .1s;
        }
      }
      a{
        color: inherit;
        outline: none;
      }
    }
    .full-header.active{
      pointer-events: auto;
    }
    .full-header.active .inner-1, .full-header.active .inner-2{
      transform: translateY(0);
    }
    .main-header{
      height: 80px;
      position: relative;
      z-index: 5;
      width: 100%;
      .left{
        padding-left: 35px;
        img{
          width: 128px;
          height: 80px;
          cursor: pointer;
        }
      }
      .right{
        height: 80px;
        .open{
          display: block;
          position: absolute;
          width: 30px;
          height: 21px;
          top: 40%;
          left: 50%;
          cursor:pointer;
          z-index: 2;
          .icon{
            width: 25px;
            height: 14px;
            .bar{
              position: absolute;
              display: block;
              width: 100%;
              height: 2px;
              background: #000;
              transition: transform .2s cubic-bezier(.75,0,.5,1);
              will-change: transform;
            }
            .index-2{
              top: 50%;
              margin-top: -1px;
            }
            .index-3{
              bottom: 0;
            }
          }
        }
        .open:hover{
          .index-1{
          transform: translateX(-5px);
          }
          .index-2{
          transform: translateX(5px);
          }
          .index-3{
          transform: translateX(-5px);
          }
        }
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
