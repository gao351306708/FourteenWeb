<template>
  <div class="closeIcon" @click.stop="exit()">
    <i class="el-icon-close" style="font-size: 36px"></i>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  methods: {
    exit() {
      this.$router.back();
    }
  }
};
</script>
