import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入相应的子组件
import door from './../page/faXianShiShuXue/door'
import manage from './../page/faXianShiShuXue/manage'
import HomePage from './../page/faXianShiShuXue/home'
import defaultPage from './../page/faXianShiShuXue/default'
import addClassManager from './../page/faXianShiShuXue/classManager'
import classManagerList from './../page/faXianShiShuXue/classManagerList'
import editorVue from './../page/faXianShiShuXue/editor'


const routes = [
  {
    path: '/',
    name: 'door',
    component: door
  },{
    path: '/home',
    name: 'home',
    component:HomePage,
  },{
    path:'/manage',
    component:manage,//当route 有子route时，为了显示子路由的默认页面，则父路由不能有name属性
    children:[
      {
        path:'',
        name:'defaultPage',
        component:defaultPage,
        meta:[]
      },{
        path:'addClassManager',
        name:'addClassManager',
        component:addClassManager,
        meta:['备课管理','添加备课']
      },{
        path:'classManagerList',
        name:'classManagerList',
        component:classManagerList,
        meta:['备课管理','课程列表']
      },{
        path:'editor',
        component:editorVue,
        meta:['编辑器']
      }
    ]
  }
]
export default new Router({
  routes: routes,
  strict: process.env.NODE_ENV !== 'production'
})
