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
  @import '~@/assets/common.less';
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
  .search .el-input input{
    height: 3rem !important;
    line-height: 3rem !important ;
  }
  .search .el-input .el-input__inner {
    padding-left: 40px;
  }
  .search .el-input .el-input__icon{
    font-size: 1.5rem;
    padding: 0 5px;
    cursor: pointer;
  }
  .picture button i{
    font-size: 1.5rem;
  }
  .searchPicture .search .el-input input{
    border-radius: 25px;
  }
  .blogList .el-pagination .el-icon,.blogList .el-pagination .el-pager li{
    font-size: 1rem !important;
  }
  .el-button--text{
    color: #606266;
  }
  .Movie .el-button--mini, .el-button--mini.is-round{
    padding: 0.5rem !important;
  }
</style>
