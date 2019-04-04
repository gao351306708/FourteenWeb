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
    <div class="allLogin">
      <div><el-button @click="show = !show"  style="height: 40px">测试按钮</el-button></div>
      <div v-show="show">
        <transition name="el-fade-in-linear">
          <el-row>
            <el-col :xs="24">
              <el-popover
                class="login"
                placement="bottom"
                title="网页扫码"
                width="300"
                trigger="click">
                <div style="min-height: 100px">
                  code:<el-input v-model="input1" placeholder="请输入内容"></el-input>
                  state:<el-input v-model="input2" placeholder="请输入内容"></el-input>
                  <el-button slot="reference" @click="loginClick('1')">网页扫码</el-button>
                </div>
                <el-button slot="reference">login</el-button>
              </el-popover>
            </el-col>
            <el-col :xs="24">
              <el-popover
                class="login2"
                placement="bottom"
                title="自定义login"
                width="300"
                trigger="click">
                <div id="login_container" style="height: 300px"></div>
                <el-button slot="reference">自定义login</el-button>
              </el-popover>
            </el-col>
            <el-col :xs="24">
              <el-popover
                class="login2"
                placement="bottom"
                title="微信获取信息"
                width="300"
                trigger="click">
                <div style="min-height: 100px">
                  code:<el-input v-model="input3" placeholder="请输入内容"></el-input>
                  encryptedData:<el-input v-model="input4" placeholder="请输入内容"></el-input>
                  iv:<el-input v-model="input5" placeholder="请输入内容"></el-input>
                  <el-button slot="reference" @click="loginClick('2')">点击获取</el-button>
                </div>
                <el-button slot="reference">微信获取信息</el-button>
              </el-popover>
            </el-col>
          </el-row>
        </transition>
      </div>
    </div>

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
  import {getAllClassesOfCenter,getAllStudentOfClass} from '../../api/manage'
  import {setStore,getStore,clearStore,setSession,getSession} from '../../config/publicMethod'
  import {Debounce} from '../../config/methods'
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
      headTop
    },
    beforeMount(){
      this.GLOBAL.getPageName = true;
      console.log("--------door---------beforeMount")
    },
    mounted() {
      //调用微信登录接口
      //https://open.weixin.qq.com/connect/qrconnect?appid=wxbdc5610cc59c1631&redirect_uri=https%3A%2F%2Fpassport.yhd.com%2Fwechat%2Fcallback.do&response_type=code&scope=snsapi_login&state=689b41d29d32eaeba523447f802ec8ec#wechat_redirect
      //https://open.weixin.qq.com/connect/qrconnect?appid=wx68bd8e40de0fba53&redirect_uri=http%3A%2F%2Fwww.rambogj.club%2Fapi%2Fuser%2Fget_wx_access_token&response_type=code&scope=snsapi_login&state=STATE123
      var obj = new WxLogin({
        id:"login_container",
        appid: "wx68bd8e40de0fba53",
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent('http://www.rambogj.club/api/user/get_wx_access_token'),
        state: "STATE123",
        style: "",
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
      loginClick(param){
        let requestConfig = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }
        let url='';
        if(param == '1'){
          url = `http://www.rambogj.club/api/user/get_wx_access_token?code=${this.input1}&state=${this.input2}`;
        }else if(param == '2'){
          let code = '011KfAKr1uobdm00RsJr1KnKKr1KfAKV';
          let encryptedData = '7RUFgdoSOJcK9kjjSpY8pMps2cFnCtpUlBIJDgGd3AQmpPAKUSAq4pr2JVqYzX33dtTl5l7kb87BF50hYbbORbZHYv4E+2FqhudoPbe524FCHGa3AK7U6BXzUREHOC7q0TpfWzplNdKxTaOawNPninwdyvqXaqNyGdnvfcK2jhvLR0o3R2Q/Qx9iSa+p4Qu4xbPV8wY7XhGCmo2lzyKaoETS7ZdHlo4Owrb2rlVEdvI+7grbx7U+PXsFgUzamFtwZ5TNdG5HPgZ03tFMoy9JVESB2dRzaT/UtzmRvy5L6DbGPurUNVG8SuIUjW+Rwop98ykDyJMnCIh6USptwyZIkA6nxs8HVpcn8Bk9TPfQwzUgrQAf1NjY+tPjJDGV6YOGmytNUFhqy2UU8tDbfFH78tlPO6ttwdwWgrfvqLkEeQvYDfQT4fi9ZWWZhsjhrGsmDqJKRWzqHkaIQuRxdZJcuUIDiPZ6KNDHDFeKFlV72Yc=';
          let iv = 'DWc6pA0nIIXM2TPfsRC7SA==';
          url = `/api/user/getUnionId?code=${this.input3}&encryptedData=${this.input4}&iv=${this.input5}`;
        }
        fetch(url,requestConfig).then((res)=>{
          console.log(res);
          return res.json();
        }).then((data)=>{
          console.log(data);
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
      z-index: 1000;
      pointer-events: none;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
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
      .imgRotate img{
        position: absolute;
        top:40%;
        left: 38%;
        width: 30vw;
        height: 80px;
        animation:rotating 2.5s linear forwards;
      }
      @keyframes rotating{
        from {transform:rotate(0deg) scale(1);}
        to {transform:rotate(360deg) scale(3);}
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
