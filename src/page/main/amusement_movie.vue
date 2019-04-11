/**查出腾讯视频的所有视频，展示页面**/
<template>
  <div class="Movie">
    <back-button></back-button>
    <div class="backTop" @click="backToTop()">返回顶部</div>
    <div class="section_container">
      <div class="selectSection">
        <!--<el-row v-for="(items,index) in movieSelectList"-->
                <!--:key="items.id"-->
                <!--:name="items.mainName"-->
                <!--style="margin: 10px 0">-->
          <!--<el-col style="width: 80px">-->
            <!--<el-tag type="success">{{items.mainName}}</el-tag>-->
          <!--</el-col>-->
          <!--<el-col :span="20">-->
            <!--<el-button v-for="item in items.children"-->
                      <!--:key="item.id"-->
                       <!--round-->
                       <!--:class="['tagKeys',{'active':(index+1)==items.id}]"-->
                       <!--size="mini"-->
                      <!--@click="clickTag(items,item)">-->
              <!--{{item.name}}-->
            <!--</el-button>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <el-row style="margin: 10px 0">
          <el-col style="width: 80px">
            <el-tag type="success">{{movieSelectList1.isort.mainName}}</el-tag>
          </el-col>
          <el-col :span="20">
            <el-button v-for="item in movieSelectList1.isort.children"
                       :key="item.id"
                       round
                       :class="['tagKeys',{'active':item.key == isort}]"
                       size="mini"
                       @click="clickTag(movieSelectList1.isort,item)">
              {{item.name}}
            </el-button>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col style="width: 80px">
            <el-tag type="success">{{movieSelectList1.itype.mainName}}</el-tag>
          </el-col>
          <el-col :span="20">
            <el-button v-for="item in movieSelectList1.itype.children"
                       :key="item.id"
                       round
                       :class="['tagKeys',{'active':item.key == itype}]"
                       size="mini"
                       @click="clickTag(movieSelectList1.itype,item)">
              {{item.name}}
            </el-button>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col style="width: 80px">
            <el-tag type="success">{{movieSelectList1.iarea.mainName}}</el-tag>
          </el-col>
          <el-col :span="20">
            <el-button v-for="item in movieSelectList1.iarea.children"
                       :key="item.id"
                       round
                       :class="['tagKeys',{'active':item.key == iarea}]"
                       size="mini"
                       @click="clickTag(movieSelectList1.iarea,item)">
              {{item.name}}
            </el-button>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col style="width: 80px">
            <el-tag type="success">{{movieSelectList1.icharge.mainName}}</el-tag>
          </el-col>
          <el-col :span="20">
            <el-button v-for="item in movieSelectList1.icharge.children"
                       :key="item.id"
                       round
                       :class="['tagKeys',{'active':item.key == icharge}]"
                       size="mini"
                       @click="clickTag(movieSelectList1.icharge,item)">
              {{item.name}}
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="movieSection">
        <div v-for="(item,index) in movieList" :key="index" class="cardPart" @click="movieGo(item)">
          <el-card :body-style="{ padding: '0px' }" >
            <img :src="item.imgUrl" class="image">
            <div style="padding: 14px;">
              <div class="title">{{item.title}}</div>
              <div class="starts">{{item.starts}}</div>
              <div class="num">播放量：{{item.num}}</div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getMovieList,getMovieDetail} from '../../api/tencent'
  import backButton from '../../components/backButton.vue'
  import {movieSelectKeyList,movieSelectKeyList1} from '../../data/movieSelectKey'
  export default {
    //data中放入初始默认值
    data() {
      return {
        movieList:[],
        movieSelectList:movieSelectKeyList,
        movieSelectList1:movieSelectKeyList1,
        pagesize:30,
        offset:0,
        isort:18,//排序，默认18 最新热搜
        itype:-1,//类型
        iarea:-1,//地区
        icharge:-1,//资源
        currentSelect:'',
      }
    },
    components:{
      backButton,
    },
    computed:{

    },
    beforeMount(){
      $(".wrapper_door").transition({
        opacity: 1,
        duration: 1000,
        easing: 'linear'
      });
    },
    mounted(){
      $(".navigation").hide();
      this.GLOBAL.getPageName = false;
      //https://node.video.qq.com/x/api/float_vinfo2?cid=j3czmhisqin799r
      //http://v.qq.com/txp/iframe/player.html?vid=t0029dmt201
      //https://v.qq.com/x/bu/pagesheet/list?_all=1&append=0&channel=movie&listpage=2&offset=0&pagesize=30&sort=18&charge=-1&iarea=-1&itype=100004
      //http://localhost:1004/api/tencent/getMovieList?pagesize=30&offset=0&sort=undefined&itype=-1&iarea=-1&charge=-1
      this.getMovieListOfKey();
      let _this = this;
      $('.section_container').scroll(function(){
        var scrollTop = $(this).scrollTop();
        var selectSection = $('.selectSection').height() + 20;
        var scrollHeight = $('.movieSection').height();
        var windowHeight = $(this).height();
        console.log(scrollTop,selectSection,windowHeight,scrollHeight)
        if(scrollTop + windowHeight == scrollHeight + selectSection){
          console.info("已经到最底部了！");
          console.info("_this.offset====>", _this.offset + 30);
          let data = {
            pagesize: _this.pagesize,
            offset: _this.offset + 30,
            isort: _this.isort,
            itype: _this.itype,
            iarea: _this.iarea,
            icharge: _this.icharge,
          };
          getMovieList(data,function(data){
            _this.offset = _this.offset + 30;
            _this.movieList = _this.movieList.concat(data.movies);
          })
        }
      });
    },
    methods:{
      getMovieListOfKey(){
        let data = {
          pagesize:this.pagesize,
          offset:this.offset,
          isort:this.isort,
          itype:this.itype,
          iarea:this.iarea,
          icharge:this.icharge,
        };
        let _this = this;
        getMovieList(data,function(data){
          _this.movieList = data.movies
        })
      },
      movieGo(item){
        //获取影影片的详细信息
        getMovieDetail(item.dataset,function(data){
          console.log("返回数据===》",data);
          let vid = data.c.video_ids[0];
          window.open(`http://v.qq.com/txp/iframe/player.html?vid=${vid}`)
        })
      },
      clickTag(parent,item){
        console.log("clickTag===》",parent,item);
        console.log("clickTag===》",parent.id,item.key);
        this.currentSelect = parent.mainName;
        this.offset = 0;
        switch (parent.id){
          case 1:
                this.isort = item.key;
                break;
          case 2:
                this.itype = item.key;
                break;
          case 3:
                this.iarea = item.key;
                break;
          case 4:
                this.icharge = item.key;
                break;
        };
        this.getMovieListOfKey();
      },
      backToTop(){
        $('.section_container').scrollTop(0);
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
  .Movie{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .backTop{
      position: absolute;
      bottom: 2%;
      right: 4%;
      width: 46px;
      height: 46px;
      padding: 8px;
      border-radius: 30px;
      background-color: darkseagreen;
      z-index: 101;
      cursor: pointer;
    }
  .section_container{
    position: absolute;
    overflow-x:hidden ;
    overflow-y: auto;
    top: 50px;
    bottom: 40px;
    left: 50px;
    right: 50px;
    padding: 40px 40px 0 40px;
    .selectSection{
      width: 100%;
      min-height: 100px;
      text-align: left;
      padding: 0 20px;
      .tagKeys{
        margin: 0 5px;
      }
      .tagKeys.active{
        color: #31baff;
      }
    }
    .movieSection{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      /*height: calc(100% - 100px);*/
      justify-content: space-between;
    .cardPart{
      width: 200px;
      padding: 0.8em;
      text-align: left;
    .image {
      width: 100%;
      display: block;
    }
    .title{
      margin: 5px 0;
      font-size: 1em;
      font-weight: bolder;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .starts ,.num{
      font-size: 0.7em;
      color: darkgray;
      margin: 3px 0;
    }
    .starts{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    }
    }
  }
  }
</style>
