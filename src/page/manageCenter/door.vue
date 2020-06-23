<template>
  <el-container>
    <el-header class="door">
      <span class="manageTile">后台管理系统</span>
    </el-header>
    <el-main>
      <section class="form_contianer">
        <div class="senctionblock">
          <el-row>
            <el-col :span="24">
              <div class="loginButton">管理员登录</div>
            </el-col>
          </el-row>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
              <el-input type="text" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass"></el-input>
            </el-form-item>
            <el-button @click="loginEnter('ruleForm')" class="enterButton">登 录</el-button>
          </el-form>
        </div>
      </section>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'door',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      btnChangeName: '登录',
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        } ],
        pass: [{
          required: true,
          validator: validatePass,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    async loginEnter (formName) {
      this.$refs[formName].validate(async (valid,values) => {
        if (valid) {
          if(this.ruleForm.name == 'admin' && this.ruleForm.pass == '111111'){
            sessionStorage.setItem("accessToken",true);
            this.$router.replace('home');
          }
        } else {
          console.error('error login submit!!')
          return false
        }
      })
    },
    registerSubmitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log('角色------->', this.ruleForm)
          console.log('注册结果------->', data)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .door{
    display: flex;
    align-items: center;
    background-color: #337cac;
    .logo{
      height: 48px;
    }
    .manageTile{
      font-size: 24px;
    }
  }
  .form_contianer .el-row{
    margin: 15px 0;
  }
  .el-main{
    padding: 0 !important;
  }
  .senctionblock{
    position: relative;
    width: 100%;
    background-color: white;
  }
  .HomeBanner{
    width: 100%;
    height: -webkit-fill-available;
    background-size: cover;
  }
  .form_contianer{
    width: 320px;
    min-height: 210px;
    position: absolute;
    top: 25%;
    left: 50%;
    margin-top: -105px;
    margin-left: -185px;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .loginButton{
      font-size: 18px;
      font-weight: 400;
    }
    .enterButton{
      background-color: #00c1de;
      font-size: 20px;
      width: 100%;
      cursor: pointer;
      color: white;
    }
  }
</style>
