/**大杂烩，喜欢的各种类型都放这里**/
<template>
  <div class="allmost">
    <div class="section_container">
      <div>.......</div>
    </div>
    <div class="Footer">
      <FooterBottom></FooterBottom>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterBottom from "@/components/footerBottom.vue";
export default {
  //data中放入初始默认值
  components: {
    FooterBottom
  },
  data() {
    return {
      fileList: [],
      //filename:'default/词汇表.xlsx',
      labelPosition: "right",
      formLabelAlign: {
        number: "",
        type: "",
        filename: ""
      }
    };
  }
};
</script>

<style scoped lang="less" type="text/less">
@import "../../assets/mixin.less";
.allmost {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .section_container {
    position: absolute;
    top: 50px;
    bottom: 40px;
    left: 50px;
    right: 50px;
    padding: 40px;
  }
  .Footer {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
}
</style>
