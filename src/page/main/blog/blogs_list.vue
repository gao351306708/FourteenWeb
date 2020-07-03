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
            <div class="list_section" v-for="(item,index) in partList" :key="index">
              <ListItem :data="item" @click.native="getDetails(item)" />
            </div>
            <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
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
                      <strong>55</strong>
                    </span>
                    <span>
                      访问
                      <strong>{{interview}}</strong>
                    </span>
                    <span>
                      喜欢
                      <strong>88</strong>
                    </span>
                  </div>
                </div>
              </el-card>
            </div>
            <div class="newBlogs">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="henggang"></span>
                  <span>最新文章</span>
                </div>
                <div v-for="o in 4" :key="o" class="textItem">{{'列表内容 ' + o }}</div>
              </el-card>
            </div>
            <div class="catgoriesBlogs">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="henggang"></span>
                  <span>个人分类</span>
                </div>
                <div
                  v-for="(item,index) in categoryList"
                  :key="index"
                  :class="['textItem',{'active':searchName == item.name}]"
                  @click="getKeyTile(item.name)"
                >
                  {{item.name }}
                  <span class="number">{{'('+item.num+')'}}</span>
                </div>
              </el-card>
            </div>
            <div class="popularBlogs">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="henggang"></span>
                  <span>热门文章</span>
                </div>
                <div v-for="o in 4" :key="o" class="textItem">{{'列表内容 ' + o }}</div>
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
import { queryBlogList, getInterview } from "@/api/manage.js";
export default {
  components: {
    backButton,
    ListItem
  },
  data() {
    return {
      partList: [], //最新文章列表
      categoryList: [
        {
          name: "javaScript",
          num: "10"
        },
        {
          name: "react",
          num: "15"
        },
        {
          name: "vue",
          num: "12"
        },
        {
          name: "Html5",
          num: "5"
        }
      ],
      searchValue: "",
      searchName: "",
      interview: 0 //访问数
    };
  },
  created() {
    //获取访问数
    getInterview().then(res => {
      if (res.code == 200) {
        this.interview = res.data;
      }
    });
  },
  mounted() {
    //获取文章列表
    this.getBlogList();
  },
  methods: {
    async getBlogList() {
      const { searchValue } = this;
      let params = {
        key: searchValue
      };
      let res = await queryBlogList(params);
      if (res.code == 200) {
        this.partList = res.data;
      }
    },
    //个人分类查询
    getKeyTile(name) {
      this.searchName = name;
    },
    searchBlogs() {
      this.getBlogList();
    },
    getDetails(item) {
      this.details = item;
      this.$router.push({ name: "BlogDetails", query: { id: item._id } });
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
            padding: 5px;
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
        .popularBlogs {
        }
        .catgoriesBlogs {
          .textItem {
            cursor: pointer;
            padding: 5px;
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
        .list_section {
          margin: 1rem 0.625rem;
        }
      }
    }
  }
}
</style>
