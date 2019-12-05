/**
 * 查询用户信息基本信息
 * Created by gaoju on 2017/11/15.
 */

const query_db = require('./dbconfig')
/*管理员用户模块 构造方法*/
var Manage = function(manage) {
  this.props = manage.props
};

/*查询访客记录*/
Manage.prototype.interviewQuery = function() {
  var _sql = `select * from tblManage`;
  const res = query_db({sql: _sql, name: 'interviewQuery'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}
/*更新访客记录*/
Manage.prototype.interviewUpdate = function() {
  var _sql = `select * from tblClass where centerId='${this.props.centerId}'`;
  const res = query_db({sql: _sql, name: 'interviewUpdate'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}

module.exports = Manage
