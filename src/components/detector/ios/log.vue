<template>
  <div clsss="log">
    <header class="logHeader">当前位置:iOS加固日志</header>
    <div class="logBody">
      <template v-if="listItem">
        <div class="logBodyTitle">
          <span
            >检测应用:&nbsp;&nbsp;{{
              appDetectorInfo.appName
            }}&nbsp;&nbsp;</span
          >
          <span
            >检测状态:&nbsp;&nbsp;
            <span v-if="appDetectorInfo.detectionStatus == 2">已完成</span>
            <span v-else-if="appDetectorInfo.detectionStatus == 3"
              >检测失败</span
            >
            <span v-else-if="appDetectorInfo.detectionStatus == 4"
              >引擎检测完成</span
            >
          </span>
        </div>
        <div class="logBodyContent">{{ listItem }}</div>
      </template>
    </div>
    <back></back>
  </div>
</template>
<script>
import api from "../../request/api";
import back from "../../common/back";
export default {
  name: "log",
  components: { back },
  data() {
    return {
      listItem: null,
      appDetectorInfo: null
    };
  },
  created() {
    this.appDetectorInfo = this.$route.query;
    this.getDetectorLog(this.appDetectorInfo.id);
  },
  methods: {
    //得到日志详细
    getDetectorLog(params) {
      api.detectorAndroidService.getDetectionLogById(params).then(res => {
        console.log(res);
        this.listItem = res.data;
      });
    }
  }
};
</script>
<style>
.logHeader {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.logBody {
  width: 90%;
  box-shadow: 0px 0px 10px #00000021;
  margin: 10px 10px 0 0;
  padding: 20px;
}
.logBodyTitle {
  font-size: 14px;
  font-weight: 550;
  color: #606266;
  margin-bottom: 10px;
}
.logBodyContent {
  white-space: pre-line;
  font-size: 14px;
  color: #606266;
  line-height: 25px;
}
</style>
