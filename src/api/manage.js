import fetch_requset from '../config/fetch'

const API_CONFIG = '/api/manage';

/**
 * [查询各个中心的管理员列表信息]
 */
export const getAllManagerList = (data) => {
  const url = `${API_CONFIG}/getAllManagerList`;
  return fetch_requset(url,data,'POST')
}
/**
 * [查询某中心班级列表信息]
 */
export const getAllClassesOfCenter = (data) => {
  const url = `${API_CONFIG}/getAllClassesOfCenter`;
  return fetch_requset(url,data,'POST')
}
/**
 * [查询某班级学生列表信息]
 */
export const getAllStudentOfClass = (data) => {
  const url = `${API_CONFIG}/getAllStudentOfClass`;
  return fetch_requset(url,data,'POST')
}
