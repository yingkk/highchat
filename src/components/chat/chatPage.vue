<template>
  <div class="chat-page">
    <div class="user">
      <user-info></user-info>
    </div>
    <div :class="['relations', this.$store.state.chat.curRelationInfo.id ? 'light' : '']">
      <relation-list></relation-list>
    </div>
    <div class="chat">
      <chat-dialog></chat-dialog>
    </div>
  </div>
</template>

<script>
import userInfo from "./user/userInfo.vue";
import relationList from "./relations/relationList.vue";
import chatDialog from "./chatDialog/chatDialog.vue";
export default {
  components: {
    userInfo,
    relationList,
    chatDialog
  }
};
</script>

<style lang="scss" scoped>
.chat-page {
  width: 980px;
  height: 710px;
  border: 1px solid #e8e8e8;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .user {
    width: 72px;
    height: 100%;
    flex-shrink: 0;
    background-color: #262a39;
  }
  .relations {
    width: 240px;
    height: 670px;
    padding: 20px 0;
    flex-shrink: 0;
    background-color: #f8f8f8;
    border-right: 1px solid #e8e8e8;
  }
  .light {
    background-color: #fff;
  }
  .chat {
    width: 100%;
    height: 100%;
    // background-color: #e8e8e8;
  }
}
</style>