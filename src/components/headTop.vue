<template>
  <div class="header-container">
    <el-row>
      <el-col :span="12" class="header_section left">
        <router-link to="/">
          <img src="../../static/images/logo.png" />
        </router-link>
      </el-col>
      <el-col :span="12" class="header_section right">
        <div class="open" @click="openFlag=true">
          <span class="icon">
            <span class="bar index-1"></span>
            <span class="bar index-2"></span>
            <span class="bar index-3"></span>
          </span>
        </div>
      </el-col>
      <BackButton v-if="!$route.meta.nav" />
    </el-row>
    <header :class="openFlag?'full-header active': 'full-header'">
      <div class="inner-1">
        <div class="inner-2">
          <a class="close" @click="openFlag=false">
            <i class="el-icon-close" style="font-size: 36px"></i>
          </a>
          <div class="center_container">
            <p style="margin-top:25%">
              <span @click="clickPerson('back')">随便看看</span>
            </p>
            <p>
              <span @click="clickPerson('about')">看看你是谁</span>
            </p>
            <p>
              <span @click="clickPerson('contact')">我想要私信你</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script type="text/ecmascript-6">
import BackButton from "@/components/backButton.vue";
export default {
  data() {
    return {
      openFlag: false
    };
  },
  components: {
    BackButton
  },
  methods: {
    clickPerson(param) {
      if (param == "about") {
        this.$router.push({ path: "/About" });
      }
      if (param == "contact") {
        this.$router.push({ path: "/Contact" });
      }
      this.openFlag = false;
    }
  }
};
</script>
<style type="text/less" lang="less" >
@import "../assets/mixin.less";
.header-container {
  position: absolute;
  height: 80px;
  width: 100%;
  z-index: 16;
  background-color: #f8f8f8;
  .left {
    text-align: left;
    padding-left: 35px;
    img {
      width: 128px;
      height: 80px;
      cursor: pointer;
    }
  }
  .right {
    height: 80px;
    .open {
      display: block;
      position: absolute;
      width: 30px;
      height: 21px;
      top: 40%;
      left: 50%;
      cursor: pointer;
      z-index: 2;
      .icon {
        width: 25px;
        height: 14px;
        .bar {
          position: absolute;
          display: block;
          width: 100%;
          height: 2px;
          background: #000;
          transition: transform 0.2s cubic-bezier(0.75, 0, 0.5, 1);
          will-change: transform;
        }
        .index-2 {
          top: 50%;
          margin-top: -1px;
        }
        .index-3 {
          bottom: 0;
        }
      }
    }
    .open:hover {
      .index-1 {
        transform: translateX(-5px);
      }
      .index-2 {
        transform: translateX(5px);
      }
      .index-3 {
        transform: translateX(-5px);
      }
    }
  }
  .full-header {
    position: fixed;
    display: block;
    margin: 0;
    z-index: 16;
    pointer-events: none;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    .inner-1,
    .inner-2 {
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
    .inner-1 {
      position: absolute;
      background: #0e0e0e;
      transition: transform 1s;
      transition-timing-function: cubic-bezier(0.85, 0, 0.15, 1);
      will-change: transform;
      transform: translateY(-100%);
    }
    .center_container {
      position: absolute;
      width: 50%;
      height: 80%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      p {
        text-align: center;
        font-size: 2.5em;
        margin: 30px 0;
        color: white;
        cursor: pointer;
      }
      p span {
        display: inline-block;
        position: relative;
      }
      p span::before {
        content: "";
        display: inline-block;
        position: absolute;
        width: 0px;
        height: 5px;
        color: red;
        background-color: white;
        margin-top: 30px;
        margin-left: -20px;
        z-index: 39;
        transition: width 0.5s;
      }
      p span:hover:before {
        width: 120%;
      }
    }
    .close {
      display: block;
      position: absolute;
      left: 50%;
      top: 31px;
      width: 50px;
      height: 50px;
      margin: 0 0 0 -25px;
      color: white;
      z-index: 8;
      cursor: pointer;
      i {
        transition: transform 0.4s;
      }
      i:hover {
        transform: rotate(180deg);
        transition-delay: 0.1s;
      }
    }
    a {
      color: inherit;
      outline: none;
    }
  }
  .full-header.active {
    pointer-events: auto;
  }
  .full-header.active .inner-1,
  .full-header.active .inner-2 {
    transform: translateY(0);
  }
}
</style>
