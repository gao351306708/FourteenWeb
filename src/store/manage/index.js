/**
 * 后台管理全局store
 * **/
import {
  clearStore,
} from "@/utils/publicMethod";
export default {
  namespaced: true,
  state: {
    userinfo: null,
    token: null
  },
  getters: {

  },
  mutations: {
    MSetToken(state, data) {
      state.token = data;
    },
  },
  actions: {
    AclearUserInfo({
      state,
      rootState,
      commit
    }, param) {
      clearStore()
    },
  }
}
