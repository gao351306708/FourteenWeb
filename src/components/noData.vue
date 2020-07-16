<template>
  <div class="nodata">
    <img src="/static/images/photosNull.png" />
    <div class="message">{{message}}</div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "NoData",
  props: {
    message: {
      type: String,
      default: "暂无数据"
    }
  }
};
</script>
<style lang="less" scoped>
.nodata {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 70%;
  }
  .message {
    position: absolute;
    bottom: 20px;
  }
}
</style>
