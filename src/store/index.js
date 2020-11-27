import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from "./home" //首页store
import amusement from "./amusement" //首页store
export default new Vuex.Store({
  modules: {
    home,
    amusement
  }
})
