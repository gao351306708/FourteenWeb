/**娱乐模块**/
<template>
  <div class="amusement">
    <section class="section_left">
      <div class="video delay-1">
        <video muted preload="auto" autoplay="true" id="animationVideo3" src="../../../static/sources/BNP_large_gif.mp4"></video>
      </div>
    </section>
    <section class="section_right" >
      <a class="visuals delay-1" @click="goToUrl(current)">
          <span class="picture">
            <img :src="partList[current].imgUrl">
          </span>
      </a>
      <div class="center_section">
        <div class="centerPart"
             v-for="(item,index) in partList"
             :key="index"
             @click="current=index">
          <div :class="index==current?'title_sec active': 'title_sec'">{{item.title}}</div>
          <div class="date_sec" v-if="index==current">
            <div class="top">{{item.mouth}}</div>
            <span class="stroke"></span>
            <div class="bottom">{{item.year}}</div>
          </div>
        </div>
        <div class="arrow">
          <i class="el-icon-back" style="width: 30px"></i>
        </div>
      </div>
    </section>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAllPhotos} from '../../api/unsplash.js'
  export default {
    //data中放入初始默认值
    data() {
      return {
        partList:[
          {
            title:'Picture',
            year:'2018',
            mouth:'9月',
            imgUrl:'../../../static/images/amusement1.jpg'
          },{
            title:'Video',
            year:'2019',
            mouth:'1月',
            imgUrl:'../../../static/images/amusement2.jpg'
          }
        ],
        current:0,
        interval:null,
        pictureList:[]
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
      console.log("props props-------------props--->",this.pageName)
      let len = this.partList.length,_this = this;
      this.interval = window.setInterval(function(){
        console.log("setInterval");
        if(_this.current == len-1){
          _this.current = 0;
        }else {
          _this.current = _this.current + 1;
        }
      },4000)
      $('#animationVideo3').hover(function(){
        if($(this)[0].paused){
          $(this)[0].play();
        }
      });
    },
    methods:{
      goToUrl(index){
        console.log("goToUrl   --->",index);
        this.$router.push({path:'/Amusement/Picture'})
//        window.location.href = 'https://unsplash.com/';
      }
    },
    destroyed(){
      window.clearInterval(this.interval);//清除定时
      console.log("destroyed   ----   setInterval");
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .amusement{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  .section_left{
    position: absolute;
    top: 40px;
    bottom: 40px;
    right: 58%;
    left: 50px;
  .video{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 578px;
    height: 454px;
    margin: -227px 0 0 -289px;
  video{
    width: 100%;
    height: 100%;
  }
  }
  .delay-1{
    transition-delay: .05s;
  }
  }
  .section_right{
    position: absolute;
    top: 40px;
    bottom: 40px;
    left: 42%;
    right: 50px;
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
  }
  .center_section{
    position: absolute;
    top: 50%;
    left: 10%;
    margin-top: -100px;
    margin-left: 20px;
    width: 160px;
    z-index: 6;
  .centerPart{
    width: 200px;
    height: 100px;
    cursor: pointer;
  .title_sec{
    font-size: 60px;
    font-family: -webkit-pictograph;
    text-align: left;
    font-weight: 600;
    font-style: normal;
    color: #2f2f2f96;
    margin-left: 60px;
  }
  .title_sec.active{
    color: #000000;
  }
  .date_sec{
    position: absolute;
    font-size: 12px;
    margin-top: -36px;
    right: calc(100% - 24px);
  .top{
    position: absolute;
    white-space:nowrap;
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
