/**博客首页**/
<template>
  <div class="blogDetails">
    <backButton></backButton>
    <el-row class="section_container">
      <el-col :span="24" class="mainSection">
        <div class="header_section">
          <strong>{{detailItem.title}}</strong>
        </div>
        <div class="content" v-html="detailItem.content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import backButton from "@/components/backButton.vue";
import { queryBlogDetail } from "@/api/manage.js";
export default {
  //data中放入初始默认值
  data() {
    return {
      current: 0,
      interval: null,
      detailItem: ""
    };
  },
  components: {
    backButton
  },
  created() {
    queryBlogDetail({ id: this.$route.query.id }).then(res => {
      if (res.code == 200) {
        console.log("detailItem   --->", res.data);
        this.detailItem = res.data[0];
      }
    });
  },
  mounted() {},
  methods: {
    goToUrl(index) {
      console.log("goToUrl   --->", index);
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
    max-width: 1500px;
    margin: 0 auto;
    .mainSection {
      padding: 20px 50px;
      .header_section {
        font-size: 2rem;
        margin-bottom: 2rem;
        text-align: center;
      }
      .content {
        text-align: left;
        text-align: left;
        h1,
        h2,
        h3,
        h4,
        h5 {
          margin: 8px 0;
        }
        p {
          line-height: 2.25rem;
          text-indent: 2rem;
        }
      }
    }
  }
  /deep/ img {
    max-width: 100% !important;
  }
}
</style>
