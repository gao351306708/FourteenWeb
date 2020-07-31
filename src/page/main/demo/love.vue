<template>
  <div id="mainDiv">
    <div id="content" class="content">
      <div id="code">
        <span class="comments">/**</span>
        <br />
        <span class="space" />
        <span class="comments">*2020-02-26 20:00:00,</span>
        <br />
        <span class="space" />
        <span class="comments">*up to now...</span>
        <br />
        <span class="space" />
        <span class="comments">*/</span>
        <br />Boy name =
        <span class="keyword">Mr</span> JU
        <br />Girl name =
        <span class="keyword">Mrs</span> TAN
        <br />
        <span class="comments">// Fall in love river.</span>
        <br />The boy love the girl;
        <br />
        <span class="comments">// They love each other.</span>
        <br />The girl loved the boy;
        <br />
        <span class="comments">// AS time goes on.</span>
        <br />The boy can not be separated the girl;
        <br />
        <span class="comments">// At the same time.</span>
        <br />The girl can not be separated the boy;
        <br />
        <span class="comments">// Both wind and snow all over the sky.</span>
        <br />
        <span class="comments">// Whether on foot or 5 kilometers.</span>
        <br />
        <span class="keyword">The boy</span> very
        <span class="keyword">happy</span>;
        <br />
        <span class="keyword">The girl</span> is also very
        <span class="keyword">happy</span>;
        <br />
        <span class="placeholder" />
        <span class="comments">// Whether it is right now</span>
        <br />
        <span class="placeholder" />
        <span class="comments">// Still in the distant future.</span>
        <br />
        <span class="placeholder" />The boy has but one dream;
        <br />
        <span class="comments">// The boy wants the girl could well have been happy.</span>
        <br />
        <br />
        <br />I want to say:
        <br />Baby, I love you forever;
        <br />
      </div>
      <div id="loveHeart">
        <canvas id="garden"></canvas>
        <div id="words">
          <div id="messages">
            大狗子，这是我们相识的时光：
            <div id="elapseClock"></div>
          </div>
          <div id="loveu">
            十分想念你。
            <br />
            <div class="signature">- 二狗子</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Heart from "@/js/function.js";
import moment from "moment";
export default {
  name: "love",
  created() {},
  mounted() {
    console.log("garden-3");
    var offsetX = $("#loveHeart").width() / 2;
    var offsetY = $("#loveHeart").height() / 2 - 55;
    if (!document.createElement("canvas").getContext) {
      var msg = document.createElement("div");
      msg.id = "errorMsg";
      msg.innerHTML =
        "您的浏览器不支持HTML5!<br/>推荐浏览器Chrome 14+/IE 9+/Firefox 7+/Safari 4+";
      document.body.appendChild(msg);
      $("#code").css("display", "none");
      $("#copyright").css("position", "absolute");
      $("#copyright").css("bottom", "10px");
      document.execCommand("stop");
    } else {
      this.start();
    }
  },
  methods: {
    async start() {
      var together = moment("2020-02-26 20:00:00");
      setTimeout(function () {
        console.log("garden-6");
        Heart.startHeartAnimation();
      }, 2000);

      Heart.timeElapse(together);
      setInterval(function () {
        Heart.timeElapse(together);
      }, 500);
      $("#code").typewriter();
    },
  },
};
</script>
<style lang="less" scoped>
#mainDiv {
  position: relative;
  top: 80px;
  width: 100%;
  height: 100%;
}
.content {
  position: relative;
  top: 10%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
#loveHeart {
  position: relative;
  display: flex;
  justify-content: center;
}
#garden {
  width: 100%;
  height: 100%;
}
#elapseClock {
  text-align: right;
  font-size: 1.2rem;
  margin-top: 10px;
  margin-bottom: 10px;
}
#words {
  font-family: "sans-serif";
  font-size: 1.8rem;
  color: #666;
}
#messages {
  font-size: 1.4rem;
  display: none;
}
#elapseClock .digit {
  font-family: "digit";
  font-size: 36px;
}
#loveu {
  padding: 5px;
  font-size: 1.6rem;
  margin-top: 80px;
  margin-right: 120px;
  text-align: right;
  display: none;
}
#loveu .signature {
  margin-top: 10px;
  font-size: 20px;
  font-style: italic;
}
#clickSound {
  display: none;
}
#code {
  width: 40%;
  height: 400px;
  color: #333;
  font-family: "Consolas", "Monaco", "Bitstream Vera Sans Mono", "Courier New",
    "sans-serif";
  font-size: 12px;
}
#code .string {
  color: #2a36ff;
}
#code .keyword {
  color: #7f0055;
  font-weight: bold;
}
#code .placeholder {
  margin-left: 15px;
}
#code .space {
  margin-left: 7px;
}
#code .comments {
  color: #3f7f5f;
}
#copyright {
  margin-top: 10px;
  text-align: center;
  width: 100%;
  color: #666;
}
#errorMsg {
  width: 100%;
  text-align: center;
  font-size: 24px;
  position: absolute;
  top: 100px;
  left: 0;
}
#copyright a {
  color: #666;
}
</style>