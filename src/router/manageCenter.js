import Vue from 'vue'
import Router from 'vue-router'
import {routes} from "./manager/index.js"

Vue.use(Router)

const router = new Router({
  routes: routes,
  strict: process.env.NODE_ENV !== 'production'
})

//路由跳转前
router.beforeEach((to, from, next) => {
  next(); 
});

//路由加载完成
router.afterEach((to, from) => {

});

export default router