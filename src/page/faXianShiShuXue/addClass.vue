<template>
  <div class="addClass">
    <section class="data_section">
      <el-dialog
        width="30%"
        title="添加组"
        :visible.sync="innerDialogVisible"
        append-to-body>
        组名：<el-input v-model="addNewGroupName" style="width: 30%"></el-input>
        <el-button type="primary" @click="addGroupNameHandle()">确定</el-button>
      </el-dialog>
      <el-form :model="form">
        <el-row>
          <el-col :span="11">
            <el-form-item label="课程名:" :label-width="formLabelWidth">
              <el-input v-model="form.name"></el-input>
            </el-form-item></el-col>
          <el-col :span="11">
            <el-form-item label="教学目标:" :label-width="formLabelWidth">
              <el-input v-model="form.target"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="IDIIL课程:" :label-width="formLabelWidth" style="text-align: left">
          <el-row>
            <el-col :span="6"><el-button size="mini" @click="DialogIdiilVisible = true;">添加IDIIL课程</el-button></el-col>
            <el-col :span="14"><li v-for="(item,index) in sourceList"><span>{{(index+1) + '、'+item.name}}</span>
              <i style="margin-left: 5px;cursor: pointer" class="el-icon-close" @click="deleteResource(index)"></i></li></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="课外资料:" :label-width="formLabelWidth" style="text-align: left">
          <el-row><el-col :span="12">
            <el-upload ref="upload"
                       :file-list="fileList"
                       action="/api/file/upload"
                       :on-remove="handleFileRemove"
                       :auto-upload="false"
                       :on-change="changeFileHandle"
                       :on-success="uploadSuccess"
                       :on-error="uploadError"
                       :data="uploadParam"
                       :before-upload="beforeUpload"
                       :limit=5
                       multiple>
              <el-button slot="trigger" size="mini" type="primary">选择文件</el-button>
              <el-button size="mini" type="success" @click="submitUpload">上传</el-button>
            </el-upload>
          </el-col></el-row>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.commits"></el-input>
        </el-form-item>
        <el-form-item label="学生分组:" :label-width="formLabelWidth">
          <div>
            <el-transfer
              style="text-align: left;"
              v-model="form.studentGroup.nowList"
              :titles="form.studentGroup.nowGroup"
              @change="handleChange"
              :data="studentData"
              :key="type">
              <span slot-scope="{ option }">{{ option.userName }}</span>
              <el-button class="transfer-footer" slot="right-footer" type="primary" size="small" @click="addGroupData()">确定</el-button>
              <el-button class="transfer-footer" slot="right-footer" type="primary" size="small" @click="resize()">从新分组</el-button>
              <el-button class="transfer-footer tianjiazu" slot="right-footer" size="small" @click="innerDialogVisible = true">新建组</el-button>
            </el-transfer>
            <el-collapse v-model="activeNames" style="text-align: left">
              <el-collapse-item  v-for="(group,index) in form.studentGroup.groups" :name="index" :key="index">
                <template slot="title">{{group.name}}
                  <el-button @click.stop="editGroup(group,index)" style="margin-left: 10px" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                </template>
                <el-tag
                  v-for="(item,index) in group.studentItem"
                  :key="index"
                >
                  {{item.userName}}
                </el-tag>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-form-item>
      </el-form>
      <div style="margin-top: 50px;">
        <el-button type="primary" @click="submitAllData">提 交</el-button>
      </div>
    </section>
    <el-dialog
      width="60%"
      title="添加课程"
      :visible.sync="DialogIdiilVisible"
      :close-on-click-modal="false"
      append-to-body
      v-if='DialogIdiilVisible'>
      <select-class v-on:selectClassHandle="selectClassHandle"></select-class>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import headTop from '../../components/headTop.vue'
  import selectClass from '../../components/selectClassDom.vue'
  import classData from '../../data/classlist'
  import {getNowFormatDate,filterWebUrl,toJson} from '../../config/methods'
  import {setStore,getStore} from '../../config/publicMethod'
  import {uploadFile} from '../../api/upload'
  import {addClassListInfo,updateClassListInfo} from '../../api/classes'
  export default {
    props:['data','type','addFlag'],
    data(){
      let classData1 = JSON.stringify(classData);
      return {
        studentData: [],
        studentAllData: [],//学生的总列表，一直不变 在重置的时候需要
        direction:'',//学生分组方向
        activeNames: ['1'],
        innerDialogVisible:false,
        DialogIdiilVisible:false,
        formLabelWidth: '90px',
        addNewGroupName:'',
        form: JSON.parse(classData1).classList,
        sourceList:[],//idiil课件list
        fileList:[],
        uploadParam:{
          username:JSON.parse(getStore('userInfo')).userName
        }
      }
    },
    computed: {
      sourceData() {
        let changeValue = this.form.studentGroup.nowList;
        return this.studentData.filter(item => changeValue.indexOf(item.key) === -1);
      },
    },
    watch:{
      //当监听的属性值变化的时候 会执行对应的处理逻辑
      addFlag:function(newValue,oldValue){
        console.error("watch 监听数据-----》",newValue,oldValue)
//        let classData1 = JSON.stringify(classData);
//        this.form = JSON.parse(classData1).classList
      },
      $route:function(to,from){
        console.error("watch 监听数据--$route--11-》",to,from)
      },
      '$route' (to, from) {
        console.error("watch 监听数据--$route--22-》",to,from)
      },
      beforeRouteUpdate (to, from, next) {
        console.error("watch 监听数据--beforeRouteUpdate--33-》",to,from)
      }
    },
    components:{
      headTop,
      selectClass
    },
    mounted(){
      const Wh = $(window).height();
      console.log('222222222222--->',this.data,this.type)
      fetch('static/ClassUserList.json').then((response)=>{
        return response.json();
      }).then((res)=>{
        if(this.type == 'update'){
          this.form.studentGroup = toJson(this.data.group_student_Info);
          this.sourceList = toJson(this.data.source);//之前的idiil课件list
          this.fileList = toJson(this.data.otherSource);//之前的上传文件
          this.form.otherSource = toJson(this.data.otherSource);//之前的上传文件
          this.form.source = toJson(this.data.source);//之前的上传文件
          this.form.name = this.data.name;//之前的上传文件
          this.form.target = this.data.target;//之前的上传文件
          this.form.commits = this.data.commits;//之前的上传文件
          this.form.courseId = this.data.courseId;//之前的上传文件
        }else {
          this.studentData = res.StudentList;
          this.studentAllData = res.StudentList;
          console.warn("获取学生数据:::::",this.studentData)
        }
      }).catch(()=>{
        console.error("获取学生数据出错")
      })
    },
    methods: {
      handleChange(value, direction, movedKeys) {
        console.log("studentData", this.studentData);
        console.log("value", value);
        console.log("direction", direction);
        console.log("movedKeys", movedKeys);
        this.direction = direction;
        this.form.studentGroup.nowList = value;
      },
      // 确定按钮 --往组里面加数据
      addGroupData(){
        let form = this.form;
        let endnowList = this.filterNowList(form.studentGroup.nowList);//选中的学生列表，要添加到组里面的
        let nowgroupname = form.studentGroup.nowGroup[1];//当前修改的是哪一个组
        let group = form.studentGroup.groups;//当前所有组的信息
        if($.inArray(nowgroupname,form.studentGroup.groupArray) != -1){//已存在
          for(let ii in group){
            if(group[ii].name == nowgroupname){//改组已经存在 则修改
              form.studentGroup.groups[ii].studentItem = form.studentGroup.groups[ii].studentItem.concat(endnowList);
            }
          }
        }else {
          form.studentGroup.groupArray.push(nowgroupname)
          form.studentGroup.groups.push({
            name:nowgroupname,
            studentItem : endnowList
          })
        }
        this.studentData = this.sourceData;//移除后的学生列表数组 赋值给 学生源数组
      },
      // 从新分组
      resize(){
        console.log("删除组--",this.form.studentGroup,this.studentAllData);
        this.form.studentGroup = {
          groupArray:[],//创建的组
          nowGroup:['学生列表','默认组'],//当前正在修改的组
          nowList:[],//当前正在修改的组的数据
          nowStudentData:[],
          groups:[]
        }
        this.studentData = this.studentAllData;//重置
      },
      //修改某个组的成员
      editGroup(item,index){
        console.log("编辑组",item.name,index);
        this.form.studentGroup.nowGroup.splice(1,1,item.name);//由于vue修改数组中的某个值不会触发更新。所以使用splice来返回新的数组
        let studentitem = this.form.studentGroup.groups[index].studentItem;//要编辑的组的学生列表
        let nowList=[];
        for(let ii in studentitem){
          nowList.push(studentitem[ii].key)
        }
        this.form.studentGroup.nowList = nowList;
        this.studentData = this.studentData.concat(studentitem);
        this.form.studentGroup.groups[index].studentItem = [];//修改的时候 把组内的学生删除了
        console.log(this.form.studentGroup.nowList,this.studentData)
      },
      //新加学生分组组名的判断函数
      addGroupNameHandle(){
        if($.inArray(this.addNewGroupName,this.form.studentGroup.groupArray) != -1){//已存在
          return this.$alert('提示：改组已经存在，请重新输入组名！')
        }
        this.innerDialogVisible = false;
        this.form.studentGroup.nowList = [];//清空分组框中的内容
        this.form.studentGroup.nowGroup.splice(1,1,this.addNewGroupName);
        this.form.studentGroup.groupArray.push(this.addNewGroupName);//添加新的组名
        this.form.studentGroup.groups.push({
          name:this.addNewGroupName,
          studentItem : []
        })
        console.log("添加的新租、",this.addNewGroupName)
      },
      submitUpload() {
        const data = new FormData();
        data.append("files", this.$refs.upload.uploadFiles);
        data.append("username", JSON.parse(getStore('userInfo')).userName);
        console.log("upload--->",this.$refs.upload)
        this.$refs.upload.submit(); //上传文件 "/api/file/upload"
      },
      //全部提交按钮事件
      async submitAllData(){
        this.form.source = this.sourceList;
        this.form.datetime = getNowFormatDate.YY_MM_DD();
        this.form.teacherId = JSON.parse(getStore('userInfo')).userId;
        this.form.teacherName = JSON.parse(getStore('userInfo')).userName;
        this.form.subjectName = '数学';
        if(this.form.name=='' || this.form.target=='' || this.form.source.length==0 ){
          return this.$alert("课程名、教学目标、教学资源等内容不能为空！")
        }
        console.log("提交所有的数据",this.form,this.type)
        let classList = JSON.parse(getStore("classList"));
        classList.push(this.form);
        if(this.type == 'add'){
          const  result = await addClassListInfo(this.form)//存入数据库
          setStore("classList",JSON.stringify(classList))//存放在本地缓存里面
          this.$message({message: '提交成功！',type:'success'});
        }else if(this.type == 'update'){
          const  result = await updateClassListInfo(this.form)
          this.$message({message: '修改成功！',type:'success'});
        }else {
          this.$message({message: '没有操作类型,什么都没有做^—^！',type:'warning'});
        }
      },
      //删除选择的上传文件
      handleFileRemove(file){
        let filterNowList = this.fileList;
        for(let ii in filterNowList){
          if(filterNowList[ii].uid == file.uid){
            filterNowList.splice(ii,1)
            break;
          }
        }
        console.log("删除的文件：：：：",file, this.fileList);
      },
      //添加外部文件时的处理函数
      changeFileHandle(file){
        console.log("改变文件：：：：",file, this.fileList);
      },
      beforeUpload(file){
        //在这里可以做文件上传之前的操作
        console.log("文件上传之前：：：：",file);
      },
      //文件上传成功
      uploadSuccess(response, file, fileList){
        console.log("上传成功：：：：",response,file,fileList);
        this.form.otherSource = fileList;
        this.$message({message: '上传成功！',type:'success'});
      },
      //文件上传失败处理
      uploadError(err, file, fileList){
        console.log("上传失败：：：：",err,file,fileList);
        this.$message({message: '上传成功！',type:'error'});
      },
      //删除IDIIL课程列表中的某项
      deleteResource(index){
        this.sourceList.splice(index,1)
      },
      //选择完课程之后的处理逻辑
      selectClassHandle(param){
        let ClassUserInfo = JSON.parse(getStore("ClassUserList"));
        let UserInfo = JSON.parse(getStore("userInfo"));
        console.log("选择的链接---》",ClassUserInfo,ClassUserInfo.CenterID)
        let objParam={
          sChapterID:param.CID,
          sUnitID:param.UID,
          sChapterName:param.ChapterName,
          sUnitName:param.UnitName,
          sDirName:param.DirName,
          sCenterID : ClassUserInfo.CenterID,
          sCenterWeb : ClassUserInfo.CenterWeb,
          sMainWeb : ClassUserInfo.MainWeb,
          sAssignID : ClassUserInfo.ClassID,
          sPerformanceID : ClassUserInfo.ClassID,
          InstructorID : UserInfo.InstructorID,
          OutputType:param.selectType,
          GlobalID:param.GlobalID
        }
        let urlEnd = filterWebUrl(objParam);
        let urlJson= {
          name:param.selectUnitName,
//          url:urlEnd,
          params:objParam,
          type:"class",
          uid: new Date().getTime()
        }
        this.sourceList.push(urlJson)
        this.$message({'type':'success',message:"添加成功！"})
      },
      //获取选中的学生的信息
      filterNowList(data){
        let result = [];
        for(let ii in data){
          for(let jj in this.studentData){
            if(this.studentData[jj].key == data[ii]){
              result.push(this.studentData[jj])
            }
          }
        }
        return result
      }
    }
  }
</script>

<style scoped  lang="less" type="text/less">
  .addClass{
    .data_section {
      padding: 20px;
      margin-bottom: 40px;
      .righttable table{
        border: 1px solid #999;
        tr td{
          border-top: 0;
          border-right: 1px solid #999;
          border-bottom: 1px solid #999;
          border-left: 0;

        }
      }
      .transfer-footer {
        margin-left:10px;
        padding: 6px 5px;
      }
      .el-tag{
        margin: 0 3px;
      }
      .tianjiazu{
        float: right;
        margin: 6px 0 0 5px;
      }
    }
  }
</style>
