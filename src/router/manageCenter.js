import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入相应的子组件
import Door from '../page/manageCenter/door'
import Home from '../page/manageCenter/home.vue'
import defaultPage from './../page/manageCenter/default'
import CenterManage from '../page/manageCenter/CenterManage.vue'


const routes = [
  {
    path: '/',
    name: 'door',
    component: Door
  },{
    path: '/home',
    component: Home,
    children:[
      {
        path:'',
        name:'defaultPage',
        component:defaultPage,
      },{
        path: 'centerManage',
        name: 'centerManage',
        component: CenterManage,
        meta:['中心用户管理']
      }
    ]
  }
]
export default new Router({
  routes: routes,
  strict: process.env.NODE_ENV !== 'production'
})
