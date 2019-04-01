<template>
  <div class="Picture">
    <div class="closeIcon" @click="exit()"><i class="el-icon-close" style="font-size: 36px"></i></div>
    <div class="section_container">
      <div class="section_header">
        <div class="section_content">
          <p class="title1">Unsplash</p>
          <p class="title2" v-show="headShow">Beautiful, free photos.</p>
          <p class="title2" v-show="headShow">Gifted by the world’s most generous community of photographers.</p>
          <p class="search">
            <el-input prefix-icon="el-icon-search"
                      v-model="searchValue"
                      placeholder="输入匹配关键字查找"
                      clearable></el-input>
          </p>
          <p class="tips_content">Trending searches:business，computer，nature，love，house</p>
        </div>
      </div>
      <div class="section_picture">
        <div v-if="pictureList.length>0">
          <Waterfall :line-gap="pictureWidth" :watch="pictureList">
            <WaterfallSlot v-for="(item, index) in pictureList"
                           :height="(pictureWidth*item.height)/item.width"
                           :width="pictureWidth"
                           :order="index"
                           :key="index"
                           style="padding: 5px 10px;" >
              <div class="picture" :style="HandlePreColor()">
                <img :src="item.urls.regular">
                <div class="details">
                  <div class="top-right">
                    <el-button><img style="width: 24px;height: 24px" src="../../../static/images/heart2.png"/>{{item.likes}}</el-button>
                  </div>
                  <div class="bottom">
                    <img :src="item.user.profile_image.medium">
                    <div class="username">{{item.user.name}}</div>
                    <div class="download"><el-button icon="el-icon-download"></el-button></div>
                  </div>
                </div>
              </div>
            </WaterfallSlot>
          </Waterfall>
        </div>
        <div v-else>
          <h1>没有查到。。。</h1>
          <img src="../../../static/images/photosNull.png">
        </div>
      </div>
    </div>
    <div class="buttonToTop" @click="backTotOP()">
      <i class="el-icon-arrow-up"></i>
      <p>顶部</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getAllPhotos,searchPhotos} from '../../api/unsplash.js'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import {HandlePreImg} from '../../config/publicMethod'
  export default{
    data(){
      return{
        searchValue:"",
        pictureList:[],
        searchTotal:0,
        pictureWidth:400,
        pageNum:1,//页码 默认第一页
        pageSize:30,//每页查询条数
        headShow:true
      }
    },
    components:{
      Waterfall,
      WaterfallSlot
    },
    beforeMount(){
      let _this = this;
      $(".wrapper_door").transition({
        opacity: 1,
        duration: 1000,
        easing: 'linear'
      });
    },
    mounted(){
      let _this = this;
      $(".navigation").hide();
      this.GLOBAL.getPageName = false;
      this.headShow = $(window).width()<480 ? false:true;
      $('.search .el-icon-search').on('click',function(){
        _this.searchPicture();
      })
      this.pictureWidth = $('.section_picture').width()*0.333333 - 8;
      //默认获取20张图片
      getAllPhotos(this.pageNum,this.pageSize,(data)=>{
        console.log("getAllPhotos--------->",this.GLOBAL.getPageName,data);
        this.pictureList = data;
      })
      document.onkeyup = function (e) {
        if (window.event)//如果window.event对象存在，就以此事件对象为准
          e = window.event;
          var code = e.charCode || e.keyCode;
          if (code == 13) {
            _this.searchPicture();
          }
      }
      $('.Picture').scroll(function(){
        let scrollH = $(this)[0].scrollHeight;
        let clientH = $(this)[0].clientHeight;
        let scrollTop = $(this).scrollTop();
        if(scrollTop + clientH == scrollH){
          console.log("到底了。。。",scrollH,clientH,scrollTop)
          _this.pageNum = _this.pageNum + 1;
          getAllPhotos(_this.pageNum,_this.pageSize,(data)=>{
            console.log("getAllPhotos--------->",_this.pageNum,_this.pageSize,data);
            _this.pictureList = _this.pictureList.concat(data);
          })
        }
      })
    },
    updated(){
      $('.picture').on('mouseover',function(){
        $(this).find('.details').show();
      });
      $('.picture').on('mouseout',function(){
        $(this).find('.details').hide();
      });
    },
    methods:{
      HandlePreColor(){
        let backColor = {backgroundColor:HandlePreImg()};
        return backColor;
      },
      backTotOP(){
        $('.Picture').scrollTop(0);
      },
      exit(){
        this.$router.back();
      },
      searchPicture(){
        if(!this.searchValue){
          this.$message({
            message: '请输入关键字！（please input the key value）',
            type: 'warning'
          });
          return;
        }
        this.$router.push({path:'Search',query:{keyName:this.searchValue}})
      }
    },
    destroyed(){
      $(".navigation").show();
      this.GLOBAL.getPageName = true
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .Picture{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    .buttonToTop{
      position: fixed;
      bottom: 20px;
      right: 30px;
      width: 50px;
      height: 50px;
      background-color: #2196f37a;
      border-radius: 25px;
      cursor: pointer;
    }
    .section_container {
      position: relative;
      top: 80px;
      bottom: 40px;
      padding: 0 45px;
      .section_header{
        position: relative;
        height: 45vw;
        background:url("/static/images/picture-header.jpg") no-repeat;
        background-size: cover;
        margin-bottom: 50px;
        .section_content{
          position: absolute;
          top: 50%;
          left: 50%;
          width: 75%;
          min-height: 100px;
          transform: translate(-50%,-50%);
          text-align: left;
          .title1{
            font-size: 2em;
            color: white;
            margin-bottom: 10px;
          }
          .title2{
            font-size: 1.5em;
            color: white;
            margin: 8px 0;
          }
          .search{
            margin: 20px 0;
          }
          .tips_content{
            font-size: 1em;
            color: hsla(0,0%,100%,.8);
            margin: 8px;
          }
        }
      }
      .section_picture{
        max-width: 1320px;
        padding-left: calc(4px * 3);
        padding-right: calc(4px * 3);
        margin: 0 auto;
        .picture{
          position: relative;
          float: left;
          margin: 0 10px;
          cursor:pointer;
          width: 100%;
          height: 100%;
          .details{
            position: absolute;
            display: none;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(154, 150, 150, 0.23);
            opacity: 0.8;
          }
          img{
            width: 100%;
            height: 100%;
          }
          .top-right{
            position: absolute;
            text-align: right;
            width: 100%;
            top: 15px;
            height: 60px;
            button{
              margin: 0 8px;
            }
            img{
              float: left;
              margin-right: 5px;
            }
          }
          .bottom{
            position: absolute;
            text-align: left;
            width: 100%;
            height: 60px;
            bottom: 5px;
            img{
              float: left;
              margin-left: 10px;
              width: 40px;
              height: 40px;
              border-radius: 20px;
            }
            .username{
              float: left;
              color: white;
              margin: 10px 0 0 10px;
            }
            .download{
              float: right;
              margin-right: 10px;
            }
          }
          .el-button{
            padding: 4px 15px;
            line-height: 24px;
          }
        }
        .myPagination{

        }
      }
    }
  }
</style>
