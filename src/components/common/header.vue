<template>
  <div class="Header">
    <div class="headerLeftBox">
      <img src="../../assets/logo.png" />
      <span class="title">蛮犀安全移动应用评测系统</span>
    </div>
    <div class="headerRightBox">
      <el-dropdown class="userName" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">您好,{{ userName }}</span>
        <i class="el-icon-caret-bottom"></i>
        <el-dropdown-menu>
          <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import api from "../request/api";
export default {
  name: "Header",
  inject: ["reload"],
  data() {
    return {
      name: "test"
    };
  },
  computed: {
    userName() {
      const userName = localStorage.getItem("userName");
      return userName ? userName : this.name;
    }
  },
  methods: {
    //用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("userName");
        new this.$messageTips(({ confirm }) => {
          confirm({ content: "确定要退出吗?", tip: "退出提示" });
        }).then(() => {
          api.userService.logout().then(res => {
            if (res.code == "00") {
              this.$router.push({ path: "/" });
              this.reload();
            }
          });
        });
      }
    }
  }
};
</script>
<style scoped>
.Header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #517fc3;
  color: white;
  padding: 0px 30px 0px 10px;
  position: fixed;
  z-index: 99;
  box-shadow: 0px 0px 10px #00000036;
}
.headerLeftBox {
  display: flex;
  align-items: center;
  float: left;
}
.headerLeftBox .title {
  font-size: 15px;
}
.headerRightBox {
  float: right;
  padding-right: 25px;
}
.headerRightBox .userName {
  color: white;
}
.headerRightBox .el-dropdown-link {
  font-size: 16px;
  cursor: pointer;
}
.el-dropdown-menu {
  padding: 5px 0;
  margin: 0;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 0px;
}
</style>
