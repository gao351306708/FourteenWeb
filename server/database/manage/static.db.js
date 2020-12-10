/**
 * 用户管理 统计管理
 * Created by gaoju on 2020/12/110.
 * Schema 自定义的表结构
 * model(m,n,p) model参数 m 为自定义集合名，n 定义得schema结构。p 最终能生成的collection，如果不传入则默认是小写m的复数格式
 */

var mongoose = require('mongoose');
const {
  mongoClient
} = require('../dbconfig.js');;
var Schema = mongoose.Schema;

//访问记录模型
var InterviewSchema = new Schema({
  name: String, //访问页面名字
  datetime: String, //访问时间
});
const InterviewModel = mongoClient.model('Interview', InterviewSchema, "interview");

module.exports = {
  InterviewModel,
}
