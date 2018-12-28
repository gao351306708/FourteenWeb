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
/*
 * 修改某课程
 * */
classRouter.post('/updateClassListInfo',async(req, res) => {
  var props = req.body;
  var classes = new Classes({props: props});
  props.courseId = req.body.courseId;
  props.otherSource = JSON.stringify(req.body.otherSource);
  props.source = JSON.stringify(req.body.source);
  props.studentGroup = JSON.stringify(req.body.studentGroup);
  const result = await classes.updateClassInfo();
  console.log("服务端返回的数据------>>",result)
  if(result){
    res.json({
      code:200,
      data:"修改数据成功"
    })
  }else {
    res.json({
      code:500,
      message:'数据获取出错~~'
    })
  }
})
/*
 * 删除某个课程
 * */
classRouter.post('/deleteClassListInfo',async(req, res) => {
  var props = req.body;
  var classes = new Classes({props: props});
  const result = await classes.deleteClassListInfo();
  console.log("服务端返回的数据------>>",result)
  if(result){
    res.json({
      code:200,
      data:"删除数据成功"
    })
  }else {
    res.json({
      code:500,
      message:'删除数据出错~~'
    })
  }
})
/*
 * 更新某个课程的信息，目前更改课程是否正在做的标志
 * */
classRouter.post('/updateDoingClassInfo',async(req,res)=>{
  var props = req.body;
  //props.nowDoingInfo = JSON.stringify(req.body);
  var classes = new Classes({props: props});
  //查询有没有正在做的课件
  const result1 = await classes.getDoingClass();
  if(result1){
    if(result1.length>0 && result1[0].courseId!=req.body.courseId){//有
      res.json({
        code:200,
        type:'1',
        data:result1
      })
    }else {
      //没有，就把当前要上的课设为正在上的标志
      const result2 = await classes.updateDoingClass();
      if(result2){
        res.json({
          code:200,
          type:'0',
          data:result2
        })
      }else {
        res.json({
          code:500,
          message:'更新数据出错~~updateDoingClass'
        })
      }
    }
  }else {
    res.json({
      code:500,
      message:'数据获取出错~~getDoingClass'
    })
  }
})
/*
 * 获取教师当前上的课的信息，先查正在上的课 doing、没有再查未上的课 do、都没有则需要新加派课。
 * */
classRouter.post('/getClassList',async(req,res)=>{
  var props = req.body;
  var classes = new Classes({props: props});
  const result = await classes.getClassList();
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
/*
 * 根据课程ID查询某个课程的信息。
 * */
classRouter.post('/getClassInfo',async(req,res)=>{
  var props = req.body;
  var classes = new Classes({props: props});
  const result = await classes.getClassInfo();
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
/*
* 获取教师当前上的课的信息，先查正在上的课 doing、没有再查未上的课 do、都没有则需要新加派课。
* */
classRouter.post('/getCurrentCourseInfo',async(req,res)=>{
  var props = req.body;
  var classes = new Classes({props: props});
  //获取正在做的课件
  const result = await classes.getCurrentCourseInfo();
  if(result && result.length>0){
    res.json({
      code:200,
      data:result
    })
  }else {
    //获取未做课程最新的一条
    const result2 = await classes.getLastedCourseInfo();
    if(result2){
      res.json({
        code:200,
        data:result2
      })
    }else {
      res.json({
        code:500,
        message:'数据获取出错~~'
      })
    }
  }
})
module.exports = classRouter;
