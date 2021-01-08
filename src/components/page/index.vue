<template>
  <div class="index">
    <div class="indexHeader">
      <p>当前位置:我的检测任务</p>
    </div>
    <div class="indexBody">
      <template>
        <el-table ref="listItem" :data="listItem">
          <el-table-column type="index" label="序号" min-width="10%">
            <template slot-scope="scope">
              <span>{{ (curpage - 1) * limit + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="appName"
            label="应用名称"
            min-width="20%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <img
                v-if="scope.row.appIcon"
                class="appIcon"
                :src="'data:image/jpg;base64,' + scope.row.appIcon"
              />
              <img v-else class="appIcon" src="../../assets/android.png" />
              <el-tooltip
                effect="dark"
                :content="scope.row.appName"
                placement="top-start"
              >
                <span style="margin-left:7px">{{ scope.row.appName }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            min-width="20%"
            prop="appFileName"
            label="文件名称"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.appFileName }}</template>
          </el-table-column>
          <el-table-column
            min-width="20%"
            prop="appVersion"
            label="版本"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span class="version">
                <img
                  src="../../assets/version.png"
                  style="width:28px;vertical-align:middle"
                  class="versionImg"
                />{{ scope.row.appVersion }}
              </span>
            </template>
          </el-table-column>
          <el-table-column min-width="15%" prop="terminalType" label="适用系统">
            <template slot-scope="scope">
              <span v-if="scope.row.terminalType == 1">Android</span>
              <span v-else>iOS</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="15%"
            prop="detectionFormwork"
            label="检测策略"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{
              scope.row.detectionFormwork
            }}</template>
          </el-table-column>
          <el-table-column
            min-width="12%"
            prop="detectionNumber"
            label="检测分数"
          >
            <template slot-scope="scope">{{
              scope.row.detectionNumber
            }}</template>
          </el-table-column>
          <el-table-column
            prop="detectionTime"
            label="检测时间"
            min-width="25%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{
              scope.row.detectionTime
            }}</template>
          </el-table-column>
          <el-table-column
            prop="terminalType"
            label="检测状态"
            min-width="15%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.detectionStatus == 0">
                <img src="../../assets/wait.png" class="detectionStatusimg" />
                等待检测
              </span>
              <span v-else-if="scope.row.detectionStatus == 1">
                <img
                  src="../../assets/execute.png"
                  class="detectionStatusimg"
                />
                检测中
              </span>
              <span v-else-if="scope.row.detectionStatus == 2">
                <img
                  src="../../assets/correct.png"
                  class="detectionStatusimg"
                />
                已完成
              </span>
              <span v-else-if="scope.row.detectionStatus == 3">
                <img src="../../assets/error.png" class="detectionStatusimg" />
                检测失败
              </span>
              <span v-else-if="scope.row.detectionStatus == 4">
                <img
                  src="../../assets/correct.png"
                  class="detectionStatusimg"
                />
                引擎检测完成
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            label="上传人"
            min-width="15%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.userName }}</template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="上传时间"
            min-width="25%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.createTime }}</template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="indexBase">
      <pagination @pageChanged="onPageChanged"></pagination>
    </div>
  </div>
</template>
<script>
import api from "../request/api";
import pagination from "../common/pagination";
import pageMixins from "../../utils/pageMixins";
export default {
  name: "index",
  components: { pagination },
  mixins: [pageMixins],
  data() {
    return {
      listItem: [],
      curpage: 1,
      limit: 10
    };
  },
  methods: {
    async getData() {
      const params = {};
      this.getDataItem(this.addPageInfo(params));
    },
    getDataItem(params) {
      api.detrctorTaskService.detrctorTaskList(params).then(res => {
        if (res.code == "00") {
          const count = res.data.count,
            number = params.pn,
            size = params.limit;
          this.listItem = res.data.items;
          this.curpage = number;
          this.limit = size;
          this.onGotPageData({ totalElements: count, size, number });
        }
      });
    }
  },
  beforeMount() {
    this.getData();
  }
};
</script>
<style>
.indexHeader {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.indexBody .appIcon {
  width: 40px;
  height: 40px;
  border-radius: 3px;
  vertical-align: middle;
}
.indexBody .detectionStatusimg {
  width: 23px;
  height: 23px;
  border-radius: 3px;
  vertical-align: middle;
}
.el-pager li.active {
  color: #517fc3;
}
.indexBase {
  margin-top: 15px;
}
</style>
