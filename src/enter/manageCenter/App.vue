<template>
  <div id="app" class="fillcontain">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
@import "../../assets/common.less";
@import "../../assets/pub.less";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
