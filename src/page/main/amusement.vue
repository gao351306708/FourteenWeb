/**娱乐模块**/
<template>
  <div class="amusement">
    <section class="section_left">
    </section>
    <section class="section_right" >
      <a class="visuals delay-1">
          <span class="picture">
            <img :src="partList[current].imgUrl">
          </span>
      </a>
      <div class="center_section">
        <div class="centerPart"
             v-for="(item,index) in partList"
             :key="index"
             @click="current=index">
          <div :class="index==current?'title_sec active': 'title_sec'">{{item.title}}</div>
          <div class="date_sec" v-if="index==current">
            <div class="top">{{item.mouth}}</div>
            <span class="stroke"></span>
            <div class="bottom">{{item.year}}</div>
          </div>
        </div>
        <div class="arrow">
          <i class="el-icon-back" style="width: 30px"></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    //data中放入初始默认值
    data() {
      return {
        partList:[
          {
            title:'Picture',
            year:'2018',
            mouth:'9月',
            imgUrl:'../../../static/images/amusement1.jpg'
          },{
            title:'Video',
            year:'2019',
            mouth:'1月',
            imgUrl:'../../../static/images/amusement2.jpg'
          }
        ],
        current:0,
      }
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

    },
    methods:{
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .amusement{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .section_left{
      position: absolute;
      top: 40px;
      bottom: 40px;
      right: 58%;
      left: 50px;
    }
    .section_right{
      position: absolute;
      top: 40px;
      bottom: 40px;
      left: 42%;
      right: 50px;
      .visuals{
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 30%;
        background: #cfd2d2;
        z-index: 1;
        cursor:pointer;
        .picture{
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          img{
            position: relative;
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
          }
        }
      }
      .center_section{
        position: absolute;
        top: 50%;
        left: 10%;
        margin-top: -100px;
        margin-left: 50px;
        width: 160px;
        z-index: 6;
        .centerPart{
          width: 200px;
          height: 100px;
          cursor: pointer;
          .title_sec{
            font-size: 60px;
            font-family: -webkit-pictograph;
            text-align: left;
            font-weight: 600;
            font-style: normal;
            color: #2f2f2f96;
            margin-left: 60px;
          }
          .title_sec.active{
            color: #000000;
          }
          .date_sec{
            position: absolute;
            font-size: 12px;
            margin-top: -36px;
            right: calc(100% - 24px);
            .top{
              position: absolute;
              white-space:nowrap;
              right: 0;
              bottom: 5px;
              font-family: cursive
            }
            .stroke{
              display: block;
              position: absolute;
              top: 0;
              right: 0;
              width: 40px;
              height: 1px;
              background: #000;
              transform: scaleX(1);
            }
            .bottom{
              position: absolute;
              top: 5px;
              right: 0;
            }
          }
        }

        .arrow{
          display: block;
          width: 40px;
          font-size: 28px;
          margin: 0 0 0 64px;
          transition: transform .3s;
          will-change: transform;
        }
        .arrow i{
          transform: rotate(180deg);
        }
        .arrow:hover{
          transform:translate(5px,0px);
          cursor: pointer;
        }
      }
    }
  }
</style>
