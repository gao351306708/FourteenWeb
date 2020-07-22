/**about Me**/
<template>
  <div class="aboutMe">
    <div class="section_container">
      <div class="top-section">
        <img src="../../../static/images/aboutHu.jpg" />
        <div class="context-section">
          <p style="font-size:2em">我</p>
          <p style="font-size: 1.2em">不知道说什么</p>
          <p style="font-size: 1.2em">
            {{content2}}
            <span class="guangbiao">|</span>
          </p>
        </div>
      </div>
      <div class="middle-section">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="16">
            <div class="left">
              <div class="title">我是谁</div>
              <div class="content">
                <p style="font-size: 0.7em">我？嗯。。嗯。。嗯。。</p>
                <p style="font-size: 0.8em">怀有一颗放荡不羁的心，做着一丝不苟的事</p>
                <p style="font-size: 0.9em">在大部分事上无所要求达到即可，但有时却会最求极致完美</p>
                <p style="font-size: 1em">曾几何时</p>
                <p style="font-size: 1.1em">
                  唉！。。。
                  <span style="font-size: 10px">此处略去10000字</span>
                </p>
                <p style="font-size: 1.2em">为什么有这个网站呢？</p>
                <p style="font-size: 1em">说来话长</p>
                <p style="font-size: 1em">从前，有个小伙子想跟着老爸做建设祖国的美事，所以高考之后想报考搬砖行业；</p>
                <p style="font-size: 1em">结果，被一顿批评教育；不听建议，不给饭吃。</p>
                <p style="font-size: 1em">无奈之下，放任不管，将命运交于家人。</p>
                <p style="font-size: 1em">最后，入此行业，成为一枚网上搬砖工。</p>
                <p style="font-size: 1em">一入此行深似海，长江后浪推前浪，不学会被拍死在沙滩上。</p>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8">
            <div class="right">
              <div class="title">我的信息</div>
              <div class="content">
                <p>Email: 351306708@qq.com</p>
                <p>Address: 北京市海淀区</p>
                <p>
                  gitHub:
                  <a
                    href="https://github.com/gao351306708/FourteenWeb.git"
                    target="_blank"
                  >https://github.com/gao351306708/FourteenWeb.git</a>
                </p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="bottom-section">
        <div class="partSection">
          <el-row :gutter="10">
            <el-col :xs="24" :md="8">
              <div class="part1">
                <div class="top-title">兴趣</div>
                <div class="content">
                  <span>滑雪</span>
                  <span>桌球</span>
                  <span>看电影</span>
                  <span>最爱独自旅游</span>
                  <span>美食</span>
                  <span>看书</span>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :md="8">
              <div class="part2">
                <div class="top-title">技术栈</div>
                <div class="content">
                  <span>HTML5</span>
                  <span>JavaScript</span>
                  <span>css3</span>
                  <span>node</span>
                  <span>react全家桶</span>
                  <span>webpack</span>
                  <span>vue</span>
                  <span>Python</span>
                  <span>less</span>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :md="8">
              <div class="part3">
                <div class="top-title">Instagram</div>
                <div class="content">
                  <img src="../../../static/images/aboutHu2.jpg" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="Footer">
      <FooterBottom></FooterBottom>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterBottom from "@/components/footerBottom.vue";
export default {
  //data中放入初始默认值
  name: "about",
  data() {
    return {
      context: "要是喜欢你就随便再看看哈",
      contextList: [],
      content2: "",
      interval2: null,
      num: 0
    };
  },
  components: {
    FooterBottom
  },
  mounted() {
    let str = "",
      _this = this;
    for (let ii in this.context) {
      console.log(ii, this.context[ii]);
      this.contextList.push(this.context[ii]);
    }
    this.interval2 = window.setInterval(function() {
      console.log("setInterval");
      _this.content2 = _this.content2 + _this.contextList[_this.num];
      _this.num = _this.num + 1;
      if (_this.num > _this.contextList.length - 1) {
        window.clearInterval(_this.interval2); //清除定时
        $(".guangbiao").removeClass();
      }
    }, 1000);
  },
  methods: {
    exit() {
      this.$router.back();
    }
  },
  destroyed() {
    window.clearInterval(this.interval2); //清除定时
    console.log("destroyed   ----   interval2");
  }
};
</script>

<style scoped lang="less" type="text/less">
@import "../../assets/mixin.less";
.aboutMe {
  position: absolute;
  top: 80px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  // .closeIcon {
  //   position: absolute;
  //   width: 40px;
  //   height: 40px;
  //   right: 40px;
  //   top: 35px;
  //   z-index: 20;
  //   cursor: pointer;
  // }
  .section_container {
    position: relative;
    padding: 0 45px;
    .top-section {
      position: relative;
      background: #161616;
      overflow: hidden;
      img {
        width: 100%;
      }
      .context-section {
        position: absolute;
        top: 20%;
        left: 20%;
        max-width: 70%;
        text-align: left;
        color: white;
        p {
          margin: 8px 0;
        }
        .guangbiao {
          color: white;
          transition: opacity 0.5s;
          opacity: 1;
          animation: guangbiao 1s infinite;
        }
        @-webkit-keyframes guangbiao {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      }
    }
    .middle-section {
      position: relative;
      overflow: hidden;
      min-height: 420px;
      margin: 0 6rem;
      .left {
        text-align: left;
        margin-top: 40px;
        .title {
          font-weight: 600;
          color: #85785b;
          text-decoration: underline;
          font-size: 2em;
          line-height: 53px;
          margin: 20px 0;
        }
        .content {
          line-height: 25px;
          font-size: 1.2em;
          padding: 0 10px;
          p {
            margin: 8px 0;
          }
        }
      }
      .right {
        text-align: left;
        margin-top: 40px;
        .title {
          font-weight: 600;
          color: #85785b;
          text-decoration: underline;
          font-size: 2em;
          line-height: 53px;
          margin: 20px 0;
        }
        .content {
          line-height: 25px;
          word-break: break-word;
          p {
            margin: 8px 0;
          }
        }
      }
    }
    .bottom-section {
      position: relative;
      margin-top: 40px;
      margin-bottom: 40px;
      background: #161616;
      clear: both;
      color: #fff;
      overflow: hidden;
      .partSection {
        padding: 0 15%;
      }
      .part1,
      .part2,
      .part3 {
        position: relative;
        text-align: left;
        .top-title {
          height: 60px;
          line-height: 60px;
          font-size: 22px;
          margin-bottom: 20px;
          color: #85785b;
        }
        .content {
          font-size: 1.2em;
          span {
            display: inline-block;
            padding: 4px;
            background-color: #6f5722;
            border-radius: 4px;
            margin-bottom: 15px;
          }
        }
      }
      .part3 .content {
        img {
          border: 2px solid white;
          width: 100%;
        }
      }
    }
  }
  .Footer {
    position: relative;
    width: 100%;
    height: 110px;
  }
}
</style>
