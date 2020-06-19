/**
 * 查询用户管理信息基本信息
 * Created by gaoju on 2017/11/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ManageSchema = new Schema({
    id: String,//id 自增
    interviewTime:String,//访问时间
});
module.exports = mongoose.model('Manage',ManageSchema);