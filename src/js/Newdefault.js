
var	sMainWeb="https://nw.idiil.com.cn";
var m_sCourseType = "MM", m_sCurriculum = "C", m_strURL = "";
var m_sSerachText = "";
var m_xmldoc = null;
var sDoExercise = "Y";    // 2016-06-07
var nChpIndex = null;
var nUnitIndex = null;
var selectUnitName='';


var sPath = location.href;
if(sPath.split("")[4]=="s") {
  var nLen = "https://".length;
}else{
  var nLen = "http://".length;
}

function getHostName()
{
  var strURL = "nwdev.idiil.com.cn";
  return(strURL);
}

function onSearch()
{
  var sCurriculum = "", sCourseType = "MM", sSearchText = "";

  try
  {
    var n1 = document.all("radio1").length;
    for (var i=0; i<n1; i++)
    {
      if (document.all("radio1").item(i).checked == true)
      {
        sCurriculum = document.all("radio1").item(i).value;
        break;
      }
    }
    sSearchText = toTrim(document.getElementById('txtSearch').value)

    getCUData(sCourseType, sCurriculum);
    m_sCurriculum = sCurriculum;
    m_sCourseType = sCourseType;
    m_sSerachText = sSearchText

    FillChpList();
    var sCurriculumName = "", sCourseName = "数学";
    if (sCurriculum == "C"){
      sCurriculumName = "线上";
    }else if(sCurriculum == "SK"){
      sCurriculumName = "精进工坊";
    }else{
      sCurriculumName = "手写";
    }
    document.getElementById('tblTitle').innerHTML = sCourseName + sCurriculumName + "教材"
  }catch(e){}
  return true;
}
var isP="N";
function getCUData(sCourseType, sCurriculum)
{
  var strRet = "";

  m_xmldoc = new createXMLDoc();
  m_xmldoc.async = false;
    m_xmldoc.load("https://"+getHostName()+"/"+sCourseType+"_"+sCurriculum+".xml");
  console.log("55555555555555555555555555555",m_xmldoc)
}

function onlstChp(li)
{
  $("#lstChp li").css("background-color","");
  $(li).css("background-color","#bbb");
  var oOption = li;
  $("#lstChp").attr("selectedIndex",$(li).attr("Index"));
  FillUnitListByChp($(oOption).attr("value"));

  txtChpDesc.innerText = $(oOption).attr("Desc");
  lblChp.innerText = $(oOption).attr("Name");
}

function onlstUnit(li)
{
  $("#lstUnit li").css("background-color","");
  $(li).css("background-color","#bbb");
  var oOption = li;
  $("#lstUnit").attr("selectedIndex",$(li).attr("Index"));
  txtUnitDesc.innerText = oOption.getAttribute("Desc");
  selectUnitName = oOption.getAttribute("Desc");
  lblUnit.innerText = "-" + oOption.getAttribute("Name");
  $("#btnExercise").show();
  //fixed wangyang 2016-06-07
  if (sDoExercise=="No"){
    btnExercise.disabled = true;
  }else{
    btnExercise.disabled = false;
  }

}
function onNewPreview(NeedSubmitScore)
{
  nChpIndex = $("#lstChp").attr("selectedIndex");
  nUnitIndex = $("#lstUnit").attr("selectedIndex");

  var oOption = $("#lstChp li:eq("+nChpIndex+")")[0];
  var sCName = oOption.getAttribute("Name");
  var sCID=$(oOption).attr("value");


  oOption = $("#lstUnit li:eq("+nUnitIndex+")")[0];
  if(!oOption){
    alert('请在单元列表选择一个！');
    return false
  }
  var sUName = oOption.getAttribute("Name");
  var sUID = $(oOption).attr("value");
  var outputType= $(oOption).attr("OutputType");
  var dirName= $(oOption).attr("DirName");
  var globalID= $(oOption).attr("GlobalID");
  //getData(sCName,sUName);
  if (NeedSubmitScore=="M" && isP=="Y") return;
  // var newwin =
  var sssjson = {
    ChapterName:sCName,
    UnitName:sUName,
    CourseType:m_sCourseType,
    CID:sCID,
    UID:sUID,
    isP:"N",
    DirName:dirName,
    OutputType:outputType,
    selectUnitName:selectUnitName,
    selectType:m_sCurriculum,
    GlobalID:globalID
  }
  console.log("preview.jsp?ChapterName=" + sCName +"&UnitName=" + sUName +"&CourseType="+ m_sCourseType+"&CID="+ sCID+"&UID="+ sUID+"&NeedSubmitScore="+ NeedSubmitScore+"&isP=N&DirName="+dirName+"&OutputType="+outputType+"&selectUnitName="+selectUnitName);
  return sssjson
}

