/**
 * @desc 用户模块控制器,添加路由获取服务端数据
 * @dateTime 2018-11-29
 **/

var express = require('express');
var path = require('path')
var fs = require('fs')
var os = require('os')
var User = require('../database/user.db.js');
var Helper = require('../util/helper');
const userRouter = express.Router();
var request = require('request');
var AppID = 'wx68bd8e40de0fba53';
var AppSecret = 'c103fc279ba805633f47c66a86c2cb7a';

userRouter.get('/wechat_login', function(req,res, next){
  // 第一步：用户同意授权，获取code
  var router = 'get_wx_access_token';
  // 这是编码后的地址
  var return_uri = encodeURIComponent('http://www.rambogj.club/api/user/'+router);
  var scope = 'snsapi_userinfo';
  res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+return_uri+'&response_type=code&scope='+scope+'&state=STATE#wechat_redirect');

});
userRouter.get('/get_wx_access_token',async(req, res,next) => {
  // 第二步：通过code换取网页授权access_token
  console.log("wechat_req==>",req.query);
  var code = req.query.code;
  request.get({
      url:'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+AppID+'&secret='+AppSecret+'&code='+code+'&grant_type=authorization_code',
    }, function(error, response, body){
      if(response.statusCode == 200){
        // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
        console.log("获取的数据2==>",JSON.parse(body));
        var data = JSON.parse(body);
        var access_token = data.access_token;
        var openid = data.openid;
        request.get({url:'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN'},
          function(error, response, body){
            if(response.statusCode == 200){
              // 第四步：根据获取的用户信息进行对应操作
              var userinfo = JSON.parse(body);
              console.log('获取微信信息成功！');
              //到这就写完了，你应该拿到微信信息以后去干该干的事情，比如对比数据库该用户有没有关联过你们的数据库，如果没有就让用户关联....等等等...
              res.json({
                code:200,
                data:userinfo
              })
            }else{
              console.log(response.statusCode);
            }
          }
        );
      }else{
        console.log(response.statusCode);
      }
})
});
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
      const result = await user.getUserAllItems();
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
userRouter.get('/writeFileJson', function(req, res) {
  var param = req.query;
  var dir = path.join(__dirname, ''); //文件路径，__dirname为当前运行js文件的目录
  var sep = path.sep;
  var arrydir = [];
  if(sep == '/'){
    arrydir = dir.split('/');
  }else {
    arrydir = dir.split('\\');
  }
  //区分开发和生产的，地址不一样
  if(process.env.NODE_ENV == 'production'){
    var filepath = arrydir.splice(0,arrydir.length-2).join('/')+"/dist/static/ClassUserList.json";
  }else {
    var filepath = arrydir.splice(0,arrydir.length-2).join('/')+"/static/ClassUserList.json";
  }
  //读取json文件
  console.log("__dirname地址---->>",dir)
  console.log("process.env.NODE_ENV---->>",process.env.NODE_ENV)
  console.log("json地址---->>",filepath)
  console.log('获取操作系统类型： '+os.type());
  try {
    fs.readFile(filepath, 'utf-8', function(err, data) {
      if (err) {
        res.json({
          code:500,
          message:"文件读取失败"
        })
      } else {
        let fileData = JSON.parse(data);
        //fileData.studentNeedData = param;
        fileData.classList = param;
        var ttt = JSON.stringify(fileData);
        fs.writeFileSync(filepath,ttt);
        res.json({
          code:200,
          data:fileData
        })
      }
    });
  }catch (e){
    console.log("文件读取失败:",e.stack);
    res.json({
      code:500,
      message:"文件读取出错"
    })
  }

});

module.exports = userRouter
