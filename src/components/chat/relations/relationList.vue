<template>
  <div class="relation-list">
    <div class="query-area">
      <div class="query">
        <el-input size="small" placeholder="搜索" prefix-icon="el-icon-search" v-model="queryValue"></el-input>
      </div>
      <div class="group-chat">
        <el-button type="small" @click="showRelationListDialog">
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
      <el-dialog :visible.sync="dialogSelectVisible" width="640px" :show-close="false">
        <div class="transfer">
          <div class="left">
            <div class="nick-query">
              <el-input size="mini" placeholder="搜索" prefix-icon="el-icon-search"></el-input>
            </div>
            <div class="friends">
              <div
                class="friend-item"
                v-for="item in relationList"
                :key="`friend-item-index-${item.id}`"
              >
                <div class="user-info">
                  <div class="user-icon">
                    <el-image
                      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                      fit="cover"
                    ></el-image>
                  </div>
                  <div class="user-nick">{{item.nick}}</div>
                </div>
                <div class="radio">
                  <i v-if="selectedIdList.includes(item.id)" class="el-icon-success"></i>
                  <div v-else class="circle" @click="radioClickHandler(item)"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="title">
              <div class="label">创建群聊</div>
              <div class="selected-num">
                <span v-if="selectedIdList.length">已选择{{selectedIdList.length}}个联系人</span>
                <span v-else>未选择联系人</span>
              </div>
            </div>
            <div class="selected-list">
              <div
                class="selected-item"
                v-for="item in selectedList"
                :key="`selected-item-index-${item.id}`"
              >
                <div class="user-info">
                  <div class="user-icon">
                    <el-image
                      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                      fit="cover"
                    ></el-image>
                  </div>
                  <div class="user-nick">{{item.nick}}</div>
                </div>
                <div class="remove-user" @click="removeUserHandler(item.id)">
                  <i class="el-icon-circle-close"></i>
                </div>
              </div>
            </div>
            <div class="btns">
              <div class="cancel">
                <el-button size="small" @click="closeDialogHandler">取消</el-button>
              </div>
              <div class="create">
                <el-button
                  type="primary"
                  size="small"
                  :disabled="selectedIdList.length  ? false : true"
                  @click="createChatRoomHandler"
                >创建</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="relation-area">
      <div
        v-for="item in relationList"
        :key="`relation-index-${item.id}`"
        :class="['relation-item', activeRelationId === item.id ? 'active': '']"
        @click="relationClickHandler(item)"
      >
        <div class="icon">
          <el-image :src="item.icon" fit="cover"></el-image>
          <div
            v-if="isRead && (historyMsg.length && item.id === historyMsg[0].from)"
            class="unread-msg"
          ></div>
        </div>
        <div class="other">
          <div class="relation-info">
            <div class="nick">{{item.nick}}</div>
            <div class="time">16:45</div>
          </div>
          <div
            class="msg"
            v-if="historyMsg.length && (item.id === historyMsg[historyMsg.length-1].from || item.id === historyMsg[historyMsg.length-1].to)"
          >{{historyMsg[historyMsg.length-1]["msg"]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      queryValue: "",
      activeRelationId: "",
      relationList: [],
      dialogSelectVisible: false,
      selectedList: [],
      selectedIdList: [],
      isRead: true
    };
  },
  created() {
    this.getRelationList({ id: this.$route.query.id }).then(res => {
      this.relationList = res.data.data;
    });
  },
  computed: {
    ...mapState("chat", ["historyMsg", "curRelationInfo"])
  },
  methods: {
    ...mapActions("chat", ["getRelationList", "addGroupToUser", "addFriend"]),
    ...mapMutations(["updateCurRelationInfo"]),
    relationClickHandler(item) {
      this.$store.commit("chat/updateCurRelationInfo", item);
      this.activeRelationId = item.id;
      if (this.historyMsg.length && this.historyMsg[0].from === item.id) {
        this.isRead = false;
      }
    },
    showRelationListDialog() {
      this.dialogSelectVisible = !this.dialogSelectVisible;
      this.selectedList = [];
      this.selectedIdList = [];
    },
    radioClickHandler(item) {
      this.selectedList.push(item);
      this.selectedIdList.push(item.id);
    },
    removeUserHandler(id) {
      this.selectedList.some((item, index) => {
        if (item.id === id) {
          this.selectedList.splice(index, 1);
          return true;
        }
      });
      this.selectedIdList.splice(this.selectedIdList.indexOf(id), 1);
    },
    closeDialogHandler() {
      this.dialogSelectVisible = !this.dialogSelectVisible;
    },
    createChatRoomHandler() {
      const curTime = new Date().getTime();
      if (this.selectedIdList.length > 1) {
        const groupObj = this.selectedList.reduce(
          (init, cur) => {
            init["nick"] += cur.nick + "、";
            init["ids"] += cur.id + ",";
            return init;
          },
          { nick: "", ids: "" }
        );
        const groupUser = {
          id: curTime,
          nick: groupObj.nick + this.$route.query.name,
          icon: "",
          pwd: "group",
          des: groupObj.ids + this.$route.query.id,
          chatType: 2
        };
        const groupFriendList = this.selectedIdList.reduce((init, cur) => {
          init.push({ id: cur, fid: curTime });
          return init;
        }, []);
        //group 入库user
        this.addGroupToUser(groupUser).then(res => {
          if (res.data.status === 200) {
            console.log("insert groupinfo to user success!");
          }
        });
        // group 入库user-relation
        groupFriendList.push({ id: this.$route.query.id, fid: curTime }); //push登录用户
        groupFriendList.forEach(item => {
          this.addFriend(item).then(res => {
            if (res.data.status === 200) {
              console.log(
                "insert " +
                  item.id +
                  "-" +
                  item.fid +
                  " to user-relation success!"
              );
            }
          });
        });
        this.relationList.push(groupUser);
        this.dialogSelectVisible = !this.dialogSelectVisible;
        this.relationClickHandler(groupUser);
      } else {
        this.dialogSelectVisible = !this.dialogSelectVisible;
        this.relationClickHandler(this.selectedList[0]);
      }
      const createChatRoomOption = {
        type: "group-create",
        groupId: curTime
      };
      //后台存储群聊id的websocket
      window.ws.send(JSON.stringify(createChatRoomOption));
    }
  }
};
</script>

