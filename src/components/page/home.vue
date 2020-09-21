<template>
  <div class="home">
    <Header></Header>
    <sideBar></sideBar>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <div class="content">
        <keep-alive>
          <router-view v-if="$route.meta.KeepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.KeepAlive"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../common/header";
import sideBar from "../common/sideBar";
export default {
  name: "home",
  components: { Header, sideBar },
  data() {
    return {
      collapse: false
    };
  },
  updated() {
    /*  bus.$on("collapse-content", msg => {
      this.collapse = msg;
    }); */
  },
  mounted() {}
};
</script>
<style>
.content-box {
  width: 100%;
  position: absolute;
  padding-left: 280px;
  box-sizing: border-box;
}
.content {
  padding: 10px 10px 40px 20px;
  overflow-y: auto;
  margin-top: 60px;
}
</style>
