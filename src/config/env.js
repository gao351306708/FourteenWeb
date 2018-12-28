/**
 * * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * Created by gaoju on 2018/10/29.
 */
let baseUrl = '';
let routerMode = 'hash';

if (process.env.NODE_ENV == 'development') {
  baseUrl = '';
}else{
  baseUrl = '';
  //baseUrl = window.location.host;
}

export {
  baseUrl,
  routerMode
}
