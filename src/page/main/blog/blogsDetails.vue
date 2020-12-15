/**博客首页**/
<template>
  <div class="blogDetails">
    <el-row class="section_container">
      <el-col :span="24" class="mainSection">
        <div class="header_section">
          <strong>{{ detailItem.title }}</strong>
        </div>
        <div class="content" v-html="detailItem.content"></div>
        <div v-if="detailItem.links && detailItem.links.length > 0" class="linkSection">
          相关链接
          <p v-for="(item, index) in detailItem.links" :key="index">
            <a :href="item" target="_blank">{{ item | filterUrl }}</a>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { queryBlogDetail } from "@/api/manage.js";
export default {
  //data中放入初始默认值
  data() {
    return {
      current: 0,
      interval: null,
      detailItem: {}
    };
  },
  created() {
    queryBlogDetail({ id: this.$route.query.id }).then((res) => {
      if (res.code == 200) {
        console.log("detailItem   --->", res.data);
        this.detailItem = res.data[0];
        if (res.data[0].title) {
          document.title = res.data[0].title;
        }
      }
    });
  },
  mounted() {},
  methods: {
    goToUrl(index) {
      console.log("goToUrl   --->", index);
    }
  },
  filters: {
    filterUrl(url) {
      return url.slice(url.indexOf("http"));
    }
  }
};
</script>

<style scoped lang="less" type="text/less">
@import "~@/assets/mixin.less";
.blogDetails {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #f4f4f4;
  .section_container {
    top: 20px;
    bottom: 40px;
    width: 1000px;
    margin: 0 auto;
    background: white;
    .mainSection {
      padding: 20px 50px;
      .header_section {
        font-size: 2rem;
        margin-bottom: 2rem;
        text-align: center;
      }
      .content {
        text-align: left;
      }
    }
  }
  .linkSection {
    margin: 3rem 0;
    font-size: 1.3rem;
    font-weight: 800;
    a {
      font-size: 1rem;
      font-weight: 100;
      color: black;
    }
  }
}
</style>
