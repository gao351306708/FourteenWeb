<template>
  <div class="sectionMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <section>
      <div>{{message}}</div>
    </section>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:"userManage",
    data(){
      return{
        message:"userManage"
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">

</style>
