/**
 * @desc 用户模块控制器,添加路由获取服务端数据
 * @dateTime 2018-11-29
 **/

var express = require('express');
var {
  UserModel
} = require('../database/user.db.js');
var JwtUtil = require('../util/jwt.js');
const userRouter = express.Router();

//登录校验
userRouter.post('/login', async (req, res) => {
  var props = req.body;
  var userName = props.username;
  var pass = props.pass;
  new Promise((resolve, reject) => {
    // 根据用户名查询用户
    UserModel.findOne({
      'username': userName
    }).exec((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }).then((result) => {
    debugger
    console.log("用户信息==》" + result);
    if (result) {
      // 密码解密 利用aes
      if (pass == result.password) {
        // 登陆成功，添加token验证
        let _id = result._id.toString();
        // 将用户id传入并生成token
        let jwt = new JwtUtil(_id);
        let token = jwt.generateToken();
        // 将 token 返回给客户端
        res.json({
          code: 200,
          message: '登陆成功',
          token: token
        });
      } else {
        res.json({
          code: 400,
          message: '账号密码错误'
        });
      }
    } else {
      res.json({
        code: 404,
        message: '账号不存在'
      })
    }
  }).catch((err) => {
    console.log(err);
    res.json({
      status: 500,
      msg: '账号密码错误'
    });
  })
})
//查询所有用户
userRouter.get('/getAllUser', async (req, res) => {
  let query = req.query;
  let queryRes = new RegExp(query.key, 'i'); //正则模糊查询参数
  let keyList = {
    name: queryRes || ""
  }
  UserModel.find(keyList, {
    content: 0
  }).sort({
    "createtime": 1, //按照modeltype升序查找
  }).exec(function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: err.message
      });
    } else {
      res.json({
        code: 200,
        data: doc
      });
    }
  })
})

//注册新用户
userRouter.post('/registerUser', async (req, res) => {
  let params = req.body;
  let formData = {
    username: params.username, //名字
    password: params.password, //模块类型
  }
  //有modeltype类型的就更新没有就插入
  UserModel.updateOne({
    username: formData.name
  }, {
    "$set": formData
  }, {
    "upsert": "true"
  }, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: err.message
      });
    } else {
      res.json({
        code: 200,
        message: "用户新增成功",
        data: doc
      });
    }
  })
})

module.exports = userRouter
