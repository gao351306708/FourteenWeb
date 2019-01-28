/**about Me**/
<template>
  <div class="aboutMe">
    <head-top></head-top>
    <div class="closeIcon" @click="exit()"><i class="el-icon-close" style="font-size: 36px"></i></div>
    <div class="section_container">
      <div class="top-section">
        <img src="../../../static/images/aboutHu.jpg">
        <div class="context-section">
          <p style="font-size: 48px">我</p>
          <p style="font-size: 22px">什么都不想说</p>
          <p style="font-size: 24px">{{content2}}<span class="guangbiao">|</span></p>
        </div>
      </div>
      <div class="middle-section">
        <div class="left">
          <div class="title">我是谁</div>
          <div class="content">
            <p>We are born out of passion for creativity and our desire for more crafted and innovative work.</p>
            <p>After spending years in advertising agencies, we’ve decided to start our own creative atelier. In 2011, we’ve gathered our most talented friends to offer our creative and production services tailored for the digital age.</p>
            <p>That’s what we’ve been doing ever since … producing contents, prototyping crazy products, bringing life to stellar ideas, creating global platforms as well as smaller-scaled social games …
              For brands, NGOs, agencies … we’ve managed many projects, from ideation through completion, for clients in need of the rightful creative-problem solving-collaborative-thoughtful-polite-cool minded team to achieve their goals.</p>
          </div>
        </div>
        <div class="right">
          <div class="title">我的秘密</div>
          <div class="content">
            <p>Email:351306708@qq.com</p>
            <p>Address:BeiJingHaiDian</p>
          </div>
        </div>
      </div>
      <div class="bottom-section">
        <div class="headerContent">My Interest</div>
        <div class="partSection">
          <div class="part1">
            <div class="top-title">Tags</div>
            <div class="content">
              <span>滑雪</span>
              <span>看电影</span>
              <span>独自旅游</span>
              <span>node</span>
              <span>reactJs</span>
              <span>美食</span>
              <span>technology</span>
              <span>看书</span>
              <span>vue</span>
              <span>HTML5</span>
              <span>travel & food</span>
            </div>
          </div>
          <div class="part2">
            <div class="top-title">Latest Episodes</div>
            <div class="content">蹦沙卡拉卡</div>
          </div>
          <div class="part3">
            <div class="top-title">Instagram</div>
            <div class="content">
              <img src="../../../static/images/aboutHu2.jpg">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import headTop from '../../components/headTop.vue'
  export default {
    //data中放入初始默认值
    data() {
      return {
        context:'要是喜欢就继续看看呗',
        contextList:[],
        content2:'',
        interval2:null,
        num:0
      }
    },
    components:{
      headTop
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
      let str = '',_this = this;
      for (let ii in this.context){
        console.log(ii,this.context[ii])
        this.contextList.push(this.context[ii])
      }
      this.interval2 = window.setInterval(function(){
        console.log("setInterval");
        _this.content2 = _this.content2 + _this.contextList[_this.num];
        _this.num = _this.num+1;
        if(_this.num > _this.contextList.length-1){
          window.clearInterval(_this.interval2);//清除定时
          $('.guangbiao').removeClass()
        }
      },1000)
    },
    methods:{
      exit(){
        this.$router.back();
      }
    },
    destroyed(){
      window.clearInterval(this.interval2);//清除定时
      console.log("destroyed   ----   interval2");
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .aboutMe{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    .closeIcon{
      position: absolute;
      width: 40px;
      height: 40px;
      right: 40px;
      top: 35px;
      z-index: 20;
      cursor: pointer;
    }
    .section_container{
      position: relative;
      top: 80px;
      bottom: 40px;
      padding: 0 45px;
      .top-section{
        position: relative;
        height: calc(100vh - 110px - 40px - 50px);
        background: #161616;
        overflow: hidden;
        img{
          width: 100%;
        }
        .context-section{
          position: absolute;
          top:30%;
          left: 20%;
          width: 600px;
          height: 300px;
          text-align: left;
          color: white;
          p{
            margin: 8px 0;
          }
          .guangbiao{
            color: white;
            transition:opacity 0.5s;
            opacity:1;
            animation: guangbiao 1s infinite;
          }
          @-webkit-keyframes guangbiao {
            0%{
              opacity:1;
            }
            50%{
              opacity:0;
            }
            100%{
              opacity:1;
            }
          }
        }
      }
      .middle-section{
        position: relative;
        display: flex;
        overflow: hidden;
        min-height: 420px;
        .left{
          width: 70%;
          text-align: left;
          margin-left: 8%;
          margin-top: 40px;
          .title{
            font-weight: 600;
            color: #85785b;
            text-decoration: underline;
            font-size: 32px;
            line-height: 53px;
            margin: 20px 0;
          }
          .content{
            line-height: 25px;
          }
        }
        .right{
          width: 30%;
          text-align: left;
          padding-left: 10%;
          margin-top: 40px;
          .title{
            font-weight: 600;
            color: #85785b;
            text-decoration: underline;
            font-size: 32px;
            line-height: 53px;
            margin: 20px 0;
          }
          .content{
            line-height: 25px;
          }
        }
      }
      .bottom-section{
        position: relative;
        height: 650px;
        margin: 0 40px;
        bottom: 40px;
        background: #161616;
        clear: both;
        color: #fff;
        overflow: hidden;
        .headerContent{
          font-size: 28px;
          height: 70px;
          line-height: 70px;
        }
        .partSection{
          display: flex;
          height: 580px;
          padding: 0 15%;
        }
        .part1,.part2,.part3{
          position: relative;
          width: 33.333%;
          text-align: left;
          .top-title{
            height: 60px;
            line-height: 60px;
            font-size: 22px;
            margin-bottom: 20px;
            color: #85785b;
          }
          .content{
            height: 430px;
            font-size: 18px;
            span{
              display: inline-block;
              padding: 4px;
              background-color: #6f5722;
              border-radius: 4px;
            }
          }
        }
        .part1 .content{
          width: 270px;
          span{
            margin-bottom: 15px;
          }
        }
        .part3 .content{
          img{
            border: 2px solid white;
            height: 100%;
          }
        }
      }
    }
  }
</style>
