/** The Vue build version to load with the `import` command
 * (runtime-only or standalone) has been set in webpack.base.conf with an alias.
**/
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import global_ from './config/Global'
import "./utils/component.js"; //引入全局组件
import "./utils/directive.js"; //引入全局指令

Vue.prototype.GLOBAL = global_;//挂载全局变量
Vue.config.debug = true
Vue.config.productionTip = false;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next : 下一步执行的函数钩子
  if(to.path === '/') {
    next(); // 如果即将进入登录路由，则直接放行
  } else {   //进入的不是登录路由
    next();
  }
});

new Vue({
  el: '#app',
  router:router,
  components: { App },
  template: '<App/>'
})
