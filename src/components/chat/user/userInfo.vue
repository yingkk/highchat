<template>
  <div class="user-info">
    <div class="items up">
      <div class="btns">
        <div>
          <i class="el-icon-circle-close"></i>
        </div>
        <div>
          <i class="el-icon-remove-outline"></i>
        </div>
        <div>
          <i class="el-icon-remove-outline"></i>
        </div>
      </div>
      <div class="user-icon">
        <!-- todo-->
        <el-image
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="cover"
        ></el-image>
      </div>
      <div @click="iconHandler(0)" :class="['icon',  activeIconIndex === 0 ? 'active': '' ]">
        <i class="el-icon-chat-round"></i>
      </div>
      <div @click="iconHandler(1)" :class="['icon', activeIconIndex === 1 ? 'active': '']">
        <i class="el-icon-user"></i>
      </div>
      <div @click="iconHandler(2)" :class="['icon', activeIconIndex === 2 ? 'active': '']">
        <i class="el-icon-star-off"></i>
      </div>
    </div>
    <div class="items down">
      <div @click="iconHandler(3)" :class="['icon', activeIconIndex === 3 ? 'active': '']">
        <i class="el-icon-mobile-phone"></i>
      </div>
      <div @click="iconHandler(4)" :class="['icon', activeIconIndex === 4 ? 'active': '']">
        <i class="el-icon-setting"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIconIndex: 0
    };
  },
  methods: {
    iconHandler(iconIndex) {
      this.activeIconIndex = iconIndex;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  .items {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 13px;
    .btns {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      color: #a8a8a8;
      font-size: 14px;
    }
    .icon {
      width: 32px;
      height: 32px;
      font-size: 30px;
      padding: 30px 10px 0 10px;
    }
    .active {
      color: #409eff;
    }
  }
  .up {
    .user-icon {
      padding-top: 54px;
      width: 46px;
      height: 46px;
      .el-image {
        width: 46px;
        height: 46px;
      }
    }
  }

  .down {
    padding-bottom: 40px;
  }
}
</style>