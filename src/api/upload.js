/*
 * 文件上传接口
 * */
import fetch_requset from '../config/fetch'
const API_CONFIG = '/api/file';

export const uploadFile = (data,callback)=>{
  const url = '/api/file/upload';
  return fetch(url,{method:'POST',body:data}).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }).then((res) => {
      return callback(res)
    }).catch((err) => {
      console.warn(err)
      return callback(err)
    })
}
/*
* 文件下载接口
* */
export const downloadFile = (data,callback)=>{
  const url = '/api/file/download';
}
/*
* 读取文件数据
* */
export const loadFileData = (data)=>{
  const url = `${API_CONFIG}/readFiles`;
  return fetch_requset(url,data,'GET')
}
