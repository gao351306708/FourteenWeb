/**
 * 网络请求数据
 * Created by gaoju on 2018/8/14.
 */
import {
  baseUrl
} from './env'
import {
  bodyUrlencoded
} from './methods'
import Store from "../store/index.js"
import VueRouter1 from '@/router/index.js'
import VueRouter2 from '@/router/manageCenter.js'
const {
  $notify: Notification
} = Vue.prototype
const isManage = window.location.pathname == '/manage.html' ? true : false
const Router = isManage ? VueRouter2 : VueRouter1;

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;
  const dataStr = bodyUrlencoded(data);
  if (type == 'GET') {
    url = url + '?' + dataStr;
  }
  //浏览器支持fetch就用fetch
  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': localStorage.getItem('token')
      },
      mode: "cors",
    }
    //后台管理服务端添加token校验
    if (isManage) {
      requestConfig['headers'].needtokencheck = true
    }
    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }
    console.log('请求的参数：：：', url, requestConfig)
    try {
      return new Promise((resolve, reject) => {
        fetch(url, requestConfig).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
          if (response.status === 403) {
            Notification.error({
              title: 'token 失效',
              message: error,
              onClick: () => {
                Notification.closeAll()
                Store.dispatch("manage/AclearUserInfo");
                Router.push({
                  path: '/'
                })
              }
            })
            return
          }
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }).then((res) => {
          console.log("res->", res)
          resolve(res)
        }).catch((error) => {
          console.error("接口返回报错：", error)
          Notification.error({
            title: '请求接口返回报错：',
            message: error
          });
          reject(error)
        });
      })
    } catch (error) {
      console.error("请求报错：", error)
      Notification.error({
        title: '请求出错报错',
        message: error
      });
      throw new Error(error)
    }
  } else { // 如果浏览器不支持fetch
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = '';
      if (type == 'POST') {
        sendData = JSON.stringify(data);
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
