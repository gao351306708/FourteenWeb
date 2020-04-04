// 导入相应的子组件
import Door from '@/page/manageCenter/door'
import Home from '@/page/manageCenter/home.vue'
import defaultPage from '@/page/manageCenter/default'
import Blog from '@/page/manageCenter/blog.vue'
import userManage from '@/page/manageCenter/userManage.vue'
import StatisticsInterview from '@/page/manageCenter/statisticsInterview.vue'
import StatisticsModules from '@/page/manageCenter/statisticsModules.vue'


export const routes = [
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
        path: 'userManage',
        name: 'userManage',
        component: userManage,
        meta:['个人中心管理','个人信息']
      },{
        path: 'blog',
        name: 'blog',
        component: Blog,
        meta:['应用管理','博客管理']
      },{
        path: 'statistics/statisticsInterview',
        name: 'statisticsInterview',
        component: StatisticsInterview,
        meta:['统计管理','访问统计']
      },{
        path: 'statistics/statisticsModules',
        name: 'statisticsModules',
        component: StatisticsModules,
        meta:['统计管理','模块统计']
      }
    ]
  }
]