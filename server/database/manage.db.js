/**
 * 查询用户信息基本信息
 * Created by gaoju on 2017/11/15.
 */

const query_db = require('./dbconfig')
/*管理员用户模块 构造方法*/
var Manage = function(manage) {
  this.props = manage.props
};

/*查询所有中心管理员数据*/
Manage.prototype.getAllManagerList = function() {
  var _sql = `select * from tblManage`;
  const res = query_db({sql: _sql, name: 'getAllManagerList'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}
/*查询中心的班级数据*/
Manage.prototype.getAllClassesOfCenter = function() {
  var _sql = `select * from tblClass where centerId='${this.props.centerId}'`;
  const res = query_db({sql: _sql, name: 'getAllClassesOfCenter'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}
/*查询班级数据老师和科目*/
Manage.prototype.getInfoOfClass = function() {
  var _sql = `SELECT * FROM tblClass2Subject where classId='${this.props.classId}'`;
  const res = query_db({sql: _sql, name: 'getInfoOfClass'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}
/*查询班级的所有学生*/
Manage.prototype.getAllStudentOfClass = function() {
  var _sql = `SELECT studentId,classId,username,centerId,grade from tblClass2Student t1,tblStudent t2 where t1.classid='${this.props.classId}' and t1.studentId = t2.userid`;
  const res = query_db({sql: _sql, name: 'getAllStudentOfClass'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}
module.exports = Manage
