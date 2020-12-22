/**
 * jsonwebtoken 生成token
 * sign(payload, secretKey, [options, callback])
 * payload加密内容，secretKey密钥，[options, callback]参数
 * **/
const jwtWeb = require('jsonwebtoken');
const keySecret = "2020Gao2012Ju414"
// 创建 token 类
class Jwt {
  constructor(data) {
    this.data = data;

  }
  //生成token
  generateToken() {
    let data = this.data;
    let token = jwtWeb.sign({
      userid: data
    }, keySecret, {
      algorithm: 'HS256', // 加密使用的算法  如果不使用private.key 只能使用HS开头的算法
      expiresIn: 60 * 60 * 12, //有效时间 若加密内容不是对象 则无法设置有效时间
    });
    return token;
  }
  // 校验token
  verifyToken() {
    let token = this.data;
    let res;
    try {
      let result = jwtWeb.verify(token, keySecret);
      res = result
    } catch (e) {
      console.error(e)
      res = 'err';
    }
    return res;
  }
}
module.exports = Jwt;
