/**
 * jsonwebtoken 生成token
 * **/
const jwt = require('jsonwebtoken');
const keySecret = "2020Gao2012Ju414"
// 创建 token 类
class Jwt {
  constructor(data) {
    this.data = data;

  }
  //生成token
  generateToken() {
    let data = this.data;
    let token = jwt.sign(data, keySecret);
    return token;
  }
  // 校验token
  verifyToken() {
    let token = this.data;
    let res;
    try {
      let result = jwt.verify(token, keySecret);
      res = result
    } catch (e) {
      res = 'err';
    }
    return res;
  }
}
module.exports = Jwt;
