<template>
  <div class="translation">
    <div v-if="isLoading" class="main-loader">
      <div :class="!loadingTime ? 'loader-1 loading' : 'loader-1'">
        <div class="switch-wrapper">
          <div :class="switchlong ? 'line' : 'line active'"></div>
          <div class="switch">
            <div class="knot"></div>
            <div class="tassel" @click="manualSwitch"></div>
            <div class="pocket"></div>
            <div class="gap"></div>
          </div>
        </div>
        <div class="progressClassHoleTop">
          <div class="inHole"></div>
        </div>
        <div :class="{ progressClassGun: true, active: gunStart }"></div>
        <div class="progressClassTop"></div>
        <div class="ball" id="ball"></div>
        <el-progress :percentage="percentage" color="#daa520" class="progressClassMid"></el-progress>
        <div class="progressClassHoleBottom">
          <div class="inHole"></div>
        </div>
        <div class="progressClassBottom"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Bus from "@/js/bus.js"; //全局数据处理器
export default {
  name: "Translation",
  props: {
    start: {
      type: Boolean,
      default: true
    },
    end: {
      type: Function,
      default: () => true
    }
  },
  data() {
    return {
      loadingTime: true, //拉幕开始标志
      isLoading: false, //中间加载中线条
      percentage: 0,
      switchlong: true, //开关下拉动画
      gunStart: false, //开枪开始标志
      timer: null
    };
  },
  created() {
    //添加监听器，网页加载完之后启动开屏动画
    Bus.$on("colseLoading", this.colseLoading);
  },
  beforeMount() {
    this.runPercent();
  },
  methods: {
    //手动拽灯
    manualSwitch() {
      this.colseSwitch();
    },
    //进度条
    runPercent() {
      if (this.$route.path === "/" && !this.GLOBAL.unsplashLoading) {
        sessionStorage.setItem("unsplashLoading", "true"); //添加开屏动画标志
        this.isLoading = true;
        this.timer = setInterval(() => {
          this.percentage += 1;
        }, 100);
      }
    },
    colseLoading() {
      this.percentage = 100;
      clearInterval(this.timer);
      setTimeout(() => {
        this.ballScroll();
      }, 500);
    },
    //动画全部结束
    colseSwitch() {
      this.switchlong = false;
      clearInterval(this.timer);
      setTimeout(() => {
        this.loadingTime = false;
        this.switchlong = true;
        this.removeLoading();
      }, 1500);
    },
    //删除动画页面
    removeLoading() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    },
    //滚动小球实类
    ballScroll() {
      let _this = this;
      let ball = document.querySelector("#ball");
      if (!ball) return;
      let windowH = document.documentElement.clientHeight;
      let windowW = document.documentElement.clientWidth;
      let ballFlyWidth = windowW - 50; //球在上方飞到开关时水平的距离
      let ballFlyheight = 250 - 100; //球飞到开关时下落的高度
      let end1 = windowH - 152; //球落在斜坡上时
      let originTop = ball.offsetTop;
      let originLeft = ball.offsetLeft;
      let topReset = -30;
      let vt = 0; //自由落体速度
      let timer = setInterval(() => {
        if (ball.offsetTop > end1) {
          //到达斜坡上
          if (ball.offsetTop < windowH - 30) {
            //到达底部
            originTop += 4;
            ball.style.top = originTop + "px";
          }
          if (ball.offsetLeft < 60) {
            //到达洞口
            originTop += 2;
            ball.style.top = originTop + "px";
            if (ball.offsetTop > windowH) {
              //掉进底部洞里
              clearInterval(timer);
              let timer2 = setInterval(() => {
                //重新开始新的逻辑
                if (topReset < 68) {
                  ball.style.top = topReset + "px";
                  topReset += 2;
                } else {
                  if (!_this.gunStart) {
                    _this.gunStart = true; //在原来的后面加这个，打枪
                  }
                  ball.style.top = topReset + "px";
                  topReset += 1;
                  originLeft += (ballFlyWidth / ballFlyheight) * 1;
                  ball.style.left = originLeft + "px";
                  if (ball.offsetLeft > windowW - 100) {
                    clearInterval(timer2);
                    ball.style.display = "none";
                    document.querySelector(".switch-wrapper").className += " active"; //在原来的后面加这个，开始摇摆
                    setTimeout(() => {
                      _this.colseSwitch(); //摇摆完了
                    }, 2000);
                  }
                }
              }, 10);
            } else {
              originLeft -= 2;
              ball.style.left = originLeft + "px";
            }
          } else {
            originLeft -= 4;
            ball.style.left = originLeft + "px";
          }
        } else {
          vt = vt + 0.1; //模拟个自由落体的感觉
          originTop += vt;
          ball.style.top = originTop + "px";
        }
      }, 10);
    }
  }
};
</script>
<style lang="less" scoped>
.translation {
  .main-loader {
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // pointer-events: none; //事件可穿透
    .loader-1 {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #000000;
      transition: transform 1s;
      transition-timing-function: cubic-bezier(0.85, 0, 0.15, 1);
      will-change: transform;
    }
    .loading {
      transform: translateX(-100%);
    }
    .progressClassGun {
      position: absolute;
      top: 75px;
      background-color: #daa520;
      width: 8px;
      height: 18px;
    }
    .progressClassGun.active {
      width: 35px;
      transition: width 0.05s ease-in;
    }
    .progressClassTop {
      position: relative;
      top: 98px;
      background-color: #daa520;
      width: 60px;
      height: 5px;
    }
    .progressClassMid {
      position: relative;
      top: 50%;
    }
    .ball {
      position: absolute;
      top: 48%;
      right: 40px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #daa520;
      z-index: 105;
    }
    .progressClassBottom {
      position: absolute;
      bottom: 60px;
      right: -16px;
      background-color: #daa520;
      width: 250px;
      height: 5px;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
    .progressClassHoleTop {
      position: absolute;
      top: 0;
      left: 10px;
      width: 86px;
      height: 12px;
      background-color: #daa520;
      border-radius: 50%;
      .inHole {
        width: 66px;
        height: 6px;
        background-color: black;
        border-radius: 50%;
        transform: translate(10px, 5px);
      }
    }
    .progressClassHoleBottom {
      position: absolute;
      bottom: 0;
      left: 10px;
      width: 86px;
      height: 16px;
      background-color: #daa520;
      border-radius: 50%;
      .inHole {
        width: 66px;
        height: 8px;
        background-color: black;
        border-radius: 50%;
        transform: translate(10px, 2px);
      }
    }
    .switch-wrapper.active {
      animation: swing 2s alternate ease-in-out;
    }
    .switch-wrapper {
      position: absolute;
      background: #3e5163;
      right: 100px;
      z-index: 105;
      transform-origin: center top;
      .line {
        width: 10px;
        height: 250px;
        background: white;
      }
      .line.active {
        animation: changelong 1s ease-out;
      }
      .switch {
        .knot {
          cursor: pointer;
          background: #daa520;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 22px;
          bottom: 71px;
          border-radius: 50%;
          transform-origin: 50%;
        }
        .tassel {
          cursor: pointer;
          background: #daa520;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 105px;
          height: 75px;
          bottom: -2px;
          -webkit-clip-path: polygon(38% 0, 62% 0, 80% 100%, 20% 100%);
          clip-path: polygon(38% 0, 62% 0, 80% 100%, 20% 100%);
          border-radius: 50%;
          transform-origin: 50%;
        }
      }
      .pocket {
        background: #030f23;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        position: absolute;
        bottom: 23px;
        left: -34px;
      }
      .gap {
        background: #030f23;
        width: 20px;
        height: 20px;
        -webkit-clip-path: polygon(49% 0, 29% 100%, 56% 100%);
        clip-path: polygon(49% 0, 29% 100%, 56% 100%);
        position: absolute;
        bottom: 0;
        left: -22px;
      }
    }
  }
  @keyframes changelong {
    0% {
      height: 250px;
    }
    70% {
      height: 360px;
    }
    100% {
      height: 250px;
    }
  }
  @keyframes swing {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-15deg);
    }
    75% {
      transform: rotate(15deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
}
</style>
