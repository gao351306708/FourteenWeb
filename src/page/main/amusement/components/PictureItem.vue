<template>
  <div class="PictureItem" @click="godetails(data)">
    <div class="sectionMain" :style="styleCss">
      <img :src="data.urls.small" />
      <div v-if="pictureDetails" class="details">
        <div class="top-right">
          <el-button @click="setLikedHandle(data.liked_by_user)">
            <img style="width: 24px; height: 24px" :src="getHeartImg(data.liked_by_user)" />
            {{ data.likes }}
          </el-button>
        </div>
        <div class="bottom">
          <img :src="data.user.profile_image.medium" />
          <div class="username">{{ data.user.name }}</div>
          <div class="download">
            <el-button icon="el-icon-download" @click="downloadHandle(data)"></el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
import { downloadPhotoById, setLikePhoto, setUnLikePhoto } from "@/api/unsplash.js";
export default {
  name: "PictureItem",
  props: {
    data: {
      type: Object,
      default: {}
    },
    styleCss: {
      type: Object,
      default: {}
    }
  },
  computed: {
    pictureDetails() {
      let windowW = window.innerWidth;
      return windowW > 860 ? true : false;
    }
  },
  filters: {
    YYYYMMDD(val) {
      let time = Number(val);
      return moment(time).format("YYYY年MM月DD日 HH:mm");
    }
  },
  mounted() {
    $(".PictureItem").on("mouseover", function () {
      $(this).find(".details").show();
    });
    $(".PictureItem").on("mouseout", function () {
      $(this).find(".details").hide();
    });
  },
  methods: {
    getHeartImg(val) {
      if (val) {
        return "/static/images/heart2.png";
      } else {
        return "/static/images/heart1.png";
      }
    },
    setLikedHandle() {
      let like = this.data.liked_by_user;
      let id = this.data.id;

      if (like) {
        setUnLikePhoto(id, (res) => {
          console.log("点赞成功", res);
          this.data.liked_by_user = false;
        });
      } else {
        setLikePhoto(id, (res) => {
          console.log("点赞成功", res);
          this.data.liked_by_user = true;
        });
      }
    },
    downloadHandle(item) {
      console.log("下载", item);
      let id = item.id;
      downloadPhotoById(id, (res) => {
        console.log("下载成功");
      });
    },
    godetails(item) {
      this.$router.push({
        path: `${this.$route.path}/photos/${item.id}`
      });
    }
  }
};
</script>
<style lang="less" scoped>
.PictureItem {
  position: relative;
  display: flex;
  flex-direction: column;
  float: left;
  margin: 0 10px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  .sectionMain {
    position: relative;
    height: 100%;
    .details {
      position: absolute;
      display: none;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(154, 150, 150, 0.23);
      opacity: 0.8;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .top-right {
      position: absolute;
      text-align: right;
      width: 100%;
      top: 1rem;
      height: 3.75rem;
      button {
        margin: 0 0.5rem;
      }
      img {
        float: left;
        margin-right: 0.3125rem;
      }
    }
    .bottom {
      position: absolute;
      text-align: left;
      width: 100%;
      height: 3.75rem;
      bottom: 0.3125rem;
      img {
        float: left;
        margin-left: 0.625rem;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 1.25rem;
      }
      .username {
        float: left;
        color: white;
        margin: 0.625rem 0 0 0.625rem;
        width: 6.25rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .download {
        float: right;
        margin-right: 0.625rem;
      }
    }
  }
  .footer {
    position: relative;
    width: 100%;
  }
  .el-button {
    padding: 4px 15px;
    line-height: 24px;
  }
}
</style>