<template>
  <div class="sectionMain default">
    <h1>{{ message }}</h1>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      message: "欢迎使用管理员系统"
    };
  }
};
</script>
<style scoped lang="less" type="text/less">
.default {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
