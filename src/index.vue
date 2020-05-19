<template>
  <div id="app">
    <div class="logo">
      <img class="logo-icon" src="./assets/index.jpeg" alt="logo-icon" />
      <div class="btns">
        <div class="btns">
          <router-link to="/login">
            <div class="login-btn">
              <el-button size="medium">登录</el-button>
            </div>
          </router-link>
          <router-link to="/register">
            <div class="register-btn">
              <el-button size="medium" type="primary">注册</el-button>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
}
body,
html {
  width: 100%;
  height: 100%;
}
.logo {
  position: relative;
  width: 400px;
  .logo-icon {
    width: 400px;
  }
  .btns {
    position: absolute;
    left: 0;
    bottom: 48px;
    display: flex;
    .login-btn {
      padding: 0 30px 0 20px;
      button {
        padding: 12px 60px;
      }
    }
    .register-btn {
      padding: 0 20px 0 30px;
      button {
        padding: 12px 60px;
      }
    }
  }
}
</style>