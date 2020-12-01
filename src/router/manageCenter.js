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
  next();
});

//路由加载完成
router.afterEach((to, from) => {

});

export default router
