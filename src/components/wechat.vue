<template>
  <div class="allLogin">
    <div><el-button @click="show = !show"  style="height: 40px">测试按钮</el-button></div>
    <div v-show="show">
      <transition name="el-fade-in-linear">
        <el-row>
          <el-col :xs="24">
            <el-popover
              class="login"
              placement="bottom"
              title="网页扫码"
              width="300"
              trigger="click">
              <div style="min-height: 100px">
                code:<el-input v-model="input1" placeholder="请输入内容"></el-input>
                state:<el-input v-model="input2" placeholder="请输入内容"></el-input>
                <el-button slot="reference" @click="loginClick('1')">网页扫码</el-button>
              </div>
              <el-button slot="reference">login</el-button>
            </el-popover>
          </el-col>
          <el-col :xs="24">
            <el-popover
              class="login2"
              placement="bottom"
              title="自定义login"
              width="300"
              trigger="click">
              <div id="login_container" style="height: 300px"></div>
              <el-button slot="reference">自定义login</el-button>
            </el-popover>
          </el-col>
          <el-col :xs="24">
            <el-popover
              class="login2"
              placement="bottom"
              title="微信获取信息"
              width="300"
              trigger="click">
              <div style="min-height: 100px">
                code:<el-input v-model="input3" placeholder="请输入内容"></el-input>
                encryptedData:<el-input v-model="input4" placeholder="请输入内容"></el-input>
                iv:<el-input v-model="input5" placeholder="请输入内容"></el-input>
                <el-button slot="reference" @click="loginClick('2')">点击获取</el-button>
              </div>
              <el-button slot="reference">微信获取信息</el-button>
            </el-popover>
          </el-col>
        </el-row>
      </transition>
    </div>
  </div>
</template>

<script>
  //微信扫码登录测试组件
  export default{
    data(){
      return {
      }
    },
    mounted() {
      //调用微信登录接口
      //https://open.weixin.qq.com/connect/qrconnect?appid=wxbdc5610cc59c1631&redirect_uri=https%3A%2F%2Fpassport.yhd.com%2Fwechat%2Fcallback.do&response_type=code&scope=snsapi_login&state=689b41d29d32eaeba523447f802ec8ec#wechat_redirect
      //https://open.weixin.qq.com/connect/qrconnect?appid=wx68bd8e40de0fba53&redirect_uri=http%3A%2F%2Fwww.rambogj.club%2Fapi%2Fuser%2Fget_wx_access_token&response_type=code&scope=snsapi_login&state=STATE123
      var obj = new WxLogin({
        id:"login_container",
        appid: "wx68bd8e40de0fba53",
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent('http://www.rambogj.club/api/wechat/get_wx_access_token'),
        state: "STATE123",
        style: "",
        href: ""
      });
    },
    methods: {
      loginClick(param){
        let requestConfig = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }
        let url='';
        if(param == '1'){
          url = `http://www.rambogj.club/api/wechat/get_wx_access_token?code=${this.input1}&state=${this.input2}`;
        }else if(param == '2'){
          let code = '011KfAKr1uobdm00RsJr1KnKKr1KfAKV';
          let encryptedData = '7RUFgdoSOJcK9kjjSpY8pMps2cFnCtpUlBIJDgGd3AQmpPAKUSAq4pr2JVqYzX33dtTl5l7kb87BF50hYbbORbZHYv4E+2FqhudoPbe524FCHGa3AK7U6BXzUREHOC7q0TpfWzplNdKxTaOawNPninwdyvqXaqNyGdnvfcK2jhvLR0o3R2Q/Qx9iSa+p4Qu4xbPV8wY7XhGCmo2lzyKaoETS7ZdHlo4Owrb2rlVEdvI+7grbx7U+PXsFgUzamFtwZ5TNdG5HPgZ03tFMoy9JVESB2dRzaT/UtzmRvy5L6DbGPurUNVG8SuIUjW+Rwop98ykDyJMnCIh6USptwyZIkA6nxs8HVpcn8Bk9TPfQwzUgrQAf1NjY+tPjJDGV6YOGmytNUFhqy2UU8tDbfFH78tlPO6ttwdwWgrfvqLkEeQvYDfQT4fi9ZWWZhsjhrGsmDqJKRWzqHkaIQuRxdZJcuUIDiPZ6KNDHDFeKFlV72Yc=';
          let iv = 'DWc6pA0nIIXM2TPfsRC7SA==';
          url = `/api/wechat/getUnionId?code=${this.input3}&encryptedData=${this.input4}&iv=${this.input5}`;
        }
        fetch(url,requestConfig).then((res)=>{
          console.log(res);
          return res.json();
        }).then((data)=>{
          console.log(data);
        })
      },
    }
  }
</script>

<style>
</style>
