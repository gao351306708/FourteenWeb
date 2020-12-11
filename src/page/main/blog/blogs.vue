/**技术文档模块**/
<template>
  <div class="blog">
    <div class="section_container">
      <el-row style="height: 100%">
        <el-col :xs="0" :sm="12" class="section_left">
          <img class="leftImg" src="/static/images/attachment.jpg" />
        </el-col>
        <el-col :xs="24" :sm="12" class="section_right">
            <div class="title">
              博客
            </div>
            <div class="text">
              <p>闲来无事记录下自己之前遇到的问题以及查找的相关资料。</p>
              <p>俗话说的好眼过千遍不如手过一遍，记录一下也会加强对问题的理解。</p>
              <p>也方便之后遇到同类问题可以快速的查找到相关的处理方法</p>
            </div>
            <div class="look">
              <router-link to="/Blog/List">瞅瞅看</router-link>
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
      justify-content: center;
      position: relative;
      display: flex;
      height: 100%;
      align-items: center;
      .leftImg {
        width: 80%;
      }
    }
    .section_right {
      position: relative;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-around;
      height: 100%;
      .title {
        position: relative;
        font-size: 6rem;
        margin-top: 5rem;
        writing-mode: vertical-rl;
        writing-mode: tb-lr;
        font-family: cursive;
        letter-spacing: 28px;
      }
      .text {
        position: relative;
        padding: 20px;
        writing-mode: vertical-rl;
        writing-mode: tb-lr;
        height: 70%;
        letter-spacing: 7px;
        margin-top: 25%;
        p {
          margin: 15px 0;
          text-align: left;
          font-size: 1.5rem;
          line-height: 1.8;
          font-family: cursive;
        }
      }
      .look {
        display: flex;
        flex-direction: row-reverse;
        font-family: cursive;
        font-size: 20px;
        writing-mode: vertical-rl;
        writing-mode: tb-lr;
        font-family: cursive;
        margin-bottom: 10%;
        a{
          font-family: cursive !important;
        }
      }
    }
  }
}
</style>
