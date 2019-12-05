/**
 * 文件处理：上传、下载,'读取'
 * Created by gaoju on 2018/1/16.
 */
var express = require('express');
var path = require('path')
var fs = require('fs')
var os = require('os')
var Helper = require('../util/helper');
var xlsx = require('node-xlsx');
const fileDeal = express.Router()

/*
 * 文件上传接口
 * */
fileDeal.post('/upload',async(req, res) => {
    try{
      var Files = req.files.file;
      var filename = Files.name;
      var filetype = Files.mimetype;
      var foldername=req.body.type ? req.body.type : 'default';//用户名作为文件名
      var dateString='',target_path='';
      var dir = path.join(__dirname, ''); //文件路径，__dirname为当前运行js文件的目录
      var sep = path.sep;//不同系统的文件路径分隔符
      var arrydir = [];
      if(sep == '/'){
        arrydir = dir.split('/');
      }else {
        arrydir = dir.split('\\');
      }
      var paths = arrydir.splice(0,arrydir.length-2).join('/')+"/uploadFiles";
      dateString = Helper.randomString(true,5,16);//产生随机文件名
      target_path = Helper.createFolder(paths,foldername);
      //将上传的文件移到指定目录
      Files.mv(`${target_path}/${filename}`, function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        res.json({file: `${foldername}/${filename}`});
      });
    }catch(e){
      //TODO handle the exception
      return new Error(e)
    }
})
/*
 * 文件下载接口
 * */
fileDeal.post('/download',async(req, res) => {
  var file = req.query.name;
  var dir = path.join(__dirname, ''); //文件路径，__dirname为当前运行js文件的目录
  var sep = path.sep;//不同系统的文件路径分隔符
  var arrydir = [];
  if(sep == '/'){
    arrydir = dir.split('/');
  }else {
    arrydir = dir.split('\\');
  }
  var paths = arrydir.splice(0,arrydir.length-2).join('/')+"/uploadFiles";
  var filepath = paths+file;
  console.log("doDownLoadFile===>>>",filepath,file);
  res.set('Content-Type','application/octet-stream');
  res.download(filepath);
})
/**
 * 文件读取,json文件
 * **/
fileDeal.get('/writeFileJson', function(req, res) {
  var param = req.query;
  var dir = path.join(__dirname, ''); //文件路径，__dirname为当前运行js文件的目录
  var sep = path.sep;
  var arrydir = [];
  if(sep == '/'){
    arrydir = dir.split('/');
  }else {
    arrydir = dir.split('\\');
  }
  //区分开发和生产的，地址不一样
  if(process.env.NODE_ENV == 'production'){
    var filepath = arrydir.splice(0,arrydir.length-2).join('/')+"/dist/static/ClassUserList.json";
  }else {
    var filepath = arrydir.splice(0,arrydir.length-2).join('/')+"/static/ClassUserList.json";
  }
  //读取json文件
  console.log("__dirname地址---->>",dir)
  console.log("process.env.NODE_ENV---->>",process.env.NODE_ENV)
  console.log("json地址---->>",filepath)
  console.log('获取操作系统类型： '+os.type());
  try {
    fs.readFile(filepath, 'utf-8', function(err, data) {
      if (err) {
        res.json({
          code:500,
          message:"文件读取失败"
        })
      } else {
        let fileData = JSON.parse(data);
        fileData.classList = param;
        var ttt = JSON.stringify(fileData);
        fs.writeFileSync(filepath,ttt);
        res.json({
          code:200,
          data:fileData
        })
      }
    });
  }catch (e){
    console.log("文件读取失败:",e.stack);
    res.json({
      code:500,
      message:"文件读取出错"
    })
  }

});
/**
 * 文件读取,word\execl
 * **/
fileDeal.get('/readFiles', function(req, res) {
  var param = req.query;
  var filename = param.filename;
  var dir = path.join(__dirname, ''); //文件路径，__dirname为当前运行js文件的目录
  var sep = path.sep;
  var arrydir = [];
  if(sep == '/'){
    arrydir = dir.split('/');
  }else {
    arrydir = dir.split('\\');
  }
  //区分开发和生产的，地址不一样
  if(process.env.NODE_ENV == 'production'){
    var filepath = arrydir.splice(0,arrydir.length-2).join('/')+"/uploadFiles/" + filename;
  }else {
    var filepath = arrydir.splice(0,arrydir.length-2).join('/')+"/uploadFiles/" + filename;
  }
  //读取json文件
  console.log("__dirname地址---->>",dir)
  console.log("process.env.NODE_ENV---->>",process.env.NODE_ENV)
  console.log("文件地址---->>",filepath)
  try {
    let sheets = xlsx.parse(filepath);
    let arr = [];
    //sheets是一个数组，数组中的每一项对应test.xlsx这个文件里的多个表格，如sheets[0]对应test.xlsx里的“测试参数”这个表格，sheets[1]对应Sheet2这个表格
    sheets.forEach(function(sheet){
        let newSheetsArr = [];
        //sheet是一个json对象，格式为{name:"测试参数",data:[]},我们想要的数据就存储在data里
        for(let i=0; i<sheet["data"].length; i++){ //excel文件里的表格一般有标题所以不一定从0开始
            let row=sheet['data'][i];
            if(row && row.length > 0){
                newSheetsArr.push({
                    id: i,
                    value: row[0], //row[0]对应表格里A这列
                });
            }
        }
       arr.push({
         type:sheet.name,
         list:newSheetsArr
       });
    });
    res.json({
      code:200,
      data:arr
    })
  }catch (e){
    console.log("文件读取失败:",e.stack);
    res.json({
      code:500,
      message:"文件读取出错"
    })
  }

});
module.exports = fileDeal
