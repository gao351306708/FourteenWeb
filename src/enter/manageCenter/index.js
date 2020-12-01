/** The Vue build version to load with the `import` command
 * 管理中心
 * **/

import Vue from 'vue'
import App from './App'
import router from '@/router/manageCenter'
import ElementUI from 'element-ui'
import '../../../node_modules/element-ui/lib/theme-chalk/index.css'
import "@/assets/pub.less"
import "@/assets/common.less"

Vue.config.debug = true
Vue.config.productionTip = false;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next : 下一步执行的函数钩子
  if (to.path === '/') {
    next();
  } else {
    if (!sessionStorage.getItem('accessToken')) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
});

new Vue({
  el: '#app',
  router: router,
  components: {
    App
  },
  template: '<App/>'
})
