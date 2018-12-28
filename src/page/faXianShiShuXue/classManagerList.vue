<template>
  <div>
    <head-top></head-top>
    <section class="classManagerList_section">
      <el-row>
        <el-col :span="4" style="margin-right: 10px;">
          <el-card class="box-card" style="height: 600px">
            <div slot="header" class="clearfix">
              <span>课程列表</span>
            </div>
            <div v-if="classList.length>0">
              <div class="text item classlist"
                   v-for="(item,index) in classList"
                   :id="'listitem' + index"
                   :key="index"
                   :class="{ listcolor:index==currentindex}"
                   @click="clickItem(item,index)">
                {{(index+1)+'、'+item.name}}
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" style="height: 100%;overflow: hidden" class="righttable">

          <el-card class="box-card" style="height: 600px">
            <div slot="header" class="clearfix">
              <span>课程描述</span>
              <el-button type="warning" size="small" style="float: right;margin-left: 5px"  @click="deleteCourseConfirm(tableData,currentindex)">删除</el-button>
              <el-button type="warning" size="small" style="float: right;" @click="dialogEditVisible = true">编辑</el-button>
              <el-button type="warning" size="small" style="float: right;" @click="goToClass(tableData)">上课</el-button>
            </div>
            <div class="text item">
              <table width="100%" height="500px" border="0" cellpadding="10">
                <tbody>
                <tr>
                  <td width="100px">课程名:</td>
                  <td>{{tableData.name}}</td>
                </tr>
                <tr>
                  <td>教学目标:</td>
                  <td>{{tableData.target}}</td>
                </tr>
                <tr>
                  <td>IDIIL课件:</td>
                  <td>
                    <div  v-if="sourceData.length>0">
                      <li class="resoucelist"
                          v-for="item1 in sourceData">
                        {{item1.name}}
                      </li>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>课外资料:</td>
                  <td>
                    <div v-if="otherSource.length>0">
                      <li class="resoucelist"
                          v-for="item2 in otherSource">
                        <span>{{item2.name}}</span>
                        <a :href="'/' + item2.response.file" :download="item2.name">下载</a>
                      </li>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>备注:</td>
                  <td>{{tableData.commits}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" style="height: 100%;" class="righttable">
        </el-col>
      </el-row>
      <el-dialog title="修改课程" :visible.sync="dialogEditVisible" @close="closeDialogHandle" v-if='dialogEditVisible'>
        <add-class :data="tableData" type="update" key="update"></add-class>
      </el-dialog>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import headTop from '../../components/headTop'
  import addClass from './addClass'
  import {setStore,getStore} from '../../config/publicMethod'
  import {toJson} from '../../config/methods'
  import {writeFileJson,doTestLogin} from '../../api/user'
  import {getClassList,updateDoingClassInfo,deleteClassListInfo} from '../../api/classes'
  import classData from '../../data/classlist'
  export default {
    data(){
      let classList = JSON.parse(getStore("classList"));
      return {
        classList:classList,
        tableData:classList.length>0 ? classList[0] : classData.classList,
        currentindex:0,//当前选择的列表
        isCollapse: false,
        dialogEditVisible:false,
        formLabelWidth: '90px',
        datetimes:''
      }
    },
    components:{
      headTop,
      addClass
    },
    activated() {
        //当切换路由的时候 如果需要 vue保存缓存的话，但是部分的值不需要，则可以在这里面重新赋值，如果没有keep-alive,则每次都会重新加载所有数据
//      this.getClassListInfo()
    },
    mounted(){
      $('.el-card__header').css('backgroundColor','#67c4ed');
      this.getClassListInfo()
    },
    computed: {
      sourceData() {
        let source = toJson(this.tableData.source);
        return source;
      },
      otherSource() {
        let othersource = this.tableData.otherSource?this.tableData.otherSource:this.tableData.othersource
        let othersource2 = toJson(othersource);
        return othersource2;
      },
    },
    methods: {
      async getClassListInfo(){
        let userInfo = JSON.parse(getStore("userInfo"));
        let classList2 = await getClassList({teacherId:userInfo.userId});//数据库获取教师的派课列表
        console.log("数据库获取教师的派课列表---classList2----->>",classList2)
        if(classList2.data.length>0){
          this.classList = classList2.data
          this.tableData = classList2.data[this.currentindex];
        }
        console.log("this.tableData--->>",this.tableData)
      },
      toJson:function(str){
        return toJson(str)
      },
      closeDialogHandle() {
        console.log("closeDialogHandle");
        //关闭修改弹框的之后重新加载一遍数据，刷新视图
        this.getClassListInfo()
      },
      clickItem(item,index){
        console.log(item,index)
        this.currentindex = index;
        this.tableData = this.classList[index]
      },
      async goToClass(tableData){
        console.log("跳转链接",tableData);
        const result1 = await updateDoingClassInfo(tableData);//更新数据库数据，保存当前正在做的课件信息
        if(result1.code == 200){
          if(result1.type == '1'){
            this.$alert("当前（ "+result1.data[0].name+" ）的课程还未讲完!", '提示：');
            return
          }
        }
        //将派课的参数上传。写入JSON中
        const result = await writeFileJson(tableData);
        if(result.code == 200){
          console.log("本地写入当前准备讲的课程的信息---writeFileJson--->",result.data)
        }else {
          console.error("写入当前准备讲的课程的信息---writeFileJson-- 失败->",result)
          return
        }
        //设置缓存，刚才派课的json数据
        setStore("ClassUserList",result.data);
        let dataParams = {};
        dataParams.teacherId = JSON.parse(getStore('userInfo')).userId;
        dataParams.centerId = result.data.CenterID;
        dataParams.performanceID = result.data.classList.courseId;//课程ID
        let url = 'https://nwprodsub.idiil.com.cn/SYSTEM/MathInteractive/OnlineBuildDataDeal/OnlineBuildDataDeal.jsp?InstructorID='+dataParams.teacherId+'&sCenterID='+dataParams.centerId+'&sPerformanceID='+dataParams.performanceID;
        console.warn("老师上课的地址url-->",url)
        window.open(url)
      },
      //删除课件处理函数
      deleteCourseConfirm(tableData,index){
        this.$confirm('此操作将永久删除该课件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCourse(tableData,index);
          //关闭修改弹框的之后重新加载一遍数据，刷新视图
          this.currentindex = 0;
          this.getClassListInfo()
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'});
        });
      },
      async deleteCourse(tableData,index){
        console.log("删除的课程",tableData,index)
        const result = await deleteClassListInfo(tableData);//删除课件
        if(result.code == 200){
          this.classList.splice(index,1);
          this.$message({type: 'success', message: '删除成功!'});
        }
      },
    }
  }
</script>

<style scoped lang="less" type="text/less">
  .classManagerList_section {
    padding: 20px;
    margin-bottom: 40px;
    .resoucelist{
      text-decoration: underline;
      margin: 5px 0;
    }
    .righttable table{
      border: 1px solid #999;
      tr td{
        border-top: 0;
        border-right: 1px solid #999;
        border-bottom: 1px solid #999;
        border-left: 0;

      }
    }
    .text {
      font-size: 14px;
      text-align: left;
    }
    .classlist{
      padding: 7px 4px;
      cursor: pointer;
      border-radius: 2px;
    }
    .item {
      margin-bottom: 5px;
    }
    .car_header{
      background-color: #67c4ed;
    }
    .listcolor{
      background-color: #ebeece;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .box-card {
      width: 100%;
    }
  }
</style>
