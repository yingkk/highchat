<template>
  <div class="login-page">
    <div class="cancel" @click="cancelHandler">取消</div>
    <div class="login-type">使用手机号登录</div>
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <div class="info">
        <el-form-item prop="country">
          <el-input v-model="loginForm.country">
            <template slot="prepend">国家/地区</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" placeholder="请填写手机号">
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="loginForm.pwd" placeholder="填写密码" show-password>
            <template slot="prepend">密码</template>
          </el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <div class="submit">
          <el-button type="primary" @click="loginSubmit('loginForm')">登录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        country: "中国",
        phone: "",
        pwd: "",
        isLogin: false
      },
      rules: {
        country: [
          { required: true, message: "请选择国家/地区", trigger: "change" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11位", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created: {},
  methods: {
    ...mapActions("login", ["login"]),
    cancelHandler() {
      this.$router.go(-1);
    },
    loginSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.login(this.loginForm);
          if (res.data.status === 200) {
            this.$router.push({
              path: "/chat",
              query: { id: res.data.data[0].id ,
                       name: res.data.data[0].nick}
            });
          }
        } else {
          console.log("validate failed!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  width: 400px;
  height: 710px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  .cancel {
    color: blue;
  }
  .login-type {
    width: 100%;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 25px;
  }
  .info {
    padding-top: 10px;
  }
  .submit {
    padding-top: 40px;
    height: 58px;
    line-height: 58px;
    text-align: center;
    button {
      padding: 16px 180px;
      font-size: 18px;
    }
  }
}
</style>