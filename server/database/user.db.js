/**
 * 查询用户信息基本信息
 * Created by gaoju on 2017/11/15.
 */

var mongoose = require('mongoose');
const {
  mongoClient
} = require('./dbconfig.js');;
var Schema = mongoose.Schema;

//用户表结构
var UserSchema = new Schema({
  username: String, //名字
  phone: String, //手机号
  password: String, //模块类型
  role: {
    type: String,
    default: "用户"
  }, //角色
  rank: {
    type: String,
    default: "3", //1超级管理员，2管理员，3一般用户
  }, //权限等级
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
});
const UserModel = mongoClient.model('user', UserSchema, "user");


module.exports = {
  UserModel,
}
