<template>
  <div class="register-page">
    <div class="cancel" @click="cancelHandler">取消</div>
    <div class="register-type">使用手机号注册</div>
    <el-form :model="registerForm" :rules="rules" ref="registerForm">
      <div class="info">
        <div class="nick-icon-wrap">
          <el-form-item prop="nickName">
            <el-input class="nick-name" v-model="registerForm.nickName" placeholder="例如：大凯">
              <template slot="prepend">昵称</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="userIcon">
            <el-upload
              class="uploader"
              action="localhost:8080"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="registerForm.userIcon" :src="registerForm.userIcon" class="icon" />
              <el-button v-else type="middle">
                <i class="el-icon-camera"></i>
              </el-button>
            </el-upload>
          </el-form-item>
        </div>
        <el-form-item prop="country">
          <el-input v-model="registerForm.country">
            <template slot="prepend">国家/地区</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="registerForm.phone" placeholder="请填写手机号">
            <template slot="prepend">手机号</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="registerForm.pwd" placeholder="填写密码" show-password>
            <template slot="prepend">密码</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit">
            <el-button type="primary" @click="registerSubmit('registerForm')">注册</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      registerForm: {
        nickName: "",
        userIcon: "",
        country: "中国",
        phone: "",
        pwd: "",
        chatType: 1
      },
      rules: {
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 28, message: "长度在 1 到 68 个字符" }
        ],
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
  methods: {
    ...mapActions("register", ["register"]),
    cancelHandler() {
      this.$router.go(-1);
    },
    registerSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.register(this.registerForm);
          if (res.data.status === 200) {
            this.$router.push({ path: "/login" });
          }
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.userIcon = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPEG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
.register-page {
  width: 400px;
  height: 710px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  .cancel {
    color: blue;
  }
  .register-type {
    width: 100%;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 25px;
  }
  .info {
    padding-top: 10px;
    .nick-icon-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .nick-name {
      width: 335px;
    }
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