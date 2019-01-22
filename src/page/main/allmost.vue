/**大杂烩，喜欢的各种类型都放这里**/
<template>
  <div class="allmost">
    <div class="section_container">
      <h1>allmost</h1>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    //data中放入初始默认值
    data() {
      return {
      }
    },
    computed: {
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
  .allmost{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .section_container{
      position: absolute;
      top: 50px;
      bottom: 40px;
      left: 50px;
      right: 50px;
    }
  }
</style>
