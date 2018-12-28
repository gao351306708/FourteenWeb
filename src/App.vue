<template>
  <div id="app" class="fillcontain">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  @import './assets/common.less';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .el-menu-item,.el-submenu__title{
    text-align: left;
  }
  .el-submenu__title:hover{
    background-color: #232e3fa3 !important;
  }
  .el-table th{
    text-align: center;
  }
  .el-submenu .el-menu-item{
    min-width: 100px !important;
  }
  .el-dialog__body{
    max-height: 400px;
    overflow: auto;
  }
</style>
