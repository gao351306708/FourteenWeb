<template>
  <div class="backTop" @click="backTop()">
    <el-tooltip placement="left-end" effect="light">
      <template slot="content">
        <span @click="backTop()">返回顶部</span>
      </template>
      <i class="el-icon-arrow-up"></i>
    </el-tooltip>
    <el-tooltip placement="left-end" effect="light">
      <template slot="content">
        <span @click="questionHandle()">提问</span>
      </template>
      <i class="el-icon-question"></i>
    </el-tooltip>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "backTop",
  props: {
    //传入需要滚动的元素的class或者id名
    scrollerName: {
      type: String,
      default: "app"
    }
  },
  data() {
    return {};
  },
  methods: {
    backTop() {
      $(this.scrollerName).scrollTop(0);
    },
    questionHandle() {
      this.$router.push("/About");
    }
  }
};
</script>
<style lang="less" scoped>
.backTop {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  right: 15px;
  bottom: 40px;
  width: 36px;
  min-height: 50px;
  border-radius: 4px 0 0 4px;
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.18);
  cursor: pointer;
  padding: 5px 0;
  z-index: 10;
  /deep/ i {
    margin: 5px 0;
  }
}
</style>
