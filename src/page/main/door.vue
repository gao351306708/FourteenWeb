<template>
  <el-container class="wrapper_door">
    <div v-if="isLoading" class="main-loader">
      <div :class="!loadingTime ? 'loader-1 loading': 'loader-1'">
        <div class="switch-wrapper">
          <div :class=" switchlong ? 'line': 'line active'"></div>
          <div class="switch">
            <div class="knot"></div>
            <div class="tassel" @click="switchlong=!switchlong"></div>
            <div class="pocket"></div>
            <div class="gap"></div>
          </div>
        </div>
        <div class="progressClassHoleTop">
          <div class="inHole"></div>
        </div>
        <div :class="{progressClassGun:true,active:gunStart}"></div>
        <div class="progressClassTop"></div>
        <div class="ball"></div>
        <el-progress :percentage="percentage" color="#daa520" class="progressClassMid"></el-progress>
        <div class="progressClassHoleBottom">
          <div class="inHole"></div>
        </div>
        <div class="progressClassBottom"></div>
      </div>
    </div>
    <head-top></head-top>
   <nav :class="{navigation:true,active:true,top2:clientWidth<860}" router>
      <div class="list">
        <div style="margin-bottom: 8px" @click="arrowClick('pre')">
          <i class="el-icon-back arrowUp" ></i>
        </div>
        <a v-for="(item,index) in navList"
           :class="['num'+(index+1),{'active':(index+1)==currentNum}]"
            @click="navClick(index)"
            :key="index"
            >
          <div class="bannerSection"><span>{{item.title}}</span></div>
        </a>
        <div @click="arrowClick('next')">
          <i class="el-icon-back arrowDown"></i>
        </div>
      </div>
    </nav>
    <el-main class="center_view">
      <router-view ref="home"></router-view>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import {setStore,getStore,clearStore,setSession,getSession} from '../../config/publicMethod'
  import headTop from '../../components/headTop.vue'
  import FooterBottom from '@/components/footerBottom.vue'
  import Bus from '@/js/bus.js'
  export default {
    name: 'door',
    data () {
      return {
        switchlong:true,//开关下拉动画
        isLoading:false,//中间加载中线条
        loadingTime:true,//拉幕开始标志
        gunStart:false,//开枪开始标志
        video1:null,
        percentage:0,
        timer:null,
        clientWidth:document.body.clientWidth,
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
        opacityFlag:false,
        input1:'',
        input2:'',
        input3:'',
        input4:'',
        input5:'',
        show: false
      }
    },
    components:{
      headTop,
      FooterBottom
    },
    created () {
        Bus.$on('colseLoading', this.colseLoading);
    },
    beforeMount(){
      this.GLOBAL.getPageName = true;
      if(this.$route.path === '/'){
        this.isLoading = true;
        this.timer = setInterval(()=>{
          this.percentage += 1;
        },100)
      }
    },
    mounted() {
      this.setNavNum();
      //监听页面事件
      this.windowAddMouseWheel();
      window.onresize = () => {
          let screenWidth = document.body.clientWidth
          this.clientWidth = screenWidth
      }
    },
    watch:{
      'loadingTime': function(cur,old){
        if(cur){
          var video1 = document.getElementById('animationVideo1');
          if(video1 && video1.paused){
            video1.play();
          }
        }
      },
      'clientWidth':function(cur,old){
        console.log('window宽度变化了-->',cur)
      }
    },
    methods:{
      colseLoading(){
        this.percentage = 100;
        clearInterval(this.timer);
        setTimeout(()=>{
          this.ballScroll();
        },500)
      },
      colseSwitch(){
        this.switchlong = false;
        setTimeout(()=>{
          this.loadingTime = false;
        },1500)
      },
      ballScroll(){
        let _this = this;
        let ball = document.querySelector('.ball');
        if(!ball) return;
        let windowH =  document.documentElement.clientHeight;
        let windowW =  document.documentElement.clientWidth;
        let ballFlyWidth = windowW-50;//球在上方飞到开关时水平的距离
        let ballFlyheight = 250-100;//球飞到开关时下落的高度
        let end1 = windowH-152;//球落在斜坡上时
        let originTop = ball.offsetTop;
        let originLeft = ball.offsetLeft;
        let topReset = -30;
        let vt = 0;//自由落体速度
        let timer = setInterval(()=>{
          if(ball.offsetTop > end1){//到达斜坡上
            if(ball.offsetTop < windowH-30){//到达底部
              originTop +=4;
              ball.style.top = originTop + 'px';
            }
            if(ball.offsetLeft <60){//到达洞口
              originTop +=2;
              ball.style.top = originTop + 'px';
              if(ball.offsetTop > windowH){//掉进底部洞里
                clearInterval(timer);
                let timer2 = setInterval(()=>{//重新开始新的逻辑
                  if(topReset < 68){
                    ball.style.top = topReset + 'px';
                    topReset +=2;
                  }else{
                    if(!_this.gunStart){
                      _this.gunStart = true;//在原来的后面加这个，打枪
                    }
                    // clearInterval(timer2);
                    ball.style.top = topReset + 'px';
                    topReset +=1;
                    originLeft += (ballFlyWidth/ballFlyheight)*1;
                    ball.style.left = originLeft + 'px';
                    if(ball.offsetLeft > windowW-100){
                      clearInterval(timer2)
                      ball.style.display = 'none';
                      document.querySelector('.switch-wrapper').className += ' active'; //在原来的后面加这个，开始摇摆
                      setTimeout(()=> {
                        _this.colseSwitch();//摇摆完了
                      }, 2000);
                    }
                  }
                },10)
              }else{
                originLeft -=2;
                ball.style.left = originLeft + 'px';
              }
            }else{
              originLeft -=4;
              ball.style.left = originLeft + 'px';
            }
          }else{
            vt = vt+0.1;//模拟个自由落体的感觉
            originTop +=vt;
            ball.style.top = originTop + 'px';
          }
        },10);
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
        var beforeTime = Date.now();
        var scrollFunc = function (e) {
          e = e || window.event;
          let el = '';
          if(e.wheelDelta){
            el =  e.wheelDelta;//判断浏览器IE，谷歌滑轮事件
          }else if(e.detail){
            el =  e.detail;//Firefox滑轮事件
          }
          if (el) {
            let afterTime = Date.now();
            if (el > 0) { //当滑轮向上滚动时
              if (afterTime - beforeTime >= 1000) {
                _this.scrollHandle('up');
              }
              beforeTime = afterTime;
            }
            if (el < 0) { //当滑轮向下滚动时
              if (afterTime - beforeTime >= 1000) {
                _this.scrollHandle('down');
              }
              beforeTime = afterTime;
            }
          }else {
            console.warn("您的浏览器不支持滚动事件")
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
      z-index: 101;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;//事件可穿透
      .loader-1{
        position: fixed;
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
      .progressClassGun{
        position: absolute;
        top: 75px;
        background-color:#daa520;
        width: 8px;
        height: 18px;
      }
      .progressClassGun.active{
        width: 35px;
        transition: width 0.05s ease-in;
      }
      .progressClassTop{
        position: relative;
        top: 98px;
        background-color:#daa520;
        width: 60px;
        height: 5px;
      }
      .progressClassMid{
        position: relative;
        top: 50%;
      }
      .ball{
        position: absolute;
        top: 48%;
        right: 40px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #daa520;
        z-index: 105;
      }
      .progressClassBottom{
        position: absolute;
        bottom: 60px;
        right: -16px;
        background-color: #daa520;
        width: 250px;
        height: 5px;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
      .progressClassHoleTop{
        position: absolute;
        top: 0;
        left: 10px;
        width: 86px;
        height: 12px;
        background-color: #daa520;
        border-radius: 50%;
        .inHole{
         width: 66px;
         height: 6px;
         background-color: black;
         border-radius: 50%;
         transform: translate(10px, 5px);
        }
      }
      .progressClassHoleBottom{
        position: absolute;
        bottom: 0;
        left: 10px;
        width: 86px;
        height: 16px;
        background-color: #daa520;
        border-radius: 50%;
        .inHole{
          width: 66px;
          height: 8px;
          background-color: black;
          border-radius: 50%;
          transform: translate(10px, 2px);
        }
      }
      .switch-wrapper.active{
        animation: swing 2s alternate ease-in-out;
      }
      .switch-wrapper{
        position: absolute;
        background: #3e5163;
        right: 100px;
        z-index: 105;
        transform-origin: center top;
        .line{
          width: 10px;
          height: 250px;
          background: white;
        }
        .line.active{
          animation: changelong 1s ease-out;
        }
        .switch{
          .knot{
            cursor: pointer;
            background: #daa520;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 28px;
            height: 22px;
            bottom: 71px;
            border-radius: 50%;
            transform-origin: 50%;
          }
          .tassel{
            cursor: pointer;
            background: #daa520;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 105px;
            height: 75px;
            bottom: -2px;
            -webkit-clip-path: polygon(38% 0, 62% 0, 80% 100%, 20% 100%);
            clip-path: polygon(38% 0, 62% 0, 80% 100%, 20% 100%);
            border-radius: 50%;
            transform-origin: 50%;
          }
        }
        .pocket{
          background: #030f23;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          position: absolute;
          bottom: 23px;
          left: -34px;
        }
        .gap{
          background: #030f23;
          width: 20px;
          height: 20px;
          -webkit-clip-path: polygon(49% 0, 29% 100%, 56% 100%);
          clip-path: polygon(49% 0, 29% 100%, 56% 100%);
          position: absolute;
          bottom: 0;
          left: -22px;
        }
      }
    }
    .allLogin{
      position: absolute;
      width: 140px;
      z-index: 100;
      right: 60px;
      top: 10px;
      margin: 0;
      padding: 0;
    }
    nav.navigation{
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: center;
      bottom: calc(50% - 120px);
      top:calc(50% - 120px);
      left: 0.875rem;
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
          font-size: 0.875rem;
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
        font-size: 1.375rem;
        transform: rotate(-90deg);
        color: darkgray;
        cursor: pointer;
      }
    }
    .header_section{
      text-align: left;
    }
    .top2{
      top:calc(100% - 120px) !important;
    }
  }
  .center_view{
    position: relative;
    width: 100%;
    top: 80px;
    height: calc(100vh - 80px);
  }
  @keyframes changelong{
    0%{height: 250px;}
    70%{height: 360px;}
    100%{height: 250px;}
  }
  @keyframes swing{
    0%{transform: rotate(0deg);}
    25%{transform: rotate(-15deg);}
    75%{transform: rotate(15deg);}
    100%{transform: rotate(0deg);}
    // to{transform: rotate(15deg);}
  }
  .Footer{
    position: fixed;
    width: 100%;
    bottom: 0;
  }
</style>
