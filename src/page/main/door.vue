<template>
  <el-container class="wrapper_door">
    <head-top></head-top>
    <NavMenu v-if="$route.meta.nav"></NavMenu>
    <el-main class="center_view">
      <router-view ref="home"></router-view>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
import {
  setStore,
  getStore,
  clearStore,
  setSession,
  getSession
} from "../../utils/publicMethod";
import { getInterview, updateInterview } from "@/api/manage.js";
import headTop from "../../components/headTop.vue";
import FooterBottom from "@/components/footerBottom.vue";
import NavMenu from "@/components/NavMenu.vue";
export default {
  name: "door",
  data() {
    return {};
  },
  components: {
    headTop,
    FooterBottom,
    NavMenu
  },
  created() {
    updateInterview({ name: "door" }); //更新访问记录
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
@import "../../assets/mixin.less";
.wrapper_door {
  position: relative;
  min-height: 100vh;
  background-color: #fff;
  opacity: 1;
}
.center_view {
  position: relative;
  width: 100%;
  top: 80px;
  height: calc(100vh - 80px);
}
</style>
