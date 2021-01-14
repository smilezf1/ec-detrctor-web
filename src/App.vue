<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  created() {
    if (sessionStorage.getItem("menuBtnList")) {
      this.$store.commit(
        "updateMenuBtnList",
        JSON.parse(sessionStorage.getItem("menuBtnList"))
      );
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(
        "menuBtnList",
        JSON.stringify(this.$store.state.menuBtnList)
      );
    });
  },

  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style>
.icon,
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
