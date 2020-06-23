/**
 * @desc 管理员管理模块
 * @dateTime 2018-12-13
 **/

var express = require('express');
const {InterviewModel,BlogModel} = require('../database/manage.db.js');
const { param } = require('./tencent.ctrl.js');
const manageRouter = express.Router();


/*
 * 查询访问记录
 * */
manageRouter.get('/interviewQuery',async(req, res) => {
  let params = {};
  InterviewModel.count(params,function(err,doc){
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
    let manageModel1 = new InterviewModel({
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
            message:"访问数更新成功",
            data:doc
          });
        }
    })
 });
  //新增文章
manageRouter.post('/addBlog',function(req,res,next){
  let params = req.body;
  let BlogModel1 = new BlogModel({
    title:params.title,//访问页面名字
    content:params.content,//内容文本
    createTime:new Date().getTime(),//创建时间
    updateTime:new Date().getTime(),//发布时间
    interviewNum:0,//访问数
    tag:params.tag,//标签
    links:params.links,//相关链接
  })
  BlogModel1.save(function(err,doc){
      if(err) {
          res.json({
            code:500,
            message:err.message
          });
      }else {
        res.json({
          code:200,
          message:"新增成功",
          data:doc
        });
      }
  })
});
  //删除文章
manageRouter.post('/deleteBlog',function(req,res,next){
    let params = req.body;
    BlogModel.remove({_id:params.id},function(err,doc){
        if(err) {
            res.json({
              code:500,
              message:err.message
            });
        }else {
          res.json({
            code:200,
            message:"删除成功",
            data:doc
          });
        }
    })
});
//修改文章
manageRouter.post('/updateBlog',function(req,res,next){
  let params = req.body;
  let newValue={
    title:params.title,
    contnet:params.contnet,
    tag:params.tag,
    links:params.links,
    updateTime:new Date().getTime()
  }
  BlogModel.updateOne({id:params.id},{$set:newValue},function(err,doc){
      if(err) {
          res.json({
            code:500,
            message:err.message
          });
      }else {
        res.json({
          code:200,
          message:"修改成功",
          data:doc
        });
      }
  })
});
//查询文章列表
manageRouter.get('/queryBlogList',function(req,res,next){
  let params = req.query;
  BlogModel.find(params,function(err,doc){
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
//查询文章
manageRouter.get('/queryBlogDetail',function(req,res,next){
  let params = req.query;
  BlogModel.find({id:params.id},function(err,doc){
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
