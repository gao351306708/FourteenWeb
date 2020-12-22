const JwtUtil = require('./jwt.js');

module.exports = ((req, res, next) => {
  // 获取当前访问的api地址
  const url = req.path
  // 不需要进行验证的api
  var urlArr = ['/manage.html', '/api/user/login', '/api/user/registerUser']
  // 验证当前的api是否存在不需要验证的api的列表里面
  var is_next = urlArr.find(item => item === url)
  if (is_next) {
    next()
    return false
  }
  //时候需要校验
  if (!req.headers.needtokencheck) {
    next()
    return false
  }
  // 获取api传递过来的token
  const token = req.headers.token || ''
  // 基本检测，token和id都不允许为空
  let jwt = new JwtUtil(token);
  let result = jwt.verifyToken();
  // 如果考验通过就next，否则就返回登陆信息不正确
  if (result == 'err') {
    res.status(403).json({
      message: '登录已过期,请重新登录',
      code: 403
    })
  } else {
    next();
  }
})
