<template>
  <div class="home">
    <Header></Header>
    <sideBar></sideBar>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <div class="content">
        <keep-alive :include="getCacheComponents">
          <router-view></router-view>
        </keep-alive>
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
  computed: {
    getCacheComponents() {
      return this.$store.state.cacheComponents;
    }
  },
  data() {
    return {
      collapse: false
    };
  }
};
</script>
<style>
.home .content-box {
  width: 100%;
  position: absolute;
  padding-left: 280px;
  box-sizing: border-box;
  overflow-y: auto;
}
.home .content {
  padding: 10px 10px 40px 20px;
  overflow-y: auto;
  margin-top: 60px;
}
</style>
