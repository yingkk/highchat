<template>
  <div
    :class="['dialog', this.$store.state.chat.curRelationInfo.id ? 'active' : '']"
    v-if="this.$store.state.chat.curRelationInfo.id"
  >
    <div class="chat-user">
      <div class="chat-user-nick">{{this.$store.state.chat.curRelationInfo.nick}}</div>
      <div class="group-chatting">
        <i class="el-icon-user"></i>
      </div>
      <!-- <div class="drawer">
        <el-drawer title="我是标题" :visible.sync="isShowDrawer" :with-header="false">
          <span>我来啦!</span>
        </el-drawer>
      </div>-->
    </div>
    <div class="chat-history">
      <div class="history-item" v-for="(item, index) in historyMsg" :key="`history-msg-${index}`">
        <template v-if="item.from === curRelationInfo.id">
          <div class="msg-time">{{item.time}}</div>
          <div class="msg-info left" v-if="item.from !== $route.query.id">
            <div class="user-icon">
              <el-image
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="cover"
              ></el-image>
            </div>
            <div class="user-msg">{{item.msg}}</div>
          </div>
        </template>
        <template v-if="$route.query.id === item.from && curRelationInfo.id === item.to">
          <div class="msg-info right" v-if="item.from === $route.query.id">
            <div class="user-msg-self">{{item.msg}}</div>
            <div class="user-icon-self">
              <el-image
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="cover"
              ></el-image>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="chat-input">
      <div class="btns">
        <div class="btns-left">
          <div class="icon">
            <i class="el-icon-picture-outline-round"></i>
          </div>
          <div class="icon">
            <i class="el-icon-folder"></i>
          </div>
          <div class="icon">
            <i class="el-icon-scissors"></i>
          </div>
          <div class="icon">
            <i class="el-icon-chat-dot-round"></i>
          </div>
        </div>
        <div class="btns-right">
          <div class="icon">
            <i class="el-icon-mobile-phone"></i>
          </div>
          <div class="icon">
            <i class="el-icon-monitor"></i>
          </div>
        </div>
      </div>
      <div class="textarea">
        <el-input type="textarea" rows="4" v-model="textarea" @keyup.enter="handleEnter"></el-input>
        <button @click="handleEnter">发送</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      textarea: "",
      //historyMsg: [],
      ws: null,
      isShowDrawer: false
    };
  },
  created() {
    this.initWebSocket();
  },
  computed: {
    ...mapState("chat", ["curRelationInfo", "historyMsg"])
  },
  watch: {
    curRelationInfo() {
      //this.historyMsg = [];
    }
  },
  methods: {
    ...mapMutations(["pushMsg"]),
    handleEnter() {
      const msgInfo = {
        to: this.curRelationInfo.id,
        from: this.$route.query.id,
        msg: this.textarea,
        type: "text",
        time: new Date(),
        chatType: this.curRelationInfo["chat-type"]
      };

      this.ws.send(JSON.stringify(msgInfo));
      // this.historyMsg.push(msgInfo);
      this.$store.commit("chat/pushMsg", msgInfo);
      this.textarea = "";
    },
    // showUserHandler() {
    //   this.isShowDrawer = !this.isShowDrawer;
    // },
    initWebSocket() {
      let ws = new WebSocket("ws://127.0.0.1:3030");
      this.ws = ws;
      window.ws = ws;
      const _this = this;
      const loginOption = {
        type: "login",
        userId: _this.$route.query.id
      };
      ws.onopen = function() {
        console.log("Connection open ...");
        ws.send(JSON.stringify(loginOption));
      };
      ws.onmessage = evt => {
        //tips: 箭头函数使this为vue对象 或 let _this = this;
        console.log("Received Message: " + evt.data);
        //this.historyMsg.push(JSON.parse(evt.data));
        this.$store.commit("chat/pushMsg", JSON.parse(evt.data));
      };
      ws.onclose = function(evt) {
        console.log("Connection closed.", evt);
      };
    }
  }
};
</script>

<style lang="scss" >
.dialog {
  width: 100%;
  height: 100%;
  .chat-user {
    height: 70px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    border-bottom: 1px solid #e8e8e8;
    .group-chatting {
      font-size: 26px;
    }
  }
  .chat-history {
    width: 100%;
    height: 410px;
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    .history-item {
      padding: 0 0 20px 20px;
      // height: 35px;
      display: flex;
      flex-direction: column;
      .msg-time {
        width: 100%;
        height: 35px;
        line-height: 35px;
        text-align: center;
        padding-bottom: 20px;
        font-size: 12px;
        color: #a8a8a8;
      }
      .msg-info {
        width: 100%;
        display: flex;
        flex-direction: row;
        .user-icon {
          width: 35px;
          height: 35px;
          .el-image {
            width: 35px;
            height: 35px;
          }
        }
        .user-msg {
          font-size: 14px;
          line-height: 35px;
          background-color: #fff;
          padding-left: 20px;
        }
        .user-msg-self {
          font-size: 14px;
          line-height: 35px;
          background-color: #fff;
          padding-right: 20px;
        }
        .user-icon-self {
          padding-right: 20px;
          width: 35px;
          height: 35px;
          .el-image {
            width: 35px;
            height: 35px;
          }
        }
      }
      .left {
        justify-content: flex-start;
      }
      .right {
        justify-content: flex-end;
      }
    }
  }
  .chat-input {
    height: 130px;
    flex-shrink: 0;
    padding: 10px 20px 20px 0;
    border-top: 1px solid #e8e8e8;
    display: flex;
    flex-direction: column;
    .btns {
      display: flex;
      justify-content: space-between;
      height: 32px;
      .btns-left,
      .btns-right {
        display: flex;
        flex-direction: row;
      }
      .icon {
        font-size: 24px;
        color: #484949;
        padding-left: 20px;
      }
    }
    .textarea {
      padding: 0 20px;
      .el-textarea {
        .el-textarea__inner {
          border: none;
          overflow: hidden;
          background-color: #f8f8f8;
        }
      }
    }
  }
}
.active {
  background-color: #f8f8f8;
}
</style>