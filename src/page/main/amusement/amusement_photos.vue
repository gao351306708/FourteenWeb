<template>
  <div class="Photos">
    <div class="overlay" @click.self="close">
      <div class="mainContent">
        <div>left</div>
        <div class="contentSection">
          <div class="infodetail">
            <div class="head">
              <div class="header">
                <img :src="info && info.user.profile_image.medium" />
                <span>{{ info && info.user.name }}</span>
              </div>
              <div class="rigt">
                <el-button icon="el-icon-info">详情</el-button>
                <el-dropdown split-button type="primary" @command="handleCommand" @click="downloadHandleClick">
                  Download
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="thumb">超小图(200*134)</el-dropdown-item>
                    <el-dropdown-item command="small">小图(400*267)</el-dropdown-item>
                    <el-dropdown-item command="regular">中图(1080*721)</el-dropdown-item>
                    <el-dropdown-item command="raw">大图(6016*4016)</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="content">
              <img :srcset="srcsets" />
            </div>
          </div>
          <div class="related">
            <div class="relatedPhotos">
              <div class="section_picture">
                <div class="title">相关图片</div>
                <Waterfall v-if="relatedList.length > 0" :line-gap="pictureWidth" :watch="relatedList">
                  <WaterfallSlot
                    v-for="(item, index) in relatedList"
                    :height="(pictureWidth * item.height) / item.width"
                    :width="pictureWidth"
                    :order="index"
                    :key="index"
                    style="padding: 5px 10px"
                  >
                    <PictureItem :data="item" :styleCss="HandlePreColor()"></PictureItem>
                  </WaterfallSlot>
                </Waterfall>
              </div>
            </div>
            <div class="relatedConllection">
              <div class="title">相关图片集</div>
            </div>
            <div class="relatedTag">
              <div class="title">相关标签</div>
              <div class="tags" v-if="tagsList.length > 0">
                <el-tag type="info" v-for="(itm, indx) in tagsList" :key="indx">{{ itm.title }}</el-tag>
              </div>
            </div>
          </div>
        </div>
        <div>right</div>
      </div>
    </div>
  </div>
</template>
<script>
import { downloadPhotoById, downloadPhotoByUrl, getPhotoInfo, getRelatedPhotos } from "@/api/unsplash.js";
import Waterfall from "vue-waterfall/lib/waterfall";
import WaterfallSlot from "vue-waterfall/lib/waterfall-slot";
import { HandlePreImg } from "@/utils/publicMethod";
import PictureItem from "./components/PictureItem.vue";
export default {
  name: "Photos",
  data() {
    return {
      info: null,
      relatedList: []
    };
  },
  components: {
    Waterfall,
    WaterfallSlot,
    PictureItem
  },
  computed: {
    relatedConllection() {
      let collections = this.info.related_collections;
      return collections || [];
    },
    pictureWidth() {
      let windowW = window.innerWidth;
      return windowW > 860 ? $(".section_picture").width() * 0.333333 - 8 : $(".section_picture").width() * 0.5 - 8;
    },
    windowWidth() {
      let windowW = window.innerWidth;
      return windowW;
    },
    srcsets() {
      if (this.info) {
        let width = document.getElementsByClassName("infodetail")[0].offsetWidth;
        let collections = this.info.urls;
        let photo = collections.raw + "&auto=format&fit=crop&q=80" + "&w=" + width;
        return ` ${photo} ${width}w`;
      } else {
        return "";
      }
    },
    tagsList() {
      return this.info ? this.info.tags : [];
    }
  },
  mounted() {
    let id = this.$route.params.id;
    this.getPhotosDetails(id);
    this.getRelated(id);
  },
  methods: {
    close() {
      this.$router.back();
    },
    //获取图片的详情
    getPhotosDetails(val) {
      getPhotoInfo(val).then((res) => {
        console.log(res);
        this.info = res;
      });
    },
    //获取相关图片
    getRelated(val) {
      getRelatedPhotos(val).then((res) => {
        console.log(res);
        this.relatedList = res.results;
      });
    },
    downloadHandleClick(val) {
      let { id } = this.info;
      downloadPhotoById(id, (res) => {
        console.log("下载成功");
      });
    },
    handleCommand(val) {
      let { urls, id } = this.info;
      console.log("handleCommand", urls[val]);
      let param = {
        url: urls[val],
        name: id + "(" + val + ")"
      };
      downloadPhotoByUrl(param, (res) => {
        console.log("下载成功");
      });
    },
    HandlePreColor() {
      let backColor = { backgroundColor: HandlePreImg() };
      return backColor;
    }
  }
};
</script>
<style lang="less" scoped>
.Photos {
  position: absolute;
  top: 0;
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 17;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: zoom-out;
    overflow: hidden;
    backface-visibility: hidden;
  }
  .mainContent {
    display: flex;
    height: 100%;
    min-height: 100%;
    padding-top: 32px;
    padding-left: 8em;
    padding-right: 8em;
    pointer-events: none;
    cursor: default;
    display: flex;
    outline: none;
    overflow-y: auto;
    .contentSection {
      width: 100%;
      pointer-events: auto;
      cursor: default;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      min-width: 0;
      margin: auto;
      min-height: 100vh;
      margin-bottom: 100px;
      .infodetail {
        display: flex;
        flex-direction: column;
        padding: 0 2rem;
        .head {
          height: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .header {
            display: flex;
            align-items: center;
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
            }
          }
          .rigt {
            button {
              margin-right: 10px;
            }
          }
        }
        .content {
          display: flex;
          justify-content: center;
          padding: 1rem 2rem;
          img {
            max-height: 85vh;
            max-width: 80%;
          }
        }
      }
      .related {
        position: relative;
        padding: 0 6em;
        .title {
          margin: 12px;
          padding-top: 60px;
          padding-bottom: 16px;
          font-size: 20px;
          font-weight: bolder;
        }
        .section_picture {
          max-width: 1320px;
          padding-left: calc(4px * 3);
          padding-right: calc(4px * 3);
          margin: 0 auto;
        }
      }
      .relatedTag {
        margin: 20px 0;
        span {
          margin: 8px;
        }
      }
    }
  }
}
</style>