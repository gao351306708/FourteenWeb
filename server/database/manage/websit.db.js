/**
 * 用户管理 网点管理 
 * Created by gaoju on 2020/12/10.
 * Schema 自定义的表结构
 * model(m,n,p) model参数 m 为自定义集合名，n 定义得schema结构。p 最终能生成的collection，如果不传入则默认是小写m的复数格式
 */

var mongoose = require('mongoose');
const {
  mongoClient
} = require('../dbconfig.js');;
var Schema = mongoose.Schema;

//网点模型
var WebsitSchema = new Schema({
  name: String, //菜单名字
  items: Array, //访问时间
});
const WebsitMenuModel = mongoClient.model('WebsitMenu', WebsitSchema, "websitmenu");

module.exports = {
  WebsitMenuModel,
}
