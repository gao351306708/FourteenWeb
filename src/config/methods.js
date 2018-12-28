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

//拼接url参数
export function filterWebUrl(param,role){
  let endUrl = '';
  var sChapterID=param.sChapterID,sUnitID=param.sUnitID,sChapterName=param.sChapterName,sUnitName=param.sUnitName,sDirName=param.sDirName;
  var sCenterID = param.sCenterID,sCenterWeb = param.sCenterWeb,sMainWeb = param.sMainWeb;
  var InstructorID = param.InstructorID;
  var sAssignID = param.sAssignID;
  var sPerformanceID = param.sPerformanceID;//随机的 课的ID
  var sStudentID=param.sStudentID;
  var type = param.OutputType;
  var ExerciseID = sChapterID + sUnitID;

  if(role == '1'){//学生端
    if(type == 'P'){//手写
      endUrl = 'http://nwdev.idiil.com.cn/System/General/Print/Print_Preview/PrintAndPreviewForEgrade-test.asp?ExerciseID='+ExerciseID +'-01'
    }else {//线上
      endUrl = sCenterWeb+"/SYSTEM/MathInteractive/OnlineBulidDataDeal_1/OnlineBuildDataDeal_1.jsp?sChapterID="+sChapterID+"&sUnitID="+sUnitID+"&sChapterName="+
        sChapterName+"&sUnitName="+sUnitName+"&sDirName="+sDirName+ "&sCenterID="+sCenterID+"&sCenterWeb="+ sCenterWeb+"&sMainWeb="+
        sMainWeb+"&InstructorID="+InstructorID+"&sAssignID="+sAssignID+"&sPerformanceID="+sPerformanceID+"&sStudentID="+sStudentID
    }
  }else {
    endUrl = sCenterWeb+"/SYSTEM/MathInteractive/OnlineBuild.jsp?sChapterID="+sChapterID+"&sUnitID="+sUnitID+"&sChapterName="+
      sChapterName+"&sUnitName="+sUnitName+"&sDirName="+sDirName+ "&sCenterID="+sCenterID+"&sCenterWeb="+ sCenterWeb+"&sMainWeb="+
      sMainWeb+"&InstructorID="+InstructorID+"&sAssignID="+sAssignID+"&sPerformanceID="+sPerformanceID+"&sStudentID="+sStudentID+"&OutputType="+param.classType
  }
  return endUrl
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
