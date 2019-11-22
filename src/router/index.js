import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入相应的子组件
import Door from './../page/main/door.vue'
import Home from './../page/main/home.vue'
import Amusement from './../page/main/amusement.vue'
import AllMost from './../page/main/allmost.vue'
import Blog from './../page/main/blogs.vue'
import BlogHome from './../page/main/blogs_home.vue'
import BlogList from './../page/main/blogs_list.vue'
import BlogDetails from './../page/main/blogs_details.vue'
import AboutMe from './../page/main/about.vue'
import ContactMe from './../page/main/contact.vue'
import AmusementHome from './../page/main/amusement_home.vue'
import Picture from './../page/main/amusement_picture.vue'
import SearchPicture from './../page/main/amusement_picture_search.vue'
import Movie from './../page/main/amusement_movie.vue'


const routes = [
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
      },{
        path: 'Blog',
        component: Blog,
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
    component: AboutMe
  },{
    path: '/Contact',
    name: 'ContactMe',
    component: ContactMe
  }
]
export default new Router({
  routes: routes,
  strict: process.env.NODE_ENV !== 'production'
})
