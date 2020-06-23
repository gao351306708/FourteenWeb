/**
 * 查询用户管理信息基本信息
 * Created by gaoju on 2017/11/15.
 */

var mongoose = require('mongoose');
const {mongoClient} = require('../database/dbconfig.js');;
var Schema = mongoose.Schema;

//访问记录模型
var InterviewSchema = new Schema({
    name:String,//访问页面名字
    datetime:String,//访问时间
});
const InterviewModel = mongoClient.model('Interview',InterviewSchema,"interview");

//博客文章模型
var BlogSchema = new Schema({
    id:String,//id
    title:String,//访问页面名字
    content:String,//内容文本
    createTime:String,//创建时间
    updateTime:String,//发布时间
    interviewNum:Number,//访问数
    tag:Array,//标签
    links:Array,//相关链接
});
const BlogModel = mongoClient.model('Blog',BlogSchema);
module.exports ={
    InterviewModel,
    BlogModel
}