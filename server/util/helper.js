/**
 * 服务端 工具
 * Created by gaoju on 2018/10/30.
 */
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

var helper = {

  // 获取本地时间字符串
  getTimeString: function(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' +
      date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() +
      ':' + date.getSeconds();
  },
  // MD5加密
  getMD5: function(str) {
    var md5 = crypto.createHash('md5');
    md5.update(str);
    return md5.digest('hex');
  },
  // 执行sql语句
  db_query: function(opt){
    opt.connect.getConnection(function(err, connection){
      if(err){
        opt.callback(err)//返回异常
      }else {
        connection.query(opt.sql,  function(err, res){
          if(err){
            console.log(`${opt.name} err: + ${err}`);
            opt.callback(err)//返回异常
          }else{
            console.log(`${opt.name} success!`);
            if (typeof(opt.callback) === 'function') {
              opt.callback(err, res);
            }
          }
        });
      }
      connection.release();//释放连接池
    });
  },
  // 反处理URL
  deParseURL:  function(url) {
    return url.replace(/\*/g, '&')
  },
  /*
   ** randomWord 产生任意长度随机字母数字组合
   ** randomFlag-是否任意长度。为true时： min-任意长度最小位[固定位数] max-任意长度最大位
   **randomFlag为false时，按照第二个参数来生成固定位数，
   * 防止出现重复结果，加上系统日期。
   */
  randomString: function(randomFlag,min,max){
    var date = new Date();
    var times = date.getTime();
    var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生位数
    if(randomFlag){
      range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
      pos = Math.round(Math.random() * (arr.length-1));
      str += arr[pos];
    }
    return str+times;
  },
  // 查看文件是否存在,存在即删除
  deleteFile: function (dirpath,fileurl) {
    const name = fileurl.split('/').pop();
    let path = dirpath+"/"+name;
    //判断文件是否存在，有则删除
    if (name && fs.existsSync(path)) {
      fs.unlink(path, function (err) {
        if (err) return console.log(err);
        console.log('文件'+name+'删除成功');
      });
    }else {
      console.log("文件不存在")
    }
  },
  // 为每一个学生创建上传文件的目录，用来存放上传文件
  createFolder: function (dirpath,name) {
    const new_dir = dirpath+'/'+name;
    //判断文件是否存在，没有则创建
    if (!fs.existsSync(new_dir)) {
      fs.mkdirSync(new_dir);
    }else {
      console.log("文件夹已存在")
    }
    return new_dir;
  },
  //获取当前用户最大的id  'IDIILMATH0000001'
  createUserId: function(data){
    let str1 = data.substr(9);
    let num = parseInt(str1);
    let len = 7;//固定八位
    num = parseInt(num, 10) + 1;
    num = num.toString();
    while(num.length < len) {
      num = '0' + num;
    }
    console.log("IDIILMATH"+num)
    return "IDIILMATH"+num
  },
  syncGetData:function(){
    var list = [];
    var p = new Promise(function(resolve, reject){resolve()})
    for(var i=0;i<10;i++){
      p = p.then(runAsync(i));
    }
    p.then(function(){
      console.log("最后一个完了",list)
    })
    function runAsync(i){
      var pro = function (){
        return new Promise(function(resolve, reject){
          //做一些异步操作
          setTimeout(function(){
            console.log('异步执行----(2)--->'+i);
            list.push(i)
            resolve();
          }, Math.round(Math.random()*1000))
        });
      }
      return pro;
    }
  },
  //返回当前时间 YY-MM-DD
  YY_MM_DD: function() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  YYMMDD:function(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + month  + strDate;
    return currentdate;
  },
  YYMM:function(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    var currentdate = '' + year + month;
    return currentdate;
  }

};

module.exports = helper;
