/**查出腾讯视频播放页面，展示页面**/
<template>
  <div class="Video">
    <video id="myvideo" class="videocss" width="800px" height="500px" :src="movieUrl" autoplay controls></video>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMovieRealUrl } from "@/api/tencent";
export default {
  name: "Video",
  data() {
    let obj = this.$route.params;
    return {
      movieObj: obj, //当前视频详情
      movieUrl: "", //当前视频地址
      currentClip: {}, //当前片段
      index: 0 //当前片段
    };
  },
  mounted() {
    this.getMovieUrl();
    this.addEvent();
  },
  methods: {
    getMovieUrl() {
      let { movieObj, index } = this;
      getMovieRealUrl(movieObj, index).then((data) => {
        console.log("getMovieRealUrl---->", data);
        this.movieUrl = data.url;
        this.currentClip = data;
      });
    },
    addEvent() {
      //url("chrome://favicon2/?size=16&scale_factor=1x&page_url=http%3A%2F%2Fwww.youku.com%2F&allow_google_server_fallback=0") 1x,
      //url("chrome://favicon2/?size=16&scale_factor=2x&page_url=http%3A%2F%2Fwww.youku.com%2F&allow_google_server_fallback=0") 2x);
      let _this = this;
      try {
        var vplayer = document.getElementById("myvideo");
        vplayer.play();
        // 播放结束
        vplayer.addEventListener("ended", function (e) {
          _this.index = _this.index + 1;
          _this.getMovieUrl();
        });
      } catch (error) {
        console.error("addEvent-->", error);
      }
    }
  }
};
</script>

<style lang="less" type="text/less">
.Video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .videocss {
    background: black;
  }
}
</style>
