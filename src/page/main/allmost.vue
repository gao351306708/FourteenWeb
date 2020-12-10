/**大杂烩，喜欢的各种类型都放这里**/
<template>
  <div class="allmost">
    <div class="section_container">
      <div class="main">
        <div class="scroll">
          <div class="part" v-for="(itm,idx) in menuList" :key="idx">
          <div class="title">{{itm.name}}</div>
          <div class="contnet">
            <template v-if="itm.items">
              <div class="item" v-for="(ite,ix) in itm.items" :key="ix">
                <div class="headerImg">{{ite.logo}}</div>
                <div class="header">
                  <div class="headerTitle">{{ite.title}}</div>
                  <div class="introduce">{{ite.introduce}}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
        </div>
      </div>
      <div class="menu">
        <div v-for="(part,index) in menuList" :key="index" :class="{'item':true,'active':index==currentItem}" @click="changeMenu(index)">{{part.name}}</div>
      </div>
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
  name: "allmost",
  components: {
    FooterBottom
  },
  data() {
    return {
      menuList:[{id:1,name:"经常使用",items:[{id:11,title:"title",logo:"",introduce:"jieshou"}]},{id:2,name:"常用网站"},{id:3,name:"视频网站"},{id:4,name:"学习网站"},{id:5,name:"在线直播"},{id:6,name:"常用工具"}],
      moudleList:[],
      currentItem:0
    };
  },
  methods:{
    changeMenu(val){
      this.currentItem = val
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
  overflow: hidden;
  .section_container {
    position: absolute;
    top: 50px;
    bottom: 70px;
    left: 150px;
    right: 50px;
    padding: 40px;
    display: flex;
    .menu{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 200px;
      .item{
        position: relative;
        padding: 8px 0;
        cursor: pointer;
      }
      .active{
        color: chocolate;
      }
      .active::before{
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
    .main{
      width: 100%;
      overflow: hidden;
      .scroll{
        overflow-y: auto;
        height: 100%;
        margin-right: -13px;
        padding-right: 15px;
      }
      .part{
        background-color: white;
        min-height: 100px;
        border-radius: 12px;
        margin-bottom: 20px;
        .title{
          line-height: 48px;
          font-size: 18px;
          font-weight: bold;
          padding-left: 20px;
          border-bottom: 1px solid #f1f4f9;
        }
        .contnet{
          display: flex;
          padding: 25px 20px;
          .item{
            display: flex;
            align-items: center;
            max-width: 150px;
            .headerImg{
              width: 40px;
              height: 40px;
              background-color: antiquewhite;
              border-radius: 50%;
              margin-right: 5px;
            }
            .header{
              .headerTitle{
                font-size: 14px;
                white-space: nowrap;
              }
              .introduce{
                color: #8f8f8f;
                font-size: 12px;
                overflow: hidden;
                margin-top: 8px;
              }
            }
          }
        }
      }
    }
  }
  .Footer {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
}
</style>
