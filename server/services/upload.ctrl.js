/**
 * 文件处理：上传、下载
 * Created by gaoju on 2018/1/16.
 */
var express = require('express');
var path = require('path')
var fs = require('fs')
var os = require('os')
var Helper = require('../util/helper');
const fileDeal = express.Router()

/*
 * 文件上传接口
 * */
fileDeal.post('/upload',async(req, res) => {
    var Files = req.files.file;
    var filename = Files.name;
    var filetype = Files.mimetype;
    var foldername=req.body.username;//用户名作为文件名
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
module.exports = fileDeal
