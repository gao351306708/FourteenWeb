/**
 * @desc 管理员管理模块
 * @dateTime 2018-12-13
 **/

var express = require('express');
var Manage = require('../database/manage.db.js');
var Helper = require('../util/helper');
const manageRouter = express.Router();

/*
 * 查询访问记录
 * */
manageRouter.post('/interviewQuery',async(req, res) => {
  var props = req.body;
  var manage = new Manage({props: props});
  const result = await manage.interviewQuery();
  if(result){
    res.json({
      code:200,
      data:result
    })
  }else {
    res.json({
      code:500,
      message:'数据获取出错~~'
    })
  }
})
/*
 * 更新访问记录
 * */
manageRouter.post('/interviewUpdate',async(req, res) => {
  var props = req.body;
  var manage = new Manage({props: props});
  const result = await manage.interviewUpdate();
  if(result){
    res.json({
      code:200,
      data:result
    })
  }else {
    res.json({
      code:500,
      message:'数据获取出错~~'
    })
  }
})

module.exports = manageRouter;
