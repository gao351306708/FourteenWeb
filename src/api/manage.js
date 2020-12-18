import fetch_requset from '../config/fetch'

const API_CONFIG = '/api/manage';

/**
 * [获取网站去访问记录]
 */
export const getInterview = () => {
  const url = `${API_CONFIG}/interviewQuery`;
  return fetch_requset(url, {}, 'GET')
}
/**
 * [获取网站去访问记录]
 */
export const updateInterview = (data) => {
  const url = `${API_CONFIG}/updateInterview`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [新增文章]
 */
export const addBlog = (data) => {
  const url = `${API_CONFIG}/addBlog`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [删除文章]
 */
export const deleteBlog = (data) => {
  const url = `${API_CONFIG}/deleteBlog`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [修改文章]
 */
export const updateBlog = (data) => {
  const url = `${API_CONFIG}/updateBlog`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [查询文章列表]
 */
export const queryBlogList = (data) => {
  const url = `${API_CONFIG}/queryBlogList`;
  return fetch_requset(url, data, 'GET')
}
/**
 * [查询文章详细请]
 */
export const queryBlogDetail = (data) => {
  const url = `${API_CONFIG}/queryBlogDetail`;
  return fetch_requset(url, data, 'GET')
}
/**
 * [新增文章类型]
 */
export const addBlogType = (data) => {
  const url = `${API_CONFIG}/addBlogType`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [删除文章类型]
 */
export const deleteBlogType = (data) => {
  const url = `${API_CONFIG}/deleteBlogType`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [修改文章类型]
 */
export const updateBlogType = (data) => {
  const url = `${API_CONFIG}/updateBlogType`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [查询文章类型列表]
 */
export const queryBlogTypeList = (data) => {
  const url = `${API_CONFIG}/queryBlogTypeList`;
  return fetch_requset(url, data, 'GET')
}
/**
 * [查询最受欢迎的文章列表]
 */
export const queryPopularBlogList = (data) => {
  const url = `${API_CONFIG}/queryPopularBlogList`;
  return fetch_requset(url, data, 'GET')
}

/**
 * [查询网站菜单以及所有对应的网点]
 */
export const queryAllMenuWithWebsitList = (data) => {
  const url = `${API_CONFIG}/getAllMenuWithWebsit`;
  return fetch_requset(url, data, 'GET')
}
/**
 * [查询网站菜单]
 */
export const queryAllMenuList = (data) => {
  const url = `${API_CONFIG}/queryWebsitMenu`;
  return fetch_requset(url, data, 'GET')
}
/**
 * [查询网点]
 */
export const queryAllWebsitList = (data) => {
  const url = `${API_CONFIG}/queryWebsit`;
  return fetch_requset(url, data, 'GET')
}
/**
 * [添加菜单项目]
 */
export const addWebsitMenu = (data) => {
  const url = `${API_CONFIG}/addWebsitMenu`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [删除菜单项目]
 */
export const removeWebsitMenu = (data) => {
  const url = `${API_CONFIG}/removeWebsitMenu`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [更新菜单项目]
 */
export const updateWebsitMenu = (data) => {
  const url = `${API_CONFIG}/updateWebsitMenu`;
  return fetch_requset(url, data, 'POST')
}

/**
 * [添加网点]
 */
export const addWebsit = (data) => {
  const url = `${API_CONFIG}/addWebsit`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [删除网点]
 */
export const removeWebsit = (data) => {
  const url = `${API_CONFIG}/removeWebsit`;
  return fetch_requset(url, data, 'POST')
}
/**
 * [更新网点]
 */
export const updateWebsit = (data) => {
  const url = `${API_CONFIG}/updateWebsit`;
  return fetch_requset(url, data, 'POST')
}
