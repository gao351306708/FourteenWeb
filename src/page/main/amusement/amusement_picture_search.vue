<template>
  <div class="searchPicture">
    <div class="section_search">
      <p class="search">
        <el-input v-model="searchValue" placeholder="输入匹配关键字查找，（英文、中文、或字母等）" clearable v-keyenter="searchPicture2">
          <el-button slot="append" icon="el-icon-search" @click="searchPicture2"></el-button>
        </el-input>
      </p>
    </div>
    <div class="section_container" v-scrollbottom="searchPicture">
      <div class="searchResult">
        <div class="section1">{{ searchValue + "图片" }}</div>
        <div class="section2">{{ searchTotal + " 张免费的 " + searchValue + " 图片" }}</div>
        <div class="section3">
          {{ searchTotal + " 张照片 " }}
          <span class="user">{{ searchTotal + " 个作者" }}</span>
        </div>
      </div>
      <div class="section_picture" id="searchPicture">
        <template v-if="pictureList.length > 0">
          <WaterFall :List="pictureList" :showfooter="true" :Width="WaterFallWidth"> </WaterFall>
        </template>
        <template v-else>
          <NoData />
        </template>
      </div>
    </div>
    <router-view></router-view>
    <BackTop :scrollerName="'.searchPicture'"></BackTop>
  </div>
</template>
<script type="text/ecmascript-6">
import { getAllPhotos, searchPhotos } from "@/api/unsplash.js";
import WaterFall from "./components/WaterFall";
import PictureItem from "./components/PictureItem";
export default {
  data() {
    return {
      searchValue: "",
      pictureList: [],
      searchTotal: 0,
      pageNum: 1 //页码 默认第一页
    };
  },
  components: {
    WaterFall,
    PictureItem
  },
  computed: {
    WaterFallWidth() {
      return $("#searchPicture").width();
    }
  },
  watch: {
    $route(val, old) {
      if (val.name == "searchPicture" && old.name != "photos") {
        this.searchValue = this.$route.query.keyName;
        this.pageNum = 1;
        this.searchPicture();
      }
    }
  },
  mounted() {
    this.searchValue = this.$route.query.keyName;
    this.searchPicture();
  },
  methods: {
    searchPicture() {
      if (!this.searchValue) {
        this.$message({
          message: "请输入关键字",
          type: "warning"
        });
        return;
      }
      searchPhotos(this.searchValue, this.pageNum, (data) => {
        this.searchTotal = data.total;
        let newData = [];
        if (this.pageNum <= 1) {
          newData = data.results;
        } else {
          newData = this.pictureList.concat(data.results);
        }
        Object.assign(this, {
          searchTotal: data.total,
          pictureList: newData,
          pageNum: this.pageNum + 1
        });
        this.$store.commit("amusement/MSetPhotosList", newData);
      });
    },
    searchPicture2() {
      debugger;
      this.$router.push({
        path: "Search",
        query: { keyName: this.searchValue }
      });
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
@import "~@/assets/mixin.less";
.searchPicture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .section_search {
    position: fixed;
    top: 80px;
    height: 100px;
    width: calc(100% - 90px);
    padding: 0 45px;
    z-index: 10;
    background-color: #f8f8f8;
    box-shadow: inset 0 -1px #d1d1d1;
    .search {
      margin: 20px 0;
    }
  }
  .section_container {
    position: relative;
    top: 100px;
    bottom: 40px;
    padding: 0 45px;
    height: calc(100% - 100px);
    overflow-y: auto;
    .searchResult {
      position: relative;
      max-width: 1320px;
      padding-left: calc(4px * 3);
      padding-right: calc(4px * 3);
      margin: 0 auto;
      text-align: left;
      .section1 {
        font-size: 3rem;
        font-weight: bolder;
        margin: 30px 20px;
      }
      .section2 {
        font-size: 0.875rem;
        font-weight: bolder;
        margin: 10px 20px 50px 20px;
      }
      .section3 {
        font-size: 1.125rem;
        font-weight: bolder;
        margin: 20px 20px 10px 20px;
        .user {
          font-weight: 100;
          margin: 0 20px;
          color: #999;
        }
      }
    }
    .section_picture {
      max-width: 1320px;
      padding-left: calc(4px * 3);
      padding-right: calc(4px * 3);
      margin: 0 auto;
    }
  }
}
</style>
