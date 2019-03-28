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
var WXBizDataCrypt = require('../util/WXBizDataCrypt');//解密算法
var AppID = 'wx68bd8e40de0fba53';
var AppSecret = 'c103fc279ba805633f47c66a86c2cb7a';

userRouter.get('/wechat_login', function(req,res, next){
  // 第一步：用户同意授权，获取code
  var router = 'get_wx_access_token';
  // 这是编码后的地址
  var return_uri = encodeURIComponent('http://http://www.rambogj.club/api/user/'+router);
  var scope = 'snsapi_userinfo';
  res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+return_uri+'&response_type=code&scope='+scope+'&state=STATE123#wechat_redirect');
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
              res.json({
                code:response.statusCode,
                data:userinfo
              })
            }
          }
        );
      }else{
        console.log(response.statusCode);
        let err = new Error(error.code);
        return next(err);
      }
  })
});
/**
 * 获取微信用户的唯一的unionid
 * 参数：code,登录临时凭证（必须的）
 * encryptedData,微信获取的用户加密信息，需要解密
 * iv,
 * **/
userRouter.get('/getUnionId',async(req, res,next) => {
  // 第二步：通过code换取网页授权access_token
  console.log("getUnionId==>",req.query);
  let reqs = req.query;
  let appId = 'wxf6fbc01845361e67';
  let appSecret = '491974216d8c1db42b2dfd7cab0ffab3';
  request('https://api.weixin.qq.com/sns/jscode2session?appid='+appId+'&secret='+appSecret+'&js_code='+reqs.code+'&grant_type=authorization_code',function(error,response,body){
    if(!error && response.statusCode === 200){	//通过前端传过来的code获取sessionKey
      console.log('获取sessionKey返回的信息==>',body)
      //console.log(typeof body)
      var bodyJson = JSON.parse(body)
      var sessionKey = bodyJson.session_key;
      console.log('-------------bodyJson--------------------',bodyJson)
      if(bodyJson.unionid){//用户如果有关注公众号可以直接获取到，不用再进行解密
        return res.json({
          code:200,
          data:bodyJson
        })
      }else {
        //获取到sessionKey后，开始进行解密，获取uninoid
        try {
          var encryptedData = reqs.encryptedData.replace(/ /g,'+');	//要把空格替换成+，不然会报错，因为前端数据传到后端时+号会被解析成空格，要再换回去
          var iv = reqs.iv.replace(/ /g,'+');
          console.log(encryptedData,'-------------encryptedData--------------------')
          console.log(iv,'==========================iv=================')
          console.log(sessionKey,'++++++++++++++++++++++sessionKey++++++++++++++++++++++++++')
          var pc = new WXBizDataCrypt(appId, sessionKey)
          var data = pc.decryptData(encryptedData , iv)
          console.log('解密后 data: ', data);
          return res.json({
            code:200,
            data:data
          })
        }catch (error){
          let err = new Error(error.code);
          return next(err);
        }
      }
      // 解密后的数据为
      // data = {
      //   "nickName": "Band",
      //   "gender": 1,
      //   "language": "zh_CN",
      //   "city": "Guangzhou",
      //   "province": "Guangdong",
      //   "country": "CN",
      //   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
      //   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
      //   "watermark": {
      //     "timestamp": 1477314187,
      //     "appid": "wx4f4bc4dec97d474b"
      //   }
      // }

    }else {
      let err = new Error(error.code);
      return next(err);
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
