/**查出腾讯视频的所有视频，展示页面**/
<template>
  <div class="Movie">
    <BackTop :scrollerName="'.section_container'"></BackTop>
    <div class="Movie_section_container" v-scrollbottom="getMoreMovies">
      <div class="selectSection">
        <el-row type="flex" style="margin: 10px 0">
          <el-col class="tagName">
            <el-tag type="success">{{ movieSelectList1.isort.mainName }}</el-tag>
          </el-col>
          <el-col :span="20" class="tagKey">
            <el-button
              type="text"
              v-for="item in movieSelectList1.isort.children"
              :key="item.id"
              round
              :class="['tagKeys', { active: item.key == isort }]"
              size="mini"
              @click="clickTag(movieSelectList1.isort, item)"
              >{{ item.name }}</el-button
            >
          </el-col>
        </el-row>
        <el-row type="flex" style="margin: 10px 0">
          <el-col class="tagName">
            <el-tag type="success">{{ movieSelectList1.itype.mainName }}</el-tag>
          </el-col>
          <el-col :span="20" class="tagKey">
            <el-button
              type="text"
              v-for="item in movieSelectList1.itype.children"
              :key="item.id"
              round
              :class="['tagKeys', { active: item.key == itype }]"
              size="mini"
              @click="clickTag(movieSelectList1.itype, item)"
              >{{ item.name }}</el-button
            >
          </el-col>
        </el-row>
        <el-row type="flex" style="margin: 10px 0">
          <el-col class="tagName">
            <el-tag type="success">{{ movieSelectList1.iarea.mainName }}</el-tag>
          </el-col>
          <el-col :span="20" class="tagKey">
            <el-button
              type="text"
              v-for="item in movieSelectList1.iarea.children"
              :key="item.id"
              round
              :class="['tagKeys', { active: item.key == iarea }]"
              size="mini"
              @click="clickTag(movieSelectList1.iarea, item)"
              >{{ item.name }}</el-button
            >
          </el-col>
        </el-row>
        <el-row type="flex" style="margin: 10px 0">
          <el-col class="tagName">
            <el-tag type="success">{{ movieSelectList1.icharge.mainName }}</el-tag>
          </el-col>
          <el-col :span="20" class="tagKey">
            <el-button
              type="text"
              v-for="item in movieSelectList1.icharge.children"
              :key="item.id"
              round
              :class="['tagKeys', { active: item.key == icharge }]"
              size="mini"
              @click="clickTag(movieSelectList1.icharge, item)"
              >{{ item.name }}</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="searchCss">
            <el-input placeholder="请输入id进行查询" v-model="searchValue"></el-input>
            <el-button @click="searchHandle">搜索</el-button></el-col
          >
        </el-row>
      </div>
      <div class="movieSection">
        <div v-for="(item, index) in movieList" :key="index" :class="{ cardPart: true, movieWidth: true }" @click="movieGo(item)">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.imgUrl" class="image" />
            <div style="padding: 14px">
              <div class="title">{{ item.title }}</div>
              <div class="starts">{{ item.starts }}</div>
              <div class="num">播放量：{{ item.num }}</div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMovieList, getMovieDetail, getMovieRealUrl, getMovieRealUrlList } from "@/api/tencent";
import { movieSelectKeyList1 } from "@/data/movieSelectKey";
let loading = false;
export default {
  name: "movie",
  data() {
    return {
      movieList: [],
      searchValue: "",
      movieSelectList1: movieSelectKeyList1,
      pagesize: 30,
      pageNo: 0,
      isort: 18, //排序，默认18 最新热搜
      itype: -1, //类型
      iarea: -1, //地区
      icharge: -1, //资源
      currentSelect: ""
    };
  },
  mounted() {
    this.getMovieListOfKey();
    let _this = this;
  },
  methods: {
    getMoreMovies() {
      this.pageNo = this.pageNo + 30;
      this.getMovieListOfKey();
    },
    getMovieListOfKey(params) {
      if (loading) {
        return false;
      }
      loading = true; //开始加载数据
      let data = {
        pagesize: this.pagesize,
        offset: this.pageNo,
        isort: this.isort,
        itype: this.itype,
        iarea: this.iarea,
        icharge: this.icharge
      };
      let _this = this;
      getMovieList(data, function (data) {
        if (data.code == 200) {
          if (_this.pageNo == 0) {
            _this.movieList = data.movies;
          } else {
            _this.movieList = _this.movieList.concat(data.movies);
          }
          loading = false;
        }
      });
    },
    searchHandle() {
      let vid = this.searchValue;
      getMovieRealUrl(vid, function (data) {
        console.log("返回数据=22==》", data);
      });
    },
    movieGo(item) {
      let _this = this;
      //获取影影片的详细信息
      getMovieDetail(item.dataset, function (data) {
        let vid = data.c.video_ids[0];
        getMovieRealUrlList(vid)
          .then((data) => {
            console.log("getMovieRealUrlList==》", data);
            _this.$router.push({
              name: "Video",
              params: data
            });
          })
          .catch((res) => {
            console.error(res);
            window.open(`http://v.qq.com/txp/iframe/player.html?vid=${vid}`);
          });
      });
    },
    clickTag(parent, item) {
      console.log("clickTag===》", parent, item);
      console.log("clickTag===》", parent.id, item.key);
      this.currentSelect = parent.mainName;
      this.pageNo = 0;
      switch (parent.id) {
        case 1:
          this.isort = item.key;
          break;
        case 2:
          this.itype = item.key;
          break;
        case 3:
          this.iarea = item.key;
          break;
        case 4:
          this.icharge = item.key;
          break;
      }
      this.getMovieListOfKey();
    }
  }
};
</script>

<style lang="less" type="text/less">
@import "~@/assets/mixin.less";
.Movie {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .Movie_section_container {
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    top: 3.125rem;
    bottom: 2.5rem;
    padding: 0 3.125rem;
    .selectSection {
      min-height: 100px;
      text-align: left;
      padding: 0 1.25rem;
      .tagName {
        width: 3.125rem;
        margin-right: 0.625rem;
      }
      .tagKey {
        overflow-y: hidden;
        white-space: nowrap;
        overflow-x: auto;
        .tagKeys {
          margin: 0 0.3125rem;
        }
        .tagKeys.active {
          color: #31baff;
        }
      }
    }
    .movieSection {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: space-around;
      .cardPart {
        width: 200px;
        min-height: 200px;
        padding: 10px;
        text-align: left;
        background: white;
        .image {
          width: 100%;
          display: block;
        }
        .title {
          margin: 5px 0;
          font-size: 1em;
          font-weight: bolder;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .starts,
        .num {
          font-size: 0.7em;
          color: darkgray;
          margin: 3px 0;
        }
        .starts {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .searchCss {
    display: flex;
    /deep/.el-input {
      width: 300px;
      margin-right: 10px;
    }
  }
}
</style>
