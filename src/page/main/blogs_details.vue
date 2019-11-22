/**博客首页**/
<template>
  <div class="blogDetails">
    <backButton></backButton>
    <el-row class="section_container">
      <el-col :span="24" class="mainSection">
          <div class="header_section">
            <strong>{{this.detailItem.title}}</strong>
          </div>
          <div class="content">
            <p>之前一直想做点微信相关的开发，比如小程序、网站授权微信登录等等，但是这些都需要企业认证等信息，个人的做不了，所以都不了了之。这次项目刚好需要开发微信的相关功能，
              包括小程序、网站微信授权登录等等，所以在这里也记录下这两周遇到的一些问题，以及给新人一些参考。第一次做微信开发有什么问题大佬们可以指出来，多多赐教！
            </p>
            <h3>准备工作</h3>
            <p>1、注册微信公众平台（服务号）。<a href="https://mp.weixin.qq.com" target="_blank">https://mp.weixin.qq.com</a></p>
            <p>1、注册微信公众平台|小程序。<a href="https://mp.weixin.qq.com" target="_blank">https://mp.weixin.qq.com</a></p>
            <p>2、注册微信开放平台。<a href="https://open.weixin.qq.com/" target="_blank">https://open.weixin.qq.com</a></p>
            <h3>开始</h3>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAllPhotos} from '../../api/unsplash.js'
  import backButton from '@/components/backButton.vue'
  export default {
    //data中放入初始默认值
    data() {
      return {
        current:0,
        interval:null,
        detailItem:''
      }
    },
    components:{
      backButton
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
      $(".navigation").hide();
      this.GLOBAL.getPageName = false;
      this.detailItem = this.$route.params.detailItem;
      console.log("detailItem   --->",this.detailItem.title);
    },
    methods:{
      goToUrl(index){
        console.log("goToUrl   --->",index);
      },
    },
    destroyed(){
      $(".navigation").show();
      this.GLOBAL.getPageName = true
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .blogDetails{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .section_container{
      position: absolute;
      width: 100%;
      top: 80px;
      bottom: 40px;
      .mainSection{
        padding: 20px 50px;
      .header_section{
        font-size: 2em;
      }
      .content{
        margin-top: 2em;
        padding: 0 5em;
        text-align: left;
        h1,h2,h3,h4,h5{
          margin: 8px 0;
        };
        p{
          line-height: 36px;
          text-indent: 2em;
        }
      }
      }

    }
  }
</style>
