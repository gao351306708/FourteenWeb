/**
 * 查询用户信息基本信息
 * Created by gaoju on 2017/11/15.
 */

const query_db = require('./dbconfig')
/*用户模块 构造方法*/
var User = function(user) {
    this.props = user.props
};


/*用户登录校验*/
User.prototype.getUser = function() {
  var _sql = '';
  if(this.props.role == '1'){//学生
    _sql = `select userid,username from tblStudent where username='${this.props.name}' and pwd='${this.props.pass}'`;
  }
  if(this.props.role == '2'){//教师
    _sql = `select userid,username from tblTeacher where username='${this.props.name}' and pwd='${this.props.pass}'`;
  }
  if(this.props.role == '3'){//管理员
    _sql = `select userId,userName,centerId,permissionLevel from tblManage where username='${this.props.name}' and pwd='${this.props.pass}'`;
  }
  const res = query_db({sql: _sql, name: 'getUserAllItems'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}
/*获取当前最新的用户id*/
User.prototype.getMaxUserId = function(callback) {
  var _sql = '';
  if(this.props.role == 1){//学生
    _sql = "select userid from tblStudent where id>0  ORDER BY userid DESC LIMIT 0,1";
  }
  if(this.props.role == 2){//教师
    _sql = "select userid from tblTeacher where id>0  ORDER BY userid DESC LIMIT 0,1";
  }
  const res = query_db({sql: _sql, name: 'getMaxUserId'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}
/*注册 添加用户数据*/
User.prototype.getAddUser = function() {
  var _sql = '';
  if(this.props.role == 1){//学生
    _sql = `INSERT INTO tblStudent(userid,username,pwd,phone) VALUES ('${this.props.idiilnumber}','${this.props.username}','${this.props.password}','${this.props.phone}');`;
  }
  if(this.props.role == 2){//教师
    _sql = `INSERT INTO tblTeacher(userid,username,pwd,phone) VALUES ('${this.props.idiilnumber}','${this.props.username}','${this.props.password}','${this.props.phone}');`;
  }
  const res = query_db({sql: _sql, name: 'getAddUser'}).catch((err)=>{
    console.log("服务端查询出错了。。。",err)
  })
  return res
}
module.exports = User
