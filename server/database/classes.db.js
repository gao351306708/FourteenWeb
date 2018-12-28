/**
 * 查询课程信息基本信息
 * Created by gaoju on 2017/11/15.
 */

const query_db = require('./dbconfig')
/*课程模块 构造方法*/
var Classes = function(classes) {
  this.props = classes.props
};

/*查询最新的课程*/
Classes.prototype.getLastClassInfo = function() {
  var _sql = `select * from  tblClassCourseGroup where teacherid='${this.props.teacherId}' order by id desc limit 0,1`;
  const res = query_db({sql: _sql, name: 'getLastClassInfo'}).catch((err)=>{
    console.log("服务端查询出错了(getLastClassInfo)。。。",err)
  })
  return res
}
/*添加课程*/
Classes.prototype.addClassInfo = function() {
  var _sql = `INSERT INTO tblClassCourseGroup(courseid,teacherid,teachername,name,subjectid,subjectname,group_student_Info,target,source,othersource,commits)
              VALUES
              ('${this.props.courseId}','${this.props.teacherId}','${this.props.teacherName}','${this.props.name}','${this.props.subjectId}',
               '${this.props.subjectName}','${this.props.studentGroup}','${this.props.target}','${this.props.source}',
               '${this.props.otherSource}','${this.props.commits}');`;
  const res = query_db({sql: _sql, name: 'addClassInfo'}).catch((err)=>{
    console.log("服务端查询出错了(addClassInfo)。。。",err)
  })
  return res
}
/*修改某课程的信息*/
Classes.prototype.updateClassInfo = function() {
  var _sql = `update tblClassCourseGroup
              set name='${this.props.name}',
                  group_student_Info='${this.props.studentGroup}',
                  target='${this.props.target}',
                  source='${this.props.source}',
                  othersource='${this.props.otherSource}',
                  commits='${this.props.commits}' where courseid='${this.props.courseId}' and teacherid='${this.props.teacherId}';`;
  const res = query_db({sql: _sql, name: 'updateClassInfo'}).catch((err)=>{
    console.log("服务端查询出错了(updateClassInfo)。。。",err)
  })
  return res
}
/*删除某课程的信息*/
Classes.prototype.deleteClassListInfo = function() {
  var _sql = `delete from tblClassCourseGroup where courseid='${this.props.courseId}' and teacherid='${this.props.teacherId}';`;
  const res = query_db({sql: _sql, name: 'deleteClassListInfo'}).catch((err)=>{
    console.log("服务端查询出错了(deleteClassListInfo)。。。",err)
  })
  return res
}
/*更新正在做的课程的状态*/
Classes.prototype.updateDoingClass = function() {
  var _sql = `update tblClassCourseGroup set doflag='doing' WHERE courseid='${this.props.courseId}'`;
  const res = query_db({sql: _sql, name: 'updateDoingClass'}).catch((err)=>{
    console.log("服务端查询出错了(updateDoingClass)。。。",err)
  })
  return res
}
/*查询正在做的课程*/
Classes.prototype.getDoingClass = function() {
  var _sql = `select * from tblClassCourseGroup where doflag='doing' and teacherid='${this.props.teacherId}'`;
  const res = query_db({sql: _sql, name: 'updateDoingClass'}).catch((err)=>{
    console.log("服务端查询出错了(updateDoingClass)。。。",err)
  })
  return res
}
/*获取老师课程列表*/
Classes.prototype.getClassList = function() {
  var _sql = `select * from tblClassCourseGroup where teacherid='${this.props.teacherId}'`;
  const res = query_db({sql: _sql, name: 'getClassList'}).catch((err)=>{
    console.log("服务端查询出错了(getClassList)。。。",err)
  })
  return res
}
/*获取课程信息*/
Classes.prototype.getClassInfo = function() {
  var _sql = `select * from tblClassCourseGroup where courseid='${this.props.courseId}'`;
  const res = query_db({sql: _sql, name: 'getClassInfo'}).catch((err)=>{
    console.log("服务端查询出错了(getClassInfo)。。。",err)
  })
  return res
}
/*获取当前需要上的课程的list*/
Classes.prototype.getCurrentCourseInfo = function() {
  var _sql = `select * from tblClassCourseGroup where teacherid='${this.props.teacherId}' and doflag='doing'`;
  const res = query_db({sql: _sql, name: 'getCurrentCourseInfo'}).catch((err)=>{
    console.log("服务端查询出错了(getCurrentCourseInfo)。。。",err)
  })
  return res
}
/*获取当前需要上的课程的list*/
Classes.prototype.getLastedCourseInfo = function() {
  var _sql = `select * from tblClassCourseGroup where teacherid='${this.props.teacherId}' and doflag='do' ORDER BY id DESC LIMIT 0,1`;
  const res = query_db({sql: _sql, name: 'getLastedCourseInfo'}).catch((err)=>{
    console.log("服务端查询出错了(getLastedCourseInfo)。。。",err)
  })
  return res
}

module.exports = Classes
