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

//网点类型模型结构
var WebsitMenuSchema = new Schema({
  name: String, //菜单名字
  modeltype: String, //模块类型
  sort: String, //顺序
});
const WebsitMenuModel = mongoClient.model('WebsitMenu', WebsitMenuSchema, "websitmenu");

//网点子模块结构
var WebsitMenuItemsSchema = new Schema({
  modeltype: String,
  title: String,
  logo: String,
  introduce: String,
  url: String
});
const WebsitMenuItemsModel = mongoClient.model('WebsitMenuItem', WebsitMenuItemsSchema, "websitmenuitem");
module.exports = {
  WebsitMenuModel,
  WebsitMenuItemsModel
}
