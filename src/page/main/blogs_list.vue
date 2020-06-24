/**博客列表页**/
<template>
  <div class="blogList">
    <backButton></backButton>
    <div class="section_container">
      <el-row :gutter="10" class="section_All">
        <el-col :xs="24" :md="18" style="height: 100%">
          <div class="section_left">
            <div class="header_section">
              <strong>我最新的文章</strong>
            </div>
            <div class="list_section">
              <div class="listPart" v-for="(item,index) in partList" :key="index">
                <!-- <img :src="item.imgUrl"> -->
                <div class="content">
                  <div class="content_top">
                    <strong>{{item.title}}</strong>
                  </div>
                  <div class="content_bottom">
                    <div class="more" @click="getDetails(item)">更多</div>
                    <div class="content_mid">
                      <span class="viewsNum">浏览次数：{{item.interviewNum}}</span>
                      <span class="viewsNum">创建日期：{{item.createTime|YYYYMMDD}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-pagination
              layout="prev, pager, next"
              :total="50">
            </el-pagination>
          </div>
        </el-col>
        <el-col :xs="24" :md="6" style="height: 100%">
          <div class="section_right">
            <div class="search">
              <el-input suffix-icon="el-icon-search"
                        v-model="searchValue"
                        placeholder="输入匹配关键字查找">
              </el-input>
            </div>
            <div class="userInfo">
              <el-card :body-style="{ padding: '0px' }">
                <img src="../../../static/images/aboutHu2.jpg" class="image">
                <div style="padding: 14px;">
                  <span>Rambo_Gao</span>
                  <div class="bottom clearfix">
                    <span>原创 <strong>55</strong></span>
                    <span>访问 <strong>126</strong></span>
                    <span>喜欢 <strong>88</strong></span>
                  </div>
                </div>
              </el-card>
            </div>
            <div class="newBlogs">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="henggang"></span><span>最新文章</span>
                </div>
                <div v-for="o in 4" :key="o" class="textItem">
                  {{'列表内容 ' + o }}
                </div>
              </el-card>
            </div>
            <div class="catgoriesBlogs">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="henggang"></span><span>个人分类</span>
                </div>
                <div v-for="(item,index) in categoryList"
                     :key="index"
                     :class="['textItem',{'active':searchName == item.name}]"
                     @click="getKeyTile(item.name)">
                  {{item.name }}
                  <span class="number">{{'('+item.num+')'}}</span>
                </div>
              </el-card>
            </div>
            <div class="popularBlogs">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="henggang"></span><span>热门文章</span>
                </div>
                <div v-for="o in 4" :key="o" class="textItem">
                  {{'列表内容 ' + o }}
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import backButton from '@/components/backButton.vue'
  import {queryBlogList} from '@/api/manage.js'
  import moment from 'moment'
  export default {
    //data中放入初始默认值
    components:{
      backButton
    },
    data() {
      return {
        partList:[],
        categoryList:[
          {
            name:'javaScript',
            num:'10'
          },{
            name:'react',
            num:'15'
          },{
            name:'vue',
            num:'12'
          },{
            name:'Html5',
            num:'5'
          },
        ],
        searchValue:'',
        searchName:'',
        detailName:'',
        currentDate: new Date()
      }
    },
    created(){
      this.getBlogList();
    },
    mounted(){
      let _this = this;
      $(".navigation").hide();
      this.GLOBAL.getPageName = false;

      document.onkeyup = function (e) {
        if (window.event)//如果window.event对象存在，就以此事件对象为准
          e = window.event;
        var code = e.charCode || e.keyCode;
        if (code == 13) {
          _this.searchBlogs(_this.searchValue);
        }
      }
      $('.search .el-icon-search').on('click',function(){
        _this.searchBlogs(_this.searchValue);
      })
    },
    methods:{
      getBlogList(){
        let params = {
          key:this.searchValue
        }
        queryBlogList(params).then((res)=>{
          if(res.code == 200){
            this.partList = res.data;
          }
        }).catch((err)=>{
          
        });
      },
      getKeyTile(name){
        this.searchName = name;
        console.log("getKeyTile   --->",name);
        this.searchBlogs(name);
      },
      searchBlogs(name){
        console.log("searchBlogs   --->",name);
        this.searchName = name;
      },
      getDetails(item){
        console.log("getDetails   --->",item);
        this.details = item;
        this.$router.push({name:'BlogDetails',query:{id:item._id}})
      }
    },
    filters:{
      YYYYMMDD(val){
        let time = Number(val);
        return moment(time).format("YYYY-MM-DD HH:mm")
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
  .blogList{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  .section_container {
    position: relative;
    top: 0px;
    bottom: 2.5rem;
    padding: 0 2.8125rem;
    height: 100%;
    overflow: auto;
  .section_All{
    margin-bottom: 9.375rem;
    margin-top: 3.125rem;
  .section_right{
    background-color: #e1f2f4;
    padding: 0.9375rem;
  .userInfo,.newBlogs,.popularBlogs,.catgoriesBlogs{
    text-align: left;
    margin: 0.625rem 0;
  .henggang{
    height: 5px;
    width: 26px;
    background-color: black;
    display: inline-block;
    margin-right: 8px;
  }
  .textItem{
    padding: 5px;
  .number{
    float: right;
  }
  }
  }
  .userInfo{
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    span{
      margin: 0 5px;
    }
  }
  .image {
    width: 100%;
    display: block;
  }
  }
  .popularBlogs{

  }
  .catgoriesBlogs{
  .textItem{
    cursor: pointer;
    padding: 5px;
    .number{
      float: right;
    }
  }
  .textItem.active{
    color: #00a8e6;
  }
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  }
  .section_left{
    padding: 0.625rem 1.25rem;
    .header_section{
      font-size: 28px;
      text-align: left;
      margin: 1.25rem 0.625rem;
    }
    .list_section{
      .listPart{
        display: flex;
        min-height: 6rem;
        border: 1px solid #e1e1e1;
        margin: 1rem 0.625rem;
        img{
          width: 6rem;
          height: 6rem;
        }
        .content{
          text-align: left;
          padding: 0.5rem 1.5rem;
          width: 100%;
          .content_top{
            margin: 0.5rem 0;
            font-size: 1em;
        }
        .content_bottom{
          display: flex;
          justify-content: space-between;
          margin-top: 0.2rem;
          .more{
            font-size: 1em;
            text-decoration: underline;
            cursor: pointer;
          }
          .content_mid{
            .viewsNum{
              font-size: 1em;
              margin-left: 2em;
            }
          }
        }

        }

        }

      }
    }
  }
  }
  }
</style>
