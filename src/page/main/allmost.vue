/**大杂烩，喜欢的各种类型都放这里**/
<template>
  <div class="allmost">
    <el-row class="section_container">
      <el-col :span="18" :xs="24" class="main">
        <div class="part" v-for="(itm, idx) in menuList" :key="idx" :id="itm.id">
          <div class="title">{{ itm.name }}</div>
          <div class="contnet">
            <template v-if="itm.items">
              <div class="item" v-for="(ite, ix) in itm.items" :key="ix" @click="clickWebsitHandle(ite)">
                <div class="headerImg"><img :src="ite.logo" /></div>
                <div class="header">
                  <div class="headerTitle">{{ ite.title }}</div>
                  <div class="introduce">{{ ite.introduce }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :xs="0">
        <div class="menu">
          <div v-for="(part, index) in menuList" :key="index" :class="{ item: true, active: index == currentItem }" @click="changeMenu(part, index)">
            {{ part.name }}
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="Footer">
      <FooterBottom></FooterBottom>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterBottom from "@/components/footerBottom.vue";
import websit from "@/data/websit";
export default {
  //data中放入初始默认值
  name: "allmost",
  components: {
    FooterBottom
  },
  data() {
    return {
      menuList: websit.websitList,
      moudleList: [],
      currentItem: 0
    };
  },
  methods: {
    changeMenu(item, val) {
      this.currentItem = val;
      //定位锚点
      document.getElementById(item.id) && document.getElementById(item.id).scrollIntoView(true);
    },
    clickWebsitHandle(item) {
      window.open(item.url);
    }
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
  overflow-y: auto;
  overflow-x: hidden;
  .section_container {
    position: relative;
    padding: 40px;
    display: flex;
    .menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 200px;
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 100;
      height: 400px;
      .item {
        position: relative;
        padding: 8px 0;
        cursor: pointer;
      }
      .active {
        color: chocolate;
      }
      .active::before {
        content: "";
        background-color: black;
        width: 16px;
        height: 4px;
        position: absolute;
        left: -24px;
        margin-top: 10px;
        z-index: 1;
      }
    }
    .main {
      margin-left: 8%;
      width: 100%;
      overflow: hidden;
      .scroll {
        overflow-y: auto;
        height: 100%;
        margin-right: -13px;
        padding-right: 15px;
      }
      .part {
        background-color: white;
        min-height: 100px;
        border-radius: 12px;
        margin-bottom: 20px;
        .title {
          line-height: 48px;
          font-size: 18px;
          font-weight: bold;
          padding-left: 20px;
          border-bottom: 1px solid #f1f4f9;
        }
        .contnet {
          display: flex;
          flex-wrap: wrap;
          padding: 25px 20px;
          .item {
            display: flex;
            align-items: center;
            max-width: 200px;
            cursor: pointer;
            margin-right: 25px;
            margin-bottom: 25px;
            padding: 8px;
            .headerImg {
              width: 40px;
              height: 40px;
              background-color: antiquewhite;
              border-radius: 50%;
              margin-right: 10px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            .header {
              .headerTitle {
                font-size: 15px;
                white-space: nowrap;
              }
              .introduce {
                max-width: 135px;
                color: #8f8f8f;
                font-size: 13px;
                margin-top: 8px;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                line-clamp: 2;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                box-orient: vertical;
              }
            }
          }
        }
      }
    }
  }
  .Footer {
    position: relative;
    width: 100%;
    height: 150px;
  }
}
</style>
