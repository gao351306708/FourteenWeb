/**娱乐模块**/
<template>
  <router-view></router-view>
</template>

<script type="text/ecmascript-6">
  import {getAllPhotos} from '../../api/unsplash.js'
  export default {
    //data中放入初始默认值
    data() {
      return {}
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
      .video{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 578px;
        height: 454px;
        margin: -227px 0 0 -289px;
        video{
          width: 100%;
          height: 100%;
        }
      }
      .delay-1{
        transition-delay: .05s;
      }
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
        margin-left: 20px;
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
