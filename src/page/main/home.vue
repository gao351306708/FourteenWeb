/**首页模块**/
<template>
  <div class="Home">
    <section class="section_left">
      <div class="video delay-1">
        <video width="478" height="354" muted preload="auto" id="animationVideo1" src="../../../static/sources/Latest_work_fond.mp4"></video>
      </div>
    </section>
    <section class="section_right" >
      <a class="visuals delay-1">
          <span class="picture">
            <img src="../../../static/images/page_chapitre720x1000.jpg">
          </span>
          <span class="video_container">
            <span class="video">
              <video muted preload="auto" id="animationVideo2" src="../../../static/sources/texte_animation.mp4"></video>
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    //data中放入初始默认值
    data() {
      return {
      }
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
      var video2 = document.getElementById('animationVideo2');
      var video1 = document.getElementById('animationVideo1');
      if(video1.paused){
        video1.play();
      }
      $('.video_container .video').hover(function(){
        if(video2.paused){
          video2.play();
        }
      })
    },
    methods:{
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .Home{
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
