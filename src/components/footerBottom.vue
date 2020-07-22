<template>
  <div class="doorFooter">
    <div class="left">
      <a href="http://www.beian.miit.gov.cn" target="blank">@ 京ICP备19052693号</a>
    </div>
    <div class="right">
      <div class="part">
        <strong class="title">热门浏览</strong>
        <ul>
          <li>
            <router-link to="/Amusement/Picture" class="arrow">唯美照片</router-link>
          </li>
          <li>
            <router-link to="/Amusement/Movie" class="arrow">休闲一下看会儿剧</router-link>
          </li>
        </ul>
      </div>
      <div class="part">
        <strong class="title">联系我们</strong>
        <ul>
          <li>
            <a href="tel:17600666107">17600666107</a>
          </li>
          <li>
            <a href="mailto:351306708@qq.com">351306708@qq.com</a>
          </li>
        </ul>
      </div>
      <div class="part">
        <img src="../../static/images/QRcode.png" />
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="less" scoped type="text/less">
.doorFooter {
  position: absolute;
  width: 100vw;
  min-height: 110px;
  background-color: #ffffff;
  font-size: 14px;
  bottom: 0;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  align-items: center;
  a {
    color: inherit;
    outline: none;
  }
  .left {
    margin: 0 auto;
  }
  .right {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    min-width: 60%;
    .part {
      margin: 0 30px;
      text-align: right;
      strong {
        font-family: Mensch;
        font-weight: 400;
        color: #585858;
        margin-bottom: 10px;
      }
      ul {
        margin-top: 6px;
      }
      li {
        color: #9b9b9b;
        line-height: 1.5;
      }
      img {
        height: 80px;
        width: 80px;
      }
    }
  }
}
</style>
