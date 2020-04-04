/** The Vue build version to load with the `import` command
 * (runtime-only or standalone) has been set in webpack.base.conf with an alias.
**/
import Vue from 'vue'
import App from './App'
import router from '../../router/index.js'
import ElementUI from 'element-ui'
import '@modules/element-ui/lib/theme-chalk/index.css'
import global_ from '@/config/Global'
import "@/utils/component.js"; //引入全局组件
import "@/utils/directive.js"; //引入全局指令
import store from "@/store/index";

Vue.prototype.GLOBAL = global_;//挂载全局变量
Vue.config.debug = true
Vue.config.productionTip = false;
Vue.use(ElementUI);
store["$router"] = router;//将router绑定到store上

new Vue({
  el: '#app',
  router:router,
  store,
  components: { App },
  template: '<App/>'
})
