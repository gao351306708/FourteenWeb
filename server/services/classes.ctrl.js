/**
 * @desc 课程模块控制器
 * @dateTime 2018-11-28
 **/

var express = require('express');
var path = require('path')
var Classes = require('../database/classes.db.js');
var Helper = require('../util/helper');
const classRouter = express.Router();

/*
 * 新增课程
 * */
classRouter.post('/addClassListInfo',async(req, res) => {
  var props = req.body;
  var classes = new Classes({props: props});
  const result1 = await classes.getLastClassInfo();//查询最新的课程ID，用来新建新的课程ID。Classid=CenterID+InstructorID+CourseType+年月+XXX=“00201MM1811001”
  let newclassId = '';//要新增的ID号
  if(result1 && result1.length>0){
    let courseId = (result1[0].courseId);
    let num = Number(courseId.substr(-3))+1;
    let numstr = String(num);
    while (numstr.length<3){
      numstr = '0' + numstr;
    }
    newclassId = courseId.slice(courseId,-9) + Helper.YYMM() + numstr;
  }else {
    newclassId = '00201MM' + Helper.YYMM() + '001';
  }
  props.courseId = newclassId;
  props.otherSource = JSON.stringify(req.body.otherSource);
  props.source = JSON.stringify(req.body.source);
  props.studentGroup = JSON.stringify(req.body.studentGroup);
  const result = await classes.addClassInfo();
  console.log("服务端返回的数据-------111111111111----->>",result)
  if(result){
    res.json({
      code:200,
      data:"插入数据成功"
    })
  }else {
    res.json({
      code:500,
      message:'数据获取出错~~'
    })
  }
})

module.exports = classRouter;
