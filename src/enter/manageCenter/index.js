/** The Vue build version to load with the `import` command
 * 管理中心
 * **/

import Vue from 'vue'
import App from './App'
import router from '@/router/manageCenter'
import "@/assets/pub.less"
import "@/assets/common.less"

Vue.config.debug = true
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router: router,
  components: {
    App
  },
  template: '<App/>'
})
