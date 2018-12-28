/**
 * 接口模块，获取后台数据
 * Created by gaoju on 2018/8/14.
 */
import fetch from '../config/fetch'
import fetchJsonp from '../config/fetchJsonp'
import {bodyUrlencoded} from '../config/methods'
/*
* {
 type:'GET',
 headers : {
 'Accept': 'application/json',
 'Content-Type': 'application/json'
 },
 body:bodyUrlencoded(data)
 }
 "Content-type", "application/x-www-form-urlencoded"
* */

/*
* 获取试题
* */
export const getAllUser = () => fetch('/api/user/getAllUser');

export const writeFileJson = () => fetch('/api/user/writeFileJson');

export const getVideoList = data => fetchJsonp('/restAPI3.0/video', data);

export const updateQuestion = data => fetch('/restAPI3.0/question/updateQues','',{
  type:'POST',
  headers : {"Content-type": "application/x-www-form-urlencoded"},
  body:bodyUrlencoded(data)
});
/*
 * 更新错误试题的试题状态，status:0 全部。1是已处理。2未处理
 * */
export const updateErrorQuestionStatus = data=>fetch('/restAPI3.0/examination_paper',data);
