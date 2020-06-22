/**
 * @desc 用户模块控制器,添加路由获取服务端数据
 * @dateTime 2018-11-29
 **/

var express = require('express');
var User = require('../database/user.db.js');
var Helper = require('../util/helper');
const userRouter = express.Router();


userRouter.post('/login',async(req, res) => {
  var props = req.body;
  var user = new User({props: props});
  const result = await user.getUser();
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
userRouter.get('/getAllUser',async(req, res) => {
      var props = {};
      var user = new User({props: props});
      const result = await user.getAllUser();
      console.log("服务端返回的数据-------111111111111----->>",result)
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
userRouter.post('/registerUser',async(req, res) => {
  var props = req.body;
  const num = ['0000001'];
  const userid = 'IDIILMATH0000005';
  if (num.length>0) {//有用户
    props.idiilnumber = Helper.createUserId(userid);
  } else {
    props.idiilnumber = 'IDIILMATH0000001';//第一个用户
  }
  props.password = Helper.getMD5(req.body.pass);
  var user = new User({props: props});
  const result = await user.getAddUser();
  console.log("服务端返回的数据-------111111111111----->>",result)
  if(!result){
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

module.exports = userRouter
