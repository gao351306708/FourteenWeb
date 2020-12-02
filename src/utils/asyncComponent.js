/** 
 * 异步加载全局组件
 * import返回一个promise对象
 *
 * */
const getEditor = () => import( /* webpackChunkName: "vue-quill-editor" */ "vue-quill-editor");
const moment = () => import( /* webpackChunkName: "moment" */ "moment");

function useComponent(get) {
  get().then((module) => {
    if (module.default) {
      Vue.use(module.default)
    } else {
      Vue.use(module)
    }
  })
}


export default {
  useComponentEditor: useComponent(getEditor),
  useComponentMoment: useComponent(moment),
}
