<template>
  <div class="register">
    <register-page></register-page>
  </div>
</template>

<script>
import registerPage from "../components/register/registerPage.vue";
export default {
  components: {
    registerPage
  }
};
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>