<template>
  <div>
    <headHop></headHop>
    <section class="data_section">
      <header class="section_title">
        <el-row>
          <el-col :span="24">{{message}}</el-col>
        </el-row>
      </header>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import headHop from '../../components/headTop'
  import {doLogin,registerUser} from '../../api/user'
  export default {
    data(){
      return {
        message:"欢迎使用教师派课系统！"
      }
    },
    //引入的组件
    components: {
      headHop
    },
    methods:{
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .data_section{
    padding: 20px;
    margin-bottom: 40px;
  .section_title{
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .data_list{
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #E5E9F2;
  .data_num{
    color: #333;
    font-size: 26px;

  }
  .head{
    border-radius: 6px;
    font-size: 22px;
    padding: 4px 0;
    color: #fff;
    display: inline-block;
  }
  }
  .today_head{
    background: #FF9800;
  }
  .all_head{
    background: #20A0FF;
  }
  }
  .wan{
  .sc(16px, #333)
  }
</style>
