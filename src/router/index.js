import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入相应的子组件
import Door from './../page/main/door'
import HomeTeacher from './../page/main/home_teacher.vue'
import HomeStudent from './../page/main/home_student.vue'


const routes = [
  {
    path: '/',
    name: 'door',
    component: Door
  },{
    path: '/homeTeacher',
    name: 'homeTeacher',
    component:HomeTeacher,
  },{
    path: '/homeStudent',
    name: 'homeStudent',
    component:HomeStudent,
  }
]
export default new Router({
  routes: routes,
  strict: process.env.NODE_ENV !== 'production'
})
