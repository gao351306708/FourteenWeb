/**
 * 网络请求数据
 * Created by gaoju on 2018/8/14.
 */
import { baseUrl } from './env'
import {bodyUrlencoded} from './methods'

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
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
        'Content-Type': 'application/json'
      },
      mode: "cors",
    }

    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }
    console.log('请求的参数：：：',url,requestConfig)
    try {
      const response = await fetch(url, requestConfig);
      const responseJson = await response.json();
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {  // 如果浏览器不支持fetch
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
