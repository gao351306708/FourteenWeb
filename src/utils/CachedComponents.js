/**
 *   创建管理缓存的对象,可删除组件的缓存。
 * **/
import Vue from 'vue';
function inArray(ele, array) {
    if(!array) return {include:false,index:-1};
    let i = array.indexOf(ele)
    let o = {
      include: i !== -1,
      index: i
    }
    return o
  }
  
  function isArray (array) {
    return Array.isArray(array)
  }
  
  const hasOwnProperty = Object.prototype.hasOwnProperty
  function hasOwn (key, obj) {
    return hasOwnProperty.call(obj, key)
  }
  // 创建管理缓存的对象
  class manageCachedComponents {
  
    constructor () {
      this.mc_keepAliveKeys = []//存放换粗组件的keys值
      this.mc_keepAliveCache = {}// 存放所有缓存组件 key-value 集合
      this.mc_cachedRootComponent = {},//存放缓存组件的所在keepAlive的根实例
      this.mc_cachedParentComponent = {}//存放缓存组件的所在keepAlive的实例
      this.mc_cachedCompnentsInfo = {}//存放所缓存的组件
      this.mc_removeCacheRule = {
        // 默认为 true，即代表会移除低于目标组件路由级别的所有缓存组件，
        // 否则如果当前组件路由级别低于目标组件路由级别，只会移除当前缓存组件
        removeAllLowLevelCacheComp: true,
        // 边界情况，默认是 true， 如果当前组件和目标组件路由级别一样，是否清除当前缓存组件
        removeSameLevelCacheComp: true
      }
    }
  
    /**
     * 添加缓存组件到缓存列表
     * @param {Object} Vnode 当前组件实例
     */
    mc_addCacheComponentToCacheList (Vnode) {
      // console.log('将要添加的缓存组件：',Vnode)
      const { mc_cachedCompnentsInfo } = this
      const { $vnode, $route, includes } = Vnode
      const { name, meta } = $route
      const { componentOptions, parent } = $vnode
      const componentName = componentOptions.Ctor.options.name
      const compName = `cache-com::${componentName}`
       // 当前组件是否需要缓存
    //   const { include } = inArray(componentName, includes)
      const include = meta.keepAlive;
      if (parent && include && !hasOwn(compName, mc_cachedCompnentsInfo)) {
        const { keys, cache } = parent.componentInstance;
        const { tag } = parent.componentOptions;
        const key = !$vnode.key
                    ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
                    : $vnode.key
        const routeLevel = $route.meta.rank
        //只有当前组件时缓存组件时才保存相关数据
        if(tag == 'keep-alive'){
          mc_cachedCompnentsInfo[compName] = {
            // 组件名称
            componentName,
            // 缓存组件的 key
            key,
            // 组件路由级别
            routeLevel
          }
          // 所有缓存组件 key 的列表
          this.mc_keepAliveKeys = keys
          // 所有缓存组件 key-value 集合
          this.mc_keepAliveCache = cache
          // 所有缓存组件的父实例
          this.mc_cachedParentComponent = parent;
          
          console.log("所有缓存组件的父实例::::",this.mc_cachedParentComponent)
          console.log("所有缓存组件 key 的列表::::",this.mc_keepAliveKeys)
          console.log("所有缓存组件 key-value 集合::::",this.mc_keepAliveCache)
        }
      }
    }
  
    // 移除缓存 key
    mc_removeCacheKey (key, keys) {
      const { include, index } = inArray(key, keys)
      if (include) {
        return keys.splice(index, 1)
      }
    }
  
    /**
     * 从 keep-alive 实例的 cache 移除缓存组件并移除缓存 key
     * @param {String} key 缓存组件的 key
     * @param {String} componentName 要清除的缓存组件名称
     */
    mc_removeCachedComponent (key, componentName) {
      const { mc_keepAliveKeys, mc_cachedParentComponent, mc_cachedCompnentsInfo } = this
      const { componentInstance } = mc_cachedParentComponent
      console.log("需要删除得组件：",componentInstance,mc_cachedCompnentsInfo)
      // 缓存组件 keep-alive 的 cache 和  keys
      const cacheList = componentInstance.cache
      const keysList = componentInstance.keys
      const { include } = inArray(key, keysList)
      if (include && cacheList[key]) {
        this.mc_removeCacheKey(key, keysList)
        this.mc_removeCacheKey(key, mc_keepAliveKeys)
        cacheList[key].componentInstance.$destroy();//删除组件
        delete cacheList[key]
        delete mc_cachedCompnentsInfo[componentName]
      }
    }
  
    /**
     * 根据组件名称移除指定的组件
     * @param {String|Array} componentName 要移除的组件名称或者名称列表
     */
    mc_removeCachedByComponentName (componentName) {
      if (!isArray(componentName) && typeof componentName !== 'string') {
        throw new TypeError(`移除的组件可以是 array 或者 string，当前类型为: ${typeof componentName}`)
      }
      const { mc_cachedCompnentsInfo } = this
      if (isArray(componentName)) {
        const unKnowComponents = []
        for (const name of componentName) {
          const compName = `cache-com::${name}`
          if (hasOwn(compName, mc_cachedCompnentsInfo)) {
            const { key } = mc_cachedCompnentsInfo[compName]
            this.mc_removeCachedComponent(key, compName)
          } else {
            unKnowComponents.push(name)
          }
        }
        // 提示存在非缓存组件
        if (unKnowComponents.length) {
          let tips = unKnowComponents.join(` && `)
          console.warn(`${tips} 组件非缓存组件，请在移除缓存列表中删除以上组件名`)
        }
        return
      }
  
      const compName = `cache-com::${componentName}`
      if (hasOwn(compName, mc_cachedCompnentsInfo)) {
        const { key } = mc_cachedCompnentsInfo[compName]
        this.mc_removeCachedComponent(key, compName)
      } else {
        console.warn(`${componentName} 组件非缓存组件，请添加正确的缓存组件名`)
      }
    }
  
    /**
     * 移除路由级别的缓存组件
     * @param {Object} toRoute 跳转路由记录
     * @param {Object} Vnode 当前组件实例
     */
    mc_removeCachedByComponentLevel (toRoute, Vnode) {
      const { rank } = toRoute.meta
      const toCompName = toRoute.name
      const { meta: Vmeta} = Vnode.$route
      const { mc_cachedCompnentsInfo, mc_removeCacheRule,mc_cachedRootComponent } = this
      console.log("removeCacheInfo--:::",mc_cachedCompnentsInfo)
      console.log("mc_cachedRootComponent--:::",mc_cachedRootComponent)
      const componentName = Vnode.$vnode.componentOptions.Ctor.options.name;//当前组件名
      // exp-1-目标组件非缓存组件，不做处理，但可以根据业务逻辑结合 removeCachedByComponentName 函数来处理
      // exp-2-目标组件是缓存组件，但是未添加 rank，会默认你一直缓存，不做处理
      // exp-3-当前组件非缓存组件，目标组件为缓存组件，不做处理，参考 exp-1 的做法
      // 以下逻辑只确保低级向高低跳转时删除低级所有缓存组件  mc_cachedCompnentsInfo['cache-com::' + toCompName]
      //当组件在五个主页面切换时不做处理，即都是一级一面之间的跳转
      if (
          rank &&
          toCompName &&
          mc_cachedCompnentsInfo['cache-com::' + componentName] &&
          (rank!=1 || (Vmeta.rank && Vmeta.rank!=1))
        ) {
        const { removeAllLowLevelCacheComp, removeSameLevelCacheComp } = mc_removeCacheRule
        if (removeAllLowLevelCacheComp) {//是否删除所有低级缓存组件
          const cachedCompList = []
          // 查找所有不小于当前组件路由级别的缓存组件，即代表要销毁的组件
          for (const cacheItem in mc_cachedCompnentsInfo) {
            const cacheItemInfo = mc_cachedCompnentsInfo[cacheItem];
            if (
                // 排除目标缓存组件，不希望目标组件也被删除
                // 虽然会在 activated 钩子函数里面重新添加到缓存列表
                cacheItemInfo.componentName !== toCompName &&
                Number(cacheItemInfo.routeLevel) > rank &&
                // 边界处理
                removeSameLevelCacheComp
              ) {
                cachedCompList.push(cacheItemInfo)
            }
          }
  
          if (cachedCompList.length) {
            cachedCompList.forEach(cacheItem => {
              const { key, componentName } = cacheItem
              const compName = 'cache-com::' + componentName
              this.mc_removeCachedComponent(key, compName)
            })
          }
          return
        }
        // 只移除当前缓存组件
        const { routeLevel } = mc_cachedCompnentsInfo['cache-com::' + componentName]
        if (Number(routeLevel) >= rank && removeSameLevelCacheComp) {
          this.mc_removeCachedByComponentName(componentName)
        }
      }
    }
  }
  // 你可以把它挂载到 vue 原型上
  Vue.prototype.$mcc = new manageCachedComponents()