function FillChpList()
{
  $("#lstChp").html("");
  if (m_xmldoc == null) return;

  var root = null, iNode = null, oOption = null;
  var sName = "", sDesc = "";

  lstChp.length = 0;
  var strSearch = new String(m_sSerachText);

  if (strSearch == "")
  {
    root = m_xmldoc.documentElement;
    if (root == null) return;
    for (var i=0; i < root.selectNodes("//C").length; i++)
    {
      iNode =root.selectNodes("//C")[i];
      sName = iNode.getAttribute("Name");
      sDesc = iNode.getAttribute("Desc");

      lstChp.length = i+1;
      $("#lstChp").append("<li style='border-bottom: 1px solid #999'  value='"+iNode.getAttribute("ID")+"'>"+sName + " :" + sDesc+"</li>");
      //$("#lstChp").append("<li style='border-bottom: 1px solid #999' @click='onlstChp(this)'  value='"+iNode.getAttribute("ID")+"'>"+sName + " :" + sDesc+"</li>");
      $("#lstChp li:eq("+i+")").attr("Desc", sDesc);
      $("#lstChp li:eq("+i+")").attr("Name", sName);
      $("#lstChp li:eq("+i+")").attr("Index", i);
    }
  }else
  {
    var n = 0;
    root = m_xmldoc.documentElement;
    for (var i=0; i < root.selectNodes("//C").length; i++)
    {
      iNode =root.selectNodes("//C")[i];
      sName = new String(iNode.getAttribute("Name"));
      if (!compareString(sName.substring(0, strSearch.length).toUpperCase(), strSearch.toUpperCase())) continue;

      sDesc = iNode.getAttribute("Desc");

      lstChp.length = n+1;
      $("#lstChp").append("<li style='border-bottom: 1px solid #999' onClick='onlstChp(this)'  value='"+iNode.getAttribute("ID")+"'>"+sName + " : " + sDesc+"</li>");
      var lengthLi=$("#lstChp li").length;
      $("#lstChp li:eq("+(lengthLi-1)+")").attr("Desc", sDesc);
      $("#lstChp li:eq("+(lengthLi-1)+")").attr("Name", sName);
      $("#lstChp li:eq("+(lengthLi-1)+")").attr("Index", (lengthLi-1));
      n += 1;
    }
  }
  $("#lstChp li").on("click",function(){
    onlstChp(this);
  });


  if (lstChp.childNodes.length > 0)
  {
    $("#lstChp").attr("selectedIndex",0);
    var li=$("#lstChp li")[0];
    onlstChp(li);
  }else{lstUnit.length = 0;}
}

function FillUnitListByChp(sChpID)
{
  $("#lstUnit").html("");
  lstUnit.length = 0;

  if (m_xmldoc == null) return;
  var root = null, iNode = null, oOption = null;
  var sName = "", sDesc = "";

  root = m_xmldoc.documentElement.selectSingleNode("C[@ID='"+ sChpID +"']");
  if (root == null) return;

  for (var i=0; i<root.selectNodes("U").length; i++)
  {
    iNode = root.selectNodes("U")[i];
    sName = iNode.getAttribute("Name");
    sDesc = iNode.getAttribute("Desc");
    var sOutputType = iNode.getAttribute("OutputType");
    var dirName = iNode.getAttribute("DirName");
    var globalID = iNode.getAttribute("GlobalID");
    //$("#lstUnit").append("<li style='border-bottom: 1px solid #999' onClick='onlstUnit(this)'  value='"+iNode.getAttribute("ID")+"'>"+sName + " : " + sDesc.replace(/,/g,", ")+"</li>");
    $("#lstUnit").append("<li style='border-bottom: 1px solid #999'  value='"+iNode.getAttribute("ID")+"'>"+sName + " : " + sDesc.replace(/,/g,", ")+"</li>");

    lstUnit.length = i+1;
    $("#lstUnit li:eq("+i+")").attr("Desc", sDesc);
    $("#lstUnit li:eq("+i+")").attr("Name", sName);
    $("#lstUnit li:eq("+i+")").attr("Index", i);
    $("#lstUnit li:eq("+i+")").attr("OutputType", sOutputType);
    $("#lstUnit li:eq("+i+")").attr("DirName", dirName);
    $("#lstUnit li:eq("+i+")").attr("GlobalID", globalID);

  }
  $("#lstUnit li").bind("click",function(){
    onlstUnit(this);
  });
}

//-->
function getData(ChapterName,UnitName){
  //strtemp=window.location.href;
  //strtemp=window.location.href;
  //if(nLen == 7){ n1 = instr(8,strtemp ,"/");}
  //if(nLen == 8){ n1 = instr(9,strtemp ,"/");}
  sLocation=sMainWeb + "/SYSTEM/PUBLIC(MATH)/MathExerciseInfoCommit.asp?Action=GetData&ChapterName=" + ChapterName + "&UnitName=" + UnitName
  httpxml= new XMLHttpRequest();
  httpxml.open("POST", sLocation, false)
  sDoc= createXMLDoc();
  sTemp= createXMLDoc()
  xmlHHExerciseInfo= createXMLDoc()
  xmlHHExerciseInfo.loadXML("<root />");
  sTemp.loadXML("<Root></Root>");
  httpxml.send(sTemp)
  if(httpxml.responseText==""){ return false}

  sDoc.loadXML(httpxml.responseXML.xml);
  sValue=sDoc.documentElement.text;
  xmlHHExerciseInfo.documentElement.setAttribute("content",sValue);
  xmlHHExerciseInfo.save("c:\\temp\\0--0-temp.xml");
}
function compareString(str1,str2){
  if(Instr(1, str1, str2, 1) == 1){
    return true;
  }else{
    return false
  }
}
function toTrim(str){
  var strRet;
  strRet = trim(str);
  if(strRet == "*"){ strRet = ""}
  if(Right(strRet, 1) == "*"){ strRet = Left(strRet, len(strRet)-1)}
  return strRet
}
export{
  onSearch,
  onlstChp,
  onNewPreview,
  onlstUnit
}
