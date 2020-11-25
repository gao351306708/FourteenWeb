<template>
  <el-container class="Layout">
    <NavMenu v-if="$route.meta.nav"></NavMenu>
    <el-main class="center_view">
      <keep-alive>
        <router-view ref="home" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view ref="home" v-if="!$route.meta.keepAlive"></router-view>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
import { updateInterview } from "@/api/manage.js";
import NavMenu from "@/components/NavMenu.vue";
export default {
  name: "Layout",
  data() {
    return {};
  },
  components: {
    NavMenu
  },
  created() {
    updateInterview({ name: "door" }); //更新访问记录
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
.Layout {
  position: relative;
  min-height: 100vh;
  opacity: 1;
  .center_view {
    position: relative;
    width: 100%;
    top: 80px;
    height: calc(100vh - 80px);
  }
}
</style>
