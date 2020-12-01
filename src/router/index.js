import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  routes
} from "./webPc/index.js"
const Page404 = () => import( /* webpackChunkName: "404" */ '@/components/Page404.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    // savedPosition 会在使用浏览器前进或后退按钮时候生效
    if (savedPosition) {
      return savedPosition; //对当前项目无效。此值只对body滚动有效
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  },
  strict: process.env.NODE_ENV !== 'production',
  routes: [
    ...routes,
    {
      path: "*",
      name: "404",
      component: Page404
    }
  ]
})

//路由跳转前
router.beforeEach((to, from, next) => {
  next();
});

//路由加载完成
router.afterEach((to, from) => {

});
export default router
