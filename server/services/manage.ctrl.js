/**
 * @desc 管理员管理模块
 * @dateTime 2018-12-13
 **/

var express = require('express');
var manageModel = require('../database/manage.db.js');
const manageRouter = express.Router();


/*
 * 查询访问记录
 * */
manageRouter.get('/interviewQuery',async(req, res) => {
  let params = {};
  manageModel.count(params,function(err,doc){
    if(err) {
        res.json({
          code:500,
          message:err.message
        });
    }else {
      res.json({
        code:200,
        data:doc
      });
    }
  });
})
 // 更新访问数
manageRouter.post('/updateInterview',function(req,res,next){
    let params = req.body;
    let manageModel1 = new manageModel({
      name:params.name || "door",
      datetime:new Date().getTime()
    })
    manageModel1.save(function(err,doc){
        if(err) {
            res.json({
              code:500,
              message:err.message
            });
        }else {
          res.json({
            code:200,
            data:doc
          });
        }
    })
 });

module.exports = manageRouter;
