<template>
  <div class="Photos">
    <div class="overlay" @click.self="close">
      <div class="mainContent">
        <div class="arrow" v-if="currentNum > 0" @click="jumpnext('pre')"><i class="el-icon-arrow-left"></i></div>
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
              <img :src="srcsets.src" />
            </div>
          </div>
          <div class="related">
            <div class="relatedPhotos" v-if="relatedList.length > 0">
              <div class="section_picture">
                <div class="title">相关图片</div>
                <WaterFall :List="relatedList"> </WaterFall>
              </div>
            </div>
            <div class="relatedConllection">
              <div class="title">相关图片集</div>
              <div class="relatedConllection_main partCol">
                <div class="parts" v-for="(item, index) in relatedConllectionList" :key="index">
                  <div class="imgContent">
                    <div class="left"><img :src="item.preview_photos[0].urls.thumb" /></div>
                    <div class="right">
                      <div class="top"><img :src="item.preview_photos[1].urls.thumb" /></div>
                      <div class="bootom"><img :src="item.preview_photos[2].urls.thumb" /></div>
                    </div>
                  </div>
                  <div class="footer">
                    <p class="_title">{{ item.title }}</p>
                    <p>{{ item.total_photos + "张照片，作者" + item.user.first_name + " " + item.user.last_name }}</p>
                    <p>
                      <TagList :List="item.tags" :maxLen="3"></TagList>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="relatedTag">
              <div class="title">相关标签</div>
              <div class="tags" v-if="tagsList.length > 0">
                <TagList :List="tagsList"></TagList>
              </div>
            </div>
          </div>
        </div>
        <div class="arrow" @click="jumpnext('next')"><i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
  </div>
</template>
<script>
import { downloadPhotoById, downloadPhotoByUrl, getPhotoInfo, getRelatedPhotos } from "@/api/unsplash.js";
import WaterFall from "./components/WaterFall";
import TagList from "@/components/TagList";
export default {
  name: "Photos",
  data() {
    return {
      info: null,
      relatedList: []
    };
  },
  components: {
    WaterFall,
    TagList
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
    srcsets() {
      if (this.info) {
        let width = document.getElementsByClassName("infodetail")[0].offsetWidth;
        let collections = this.info.urls;
        let photo = collections.regular;
        return {
          src: photo,
          srcList: [photo]
        };
      } else {
        return { src: "", srcList: [] };
      }
    },
    tagsList() {
      return this.info ? this.info.tags : [];
    },
    relatedConllectionList() {
      if (this.info) {
        let { results } = this.info.related_collections;
        return results;
      } else {
        return [];
      }
    },
    currentNum() {
      let { currentNum } = this.$store.state.amusement;
      return currentNum;
    }
  },
  watch: {
    $route(val, old) {
      if (val.name == "photos") {
        this.getData();
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    close() {
      this.$router.back();
    },
    getData() {
      let id = this.$route.params.id;
      this.getPhotosDetails(id);
      this.getRelated(id);
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
      let param = {
        url: urls[val],
        name: id + "(" + val + ")"
      };
      downloadPhotoByUrl(param, (res) => {
        console.log("下载成功");
      });
    },
    jumpnext(val) {
      let { photosList, currentNum: num } = this.$store.state.amusement;
      if (val == "pre") {
        num = num - 1;
      } else {
        num = num + 1;
      }
      this.$store.commit("amusement/MSetCurrentNum", num);
      this.$store.dispatch("amusement/AChangeCurrentPhoto", photosList[num].id);
    }
  }
};
</script>
<style lang="less" scoped>
@media (min-width: 768px) and (min-width: 992px) {
  .partCol {
    --columns: 3;
  }
}
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
    cursor: default;
    outline: none;
    overflow: hidden;
    pointer-events: none;
    .arrow {
      width: 60px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 35px;
      pointer-events: auto;
    }
    .contentSection {
      overflow-y: auto;
      width: 100%;
      pointer-events: auto;
      cursor: default;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      min-width: 0;
      height: 98vh;
      .infodetail {
        display: flex;
        flex-direction: column;
        padding: 0 2rem;
        .head {
          position: sticky;
          top: 0;
          background-color: white;
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
          min-height: 400px;
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
          margin: 0 auto;
        }
        .relatedConllection {
          .relatedConllection_main {
            display: grid;
            grid-gap: 48px 24px;
            grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
            .parts {
              .imgContent {
                position: relative;
                overflow: hidden;
                height: 250px;
                display: flex;
                cursor: pointer;
                .left {
                  flex-grow: 1;
                  width: 70%;
                }
                .right {
                  flex-grow: 1;
                  display: flex;
                  flex-direction: column;
                  width: 30%;
                  margin-left: 2px;
                  .top {
                    flex-grow: 1;
                    margin-bottom: 2px;
                  }
                  .bootom {
                    flex-grow: 1;
                  }
                }
              }
              .footer {
                font-size: 16px;
                ._title {
                  font-size: 18px;
                  font-weight: bolder;
                }
                p {
                  margin: 5px 0;
                }
              }
            }
            img {
              width: 100%;
              height: 100%;
              left: 0;
              object-fit: cover;
            }
          }
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