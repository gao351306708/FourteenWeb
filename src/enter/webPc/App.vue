<template>
  <div id="app" class="fillcontain">
    <router-view />
    <!-- 启动动画 -->
    <Translation></Translation>
  </div>
</template>

<script>
import Translation from "@/components/translation.vue";
export default {
  name: "App",
  components: {
    Translation
  }
};
</script>

<style lang="less">
@import "~@/assets/common.less";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-menu-item,
.el-submenu__title {
  text-align: left;
}
.el-submenu__title:hover {
  background-color: #232e3fa3 !important;
}
.el-submenu .el-menu-item {
  min-width: 100px !important;
}
.el-dialog__body {
  max-height: 400px;
  overflow: auto;
}
.picture button i {
  font-size: 1.5rem;
}
.searchPicture .search .el-input input {
  border-radius: 25px;
}
.blogList .el-pagination .el-icon,
.blogList .el-pagination .el-pager li {
  font-size: 1rem !important;
}
.Movie .el-button--mini,
.el-button--mini.is-round {
  padding: 0.5rem !important;
}
</style>
