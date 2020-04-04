// 导入相应的子组件
import Door from '@/page/main/door.vue'
import Home from '@/page/main/home.vue'
import Amusement from '@/page/main/amusement.vue'
import AllMost from '@/page/main/allmost.vue'
import Blog from '@/page/main/blogs.vue'
import BlogHome from '@/page/main/blogs_home.vue'
import BlogList from '@/page/main/blogs_list.vue'
import BlogDetails from '@/page/main/blogs_details.vue'
import AboutMe from '@/page/main/about.vue'
import ContactMe from '@/page/main/contact.vue'
import AmusementHome from '@/page/main/amusement_home.vue'
import Picture from '@/page/main/amusement_picture.vue'
import SearchPicture from '@/page/main/amusement_picture_search.vue'
import Movie from '@/page/main/amusement_movie.vue'
import Demo from '@/page/main/demo/uploadAndGetRandom.vue'


export const routes = [
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
        component: Amusement,
        meta:{
          keepAlive:true
        },
        children:[
          {
            path: '',
            name: 'Amusement',
            component: AmusementHome
          },{
            path: 'Picture',
            name: 'Picture',
            component: Picture
          },{
            path: 'Search',
            name: 'searchPicture',
            component: SearchPicture
          },{
            path: 'Movie',
            name: 'Movie',
            component: Movie
          }
        ]
      },{
        path: 'AllMost',
        name: 'AllMost',
        component: AllMost,
        meta:{
          keepAlive:true
        },
      },{
        path: 'Blog',
        component: Blog,
        meta:{
          keepAlive:true
        },
        children:[
          {
            path: '',
            name: 'Blog',
            component: BlogHome
          },{
            path: 'List',
            name: 'BlogList',
            component: BlogList,
          },{
            path: 'Detail',
            name: 'BlogDetails',
            component: BlogDetails
          }
        ]
      }
    ]
  },{
    path: '/About',
    name: 'AboutMe',
    component: AboutMe,
    meta:{
      keepAlive:true
    }
  },{
    path: '/Contact',
    name: 'ContactMe',
    component: ContactMe,
    meta:{
      keepAlive:true
    }
  },{
    path: '/demo',
    name: 'Demo',
    component: Demo
  }
]