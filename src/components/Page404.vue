<template>
  <div class="NoPage">
    <div class="code">404</div>
    <div class="message">{{message}}</div>
    <div class="back">
      <p>返回首页</p>
      <router-link to="/" class="arrow">
        <i class="el-icon-back" style="width: 30px"></i>
      </router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "NoPage",
  props: {
    message: {
      type: String,
      default: "页面跑不见了..."
    }
  }
};
</script>
<style lang="less" scoped>
.NoPage {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 70%;
  }
  .code {
    font-size: 15rem;
    font-family: Mohave;
    font-weight: 600;
    color: #000;
  }
  .message {
    font-family: Mensch;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 2rem;
    color: #898989;
  }
  .back {
    margin-top: 30px;
    color: #8a8a8a;
    .arrow {
      display: block;
      width: 40px;
      font-size: 1.75rem;
      transition: transform 0.3s;
      will-change: transform;
    }
    .arrow i {
      transform: rotate(180deg);
    }
    .arrow:hover {
      transform: translate(5px, 0px);
      cursor: pointer;
    }
  }
}
</style>
