// 导入相应的子组件

const Door = () => import( /* webpackChunkName: "index" */ '@/page/manageCenter/door')
const Home = () => import( /* webpackChunkName: "index" */ '@/page/manageCenter/home.vue')
const defaultPage = () => import( /* webpackChunkName: "index" */ '@/page/manageCenter/default')
const Blog = () => import( /* webpackChunkName: "blog" */ '@/page/manageCenter/blog.vue')
const BlogTypeModule = () => import( /* webpackChunkName: "blog" */ '@/page/manageCenter/blogTypeModule.vue')
const WebsitType = () => import( /* webpackChunkName: "websit" */ '@/page/manageCenter/websitType.vue')
const WebsitList = () => import( /* webpackChunkName: "websit" */ '@/page/manageCenter/websitList.vue')
const userManage = () => import( /* webpackChunkName: "userManage" */ '@/page/manageCenter/userManage.vue')
const StatisticsInterview = () => import( /* webpackChunkName: "statistics" */ '@/page/manageCenter/statisticsInterview.vue')
const StatisticsModules = () => import( /* webpackChunkName: "statistics" */ '@/page/manageCenter/statisticsModules.vue')


export const routes = [{
  path: '/',
  name: 'door',
  component: Door
}, {
  path: '/home',
  component: Home,
  children: [{
    path: '',
    name: 'defaultPage',
    component: defaultPage,
  }, {
    path: 'userManage',
    name: 'userManage',
    component: userManage,
    meta: ['个人中心管理', '个人信息']
  }, {
    path: 'blog',
    name: 'blog',
    component: Blog,
    meta: ['应用管理', '博客管理']
  }, {
    path: 'blogTypeModule',
    name: 'blogTypeModule',
    component: BlogTypeModule,
    meta: ['应用管理', '博客管理', '类型']
  }, {
    path: 'websitType',
    name: 'websitType',
    component: WebsitType,
    meta: ['应用管理', '网点管理', '类型']
  }, {
    path: 'websitList',
    name: 'websitList',
    component: WebsitList,
    meta: ['应用管理', '网点管理', '网点']
  }, {
    path: 'statistics/statisticsInterview',
    name: 'statisticsInterview',
    component: StatisticsInterview,
    meta: ['统计管理', '访问统计']
  }, {
    path: 'statistics/statisticsModules',
    name: 'statisticsModules',
    component: StatisticsModules,
    meta: ['统计管理', '模块统计']
  }]
}]
