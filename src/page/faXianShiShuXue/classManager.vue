<template>
  <div class="classManager">
    <head-top></head-top>
    <section class="data_section">
      <addClass :data="noneData" type="add" :addFlag="addFlag" key="add"></addClass>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import headTop from '../../components/headTop.vue'
  import addClass from './addClass.vue'
  export default {
    data(){
      return {
        noneData:{},
        addFlag:true
      }
    },
    components:{
      headTop,
      addClass
    },
    watch:{
      //当监听的属性值变化的时候 会执行对应的处理逻辑
      addFlag:function(newValue,oldValue){
        console.error("watch 监听数据-----》",newValue,oldValue)
      },
      $route:function(to,from){
        console.error("watch 监听数据--$route--11-》",to,from)
      },
      '$route' (to, from) {
        console.error("watch 监听数据--$route--22-》",to,from)
      },
      beforeRouteUpdate (to, from, next) {
        console.error("watch 监听数据--beforeRouteUpdate--33-》",to,from)
      }
    },
    activated(){
      //当切换路由的时候 如果需要 vue保存缓存的话，但是部分的值不需要，则可以在这里面重新赋值，如果没有keep-alive,则每次都会重新加载所有数据
//      this.addFlag = !this.addFlag
//      console.log("activated--->",this.addFlag)
    },
    mounted(){
      const Wh = $(window).height();
      $(".data_section").css("height",(Wh-150)+'px');
    },
    methods: {
    }
  }
</script>

<style scoped  lang="less" type="text/less">
  .classManager{
    .data_section {
      padding: 20px;
      overflow: auto;
      margin-bottom: 40px;
    }
  }
</style>
