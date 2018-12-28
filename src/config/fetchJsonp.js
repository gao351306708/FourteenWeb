/**
 * 网络请求数据,jsonp格式请求。目前只有GET
 * Created by gaoju on 2018/8/14.
 */
import { baseUrl } from './env'
import fetchJsonp from 'fetch-jsonp'

export default async(url = '', data = {}) => {

  url = baseUrl + url;
  let dataStr = ''; //数据拼接字符串
  Object.keys(data).forEach(key => {
    dataStr += key + '=' + data[key] + '&';
  });
  if (dataStr !== '') {
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    url = url + '?' + dataStr;
  }
  let requestConfig = {
    credentials: 'include',
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: "cors",
    cache: "force-cache"
  }
  try {
    const response = await fetchJsonp(url,requestConfig);
    const responseJson = await response.json();
    return responseJson
  } catch (error) {
    throw new Error(error)
  }
}
