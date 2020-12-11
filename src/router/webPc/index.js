// 导入相应的子组件,需要懒加载得使用懒加载方式，首页四个路由不需要懒加载，有滚动切换效果需要实时显示出来
import Amusement from '@/page/main/amusement/amusement.vue'
import AllMost from '@/page/main/allmost.vue'
import Blog from '@/page/main/blog/blogs.vue'
const Layout = () => import( /* webpackChunkName: "index" */ '@/components/Layout.vue')
const Home = () => import( /* webpackChunkName: "index" */ '@/page/main/home.vue')
const BlogList = () => import( /* webpackChunkName: "blog" */ '@/page/main/blog/blogsHome.vue')
const BlogDetails = () => import( /* webpackChunkName: "blog" */ '@/page/main/blog/blogsDetails.vue')
const Picture = () => import( /* webpackChunkName: "picture" */ '@/page/main/amusement/amusement_picture.vue')
const Photos = () => import( /* webpackChunkName: "picture" */ '@/page/main/amusement/amusement_photos.vue')
const SearchPicture = () => import( /* webpackChunkName: "picture" */ '@/page/main/amusement/amusement_picture_search.vue')
const Movie = () => import( /* webpackChunkName: "movie" */ '@/page/main/amusement/amusement_movie.vue')
const Video = () => import( /* webpackChunkName: "movie" */ '@/page/main/amusement/amusement_video.vue')
const AboutMe = () => import( /* webpackChunkName: "aboutMe" */ '@/page/main/about.vue')
const ContactMe = () => import( /* webpackChunkName: "movie" */ '@/page/main/contact.vue')
const Demo = () => import( /* webpackChunkName: "demo" */ '@/page/main/demo/uploadAndGetRandom.vue')


export const routes = [{
  path: '/',
  component: Layout,
  children: [{
    path: '',
    name: 'Home',
    component: Home,
    meta: {
      nav: true, //此值表示首页需要展示nav滚动页签切换
      keepAlive: true,
      rank: 1, //当前组件得层级等级
    }
  }, {
    path: 'Amusement',
    component: Amusement,
    name: 'Amusement',
    meta: {
      keepAlive: true,
      nav: true,
      rank: 1
    }
  }, {
    path: 'Amusement/Picture',
    name: 'Picture',
    component: Picture,
    meta: {
      keepAlive: true,
      rank: 2
    },
    children: [{
      path: 'photos/:id',
      name: 'photos',
      component: Photos,
      meta: {
        keepAlive: true,
        rank: 4
      }
    }]
  }, {
    path: 'Amusement/Search',
    name: 'searchPicture',
    component: SearchPicture,
    meta: {
      keepAlive: true,
      rank: 3
    },
    children: [{
      path: 'photos/:id',
      name: 'photos',
      component: Photos,
      meta: {
        keepAlive: true,
        rank: 4
      }
    }]
  }, {
    path: 'Amusement/Movie',
    name: 'Movie',
    component: Movie,
    meta: {
      rank: 2
    }
  }, {
    path: 'Amusement/video',
    name: 'Video',
    component: Video,
    meta: {
      rank: 3
    }
  }, {
    path: 'AllMost',
    name: 'AllMost',
    component: AllMost,
    meta: {
      keepAlive: true,
      nav: true,
      rank: 1
    }
  }, {
    path: 'Blog',
    component: Blog,
    name: 'Blog',
    meta: {
      keepAlive: true,
      nav: true,
      rank: 1
    }
  }, {
    path: 'Blog/List',
    name: 'BlogList',
    component: BlogList,
    meta: {
      rank: 2
    }
  }, {
    path: 'Blog/Detail',
    name: 'BlogDetails',
    component: BlogDetails,
    meta: {
      rank: 3
    }
  }]
}, {
  path: '/About',
  name: 'AboutMe',
  component: AboutMe,
  meta: {
    keepAlive: true,
    rank: 10
  }
}, {
  path: '/Contact',
  name: 'ContactMe',
  component: ContactMe,
  meta: {
    keepAlive: true,
    rank: 10
  }
}, {
  path: '/demo',
  name: 'Demo',
  component: Demo
}]