<style lang="scss" >
.relation-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .query-area {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    .query {
      padding-left: 10px;
    }
    .group-chat {
      padding: 0 10px;
    }
    .el-dialog .el-dialog__body {
      padding-top: 0;
    }
  }

  .relation-area {
    display: flex;
    flex-direction: column;
    .relation-item {
      height: 46px;
      padding: 14px 0 14px 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e8e8e8;
      .icon {
        position: relative;
        width: 46px;
        flex-shrink: 0;
        .el-image {
          width: 46px;
          height: 46px;
        }
        .unread-msg {
          position: absolute;
          right: 0;
          top: 0;
          width: 5px;
          height: 5px;
          background-color: red;
          border: 1px solid red;
          border-radius: 50%;
        }
      }
      .other {
        width: 100%;
        height: 44px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 10px;
        font-size: 14px;
        .relation-info {
          display: flex;
          justify-content: space-between;
          .nick {
            width: 130px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .time {
            font-size: 12px;
            color: #a8a8a8;
          }
        }
        .msg {
          font-size: 12px;
          color: #a8a8a8;
        }
      }
    }
    .active {
      background-color: #cfcfcf;
    }
  }
  .transfer {
    // width: 400px;
    height: 400px;
    display: flex;
    flex-direction: row;
    .left {
      width: 50%;
      display: flex;
      flex-direction: column;
      border-right: 1px solid #a8a8a8;
      justify-content: flex-start;
      .nick-query {
        padding: 0 20px 20px 0;
        .el-input {
          padding: 0;
        }
      }
      .friends {
        .friend-item {
          height: 30px;
          padding: 0 20px 20px 0;
          display: flex;
          justify-content: space-between;
          .user-info {
            display: flex;
            flex-direction: row;
            .user-icon {
              width: 30px;
              height: 30px;
              .el-image {
                width: 30px;
                height: 30px;
              }
            }
            .user-nick {
              padding-left: 10px;
              line-height: 30px;
            }
          }
          .radio {
            display: flex;
            align-items: center;
            line-height: 30px;
            font-size: 18px;
            color: #409eff;
            .circle {
              width: 14px;
              height: 14px;
              border-radius: 50%;
              border: 1px solid #a8a8a8;
            }
          }
        }
      }
    }
    .right {
      width: 50%;
      display: flex;
      flex-direction: column;
      padding: 10px 0 0 20px;
      .title {
        display: flex;
        justify-content: space-between;
        padding-bottom: 16px;
        .label {
          font-size: 15px;
        }
        .selected-num {
          font-size: 12px;
        }
      }
      .selected-list {
        height: 300px;
        .selected-item {
          display: flex;
          justify-content: space-between;
          padding-bottom: 20px;
          .user-info {
            display: flex;
            justify-content: flex-start;
            .user-icon {
              width: 30px;
              height: 30px;
              .el-image {
                width: 30px;
                height: 30px;
              }
            }
            .user-nick {
              padding-left: 10px;
              line-height: 30px;
            }
          }
          .remove-user {
            display: flex;
            align-items: center;
            line-height: 30px;
            font-size: 18px;
          }
        }
      }
      .btns {
        display: flex;
        justify-content: flex-end;
        .create {
          padding-left: 20px;
        }
        .el-button {
          padding: 10px 30px;
        }
      }
    }
  }
}
</style>