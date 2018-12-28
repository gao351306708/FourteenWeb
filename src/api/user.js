import fetch_requset from '../config/fetch'

const API_CONFIG = '/api/user';

/**
 * [doLogin 登录]
 * @return {[type]}  [description]
 */
export const doLogin = (data) => {
  const url = `${API_CONFIG}/login`;
  return fetch_requset(url,data,'POST')
}

export const writeFileJson = (data) => {
  const url = `${API_CONFIG}/writeFileJson`;
  return fetch_requset(url,data,'GET')
}

//测试接口 获取本地的登录数据
export const doTestLogin = (url) => {
  return fetch_requset(url)
}
export const registerUser = (data)=>{
  const url = `${API_CONFIG}/registerUser`;
  return fetch_requset(url,data,'POST')
}
/**
 * [添加新增备课列表信息]
 */
export const addClassListInfo = (data) => {
  const url = `${API_CONFIG}/addClassListInfo`;
  return fetch_requset(url,data,'POST')
}
