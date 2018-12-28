/** The Vue build version to load with the `import` command
 * 管理中心
 * **/

import Vue from 'vue'
import App from './App'
import router from '../../router/manageCenter'
import ElementUI from 'element-ui'
import '../../../node_modules/element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'

Vue.config.debug = true
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueQuillEditor);

router.beforeEach((to, from, next) => {
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next : 下一步执行的函数钩子
  if(to.path === '/') {
    next();
  } else {
    if(!sessionStorage.getItem('accessToken')) {
      alert("请重新登录！")
      next({ path: '/' })
    } else {
      next()
    }}
});

new Vue({
  el: '#app',
  router:router,
  components: { App },
  template: '<App/>'
})
