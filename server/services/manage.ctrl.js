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
manageRouter.post('/interviewQuery',async(req, res) => {
  let params = {};
  manageModel.find(params,function(err,doc){
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
    let params = {
        useName: req.cookies.username
    };
    let updateParams = {
        useName: req.body.name,
        sex: req.body.sex,
        image: req.body.image,
        delivery: req.body.delivery,
        desc: req.body.desc
    }
    manageModel.update(params, {$set: updateParams},function(err,doc){
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
