<template>
  <el-container>
    <el-header class="door">
      <el-row>
        <el-col :span="4"><img src="../../../static/images/logo.png"></el-col>
        <el-col :span="20"><div class="loginButton"></div></el-col>
      </el-row>
    </el-header>
    <el-main>
      <img src="../../../static/images/homeBanner_manage.jpg" class="HomeBanner" />
      <section class="form_contianer">
        <div class="senctionblock">
          <el-row>
            <el-col :span="24"><div class="loginButton">管理员登录</div></el-col>
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
  import {doLogin,registerUser} from '../../api/user'
  import {getClassInfo} from '../../api/classes'
  import {setStore,getStore,clearStore,setSession,getSession} from '../../config/publicMethod'
  export default {
    name: 'door',
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        btnChangeName:'登录',
        ruleForm: {
          name:'',
          pass:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          pass: [
            {required: true,  validator: validatePass, trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      async loginEnter(formName){
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            let params = this.ruleForm;
            params.role = '3';//角色 3为管理员
            let result = await doLogin(params);
            console.log("登录结果------->",params,result)
            if(result.code == 200){
              if(result.data[0]){
                setSession('accessToken',true);//登录标志
                setStore('manageUser',result.data[0])
                this.$router.replace('home');
              }else {
                alert("用户名或密码错误")
              }
            }
          } else {
            console.error('error login submit!!');
            return false;
          }
        });
      },
      registerSubmitForm(formName){
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            console.log("角色------->",this.ruleForm)
            const data = await registerUser(this.ruleForm)
            console.log("注册结果------->",data)
          } else {
            console.error('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  @import '../../assets/mixin.less';
  .door{
    background-color: #337cac;
  }
  .form_contianer .el-row{
    margin: 15px 0;
  }
  .el-main{
    padding: 0;
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
