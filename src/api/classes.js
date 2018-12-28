import fetch_requset from '../config/fetch'

const API_CONFIG = '/api/classes';

/**
 * [添加新增备课列表信息]
 */
export const addClassListInfo = (data) => {
  const url = `${API_CONFIG}/addClassListInfo`;
  return fetch_requset(url,data,'POST')
}
/**
 * [修改课程的信息]
 */
export const updateClassListInfo = (data) => {
  const url = `${API_CONFIG}/updateClassListInfo`;
  return fetch_requset(url,data,'POST')
}
/**
 * [删除课程的信息]
 */
export const deleteClassListInfo = (data) => {
  const url = `${API_CONFIG}/deleteClassListInfo`;
  return fetch_requset(url,data,'POST')
}
/**
 * [获取备课列表信息]
 */
export const getClassList = (data) => {
  const url = `${API_CONFIG}/getClassList`;
  return fetch_requset(url,data,'POST')
}
/**
 * [获取课程信息]
 */
export const getClassInfo = (data) => {
  const url = `${API_CONFIG}/getClassInfo`;
  return fetch_requset(url,data,'POST')
}
/*
* 更新课程的信息
* */
export const updateDoingClassInfo = (data)=>{
  const url = `${API_CONFIG}/updateDoingClassInfo`;
  return fetch_requset(url,data,'POST')
}
/*
 * 获取上一次上课的内容
 * */
export const getCurrentCourseInfo = (data)=>{
  const url = `${API_CONFIG}/getCurrentCourseInfo`;
  return fetch_requset(url,data,'POST')

}
