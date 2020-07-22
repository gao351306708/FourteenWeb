/**首页模块**/
<template>
  <div class="Home">
    <el-row :gutter="10">
      <el-col :xs="0" :sm="12">
        <section class="section_left">
          <div class="video delay-1">
            <video
              width="478"
              height="354"
              muted
              preload="auto"
              id="animationVideo1"
              src="/static/media/Latest_work_fond.mp4"
            ></video>
          </div>
        </section>
      </el-col>
      <el-col :xs="24" :sm="12">
        <section class="section_right">
          <a class="visuals delay-1">
            <span class="picture">
              <img src="/static/images/page_chapitre720x1000.jpg" />
            </span>
            <span class="video_container">
              <span class="video">
                <video
                  muted
                  preload="auto"
                  id="animationVideo2"
                  src="/static/media/texte_animation.mp4"
                ></video>
              </span>
            </span>
          </a>
          <div class="center_section">
            <div class="top_sec">
              FourteenWeb/
              <br />个人网站
            </div>
            <div class="title_sec">STARTING</div>
            <div class="date_sec">
              <div class="top">{{year}}</div>
              <span class="stroke"></span>
              <div class="bottom">{{mouth}}</div>
            </div>
            <div class="arrow">
              <router-link to="/Amusement/Picture">
                <i class="el-icon-back" style="width: 30px"></i>
              </router-link>
            </div>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import Bus from "@/js/bus.js";
export default {
  // data中放入初始默认值
  name: "home",
  data() {
    return {
      year: new Date().getFullYear()
    };
  },
  computed: {
    mouth() {
      let date = new Date();
      return date.getMonth() + 1;
    }
  },
  mounted() {
    setTimeout(() => {
      Bus.$emit("colseLoading");
    }, 2000);
    var video2 = document.getElementById("animationVideo2");
    var video1 = document.getElementById("animationVideo1");
    if (video2 && video1.paused) {
      video1.play();
    }
    $(".video_container .video").hover(function() {
      if (video2 && video2.paused) {
        video2.play();
      }
    });
  },
  methods: {}
};
</script>

<style scoped lang="less" type="text/less">
@import "../../assets/mixin.less";
.Home {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .section_left {
    position: relative;
    height: 85vh;
    left: 40px;
    .video {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 478px;
      height: 354px;
      margin: -177px 0 0 -239px;
    }
    .delay-1 {
      transition-delay: 0.05s;
    }
  }
  .section_right {
    position: relative;
    height: 85vh;
    right: 40px;
    .visuals {
      display: block;
      position: absolute;
      right: 0;
      left: 25%;
      height: 100%;
      background: #cfd2d2;
      z-index: 1;
      cursor: pointer;
      .picture {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        img {
          position: relative;
          height: 100%;
          width: 100%;
          left: 0;
        }
      }
      .video_container {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .video {
          opacity: 0;
          transition: opacity 0.8s;
          will-change: opacity;
          video {
            width: 100%;
            height: 100%;
            opacity: 0.99;
            object-fit: fill;
          }
        }
        .video:hover {
          opacity: 1;
        }
      }
    }
    .delay-1 {
      transition-delay: 0.05s;
    }
    .center_section {
      position: absolute;
      top: 50%;
      left: 15%;
      margin-top: -5rem;
      width: 12.5rem;
      height: 9.375rem;
      z-index: 6;
      .title_sec {
        font-size: 4.0625rem;
        width: 25rem;
        margin: 0 0 0.625rem 0px;
        font-family: cursive;
        font-weight: 600;
        font-style: normal;
        color: rgb(0, 0, 0);
      }
      .top_sec {
        position: absolute;
        top: -4.375rem;
        left: 2.625rem;
        font-family: Mensch;
        font-weight: 400;
        font-size: 0.875rem;
      }
      .date_sec {
        position: absolute;
        top: 1.375rem;
        right: calc(100% - 13px);
        .top {
          position: absolute;
          right: 0;
          bottom: 0.3125rem;
          font-family: cursive;
        }
        .stroke {
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 1px;
          background: #000;
          transform: scaleX(1);
        }
        .bottom {
          position: absolute;
          top: 5px;
          right: 0;
        }
      }
      .arrow {
        display: block;
        width: 40px;
        font-size: 1.75rem;
        margin: 0 0 0 64px;
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
}
</style>
