<template>
  <div class="Waterfall">
    <Waterfall :line-gap="pictureWidth" :watch="List">
      <WaterfallSlot
        v-for="(item, index) in List"
        :height="(pictureWidth * item.height) / item.width + 50"
        :width="pictureWidth"
        :order="index"
        :key="index"
        style="padding: 5px 10px"
      >
        <slot v-bind:item="item">
          <PictureItem :data="item">
            <template slot="footer" v-if="showfooter">
              <div class="pictureIntroduce">
                <TagList :List="item.tags" :maxLen="3"></TagList>
              </div>
            </template>
          </PictureItem>
        </slot>
      </WaterfallSlot>
    </Waterfall>
  </div>
</template>
<script>
import Waterfall from "vue-waterfall/lib/waterfall";
import WaterfallSlot from "vue-waterfall/lib/waterfall-slot";
import PictureItem from "./PictureItem.vue";
import TagList from "@/components/TagList";
export default {
  name: "WaterFall",
  props: {
    List: {
      type: Array,
      default: []
    },
    showfooter: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Waterfall,
    WaterfallSlot,
    PictureItem,
    TagList
  },
  data() {
    return {
      pictureWidth: 300
    };
  },
  mounted() {
    this.setPictureWidth();
  },
  methods: {
    setPictureWidth() {
      let windowW = window.innerWidth;
      let wid = windowW > 860 ? $(".Waterfall").width() * 0.333333 - 8 : $(".Waterfall").width() * 0.5 - 8;
      this.pictureWidth = wid;
    }
  }
};
</script>
<style lang="less" scoped>
.Waterfall {
  width: 100%;
  .pictureIntroduce {
    position: relative;
    float: left;
    margin: 10px 0;
    width: 100%;
    text-align: left;
  }
}
</style>