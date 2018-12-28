<template>
  <section class="home_student_section">
    <header>
      <el-row>
        <el-col :span="24">
          <div class="headertext">学生首页</div>
        </el-col>
      </el-row>
    </header>
    <div class="centerDiv">
      <el-row style="position: relative">
        <el-col :span="12" class="leftsection">
          <el-card class="box-card">
            <div class="headerbgcolor">
            </div>
            <div class="content">
              <div class="centertext" @click="goSys('1')">智能中考系统</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" class="rightsection">
          <el-card class="box-card">
            <div class="headerbgcolor">
            </div>
            <div class="content">
              <div class="centertext" @click="goSys('2')">发现式数学课堂</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import headHop from '../../components/headTop'
  import {doTestLogin} from '../../api/user'
  import {filterWebUrl2} from '../../config/methods'
  import {getCurrentCourseInfo,getClassList} from '../../api/classes'
  import {getStore,setStore} from '../../config/publicMethod'
  export default {
    data(){
      return {
        message:"首页页面"
      }
    },
    //引入的组件
    components: {
      headHop
    },
    methods:{
      async goSys(param){
        let location = window.location;
        let origin = window.location.origin;
        console.log("window.location--,--origin",window.location,origin)
        switch (param){
          case '1':
            window.open("http://" + location.hostname + ":10008");//跳转到智能中考系统
            break;
          case '2':
            const userInfo = this.$route.params;
            const dataList = await doTestLogin('/static/ClassUserList.json');
            console.warn("获取课堂数据:::::",userInfo,dataList)
            let dataParams={};
            dataParams.teacherId = dataList.classList.teacherId;
            dataParams.CenterID = dataList.CenterID;
            dataParams.CenterWeb = dataList.CenterWeb;
            dataParams.ClassID = dataList.ClassID;
            dataParams.CourseType = dataList.CourseType;
            dataParams.MainWeb = dataList.MainWeb;
            dataParams.StudentID = userInfo.userId;
            let urlEnd = filterWebUrl2(dataParams,"1");
            console.warn("获取课堂地址:::::",urlEnd)
            window.open(urlEnd);//跳转到发现式数学课堂
            break;
          default:
                break;
        }
      },
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .home_student_section{
    position: relative;
    height: 100%;
    background-color: rgb(50, 64, 87);
    header .headertext{
      font-size: 30px;
      color: white;
      padding: 15px;
    }
  .centerDiv{
    position: absolute;
    width: 65%;
    height: 500px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  .leftsection{
    height: 500px;
    padding: 50px 100px;
  .headerbgcolor{
    height: 40px;
    background-color: #71b7ee;
  }
  }
  .rightsection{
    height: 500px;
    padding: 50px 100px;
    .headerbgcolor{
      height: 40px;
      background-color: #cd85e2;
    }
  }
  .content {
    position: relative;
    font-size: 48px;
    height: 350px;
    background-color: rgba(248, 241, 225, 1);
  .centertext{
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    width: 240px;
    margin-left: -120px;
    margin-top: -60px;
    cursor: pointer;
  }
  }
  }
  }
</style>
