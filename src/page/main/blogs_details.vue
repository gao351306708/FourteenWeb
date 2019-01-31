/**博客首页**/
<template>
  <div class="blogDetails">
    <div class="closeIcon" @click="exit()"><i class="el-icon-close" style="font-size: 36px"></i></div>
    <div class="section_container">
      <div class="header_section">
        <strong>{{this.detailItem.title}}</strong>
      </div>
      <div class="content">
        <p>程序的运行需要内存。只要程序提出要求，操作系统或者运行时（runtime）就必须供给内存。

          对于持续运行的服务进程（daemon），必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。
          不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）。

          有些语言（比如 C 语言）必须手动释放内存，程序员负责内存管理。</p>
        <p>
          垃圾回收机制怎么知道，哪些内存不再需要呢？

          最常使用的方法叫做"引用计数"（reference counting）：语言引擎有一张"引用表"，保存了内存里面所有的资源（通常是各种值）的引用次数。如果一个值的引用次数是0，就表示这个值不再用到了，因此可以将这块内存释放。
        </p>
        <p>
          三、内存泄漏的识别方法<br>
          怎样可以观察到内存泄漏呢？

          经验法则是，如果连续五次垃圾回收之后，内存占用一次比一次大，就有内存泄漏。这就要求实时查看内存占用。
        </p>
        <p></p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAllPhotos} from '../../api/unsplash.js'
  export default {
    //data中放入初始默认值
    data() {
      return {
        current:0,
        interval:null,
        detailItem:''
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
      $(".navigation").hide();
      this.GLOBAL.getPageName = false;
      this.detailItem = this.$route.params.detailItem;
      console.log("detailItem   --->",this.detailItem.title);
    },
    methods:{
      goToUrl(index){
        console.log("goToUrl   --->",index);
      },
      exit(){
        this.$router.back();
      }
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
      top: 80px;
      bottom: 40px;
      left: 50%;
      margin-left: -540px;
      width: 1080px;
      .header_section{
        font-size: 36px;
      }
      .content{
        p{
          line-height: 36px;
          text-align: left;
          text-indent: 2em;
        }
      }
    }
  }
</style>
