/**技术文档模块**/
<template>
  <router-view></router-view>
</template>

<script type="text/ecmascript-6">
  export default {
    //data中放入初始默认值
    data() {
      return {
      }
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
      top: 80px;
      bottom: 40px;
      left: 60px;
      right: 60px;
      background: url("/static/images/weekly1.png") no-repeat center;
      .section_left{
        position: absolute;
        top: 40px;
        bottom: 40px;
        left: 100px;
        right: 50%;
        img{
          position: absolute;
          height: 100%;
          left: 50px;
        }
      }
      .section_right{
        position: absolute;
        top: 20px;
        bottom: 20px;
        left: 50%;
        right: 50px;
        .text{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          p{
            margin: 15px 0;
            text-align: left;
          }
          .text1{
            color: #ffffff;
            font-size: 48px;
          }
          .text2{
            font-size: 24px;
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
