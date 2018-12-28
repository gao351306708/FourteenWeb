/** The Vue build version to load with the `import` command
 * (runtime-only or standalone) has been set in webpack.base.conf with an alias.
**/
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'

Vue.prototype.fromFlag = false;//本地或者数据库标志,//true为真实数据，false为本地数据
Vue.config.debug = true
Vue.config.productionTip = false;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next : 下一步执行的函数钩子
  if(to.path === '/') {
    next(); // 如果即将进入登录路由，则直接放行
  } else {   //进入的不是登录路由
    console.warn("改变路由的时候--",to.meta,sessionStorage.getItem('accessToken'))
    if(!sessionStorage.getItem('accessToken')) {
      alert("请重新登录！")
      next({ path: '/' })
    } else { //下一跳路由需要登录验证，并且还未登录，则路由定向到 登录路由
      next()
    }}
});

new Vue({
  el: '#app',
  router:router,
  components: { App },
  template: '<App/>'
})
