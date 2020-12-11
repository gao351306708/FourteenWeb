<template>
  <nav :class="{ navigation: true, active: true, top2: clientWidth < 860 }" router>
    <div class="list">
      <div style="margin-bottom: 8px" @click="arrowClick('pre')">
        <i class="el-icon-back arrowUp"></i>
      </div>
      <a v-for="(item, index) in navList" :class="['num' + (index + 1), { active: index + 1 == currentNum }]" @click="navClick(index)" :key="index">
        <div class="bannerSection">
          <span>{{ item.title }}</span>
        </div>
      </a>
      <div @click="arrowClick('next')">
        <i class="el-icon-back arrowDown"></i>
      </div>
    </div>
  </nav>
</template>
<script type="text/ecmascript-6">
export default {
  name: "NavMenu",
  data() {
    this.scrollFunc = null;
    return {
      clientWidth: document.body.clientWidth,
      navList: [
        {
          title: "首页",
          route: "/",
          routename: "Home",
          index: 1
        },
        {
          title: "娱乐",
          route: "/Amusement",
          routename: "Amusement",
          index: 2
        },
        {
          title: "技术文档",
          route: "/Blog",
          routename: "Blog",
          index: 3
        },
        {
          title: "大杂烩",
          route: "/AllMost",
          routename: "AllMost",
          index: 4
        }
      ],
      currentNum: 1
    };
  },
  watch: {
    currentNum(val) {
      //修改是否开启滚动你切换
      if (val == 4) {
        this.$store.commit("home/MSetScrollStatus", false);
      } else {
        this.$store.commit("home/MSetScrollStatus", true);
      }
    }
  },
  mounted() {
    this.setNavNum();
    //监听页面事件
    this.windowAddMouseWheel();
    window.onresize = () => {
      let screenWidth = document.body.clientWidth;
      this.clientWidth = screenWidth;
    };
  },
  methods: {
    arrowClick(param) {
      if (param == "pre") {
        if (this.currentNum != 1) {
          this.currentNum = this.currentNum - 1;
          this.changePage();
        }
      } else {
        if (this.currentNum != this.navList.length) {
          this.currentNum = this.currentNum + 1;
          this.changePage();
        }
      }
    },
    navClick(index) {
      this.currentNum = index + 1;
      this.changePage();
    },
    setNavNum() {
      let routename = this.$router.currentRoute.path.replace("/", ""); //当前路由name
      let navList = this.navList;
      for (let i in navList) {
        if (routename == navList[i].routename) {
          this.currentNum = navList[i].index;
          break;
        }
      }
    },
    windowAddMouseWheel() {
      let _this = this;
      var beforeTime = Date.now();
      this.scrollFunc = function (e) {
        console.log("当前路由", _this.$route.name);
        e = e || window.event;
        let el = "";
        if (e.wheelDelta) {
          el = e.wheelDelta; //判断浏览器IE，谷歌滑轮事件
        } else if (e.detail) {
          el = e.detail; //Firefox滑轮事件
        }
        if (el) {
          let afterTime = Date.now();
          if (el > 0) {
            //当滑轮向上滚动时
            if (afterTime - beforeTime >= 1000) {
              _this.scrollHandle("up");
            }
            beforeTime = afterTime;
          }
          if (el < 0) {
            //当滑轮向下滚动时
            if (afterTime - beforeTime >= 1000) {
              _this.scrollHandle("down");
            }
            beforeTime = afterTime;
          }
        } else {
          console.warn("您的浏览器不支持滚动事件");
        }
      };
      //给页面绑定滑轮滚动事件,注册事件
      if (document.addEventListener) {
        document.addEventListener("DOMMouseScroll", this.scrollFunc, false);
      }
      //滚动滑轮触发scrollFunc方法,IE、chrome、safira
      window.onmousewheel = document.onmousewheel = this.scrollFunc;
    },
    scrollHandle(direaction) {
      console.log("direaction", direaction);
      if (!this.$store.state.home.scrollStatus) {
        return;
      }
      if (direaction == "up") {
        if (this.currentNum > 1) {
          this.currentNum = this.currentNum - 1;
          this.changePage();
        }
      } else {
        if (this.currentNum < this.navList.length) {
          this.currentNum = this.currentNum + 1;
          this.changePage();
        }
      }
    },
    changePage() {
      let _this = this;
      $(".Layout").transition({
        opacity: 0.1,
        duration: 1000,
        easing: "linear",
        complete: function () {
          let navList = _this.navList;
          for (let i in navList) {
            if (_this.currentNum == navList[i].index) {
              _this.$router.push({ path: navList[i].route });
              $(".Layout").transition({
                opacity: 1,
                duration: 1000,
                easing: "linear"
              });
              break;
            }
          }
        }
      });
    }
  },
  destroyed() {
    //清除鼠标滚动事件
    if (document.addEventListener) {
      document.removeEventListener("DOMMouseScroll", this.scrollFunc, false);
    }
    window.onmousewheel = document.onmousewheel = null;
  }
};
</script>
<style lang="less" scoped>
.navigation {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: calc(50% - 120px);
  top: calc(50% - 120px);
  left: 1.5rem;
  width: 40px;
  z-index: 14;
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.3s, transform 0.3s;
  will-change: opacity, transform;
  a {
    display: inline-block;
    position: relative;
    width: 24px;
    height: 16px;
    padding: 0;
    cursor: pointer;
    transition: height 0.3s, transform 0.3s;
    .bannerSection {
      display: inline-block;
      position: relative;
      top: -8px;
      margin-top: 8px;
      height: 0px;
      line-height: 25px;
      border: 1px solid #d5d5d5;
      width: 100%;
      text-align: center;
      font-size: 0.875rem;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        display: block;
        padding: 5px;
      }
    }
  }
  a:hover,
  a.active {
    border: 1px solid #9c9c9c;
    .bannerSection {
      border: none;
      height: 100%;
    }
  }
  .num1:hover,
  a.num1.active {
    height: 60px;
  }
  .num2:hover,
  a.num2.active {
    height: 60px;
  }
  .num3:hover,
  a.num3.active {
    height: 110px;
  }
  .num4:hover,
  a.num4.active {
    height: 90px;
  }
  .arrowUp {
    font-size: 22px;
    transform: rotate(90deg);
    color: darkgray;
    cursor: pointer;
  }
  .arrowDown {
    font-size: 1.375rem;
    transform: rotate(-90deg);
    color: darkgray;
    cursor: pointer;
  }
}
.top2 {
  bottom: 20px !important;
  top: 50% !important;
}
</style>
