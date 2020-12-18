/**
 * 站点静态数据结构
 * **/


const websitList = [{
  id: 2,
  name: "常用网站",
  items: [{
    id: 11,
    title: "百度",
    logo: "https://www.baidu.com//favicon.ico",
    introduce: "百度一下，你就知道",
    url: "https://www.baidu.com/"
  }, {
    id: 21,
    title: "谷歌学术",
    logo: "https://ac.scmor.com/res/favicon.ico",
    introduce: "Google学术,谷歌学术,谷歌镜像,学术搜索,学术导航,谷歌导航",
    url: "https://ac.scmor.com/"
  }, {
    id: 22,
    title: "Google 翻译",
    logo: "http://ssl.gstatic.com/translate/favicon.ico",
    introduce: "Google 翻译",
    url: "https://translate.google.cn/"
  }, {
    id: 23,
    title: "有道翻译",
    logo: "https://shared.ydstatic.com/images/favicon.ico",
    introduce: "网易有道是中国领先的智能学习公司，致力于提供100%以用户为导向的学习产品和服务。",
    url: "http://youdao.com/"
  }, {
    id: 24,
    title: "在线PS",
    logo: "https://ps.gaoding.com/favicon.ico",
    introduce: "稿定设计PS是一款专业精简的在线ps图片处理软件，免下载、免安装，直接在浏览器打开网页版就可随时随地用它修正，调整和美化您的图片。",
    url: "https://ps.gaoding.com/"
  }, {
    id: 25,
    title: "鸠摩搜索",
    logo: "https://www.jiumodiary.com/images/favicon.png",
    introduce: "鸠摩搜索引擎",
    url: "https://www.jiumodiary.com/"
  }]
}, {
  id: 3,
  name: "视频网站",
  items: [{
    id: 31,
    title: "腾讯视频",
    logo: "http://v.qq.com/favicon.ico",
    introduce: "腾讯视频致力于打造中国领先的在线视频媒体平台，以丰富的内容、极致的观看体验、便捷的登录方式、24小时多平台无缝应用体验以及快捷分享的产品特性，主要满足用户在线观看视频的需求。",
    url: "http://v.qq.com"
  }, {
    id: 32,
    title: "优酷",
    logo: "https://img.alicdn.com/tfs/TB1WeJ9Xrj1gK0jSZFuXXcrHpXa-195-195.png",
    introduce: "视频服务平台,提供视频播放,视频发布,视频搜索,视频分享",
    url: "https://www.youku.com/"
  }, {
    id: 33,
    title: "哔哩哔哩",
    logo: "https://www.bilibili.com/favicon.ico",
    introduce: "bilibili是国内知名的视频弹幕网站，这里有最及时的动漫新番，最棒的ACG氛围，最有创意的Up主。大家可以在这里找到许多欢乐。",
    url: "https://www.bilibili.com/"
  }, {
    id: 34,
    title: "人人影视",
    logo: "https://www.renren163.com/templets/renren163ys/images/img/favicon.ico",
    introduce: "人人影视为您提供海量最新的影视剧,及时更新影视资源和影视信息,提供最好看的美剧剧集百度云在线播放和迅雷下载,是美剧爱好者的第一选择,人人影视就是你的美剧天堂！",
    url: "https://www.renren163.com/"
  }, {
    id: 35,
    title: "AcFun",
    logo: "http://cdn.aixifan.com/ico/favicon.ico",
    introduce: "AcFun是一家弹幕视频网站，致力于为每一个人带来欢乐。",
    url: "https://www.acfun.cn/"
  }, {
    id: 36,
    title: "电影天堂",
    logo: "https://www.dytt8.net/favicon.ico",
    introduce: "最好的迅雷电影下载网，分享最新电影，高清电影、综艺、动漫、电视剧等下载！",
    url: "https://www.dytt8.net/index.htm"
  }]
}, {
  id: 4,
  name: "学习网站",
  items: [{
    id: 41,
    title: "Vue",
    logo: "https://cn.vuejs.org/images/logo.png",
    introduce: "Vue.js - 一个用于构建用户界面的 JavaScript 库",
    url: "https://cn.vuejs.org/"
  }, {
    id: 42,
    title: "React",
    logo: "https://react.html.cn/favicon.ico",
    introduce: "一个用于构建用户界面的 JavaScript 库",
    url: "https://react.html.cn/"
  }, {
    id: 43,
    title: "React Native",
    logo: "https://reactnative.dev/img/logo-og.png",
    introduce: "React Native · A framework for building native apps using React",
    url: "https://reactnative.dev/"
  }, {
    id: 44,
    title: "AngularJS中文网",
    logo: "https://www.angularjs.net.cn/Application/Home/View/Public/img/favicon.ico",
    introduce: "AngularJS诞生于2009年，是一款优秀的前端JS框架，已经被用于Google的多款产品当中。AngularJS有着诸多特性，最为核心的是：MVVM、模块化、自动化双向数据绑定、语义化标签、依赖注入等等。",
    url: "https://www.angularjs.net.cn/"
  }, {
    id: 45,
    title: "flutter",
    logo: "https://cdn.jsdelivr.net/gh/flutterchina/website@1.0/images/favicon.png",
    introduce: "Flutter是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。 ",
    url: "https://flutterchina.club/widgets/"
  }, {
    id: 46,
    title: "TypeScript入门教程",
    logo: "https://ts.xcatliu.com/favicon.png",
    introduce: "从 JavaScript 程序员的角度总结思考，循序渐进的理解 TypeScript。",
    url: "https://ts.xcatliu.com/"
  }, {
    id: 47,
    title: "Node.js 中文网",
    logo: "http://nodejs.cn/_static/img/favicon.png",
    introduce: "Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。Node.js 的包管理器 npm，是全球最大的开源库生态系统。",
    url: "http://nodejs.cn/"
  }, {
    id: 48,
    title: "Vant",
    logo: "https://img.yzcdn.cn/vant/logo.png",
    introduce: "轻量、可靠的移动端 Vue 组件库",
    url: "https://youzan.github.io/vant/#/zh-CN/"
  }, {
    id: 49,
    title: "Ant Design",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png",
    introduce: "Ant Design - 一套企业级 UI 设计语言和 React 组件库",
    url: "https://ant.design/index-cn"
  }]
}, {
  id: 5,
  name: "在线直播",
  items: [{
    id: 51,
    title: "斗鱼直播",
    logo: "https://www.douyu.com/favicon.ico",
    introduce: "斗鱼-每个人的直播平台提供高清、快捷、流畅的视频直播和游戏赛事直播服务。",
    url: "https://www.douyu.com/directory/all"
  }, {
    id: 52,
    title: "虎牙直播",
    logo: "https://www.huya.com/favicon.ico",
    introduce: "虎牙直播为您提供高清、流畅的视频直播和各种游戏赛事的直播平台。",
    url: "https://www.huya.com/l"
  }, {
    id: 53,
    title: "CCTV直播",
    logo: "https://tv.cctv.com/favicon.ico",
    introduce: "CCTV-1综合频道直播页提供CCTV-1综合频道24小时高清直播信号，是网民全天候收看CCTV-1的最佳平台。",
    url: "https://tv.cctv.com/live/cctv1/"
  }, {
    id: 54,
    title: "爱看TV",
    logo: "http://www.aikantv.org/favicon.ico",
    introduce: "爱看TV提供网络电视直播,湖南卫视,浙江卫视,东方卫视,北京卫视,河南卫视,江苏卫视,上海第一财经,体育频道,电视节目表,免费视频直播,地方电视台直播在线回放。",
    url: "http://www.aikantv.org/"
  }]
}, {
  id: 6,
  name: "常用工具",
  items: [{
    id: 61,
    title: "超级PDF",
    logo: "https://xpdf.net/favicon.ico",
    introduce: "超级PDF - 免费的PDF处理神器,本网站专业为您提供pdf转word,word转pdf,图片转pdf,pdf转换器,pdf转图片的相关信息 ",
    url: "https://xpdf.net/"
  }, {
    id: 62,
    title: "Logo 生成器",
    logo: "https://www.logoly.pro/favicon.ico",
    introduce: "Logoly.Pro —— A creative Logo Generator",
    url: "https://www.logoly.pro/"
  }, {
    id: 63,
    title: "消除图片中的背景",
    logo: "https://www.remove.bg/favicon-32x32.png?v=YAXaAv7pao",
    introduce: "消除图片背景：100% 自动 – 只需 5 秒 – 无需点击 – 免费。",
    url: "https://www.remove.bg/zh"
  }]
}]

export default {
  websitList
}
