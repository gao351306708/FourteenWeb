/** The Vue build version to load with the `import` command
 * (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 **/
import App from './App'
import router from '@/router/index.js'
import global_ from '@/config/Global'
import "@/utils/CachedComponents.js"; //引入全局组件缓存控制
import "@/utils/component.js"; //引入全局组件
import "@/utils/directive.js"; //引入全局指令
import mixin from "@/js/mixins"; //全局混入
import store from "@/store/index";
import {
  Message
} from 'element-ui';

Vue.prototype.$message = Message;
Vue.prototype.GLOBAL = global_; //挂载全局变量
Vue.config.debug = true
Vue.config.productionTip = false;
store["$router"] = router; //将router绑定到store上
Vue.mixin(mixin);

new Vue({
  el: '#app',
  router: router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
