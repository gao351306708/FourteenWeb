<template>
  <section class="home_section">
    <div class="centerDiv">
      <el-row style="position: relative">
        <el-col :span="12" class="leftsection">
          <el-card class="box-card">
            <div class="headerbgcolor">
            </div>
            <div class="content">
              <div class="centertext" @click="goPaiKe()">派 课</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" class="rightsection">
          <el-card class="box-card">
            <div class="headerbgcolor">
            </div>
            <div class="content">
              <div class="centertext" @click="goShangKe()">上 课</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import headHop from '../../components/headTop'
  import {doLogin,registerUser} from '../../api/user'
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
      async goPaiKe(){
        this.$router.push('manage')
      },
      async goShangKe(){
        let userid = JSON.parse(getStore('userInfo')).userId
        //获取上次上课的内容
        const result = await getCurrentCourseInfo({teacherId:userid})
        console.log("getCurrentCourseInfo----->>>>>上课信息",result)
        if(result.code == 200){
          if(result.data.length>0){
            console.log("调准到教师上课页面--------------------参数：",result.data[0])
            let dataParams = {};
            dataParams.teacherId = JSON.parse(getStore('userInfo')).userId;
            dataParams.centerId = JSON.parse(getStore('ClassUserList')).CenterID;
            dataParams.performanceID = result.data[0].courseId;//课程ID
            let url = 'https://nwprodsub.idiil.com.cn/SYSTEM/MathInteractive/OnlineBuildDataDeal/OnlineBuildDataDeal.jsp?InstructorID='+dataParams.teacherId+'&sCenterID='+dataParams.centerId+'&sPerformanceID='+dataParams.performanceID;
            console.warn("老师上课的地址url-->",url)
            window.open(url);
            return
          }else {
            this.$message({message: '派课已上完，请进入派课系统进行派课！',type:'warning'});
          }
        }else {
          console.error("出错了------！！！：",result.message)
        }
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .home_section{
    position: relative;
    height: 100%;
    background-color: rgb(50, 64, 87);
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
          width: 120px;
          height: 120px;
          margin-left: -60px;
          margin-top: -60px;
          cursor: pointer;
        }
      }
    }
  }
</style>
