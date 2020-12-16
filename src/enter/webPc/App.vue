<template>
  <div id="app" class="fillcontain">
    <HeadTop />
    <router-view />
    <!-- 启动动画 -->
    <!-- <Translation></Translation> -->
  </div>
</template>

<script>
// import Translation from "@/components/translation.vue";
import HeadTop from "@/components/headTop.vue";
export default {
  name: "App",
  components: {
    // Translation,
    HeadTop
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
