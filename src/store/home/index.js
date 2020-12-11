/**
 * 首页全局store
 * **/
export default {
  namespaced: true,
  state: {
    nav: 0,
    scrollStatus: true, //首页鼠标滚动是否开启状态
  },
  getters: {

  },
  mutations: {
    MSetNav(state, data) {
      state.nav = data;
    },
    MSetScrollStatus(state, data) {
      state.scrollStatus = data;
    }
  },
  actions: {
    ASetNav({
      state,
      rootState,
      commit
    }, param) {
      commit("MSetNav", param)
    }
  }
}
