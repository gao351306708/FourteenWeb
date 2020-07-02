/**
 * 查询用户管理信息基本信息
 * Created by gaoju on 2017/11/15.
 * Schema 自定义的表结构
 * model(m,n,p) model参数 m 为自定义集合名，n 定义得schema结构。p 最终能生成的collection，如果不传入则默认是小写m的复数格式
 */

var mongoose = require('mongoose');
const {
  mongoClient
} = require('../database/dbconfig.js');;
var Schema = mongoose.Schema;

//访问记录模型
var InterviewSchema = new Schema({
  name: String, //访问页面名字
  datetime: String, //访问时间
});
const InterviewModel = mongoClient.model('Interview', InterviewSchema, "interview");

//博客文章模型
var BlogSchema = new Schema({
  id: String, //id
  title: String, //访问页面名字
  content: String, //内容文本
  createTime: String, //创建时间
  updateTime: String, //发布时间
  interviewNum: Number, //访问数
  tag: Array, //标签
  links: Array, //相关链接
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
});
const BlogModel = mongoClient.model('Blog', BlogSchema, "blog");

//博客文章模型
var TypeSchema = new Schema({
  name: String, //name
  status: String, //访问页面名字
  dependence: String, //从属类型 前端：1 后端：2 数据库 3
});
const BlogTypeModel = mongoClient.model('blogtype', TypeSchema, "blogtype");

module.exports = {
  InterviewModel,
  BlogModel,
  BlogTypeModel
}
