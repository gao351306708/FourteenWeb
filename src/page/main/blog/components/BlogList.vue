<template>
  <div class="BlogList" v-if="!loading">
    <div v-if="currentList.length>0">
      <ListItem
        v-for="(item,index) in currentList"
        :key="index"
        :data="item"
        @click.native="clickHandle(item)"
        class="list_section"
      />
    </div>
    <div v-else>
      <NoData />
    </div>
    <el-pagination
      v-if="pagination"
      layout="total,prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    ></el-pagination>
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
      type: Object,
      default: res => {}
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
      pageSize: 10, //每页条数
      pageNo: 1, //页码
      total: 0, //总条数
      loading: true
    };
  },
  watch: {
    keyValue: {
      deep: true,
      handler: function(val) {
        this.refresh();
      }
    }
  },
  computed: {
    currentList() {
      let newList = this.AllList.slice(
        this.pageSize * (this.pageNo - 1),
        this.pageSize * this.pageNo
      );
      return newList;
    }
  },
  mounted() {
    //获取文章列表
    this.getBlogList();
  },
  methods: {
    refresh() {
      this.pageNo = 1;
      this.getBlogList();
    },
    async getBlogList(param = {}) {
      const { keyValue } = this;
      let params = keyValue;
      Object.assign(params, param);
      let res = await queryBlogList(params);
      if (res.code == 200) {
        this.AllList = res.data;
        this.total = res.data.length;
      }
      this.loading = false;
    },
    clickHandle(data) {
      this.ActionClick(data);
    },
    //切换页码处理函数
    handleCurrentChange(val) {
      this.pageNo = val;
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