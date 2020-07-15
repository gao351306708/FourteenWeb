<template>
  <div class="BlogList">
    <div class="list_section" v-for="(item,index) in AllList" :key="index">
      <ListItem :data="item" @click.native="clickHandle(item)" />
    </div>
    <el-pagination v-if="pagination" layout="prev, pager, next" :total="total"></el-pagination>
  </div>
</template>
<script>
import ListItem from "./ListItem.vue";
import { queryBlogList } from "@/api/manage.js";
export default {
  name: "BlogList",
  props: {
    pagination: {
      type: Boolean,
      default: true
    },
    keyValue: {
      type: String,
      default: ""
    },
    ActionClick: {
      type: Function,
      default: res => true
    }
  },
  components: {
    ListItem
  },
  data() {
    return {
      AllList: [], //最新文章列表
      currentList: [], //当前展示的列表
      pageSize: 10, //每页条数
      pageNo: 1, //页码
      total: 0 //总条数
    };
  },
  mounted() {
    //获取文章列表
    this.pageNo = 1;
    this.getBlogList();
  },
  methods: {
    refresh() {
      this.getBlogList();
    },
    async getBlogList(param = {}) {
      const { keyValue } = this;
      let params = {
        key: keyValue
      };
      Object.assign(params, param);
      let res = await queryBlogList(params);
      if (res.code == 200) {
        this.AllList = res.data;
        this.total = res.data.length;
      }
    },
    clickHandle(data) {
      this.ActionClick(data);
    }
  }
};
</script>
<style lang="less" scoped>
.BlogList {
  .list_section {
    margin: 1rem 0.625rem;
  }
}
</style>