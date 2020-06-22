/**
 * 查询用户管理信息基本信息
 * Created by gaoju on 2017/11/15.
 */

var mongoose = require('mongoose');
const {mongoClient} = require('../database/dbconfig.js');;
var Schema = mongoose.Schema;

var ManageSchema = new Schema({
    name:String,//访问页面名字
    datetime:Date,//访问时间
});
module.exports = mongoClient.model('Interview',ManageSchema,"interview");