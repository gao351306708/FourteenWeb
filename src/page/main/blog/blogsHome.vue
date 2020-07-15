/**博客列表页**/
<template>
  <div class="blogList">
    <backButton></backButton>
    <div class="section_container">
      <el-row :gutter="10" class="section_All">
        <el-col :xs="24" :md="18" style="height: 100%">
          <div class="section_left">
            <div class="header_section">
              <strong>最新的文章</strong>
            </div>
            <!-- <div class="list_section" v-for="(item,index) in AllList" :key="index">
              <ListItem :data="item" @click.native="getDetails(item)" />
            </div>-->

            <BlogList ref="blogList" :ActionClick="getDetails"></BlogList>
          </div>
        </el-col>
        <el-col :xs="24" :md="6" style="height: 100%">
          <div class="section_right">
            <div class="search">
              <el-input
                v-model="searchValue"
                placeholder="输入匹配关键字查找"
                clearable
                @change="searchBlogs"
              >
                <el-button slot="append" icon="el-icon-search" @click="searchBlogs"></el-button>
              </el-input>
            </div>
            <div class="userInfo">
              <el-card :body-style="{ padding: '0px' }">
                <img src="/static/images/aboutHu2.jpg" class="image" />
                <div style="padding: 14px;">
                  <span>Rambo_Gao</span>
                  <div class="bottom clearfix">
                    <span>
                      原创
                      <strong>{{numberObject.blogNum}}</strong>
                    </span>
                    <span>
                      访问
                      <strong>{{numberObject.interviewNum}}</strong>
                    </span>
                  </div>
                </div>
              </el-card>
            </div>
            <div class="catgoriesBlogs">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="henggang"></span>
                  <span>标签</span>
                </div>
                <div class="tagSection">
                  <el-tag
                    v-for="(item,index) in categoryList"
                    :key="index"
                    :class="['textItem',{'active':searchName == item.name}]"
                    :color="colorRadom()"
                    @click="getKeyTile(item.name)"
                  >{{item.name}}</el-tag>
                </div>
              </el-card>
            </div>
            <div class="popularBlogs">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="henggang"></span>
                  <span>热门文章</span>
                </div>
                <div
                  v-for="(item,index) in popularList"
                  :key="index"
                  class="textItem"
                  @click="getDetails(item)"
                >> {{item.title}}</div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import backButton from "@/components/backButton.vue";
import ListItem from "./components/ListItem.vue";
import BlogList from "./components/BlogList.vue";
import {
  queryBlogList,
  getInterview,
  queryPopularBlogList,
  queryBlogTypeList
} from "@/api/manage.js";
export default {
  components: {
    backButton,
    ListItem,
    BlogList
  },
  data() {
    return {
      categoryList: [], //标签类别
      searchValue: "",
      searchName: "",
      numberObject: {}, //访问数
      popularList: [], //访问数
      colorList: ["#ecf5ff", "#f0f9eb", "#f4f4f5", "#fdf6ec", "#fef0f0"]
    };
  },
  created() {
    //获取访问数文章数
    getInterview().then(res => {
      if (res.code == 200) {
        this.numberObject = res.data;
      }
    });
    //最受欢迎列表
    queryPopularBlogList().then(res => {
      if (res.code == 200) {
        this.popularList = res.data;
      }
    });
    //标签类型查询
    queryBlogTypeList().then(res => {
      if (res.code == 200) {
        this.categoryList = res.data;
      }
    });
  },
  mounted() {
    //获取文章列表
    this.getBlogList();
  },
  methods: {
    async getBlogList(param = {}) {
      const { searchValue } = this;
      let params = {
        key: searchValue
      };
      Object.assign(params, param);
      // let res = await queryBlogList(params);
      // if (res.code == 200) {
      //   this.AllList = res.data;
      // }
    },
    //个人分类查询
    getKeyTile(name) {
      this.searchName = name;
      this.getBlogList({ tagKey: name });
    },
    searchBlogs() {
      this.getBlogList();
    },
    getDetails(item) {
      this.details = item;
      this.$router.push({ name: "BlogDetails", query: { id: item._id } });
    },
    //随机颜色
    colorRadom() {
      let ram = Math.floor(Math.random() * 5);
      return this.colorList[ram];
    }
  }
};
</script>

<style scoped lang="less" type="text/less">
@import "~@/assets/mixin.less";
.blogList {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: auto;
  background-color: #f4f4f4;
  .section_container {
    position: relative;
    top: 0px;
    bottom: 2.5rem;
    padding: 0 2.8125rem;
    height: 100%;
    max-width: 1500px;
    margin: 0 auto;
    .section_All {
      margin-bottom: 9.375rem;
      margin-top: 3.125rem;
      .section_right {
        .userInfo,
        .newBlogs,
        .popularBlogs,
        .catgoriesBlogs {
          text-align: left;
          margin: 0.625rem 0;
          .henggang {
            height: 5px;
            width: 26px;
            background-color: black;
            display: inline-block;
            margin-right: 8px;
          }
          .textItem {
            margin: 10px 0;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            line-clamp: 1;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            cursor: pointer;
            .number {
              float: right;
            }
          }
        }
        .userInfo {
          .time {
            font-size: 13px;
            color: #999;
          }
          .bottom {
            margin-top: 13px;
            span {
              margin: 0 5px;
            }
          }
          .image {
            width: 100%;
            display: block;
          }
        }
        .catgoriesBlogs {
          .tagSection {
            display: flex;
            flex-wrap: wrap;
          }
          .textItem {
            cursor: pointer;
            width: auto;
            margin: 5px 8px;
            .number {
              float: right;
            }
          }
          .textItem.active {
            color: #00a8e6;
          }
        }
        .clearfix:before,
        .clearfix:after {
          display: table;
          content: "";
        }
        .clearfix:after {
          clear: both;
        }
      }
      .section_left {
        padding: 0.625rem 1.25rem;
        .header_section {
          font-size: 28px;
          text-align: left;
          margin: 1.25rem 0.625rem;
        }
      }
    }
  }
}
</style>
