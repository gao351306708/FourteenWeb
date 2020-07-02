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
