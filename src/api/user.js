import fetch_requset from '../config/fetch'

const API_CONFIG = '/api/user';

/**
 * [wechatLogin 微信登录]
 * @return {[type]}  [description]
 */
export const wechatLogin = (data) => {
  const url = `${API_CONFIG}/wechat_login`;
  return fetch_requset(url, data, 'GET')
}
/**
 * [doLogin 登录]
 * @return {[type]}  [description]
 */
export const doLogin = (data) => {
  const url = `${API_CONFIG}/login`;
  return fetch_requset(url, data, 'POST')
}

export const writeFileJson = (data) => {
  const url = `${API_CONFIG}/writeFileJson`;
  return fetch_requset(url, data, 'GET')
}

//测试接口 获取本地的登录数据
export const doTestLogin = (url) => {
  return fetch_requset(url)
}
/**
 * [registerUser 注册]
 * @return {[type]}  [注册用户]
 */
export const registerUser = (data) => {
  const url = `${API_CONFIG}/registerUser`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [queryAllUser 查询所有用户]
 * @return {[type]}  [查询所有用户]
 */
export const queryAllUser = (data) => {
  const url = `${API_CONFIG}/getAllUser`;
  return fetch_requset(url, data, 'GET')
}
/**
 * [doLogin 添加用户]
 * @return {[type]}  [添加用户]
 */
export const addUser = (data) => {
  const url = `${API_CONFIG}/addUser`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [doLogin 删除用户]
 * @return {[type]}  [删除用户]
 */
export const deleteUser = (data) => {
  const url = `${API_CONFIG}/removeUser`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [doLogin 更新用户信息]
 * @return {[type]}  [更新用户]
 */
export const updateUser = (data) => {
  const url = `${API_CONFIG}/updateUser`;
  return fetch_requset(url, data, 'POST')
}
