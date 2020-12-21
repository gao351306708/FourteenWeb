<template>
  <el-container>
    <el-header class="register">
      <span class="manageTile">注册</span>
    </el-header>
    <el-main>
      <section class="form_contianer">
        <div class="senctionblock">
          <el-row>
            <el-col :span="24">
              <div class="loginButton">注册新用户</div>
            </el-col>
          </el-row>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
              <el-input type="text" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="comfirmpass">
              <el-input type="password" v-model="ruleForm.comfirmpass"></el-input>
            </el-form-item>
            <el-button @click="registerSubmit('ruleForm')" class="enterButton">注 册</el-button>
          </el-form>
        </div>
      </section>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
import encrypted from "@/utils/crypto.js";
import { registerUser } from "@/api/user.js";

var validatePass = (rule, value, callback) => {
  console.log(rule, value);
  if (value !== "1234") {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
};
export default {
  name: "register",
  data() {
    return {
      ruleForm: {
        name: "",
        pass: "",
        comfirmpass: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
        // comfirmpass: [
        //   {
        //     required: true,
        //     validator: validatePass,
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },
  methods: {
    async registerSubmit(formName) {
      this.$refs[formName].validate(async (valid, values) => {
        if (valid) {
          let pass = encrypted.enCrypted_AES(this.ruleForm.pass);
          registerUser({
            username: this.ruleForm.name,
            password: pass
          })
            .then((res) => {
              console.log("登录返回信息", res);
              // this.$router.replace({path:"/"});
            })
            .catch((err) => {
              this.$message({
                message: err || "注册失败",
                type: "error"
              });
            });
        } else {
          console.error("注册失败");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less" type="text/less">
@import "../../assets/mixin.less";
.register {
  display: flex;
  align-items: center;
  background-color: #337cac;
  .logo {
    height: 48px;
  }
  .manageTile {
    font-size: 24px;
  }
}
.form_contianer .el-row {
  margin: 15px 0;
}
.el-main {
  padding: 0 !important;
}
.senctionblock {
  position: relative;
  width: 100%;
  background-color: white;
}
.HomeBanner {
  width: 100%;
  height: -webkit-fill-available;
  background-size: cover;
}
.form_contianer {
  width: 420px;
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
  .loginButton {
    font-size: 18px;
    font-weight: 400;
  }
  .enterButton {
    background-color: #00c1de;
    font-size: 20px;
    width: 100%;
    cursor: pointer;
    color: white;
  }
}
</style>
