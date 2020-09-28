<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      background-color="#517fc3"
      text-color="#fff"
      active-text-color="#517fc3"
      router
      unique-opened
      :default-active="onRoutes"
    >
      <template v-for="item in sidebarList">
        <template v-if="item.list">
          <el-submenu :index="item.title" :key="item.id">
            <template slot="title"
              ><i :class="item.icon"></i
              ><span slot="title">{{ item.title }}</span></template
            >
            <template v-for="subItem in item.list">
              <el-menu-item :index="'/home/' + subItem.jump" :key="subItem.id">
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.title" :key="item.id">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import api from "../request/api";
export default {
  name: "Sidebar",
  inject: ["reload"],
  data() {
    return {
      sidebarList: [],
      active: ""
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    }
  },
  created() {
    const _this = this;
    api.userService.getUserMenuTree().then(res => {
      if (res.code == "00") {
        _this.sidebarList = res.data;
      }
    });
  },
  mounted() {
    this.active = this.$route.jump;
  }
};
</script>
<style>
.sidebar {
  display: block;
  position: fixed;
  top: 60px;
  bottom: 0;
  box-sizing: border-box;
  z-index: 2;
  overflow-y: auto;
}
.sidebar > ul {
  height: 100%;
}
.sidebar ::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 280px;
}
.sidebar-el-menu {
  height: 100%;
}
.el-menu-item i {
  color: #fff !important;
}
.el-submenu__title i {
  color: #fff !important;
}
.el-menu-item.is-active {
  background: #5a96d4 !important;
  color: white !important;
}
.el-submenu__icon-arrow {
  font-size: 16px;
}
.el-icon-arrow-down:before {
  color: white !important;
}
</style>
