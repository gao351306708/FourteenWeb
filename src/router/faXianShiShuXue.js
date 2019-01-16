import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入相应的子组件
import door from './../page/faXianShiShuXue/door'
import defaultPage from './../page/faXianShiShuXue/default'


const routes = [
  {
    path: '/',
    name: 'door',
    component: door
  },{
    path:'/manage',
    component:manage,//当route 有子route时，为了显示子路由的默认页面，则父路由不能有name属性
    children:[
      {
        path:'',
        name:'defaultPage',
        component:defaultPage,
        meta:[]
      }
    ]
  }
]
export default new Router({
  routes: routes,
  strict: process.env.NODE_ENV !== 'production'
})
