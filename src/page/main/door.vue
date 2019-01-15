<template>
  <el-container class="wrapper_door">
    <div class="main-loader"></div>
    <header :class="openFlag?'full-header active': 'full-header'">
      <div class="inner-1">
        <div class="inner-2">
          <a class="close" @click="openFlag=false">
            <i class="el-icon-close" style="font-size: 36px"></i>
          </a>
          <div class="center_container">
            <p style="margin-top:25% ">BLOG</p>
            <p>ABOUT US</p>
            <p>CONTACT</p>
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
    <div class="nav"></div>
    <el-main class="main_page_container">
      <section class="section_left">
        <div class="video delay-1">
          <video width="478" height="354" muted autoplay="true" src="../../../static/sources/Latest_work_fond.mp4"></video>
        </div>
      </section>
      <section class="section_right">
        <a class="visuals delay-1">
          <span class="picture">
            <img src="../../../static/images/page_chapitre720x1000.png">
          </span>
          <span class="video_container">
            <span class="video">
              <video muted autoplay="true" id="animationVideo" src="../../../static/sources/texte_animation.mp4"></video>
            </span>
          </span>
        </a>
        <div class="center_section">
          <div class="top_sec">
            FourteenWeb/<br>
            Personal Web Site
          </div>
          <div class="title_sec">STARTING</div>
          <div class="date_sec">
            <div class="top">2019</div>
            <span class="stroke"></span>
            <div class="bottom">Present</div>
          </div>
          <div class="arrow">
            <i class="el-icon-back" style="width: 30px"></i>
          </div>
        </div>
      </section>
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
      }
    },
    mounted() {
      //监听页面事件
      var video = document.getElementById('animationVideo');
      $('.video_container .video').hover(function(){
        if(video.paused){
          video.play();
        }
      })
    },
    methods:{
      registerSubmitForm(formName){
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
    .main-loader{

    }
    .main-header{
      height: 80px;
      position: relative;
      z-index: 5;
      width: 100%;
    }
    .header_section{
      text-align: left;
    }
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
    }
  }
  .main_page_container{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .section_left{
      position: absolute;
      top: 40px;
      right: 58%;
      bottom: 40px;
      left: 40px;
      .video{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 478px;
        height: 354px;
        margin: -177px 0 0 -239px;
      }
      .delay-1{
        transition-delay: .05s;
      }
    }
    .section_right{
      position: absolute;
      top: 40px;
      right: 40px;
      bottom: 40px;
      left: 42%;
      .visuals{
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 30%;
        background: #cfd2d2;
        z-index: 1;
        cursor:pointer;
        .picture{
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          img{
            position: relative;
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
          }
        }
        .video_container{
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          .video{
            opacity: 0;
            transition: opacity .8s;
            will-change: opacity;
            video{
              width: 100%;
              height: 100%;
              opacity: 0.99;
              object-fit: fill;
            }
          }
          .video:hover{
            opacity: 1;
          }
        }
      }
      .delay-1{
        transition-delay: .05s;
      }
      .center_section{
        position: absolute;
        top: 50%;
        left: 10%;
        margin-top: -80px;
        width: 200px;
        height: 150px;
        z-index: 6;
        .title_sec{
          font-size: 65px;
          width: 400px;
          margin: 0 0 10px 0px;
          font-family: cursive;
          font-weight: 600;
          font-style: normal;
          color: rgb(0,0,0);
        }
        .top_sec{
          position: absolute;
          top: -70px;
          left: 42px;
          font-family: Mensch;
          font-weight: 400;
          font-size: 14px;
        }
        .date_sec{
          position: absolute;
          top: 22px;
          right: calc(100% - 13px);
          .top{
            position: absolute;
            right: 0;
            bottom: 5px;
            font-family: cursive
          }
          .stroke{
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            width: 40px;
            height: 1px;
            background: #000;
            transform: scaleX(1);
          }
          .bottom{
            position: absolute;
            top: 5px;
            right: 0;
          }
        }
        .arrow{
          display: block;
          width: 40px;
          font-size: 28px;
          margin: 0 0 0 64px;
          transition: transform .3s;
          will-change: transform;
        }
        .arrow i{
          transform: rotate(180deg);
        }
        .arrow:hover{
          transform:translate(5px,0px);
          cursor: pointer;
        }
      }
    }
  }
</style>
