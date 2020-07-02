/**技术文档模块**/
<template>
  <div class="blog">
    <div class="section_container">
      <el-row :gutter="10" style="height: 100%">
        <el-col :xs="0" :md="12" class="section_left">
          <img class="leftImg" src="/static/images/attachment.jpg" />
        </el-col>
        <el-col :xs="24" :md="12" class="section_right">
          <div>
            <div class="title">
              <span>博</span>
              <span>客</span>
            </div>
            <div class="text">
              <p
                class="text2"
              >闲来无事记录下自己之前遇到的问题以及查找的相关资料，俗话说的好眼过千遍不如手过一遍，记录一下也会加强对问题的理解。也方便之后遇到同类问题可以快速的查找到相关的处理方法</p>
            </div>
            <div>
              <router-link to="/Blog/List">点击进入...</router-link>
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
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less" type="text/less">
@import "~@/assets/mixin.less";
.blog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .section_container {
    position: absolute;
    height: 98%;
    left: 3.75rem;
    right: 3.75rem;
    .section_left {
      position: relative;
      height: 100%;
      .leftImg {
        position: absolute;
        width: 80%;
        top: 15%;
        left: 3rem;
      }
    }
    .section_right {
      position: relative;
      height: 100%;
      .title {
        position: relative;
        top: 15%;
        font-size: 6rem;
        margin: 3rem 0;
        span {
          display: block;
          font-family: cursive;
        }
      }
      .text {
        position: relative;
        padding: 20px;
        p {
          margin: 15px 0;
          text-align: left;
          font-size: 1.5rem;
          line-height: 1.8;
        }
        .text1 {
          color: #ffffff;
          font-size: 3rem;
        }
      }
    }
  }
}
</style>
