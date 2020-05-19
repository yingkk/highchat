<template>
  <div class="chat">
    <chat-page></chat-page>
  </div>
</template>

<script>
import chatPage from "../components/chat/chatPage.vue";
export default {
  components: {
    chatPage
  }
};
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>