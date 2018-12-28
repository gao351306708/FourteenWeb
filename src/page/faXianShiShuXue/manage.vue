<template>
  <div class="fillcontain">
    <el-row class="header-css">
      <el-col :span="12"><div class="header-left">线上派课系统</div></el-col>
      <el-col :span="12">
        <div class="header-right">
          <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="info" round size="small" class="el-dropdown-link">
              菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="exit">退出</el-dropdown-item>
              <el-dropdown-item command="res">返回</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <el-row style="height: 100%;">
      <el-col :span="3"  style="min-height: 100%; background-color: #324057;">
        <el-menu default-active="1" background-color="rgb(50, 64, 87)" text-color="#bfcbd9" hover-text-color="red" active-text-color="#20a0ff" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i><span>备课管理</span></template>
            <el-menu-item index="/manage/addClassManager">添加备课</el-menu-item>
            <el-menu-item index="/manage/classManagerList">课程列表</el-menu-item>
          </el-submenu>
          <el-menu-item index="/manage/editor"><i class="el-icon-menu"></i>编辑器管理</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21" style="height: 100%;overflow: hidden;">
        <router-view></router-view>
        <!--<keep-alive>-->
          <!---->
        <!--</keep-alive>-->
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {setStore,getStore,clearStore,setSession,clearSession} from '../../config/publicMethod'
  import {getClassList} from '../../api/classes'
  export default {
    //data中放入初始默认值
    data() {
      return {}
    },
    computed: {
      defaultActive: function(){
        return this.$router.path.replace('/', '');
      }
    },
    mounted(){
      //进入首页的时候存储一个课程列表
      this.getCourseList();
    },
    methods:{
      async getCourseList(){
        let classList = [];
        let userInfo = JSON.parse(getStore("userInfo"));
        let result = await getClassList({teacherId:userInfo.userId});//数据库获取教师的派课列表
        console.log("数据库获取教师的派课列表---classList----->>",result)
        if(result.data.length>0){
          setStore('classList',JSON.stringify(result.data));
        }else {
          setStore("classList",JSON.stringify(classList))
        }
      },
      handleCommand(command) {
        if(command == 'exit'){
          clearSession();
          this.$router.replace({path:'/'})
        }
      },
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .header-css{
    color: white;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: rgb(50, 64, 87);
    border-bottom: 1px solid hsla(0,0%,100%,.1);
    .header-left{
      float: left;
      font-size: 18px;
      margin-left: 40px;
    }
    .header-right{
      float: right;
      margin-right: 20px;
    }
  }
  .el-menu-item:hover{
    background-color: #232e3fa3 !important;
  }
  .el-submenu__title:hover{
    -webkit-transition: border-color .3s,color .3s !important;
    transition: border-color .3s,color .3s !important;
    background-color: #232e3fa3 !important;
  }
</style>
