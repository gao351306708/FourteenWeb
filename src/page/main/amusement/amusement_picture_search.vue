<template>
  <div class="searchPicture">
    <div class="section_search">
      <p class="search">
        <el-input prefix-icon="el-icon-search" v-model="searchValue" placeholder="输入匹配关键字查找，（英文、中文、或字母等）" clearable></el-input>
      </p>
    </div>
    <div class="section_container">
      <div class="searchResult">
        <div class="section1">{{ searchValue + "图片" }}</div>
        <div class="section2">{{ searchTotal + " 张免费的 " + searchValue + " 图片" }}</div>
        <div class="section3">
          {{ searchTotal + " 张照片 " }}
          <span class="user">{{ searchTotal + " 个作者" }}</span>
        </div>
      </div>
      <div class="section_picture">
        <template v-if="pictureList.length > 0">
          <WaterFall :List="pictureList" :showfooter="true"> </WaterFall>
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
      pictureWidth: 400,
      pageNum: 1 //页码 默认第一页
    };
  },
  components: {
    WaterFall,
    PictureItem
  },
  watch: {
    $route(old, val) {
      this.searchValue = this.$route.query.keyName;
      this.searchPicture();
    }
  },
  mounted() {
    let _this = this;
    this.pictureWidth = $(".section_picture").width() * 0.333333 - 8;
    document.onkeyup = function (e) {
      if (window.event)
        //如果window.event对象存在，就以此事件对象为准
        e = window.event;
      var code = e.charCode || e.keyCode;
      if (code == 13) {
        _this.searchPicture();
      }
    };
    $(".search .el-icon-search").on("click", function () {
      _this.searchPicture();
    });
    $(".searchPicture").scroll(function () {
      let scrollH = $(this)[0].scrollHeight;
      let clientH = $(this)[0].clientHeight;
      let scrollTop = $(this).scrollTop();
      if (scrollTop + clientH == scrollH) {
        console.log("到底了。。。", scrollH, clientH, scrollTop);
        const pageNum = _this.pageNum + 1;
        searchPhotos(_this.searchValue, pageNum, (data) => {
          console.log("getAllPhotos--------->", _this.pageNum, _this.pageSize, data);
          const pictureList = _this.pictureList.concat(data.results);
          Object.assign(_this, { pictureList, pageNum });
        });
      }
    });
  },
  activated() {
    this.searchValue = this.$route.query.keyName;
    this.searchPicture();
  },
  methods: {
    backTotOP() {
      $(".searchPicture").scrollTop(0);
    },
    exit() {
      this.$router.back();
    },
    searchPicture() {
      if (!this.searchValue) {
        this.$message({
          message: "请输入关键字！（please input the key value）",
          type: "warning"
        });
        return;
      }
      searchPhotos(this.searchValue, 1, (data) => {
        this.searchTotal = data.total;
        this.pictureList = data.results;
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
  overflow-x: hidden;
  overflow-y: scroll;
  .buttonToTop {
    position: fixed;
    bottom: 20px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: #2196f37a;
    border-radius: 25px;
    cursor: pointer;
  }
  .section_search {
    position: fixed;
    top: 80px;
    height: 100px;
    width: calc(100% - 90px);
    padding: 0 45px;
    z-index: 10;
    background-color: #f8f8f8;
    .search {
      margin: 20px 0;
    }
  }
  .section_container {
    position: relative;
    top: 180px;
    bottom: 40px;
    padding: 0 45px;
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
