<template>
  <div class="HomeContain">
    <el-row class="header-css">
      <el-col :span="12">
        <div class="header-left">管理员系统</div>
      </el-col>
      <el-col :span="12">
        <div class="header-right">
          <el-avatar :size="36" :src="headUrl ? headUrl : require('@/assets/img/head-black.png')"></el-avatar>
          <el-dropdown trigger="click" @command="handleCommand" class="dropdownCss">
            <span class="el-dropdown-link">
              菜单
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="exit">退出</el-dropdown-item>
              <el-dropdown-item command="res">返回</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <el-row class="main-css">
      <el-col :span="4" style="min-height: 100%; background-color: #324057">
        <el-menu default-active="1" background-color="rgb(50, 64, 87)" text-color="#bfcbd9" hover-text-color="red" active-text-color="#20a0ff" router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>个人中心管理</span>
            </template>
            <el-menu-item index="/home/userManage">个人信息</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>应用管理</span>
            </template>
            <el-submenu index="2-1">
              <span slot="title">博客管理</span>
              <el-menu-item index="/home/blogTypeModule">类型</el-menu-item>
              <el-menu-item index="/home/blog">文章</el-menu-item>
            </el-submenu>
            <el-submenu index="2-2">
              <span slot="title">网点管理</span>
              <el-menu-item index="/home/websitType">类别</el-menu-item>
              <el-menu-item index="/home/websitList">网点</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>统计管理</span>
            </template>
            <el-menu-item index="/home/statistics/statisticsInterview">访问统计</el-menu-item>
            <el-menu-item index="/home/statistics/statisticsModules">模块浏览统计</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%; overflow: hidden">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { setStore, getStore, clearStore, setSession, clearSession } from "../../utils/publicMethod";
export default {
  //data中放入初始默认值
  name: "home",
  data() {
    return {
      isTrue: false,
      headUrl: ""
    };
  },
  computed: {},
  mounted() {
    //进入首页的时候存储一个课程列表
  },
  methods: {
    handleCommand(command) {
      if (command == "exit") {
        clearSession();
        this.$router.replace({ path: "/" });
      }
    }
  }
};
</script>

<style scoped lang="less" type="text/less">
@import "../../assets/mixin.less";
.HomeContain {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.header-css {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  width: 100%;
  height: 60px;
  background-color: rgb(50, 64, 87);
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  .header-left {
    float: left;
    font-size: 18px;
    margin-left: 40px;
  }
  .header-right {
    display: flex;
    align-items: center;
    float: right;
    margin-right: 20px;
  }
}
.main-css {
  height: calc(100% - 60px);
}
.el-menu-item:hover {
  background-color: #232e3fa3 !important;
}
.el-submenu__title:hover {
  -webkit-transition: border-color 0.3s, color 0.3s !important;
  transition: border-color 0.3s, color 0.3s !important;
  background-color: #232e3fa3 !important;
}
.dropdownCss {
  color: white;
  margin-left: 15px;
  cursor: pointer;
}
</style>
