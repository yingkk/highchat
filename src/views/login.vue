<template>
  <div class="login">
    <login-page></login-page>
  </div>
</template>

<script>
import loginPage from "../components/login/loginPage.vue";
export default {
  components: {
    loginPage
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
}
  
</style>