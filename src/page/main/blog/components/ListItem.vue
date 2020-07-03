<template>
  <div class="ListItem">
    <div class="section_top">
      <div class="content_type">
        <div class="typeTag">
          <li v-for="(tag,index) in data.tag" :key="index">{{tag}}</li>
        </div>
        <div class="interview">
          <img src="@/assets/img/web/eye.png" />
          <span>{{data.interviewNum}}</span>
        </div>
      </div>
      <div class="content_title">{{data.title}}</div>
      <div class="content_date">{{data.createTime|YYYYMMDD}}</div>
      <div class="content_desc">{{data.description}}</div>
    </div>
    <div class="section_bottom">
      <div class="readmore">查看更多</div>
      <div></div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "ListItem",
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  filters: {
    YYYYMMDD(val) {
      let time = Number(val);
      return moment(time).format("YYYY年MM月DD日 HH:mm");
    }
  }
};
</script>
<style lang="less" scoped>
.ListItem {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 2px #f8f9f9;
  .section_top {
    padding: 10px 14px;
    .content_type {
      display: flex;
      justify-content: space-between;
      .typeTag {
        display: flex;
        color: #76767a;
        li {
          padding: 0 10px;
        }
        li::before {
          position: relative;
          left: -10px;
          content: " ";
          border-left: 1px solid #76767a;
          display: inline-block;
          height: 10px;
        }
        :first-child {
          padding-left: 0;
        }
        :first-child::before {
          display: none;
        }
      }
      .interview {
        color: #a5b2bf;
        img {
          width: 16px;
        }
      }
    }
    .content_title {
      font-size: 1.4rem;
      font-weight: 400;
      padding: 8px 0;
    }
    .content_date {
      font-size: 0.7rem;
      color: #b3b3b3;
    }
  }
  .section_bottom {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #f4f4f4;
    padding: 10px 14px;
    .readmore {
      color: #a193ed;
      cursor: pointer;
    }
  }
}
</style>