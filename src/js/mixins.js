/**
 * 全局混入，可在此处写公用属性或者方法，在组件中混入使用
 * **/
export default {
  data() {
    return {}
  },
  activated() {
    this.$mcc.mc_addCacheComponentToCacheList(this); //加入组件缓存控制
  },
  deactivated() {},
  beforeRouteLeave: function (to, from, next) {
    this.$mcc.mc_removeCachedByComponentLevel(to, this); //是否删除缓存逻辑处理
    next();
  },
}
