<template>
  <div class="TagList">
    <el-tag type="info" v-for="(itemm, index) in taglist" :key="index" @click="clickTag(itemm.title)">{{ itemm.title }}</el-tag>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "TagList",
  props: {
    List: {
      type: Array,
      default: []
    },
    styleCss: {
      type: Object,
      default: () => {
        let backColor = {};
        return backColor;
      }
    },
    maxLen: {
      type: Number,
      default: 0
    }
  },
  data() {
    return { taglist: [] };
  },
  watch: {
    List(val) {
      this.getlist(this.val);
    }
  },
  mounted() {
    this.getlist(this.List);
  },
  methods: {
    clickTag(val) {
      console.log("clickTag---", val);
      this.$router.push({
        path: "Search",
        query: { keyName: val }
      });
    },
    getlist(list) {
      if (list && this.maxLen) {
        this.taglist = list.slice(0, this.maxLen);
      } else {
        this.taglist = list;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.TagList {
  position: relative;
  width: 100%;
  span {
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    background-color: #e9e9eb;
    cursor: pointer;
  }
}
</style>
