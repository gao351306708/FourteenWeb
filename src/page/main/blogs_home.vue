/**技术文档模块**/
<template>
  <div class="blog">
    <div class="section_container">
      <el-row :gutter="10" style="height: 100%">
        <el-col :xs="0" :md="12" style="height: 100%">
          <div class="section_left">
            <img src="../../../static/images/attachment.jpg">
          </div>
        </el-col>
        <el-col :xs="24" :md="12" style="height: 100%">
          <div class="section_right">
            <div class="text">
              <p class="text1">My Blog</p>
              <p class="text2">Cras congue et risus eget congue. Integer id justo non orci suscipit cursus a scelerisque libero. Fusce in tortor mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas euismod sed magna.</p>
              <p>
                <router-link to="/Blog/List"><el-button round>进 入</el-button></router-link>
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    //data中放入初始默认值
    data() {
      return {
      }
    },
    beforeMount(){
      let _this = this;
      $(".wrapper_door").transition({
        opacity: 1,
        duration: 1000,
        easing: 'linear'
      });
    },
    mounted(){
    },
    methods:{
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .blog{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  .section_container{
    position: absolute;
    height: 98%;
    left: 3.75rem;
    right: 3.75rem;
    background: url("/static/images/weekly1.png") no-repeat center;
    .section_left{
      position: absolute;
      top: 40px;
      bottom: 40px;
      left: 100px;
      img{
        position: absolute;
        height: 100%;
        left: 50px;
      }
    }
    .section_right{
      .text{
        position: absolute;
        padding: 20px;
        top: 50%;
        transform: translateY(-50%);
      p{
        margin: 15px 0;
        text-align: left;
      }
      .text1{
        color: #ffffff;
        font-size: 3rem;
      }
      .text2{
        font-size: 1.5rem;
        line-height: 34px;
        color: #f2ece2cf;
      }
      }
      .el-button.is-round{
        background-color: transparent;
        color: #fff;
        border: 2px solid #fff;
        padding: 12px 32px;
      }
      .el-button.is-round:hover{
        background-color: #fff;
        color: #ff895d;
      }
    }
  }
  }
</style>
