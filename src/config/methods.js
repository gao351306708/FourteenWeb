/**
 * Created by gaoju on 2018/10/25.
 */

//var base = new Base64();
/*
 * 对象值解码
 * */
export function decodeData(data){
  if(typeof data == 'object'){
    for (let key in data){
      data[key] = Base64.decode(data[key])
    }
  }
  console.log(data)
}
export function toJson(str){
  if(!str || typeof(str)!='string'){
    return str
  }
  var _str = JSON.parse(str)
  return _str;
}
export function bodyUrlencoded(body){
  if(body){
    let data = Object.entries(body);
    let str = `${data[0][0]}=${data[0][1]}`;
    data.forEach((item,i) => {
      if (i>0) {
        let value = item[1] ? item[1].toString().replace(/\+/g,'%2B'):item[1];//替换参数中的+号
        str+= `&${item[0]}=${value}`;
      }
    })
    return str
  }else {
    return ''
  }
}
export const getNowFormatDate = {
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
  }
}

/*
 * 拼接url参数，新的学生端的,2018/12/11
 * */
export function filterWebUrl2(param,role){
  let endUrl = '';
  let teacherId = param.teacherId;
  let CenterID = param.CenterID;
  let CenterWeb = param.CenterWeb;
  let ClassID = param.ClassID;
  let CourseType = param.CourseType;
  let MainWeb = param.MainWeb;
  let StudentID = param.StudentID;

  endUrl = 'https://nwprodsub.idiil.com.cn/SYSTEM/MathInteractive/OnlineBulidDataDeal_1/OnlineBuildDataDeal_1.jsp?sCenterWeb=https://nwprodsub.idiil.com.cn&sMainWeb=https://nwdev.idiil.com.cn&sInstructorID='+teacherId+'&sStudentID='+StudentID+'&sCenterID='+CenterID;

  return endUrl
}
/*
 * 防抖动，处理click\scroll频繁出发事件时
 * */

export const Debounce =  function(fn, delayTime) {
  console.warn("Debounce----------进来了")
  var timeId;
  var _start = Date.now();
  //return function () {
  //  var _now = Date.now(), context = this, args = arguments;
  //  if (_now - _start >= delayTime) {
  //    fn.apply(context, args);
  //    _start = Date.now();
  //  }
  //}
}
