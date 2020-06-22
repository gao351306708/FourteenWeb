import fetch_requset from '../config/fetch'

const API_CONFIG = '/api/manage';

/**
 * [获取网站去访问记录]
 */
export const getInterview = () => {
  const url = `${API_CONFIG}/interviewQuery`;
  return fetch_requset(url,{},'GET')
}
/**
 * [获取网站去访问记录]
 */
export const updateInterview = (data) => {
  const url = `${API_CONFIG}/updateInterview`;
  return fetch_requset(url,data,'POST')
}
