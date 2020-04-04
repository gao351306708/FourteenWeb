/**
 * 首页全局store
 * **/
export default {
    namespaced: true,
    state: {
       nav:0
    },
    getters: {

    },
    mutations: {
       MSetNav(state,data){
        state.nav = data;
       }
    },
    actions: {
        ASetNav({state,rootState,commit},param){
            commit("MSetNav",param)
        }
    }
}