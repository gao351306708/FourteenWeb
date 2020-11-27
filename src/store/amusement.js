/**
 * 首页全局store
 * **/
import $route from "@/router"
export default {
  namespaced: true,
  state: {
    photosList: [], //当前照片的集合
    currentNum: 0, //当前查看的哪一张
  },
  getters: {

  },
  mutations: {
    MSetPhotosList(state, data) {
      state.photosList = data;
    },
    MSetCurrentNum(state, data) {
      state.currentNum = data;
    }
  },
  actions: {
    AChangeCurrentPhoto({
      commit,
      state
    }, id) {
      if (this.$router.currentRoute.name == "photos") {
        let rou = this.$router.currentRoute.path.split("/");
        rou.pop();
        let newrouter = rou.join("/") + "/" + id;
        this.$router.replace({
          path: newrouter
        });
      } else {
        this.$router.push({
          path: `${this.$router.currentRoute.path}/photos/${id}`
        });
      }
    }
  }
}
