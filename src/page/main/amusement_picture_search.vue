<template>
  <div class="searchPicture">
    <backButton></backButton>
    <div class="section_search">
      <p class="search">
        <el-input prefix-icon="el-icon-search"
                  v-model="searchValue"
                  placeholder="输入匹配关键字查找，（英文、中文、或字母等）"
                  clearable></el-input>
      </p>
    </div>
    <div class="section_container">
      <div class="searchResult">
        <div class="section1">{{searchValue + '图片'}}</div>
        <div class="section2">{{searchTotal+ ' 张免费的 ' +searchValue+ ' 图片'}}</div>
        <div class="section3">{{searchTotal+ ' 张照片 '}}<span class="user">{{searchTotal+ ' 个作者'}}</span></div>
      </div>
      <div class="section_picture">
        <div v-if="pictureList.length>0">
          <Waterfall :line-gap="pictureWidth" :watch="pictureList">
            <WaterfallSlot v-for="(item, index) in pictureList"
                           :height="(pictureWidth*item.height)/item.width + 100"
                           :width="pictureWidth"
                           :order="index"
                           :key="item.id"
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
              <div class="pictureIntroduce">
                <p class="description">{{item.description}}</p>
                <el-tag type="info" v-for="(itemm,index) in item.tags.slice(0,3) " :key="index">{{itemm.title}}</el-tag>
              </div>
            </WaterfallSlot>
          </Waterfall>
        </div>
        <div v-else>
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
  import backButton from '@/components/backButton.vue'
  export default{
    data(){
      return{
        searchValue:"",
        pictureList:[],
        searchTotal:0,
        pictureWidth:400,
        pageNum:1,//页码 默认第一页
      }
    },
    components:{
      Waterfall,
      WaterfallSlot,
      backButton
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
      this.pictureWidth = $('.section_picture').width()*0.333333 - 8;
      this.searchValue = this.$route.query.keyName;
      //默认获取20张图片
      searchPhotos(this.searchValue,this.pageNum,(data)=>{
        console.log("searchPhotos----searchPhotos----->",this.searchValue,this.pageNum,data);
        Object.assign(_this,{searchTotal:data.total,pictureList:data.results})
      })
      document.onkeyup = function (e) {
        if (window.event)//如果window.event对象存在，就以此事件对象为准
          e = window.event;
        var code = e.charCode || e.keyCode;
        if (code == 13) {
          _this.searchPicture();
        }
      }
      $('.search .el-icon-search').on('click',function(){
        _this.searchPicture();
      })
      $('.searchPicture').scroll(function(){
        let scrollH = $(this)[0].scrollHeight;
        let clientH = $(this)[0].clientHeight;
        let scrollTop = $(this).scrollTop();
        if(scrollTop + clientH == scrollH){
          console.log("到底了。。。",scrollH,clientH,scrollTop)
          const pageNum =  _this.pageNum + 1;
          searchPhotos(_this.searchValue,pageNum,(data)=>{
            console.log("getAllPhotos--------->",_this.pageNum,_this.pageSize,data);
            const pictureList = _this.pictureList.concat(data.results);
            Object.assign(_this,{pictureList,pageNum})
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
        $('.searchPicture').scrollTop(0);
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
        searchPhotos(this.searchValue,1,(data)=>{
          console.log("searchPhotos----searchPhotos----->",data);
          this.searchTotal = data.total
          this.pictureList = data.results;
        })
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
  .searchPicture{
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
  .section_search{
    position: fixed;
    top:80px;
    height: 100px;
    width: calc(100% - 90px);
    padding: 0 45px;
    z-index: 20;
    background-color: white;
    .search{
      margin: 20px 0;
    }
  }
  .section_container {
    position: relative;
    top: 180px;
    bottom: 40px;
    padding: 0 45px;
    .searchResult{
      position: relative;
      max-width: 1320px;
      padding-left: calc(4px * 3);
      padding-right: calc(4px * 3);
      margin: 0 auto;
      text-align: left;
      .section1{
        font-size: 3rem;
        font-weight: bolder;
        margin: 30px 20px;
      }
      .section2{
        font-size: 0.875rem;
        font-weight: bolder;
        margin: 10px 20px 50px 20px;
      }
      .section3{
        font-size: 1.125rem;
        font-weight: bolder;
        margin: 20px 20px 10px 20px;
        .user{
          font-weight:100;
          margin: 0 20px;
          color: #999;
        }
      }
    }
  .section_picture{
    max-width: 1320px;
    padding-left: calc(4px * 3);
    padding-right: calc(4px * 3);
    margin: 0 auto;
    .pictureIntroduce{
      position: relative;
      height: 60px;
      float: left;
      margin: 0 10px;
      width: 100%;
      text-align: left;
      .description{
        white-space: nowrap;
        margin: 15px 0;
        overflow-x: hidden;
        text-overflow: ellipsis;
      }
      span{
        margin-right: 10px;
      }
    }
    .picture{
      position: relative;
      float: left;
      margin: 0 10px;
      cursor:pointer;
      width: 100%;
      height: calc(100% - 100px);
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
  }
  }
  }
</style>
