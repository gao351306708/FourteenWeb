/** The Vue build version to load with the `import` command
 * (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 **/
import App from './App'
import router from '@/router/index.js'
import global_ from '@/config/Global'
import "@/utils/component.js"; //引入全局组件
import "@/utils/directive.js"; //引入全局指令
// import "@/utils/element.js"; //按需引入element ui
import store from "@/store/index";

Vue.prototype.GLOBAL = global_; //挂载全局变量
Vue.config.debug = true
Vue.config.productionTip = false;
store["$router"] = router; //将router绑定到store上

new Vue({
  el: '#app',
  router: router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
