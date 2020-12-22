import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  routes
} from "./manager/index.js"

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes,
  strict: process.env.NODE_ENV !== 'production'
})

//路由跳转前
router.beforeEach((to, from, next) => {
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next : 下一步执行的函数钩子
  if (to.path === '/' || to.path === '/register') {
    next();
  } else {
    if (!localStorage.getItem('token')) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
});

//路由加载完成
router.afterEach((to, from) => {

});

export default router
