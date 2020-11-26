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
      if (this.maxLen) {
        this.taglist = val.slice(0, this.maxLen);
      } else {
        this.taglist = val;
      }
    }
  },
  mounted() {
    this.taglist = this.List;
  },
  methods: {
    clickTag(val) {
      console.log("clickTag---", val);
      this.$router.push({
        path: "Search",
        query: { keyName: val }
      });
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
  }
}
</style>
