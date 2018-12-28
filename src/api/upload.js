/*
 * 文件上传接口
 * */
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

