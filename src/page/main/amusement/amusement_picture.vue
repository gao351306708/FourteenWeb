<template>
  <div class="Picture" v-scrollbottom="getPicture">
    <div class="section_container">
      <div class="section_header">
        <div class="section_content">
          <p class="title1">图片库</p>
          <p class="title2" v-show="headShow">好看且免费的照片.</p>
          <p class="title2" v-show="headShow">来自全世界上最优秀的摄影师社区。</p>
          <p class="search">
            <el-input v-model="searchValue" placeholder="输入匹配关键字查找，（英文、中文、或字母等）" clearable v-keyenter="searchPicture">
              <el-button slot="append" icon="el-icon-search" @click="searchPicture"></el-button>
            </el-input>
          </p>
          <p class="tips_content">热门搜索:商业、计算机、自然、爱、美女等</p>
        </div>
      </div>
      <div class="section_picture" v-loading="loading">
        <template v-if="pictureList.length > 0">
          <WaterFall :List="pictureList"></WaterFall>
        </template>
        <template v-else>
          <NoData />
        </template>
      </div>
    </div>
    <router-view></router-view>
    <BackTop :scrollerName="'.Picture'"></BackTop>
  </div>
</template>
<script type="text/ecmascript-6">
import { getAllPhotos, searchPhotos } from "@/api/unsplash.js";
import { updateInterview } from "@/api/manage.js";
import WaterFall from "./components/WaterFall";
export default {
  name: "PictureView",
  data() {
    return {
      searchValue: "",
      pictureList: [],
      searchTotal: 0,
      pageNum: 1, //页码 默认第一页
      pageSize: 30, //每页查询条数
      headShow: true,
      loading: true //加载数据标志
    };
  },
  components: {
    WaterFall
  },
  computed: {
    pictureWidth() {
      let windowW = window.innerWidth;
      return windowW > 860 ? $(".section_picture").width() * 0.333333 - 8 : $(".section_picture").width() * 0.5 - 8;
    }
  },
  created() {
    this.getPicture();
    updateInterview({ name: this.$route.name }); //更新访问记录
  },
  mounted() {
    let _this = this;
    this.headShow = $(window).width() < 480 ? false : true;
  },
  methods: {
    //查询图片
    getPicture() {
      let _this = this;
      getAllPhotos(this.pageNum, this.pageSize, (data) => {
        if (data.code === 200) {
          let newData = [];
          let pageNum = _this.pageNum;
          if (pageNum <= 1) {
            //第一页
            newData = data.data;
            pageNum++;
          } else {
            pageNum++;
            newData = _this.pictureList.concat(data.data);
          }
          Object.assign(_this, {
            pictureList: newData,
            loading: false,
            pageNum
          });
          this.$store.commit("amusement/MSetPhotosList", newData);
        }
      });
    },
    searchPicture() {
      if (!this.searchValue) {
        this.$message({
          message: "请输入关键字",
          type: "warning"
        });
        return;
      }
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
.Picture {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  .section_container {
    position: relative;
    top: 3.5rem;
    bottom: 2.5rem;
    padding: 0 3rem;
    .section_header {
      position: relative;
      height: 40vw;
      background: url("/static/images/picture-header.jpg") no-repeat;
      background-size: cover;
      margin-bottom: 3rem;
      .section_content {
        position: absolute;
        top: 50%;
        left: 45%;
        width: 75%;
        min-height: 6.25rem;
        transform: translate(-50%, -50%);
        text-align: left;
        .title1 {
          font-size: 2rem;
          color: white;
          margin-bottom: 0.625rem;
        }
        .title2 {
          font-size: 1.5rem;
          color: white;
          margin: 8px 0;
        }
        .search {
          margin: 1.25rem 0;
          /deep/ .el-input input {
            height: 3rem !important;
            line-height: 3rem !important ;
          }
          /deep/ .el-input .el-input__inner {
            padding-left: 40px;
          }
          /deep/ .el-input .el-input__icon {
            font-size: 1.5rem;
            padding: 0 5px;
            cursor: pointer;
          }
        }
        .tips_content {
          font-size: 1rem;
          color: hsla(0, 0%, 100%, 0.8);
          margin: 8px;
        }
      }
    }
    .section_picture {
      position: relative;
      max-width: 1320px;
      padding-left: calc(4px * 3);
      padding-right: calc(4px * 3);
      margin: 0 auto;
    }
  }
}
</style>
