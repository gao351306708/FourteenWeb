// 导入相应的子组件
import Door from '@/page/main/door.vue'
import Home from '@/page/main/home.vue'
import Amusement from '@/page/main/amusement/amusement.vue'
import AllMost from '@/page/main/allmost.vue'
import Blog from '@/page/main/blog/blogs.vue'
import BlogList from '@/page/main/blog/blogsHome.vue'
import BlogDetails from '@/page/main/blog/blogsDetails.vue'
import AboutMe from '@/page/main/about.vue'
import ContactMe from '@/page/main/contact.vue'
import Picture from '@/page/main/amusement/amusement_picture.vue'
import SearchPicture from '@/page/main/amusement/amusement_picture_search.vue'
import Movie from '@/page/main/amusement/amusement_movie.vue'
import Demo from '@/page/main/demo/uploadAndGetRandom.vue'


export const routes = [{
  path: '/',
  component: Door,
  children: [{
    path: '',
    name: 'Home',
    component: Home,
    meta: {
      nav: true, //此值表示首页需要展示nav滚动页签切换
    }
  }, {
    path: 'Amusement',
    component: Amusement,
    meta: {
      keepAlive: true,
      nav: true,
    }
  }, {
    path: 'Amusement/Picture',
    name: 'Picture',
    component: Picture
  }, {
    path: 'Amusement/Search',
    name: 'searchPicture',
    component: SearchPicture
  }, {
    path: 'Amusement/Movie',
    name: 'Movie',
    component: Movie
  }, {
    path: 'AllMost',
    name: 'AllMost',
    component: AllMost,
    meta: {
      keepAlive: true,
      nav: true,
    }
  }, {
    path: 'Blog',
    component: Blog,
    meta: {
      keepAlive: true,
      nav: true,
    }
  }, {
    path: 'Blog/List',
    name: 'BlogList',
    component: BlogList,
  }, {
    path: 'Blog/Detail',
    name: 'BlogDetails',
    component: BlogDetails
  }]
}, {
  path: '/About',
  name: 'AboutMe',
  component: AboutMe,
  meta: {
    keepAlive: true
  }
}, {
  path: '/Contact',
  name: 'ContactMe',
  component: ContactMe,
  meta: {
    keepAlive: true
  }
}, {
  path: '/demo',
  name: 'Demo',
  component: Demo
}]
