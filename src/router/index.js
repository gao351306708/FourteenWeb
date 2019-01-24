import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入相应的子组件
import Door from './../page/main/door.vue'
import Home from './../page/main/home.vue'
import Amusement from './../page/main/amusement.vue'
import AllMost from './../page/main/allmost.vue'
import Blog from './../page/main/blogs.vue'
import AboutMe from './../page/main/about.vue'
import ContactMe from './../page/main/contact.vue'


const routes = [
  {
    path: '/',
    component: Door,
    children:[
      {
        path: '',
        name: 'Home',
        component: Home,
      },{
        path: 'Amusement',
        name: 'Amusement',
        component: Amusement,
      },{
        path: 'AllMost',
        name: 'AllMost',
        component: AllMost,
      },{
        path: 'Blog',
        name: 'Blog',
        component: Blog,
      }
    ]
  },{
    path: '/About',
    name: 'AboutMe',
    component: AboutMe
  },{
    path: '/Contact',
    name: 'ContactMe',
    component: ContactMe
  }
]
export default new Router({
  routes: routes,
  strict: process.env.NODE_ENV !== 'production'
})
