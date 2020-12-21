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
// import { Notification } from 'element-ui';

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
