/**大杂烩，喜欢的各种类型都放这里**/
<template>
  <div class="allmost">
    <div class="section_container">
      <h2>还没想好。。。</h2>
      <!--<div id="videoId">-->

      <!--</div>-->

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    //data中放入初始默认值
    data() {
      return {
        movieList:[]
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
      padding: 40px;
      .movieSection{
        display: flex;
        flex-wrap: wrap;
        overflow-y:auto ;
        width: 100%;
        height: 100%;
        .cardPart{
          width: 200px;
          padding: 1em;
          text-align: left;
          .image {
            width: 100%;
            display: block;
          }
          .title{
            margin: 5px 0;
            font-size: 1em;
            font-weight: bolder;
          }
          .starts ,.num{
            font-size: 0.7em;
            color: darkgray;
            margin: 3px 0;
          }
          .starts{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
