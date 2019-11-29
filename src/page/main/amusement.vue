/**娱乐模块**/
<template>
  <router-view></router-view>
</template>

<script type="text/ecmascript-6">
  import {getAllPhotos} from '../../api/unsplash.js'
  export default {
    //data中放入初始默认值
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
</style>
