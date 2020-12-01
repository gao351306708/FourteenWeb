/**娱乐模块**/
<template>
  <div class="amusement">
    <el-row :gutter="10">
      <el-col :xs="0" :sm="12">
        <section class="section_left">
          <div class="video delay-1">
            <img width="478" height="354" src="@/assets/img/web/BNP.gif" />
          </div>
        </section>
      </el-col>
      <el-col :xs="24" :sm="12">
        <section class="section_right">
          <a class="visuals delay-1" @click="goToUrl(current)" @mouseenter="stopAutoChangePic()" @mouseleave="setAutoChangePic()">
            <span class="picture">
              <img :src="partList[current].imgUrl" />
            </span>
          </a>
          <div class="center_section">
            <div class="centerPart" v-for="(item, index) in partList" :key="index" @click="current = index">
              <div :class="index == current ? 'title_sec active' : 'title_sec'">{{ item.title }}</div>
              <div class="date_sec" v-if="index == current">
                <div class="top">{{ item.mouth }}</div>
                <span class="stroke"></span>
                <div class="bottom">{{ item.year }}</div>
              </div>
            </div>
            <div class="arrow" @click="goToUrl(current)">
              <i class="el-icon-back" style="width: 30px"></i>
            </div>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { getAllPhotos } from "@/api/unsplash.js";
export default {
  //data中放入初始默认值
  data() {
    return {
      partList: [
        {
          title: "图库",
          year: "2018",
          mouth: "9月",
          imgUrl: "../../../static/images/amusement1.jpg"
        },
        {
          title: "影视库",
          year: "2019",
          mouth: "1月",
          imgUrl: "../../../static/images/amusement2.jpg"
        }
      ],
      current: 0,
      interval: null,
      pictureList: []
    };
  },
  mounted() {},
  activated() {
    this.setAutoChangePic();
  },
  methods: {
    setAutoChangePic() {
      console.log("setAutoChangePic");
      if (!this.interval) {
        let len = this.partList.length,
          _this = this;
        this.interval = window.setInterval(function () {
          console.log("setInterval");
          if (_this.current == len - 1) {
            _this.current = 0;
          } else {
            _this.current = _this.current + 1;
          }
        }, 4000);
      }
    },
    //清除定时
    stopAutoChangePic() {
      console.log("stopAutoChangePic");
      if (this.interval) {
        window.clearInterval(this.interval); //清除定时
        this.interval = null;
      }
    },
    goToUrl(index) {
      console.log("goToUrl   --->", index);
      switch (index) {
        case 0:
          this.$router.push({
            path: "/Amusement/Picture"
          });
          break;
        case 1:
          this.$router.push({
            path: "/Amusement/Movie"
          });
          break;
        default:
          this.$router.push({
            path: "/Amusement/Picture"
          });
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.stopAutoChangePic();
    next();
  }
};
</script>

<style scoped lang="less" type="text/less">
@import "~@/assets/mixin.less";
.amusement {
  position: absolute;
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
      width: 578px;
      height: 454px;
      margin: -227px 0 0 -289px;
      video {
        width: 100%;
        height: 100%;
      }
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
    }
    .center_section {
      position: absolute;
      top: 50%;
      left: 15%;
      margin-top: -6.25rem;
      margin-left: 1.25rem;
      width: 10rem;
      z-index: 6;
      .centerPart {
        width: 12.5rem;
        height: 6.25rem;
        cursor: pointer;
        .title_sec {
          font-size: 2.5rem;
          font-family: -webkit-pictograph;
          text-align: left;
          font-weight: 600;
          font-style: normal;
          color: #2f2f2f96;
          margin-left: 3.75rem;
        }
        .title_sec.active {
          color: #000000;
        }
        .date_sec {
          position: absolute;
          font-size: 0.75rem;
          margin-top: -1.875rem;
          right: calc(100% - 24px);
          .top {
            position: absolute;
            white-space: nowrap;
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
        color: black;
        transform: rotate(180deg);
      }
      .arrow:hover {
        transform: translate(5px, 0px);
        cursor: pointer;
        color: brown;
      }
    }
  }
}
</style>
