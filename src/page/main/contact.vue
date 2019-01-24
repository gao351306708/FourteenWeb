/**联系我**/
<template>
  <div class="contact">
    <head-top></head-top>
    <div class="section_container">
      <h1>contact</h1>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import headTop from '../../components/headTop.vue'
  export default {
    //data中放入初始默认值
    data() {
      return {
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
    },
    methods:{
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .contact{
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
    left: 60px;
    right: 60px;
  }
  }
</style>
