<template>
  <div class="ios">
    <div class="iosHeader">
      <p>当前位置:iOS检测管理</p>
    </div>
    <div class="searchForm">
      <div class="searchBox">
        <el-form :model="ruleForm" ref="ruleForm">
          <el-input
            size="small"
            placeholder="请输入应用名称"
            v-model="ruleForm.appName"
          ></el-input>
          <el-input
            size="small"
            placeholder="请选择版本号"
            v-model="ruleForm.appVersion"
          ></el-input>
          <el-select
            placeholder="请选择检测状态"
            v-model="ruleForm.detectionStatus"
            size="small"
          >
            <el-option
              v-for="item in detectionStatusOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
          <el-date-picker
            v-model="ruleForm.minDetectionTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="开始时间"
            size="small"
            :picker-options="pickOptionsStart"
          ></el-date-picker>
          <el-date-picker
            v-model="ruleForm.maxDetectionTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="结束时间"
            size="small"
            :picker-options="pickOptionsEnd"
          ></el-date-picker>
        </el-form>
      </div>
      <div class="operateBox">
        <el-tooltip effect="dark" content="查询" placement="top-start">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="search(ruleForm)"
            class="searchButton"
          ></el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="刷新" placement="top-start">
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            size="small"
            @click="refresh()"
            style="margin-left:10px"
            class="refreshButton"
          ></el-button>
        </el-tooltip>
        <el-button
          type="primary"
          size="small"
          @click="addTask()"
          class="addTaskButton"
          >新增任务</el-button
        >
        <!-- 新增任务 -->
        <el-drawer
          title="新增任务"
          :visible.sync="addTaskDrawer"
          :with-header="false"
          :wrapperClosable="false"
          :close-on-press-esape="false"
          :destroy-on-close="true"
          size="40%"
        >
          <div class="el-drawer-header">
            <h3>新增任务</h3>
          </div>
          <div class="el-drawer-content">
            <el-upload
              class="uploadTask"
              drag
              action="/"
              :http-request="uploadTaskFile"
              :file-list="fileList"
              v-show="uploadShow"
              multiple
              :limit="5"
              :on-exceed="handleExceed"
              accept=".ipa"
              ref="uploadTask"
              size="40%"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处,或<em>点击上传</em>
              </div>
              <div class="el-upload_tip" slot="tip">
                最多只能上传5个文件
              </div>
            </el-upload>
            <!-- 上传文件的列表 -->
            <div v-for="(item, index) in uploadTaskFileItem" :key="index">
              <el-form
                :model="uploadForm[index]"
                :rules="rules"
                ref="uploadForm"
              >
                <el-collapse
                  v-model="activeNames"
                  class="applicationInfoCollapse"
                >
                  <el-collapse-item title="应用信息" :name="index + 1">
                    <el-row>
                      <el-col :span="6">
                        <img :src="'data:image/jpg;base64,' + item.appIcon" />
                      </el-col>
                      <el-col :span="18">
                        <p class="appName">{{ item.appName }}</p>
                        <p class="appPackage">
                          包名:&nbsp;&nbsp;{{ item.appPackage }}
                        </p>
                        <p>
                          <span style="margin-right:10px;"
                            >版本:&nbsp;&nbsp;{{ item.appVersion }}
                          </span>
                          <span>大小:&nbsp;&nbsp;{{ item.appMbyte }}MB</span>
                        </p>
                      </el-col>
                    </el-row>
                    <!-- 检测 -->
                    <!-- 检测策略名称 -->
                    <el-row class="detectorStrategyName">
                      <el-form-item prop="detectorStrategyId" label-width="35%">
                        <label slot="label">检测策略:</label>
                        <el-select
                          v-model="uploadForm[index].detectorStrategyId"
                          placeholder="请选择检测策略"
                          size="small"
                        >
                          <el-option
                            v-for="item in detectorStrategyList"
                            :key="item.strategyId"
                            :label="item.strategyName"
                            :value="item.strategyId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
              </el-form>
            </div>
          </div>
          <div class="el-drawer-footer">
            <div class="buttonBox" style="display:inline-block">
              <el-button type="primary" @click="saveTask()">保存</el-button>
              <el-button @click="cancelTask()" plain>取消</el-button>
            </div>
          </div>
        </el-drawer>
      </div>
    </div>
    <div class="iosBody">
      <template>
        <el-table
          ref="listItem"
          :data="listItem"
          v-loading="loading"
          element-loading-text="加载中"
        >
          <el-table-column type="index" label="序号" width="60">
            <template slot-scope="scope">
              <span>{{ (curpage - 1) * limit + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            prop="appName"
            label="应用名称"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <img
                :src="'data:image/jpg;base64,' + scope.row.appIcon"
                class="appIcon"
              />
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
            width="250"
            prop="appFileName"
            label="文件名称"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.appFileName }}</template>
          </el-table-column>
          <el-table-column width="120" prop="appVersion" label="版本">
            <template slot-scope="scope">
              <div class="version">
                <img src="../../../assets/version.png" style="width:28px" />
                <span>{{ scope.row.appVersion }}</span>
              </div>
            </template>
          </el-table-column>
          <!--  <el-table-column width="120" prop="terminalType" label="适用系统">
            <template slot-scope="scope">
              <span v-if="scope.row.terminalType == 1">Android</span>
              <span v-else>iOS</span>
            </template>
          </el-table-column> -->
          <el-table-column
            width="150"
            prop="detectionFormwork"
            label="检测策略"
          >
            <template slot-scope="scope">
              {{ scope.row.detectionFormwork }}
            </template>
          </el-table-column>
          <el-table-column width="100" prop="detectionNumber" label="检测分数">
            <template slot-scope="scope">
              <span v-if="scope.row.detectionNumber">{{
                scope.row.detectionNumber
              }}</span>
              <span v-else>N/A</span>
            </template>
          </el-table-column>
          <el-table-column prop="detectionTime" label="检测时间" width="200">
            <template slot-scope="scope">{{
              scope.row.detectionTime
            }}</template>
          </el-table-column>
          <el-table-column prop="terminalType" label="检测状态" width="130">
            <template slot-scope="scope">
              <span v-if="scope.row.detectionStatus == 0">
                <img
                  src="../../../assets/wait.png"
                  class="detectionStatusimg"
                />
                等待检测
              </span>
              <span v-else-if="scope.row.detectionStatus == 1">
                <img
                  src="../../../assets/execute.png"
                  class="detectionStatusimg"
                />
                检测中
              </span>
              <span v-else-if="scope.row.detectionStatus == 2">
                <img
                  src="../../../assets/correct.png"
                  class="detectionStatusimg"
                />
                已完成
              </span>
              <span v-else-if="scope.row.detectionStatus == 3">
                <img
                  src="../../../assets/error.png"
                  class="detectionStatusimg"
                />
                检测失败
              </span>
              <span v-else-if="scope.row.detectionStatus == 4">
                <img
                  src="../../../assets/correct.png"
                  class="detectionStatusimg"
                />
                引擎检测完成
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="上传人" width="130">
            <template slot-scope="scope">{{ scope.row.userName }}</template>
          </el-table-column>
          <el-table-column label="操作" width="290">
            <template slot-scope="scope">
              <el-tooltip
                effect="dark"
                content="下载报告"
                placement="top-start"
              >
                <template v-if="scope.row.detectionStatus == 2">
                  <i
                    class="el-icon-download downloadReportIcon"
                    @click="downloadReport(scope.row.taskId)"
                  ></i>
                </template>
                <template v-else>
                  <i class="el-icon-download  disabledIcon "></i>
                </template>
              </el-tooltip>
              <!-- 下载报告 -->
              <el-drawer
                title="下载报告"
                :visible.sync="downloadReportDrawer"
                :with-header="false"
                :wrapperClosable="false"
                :close-on-press-escape="false"
                :destroy-on-close="true"
                ref="downloadReportDrawer"
                size="40%"
                class="downloadReportDrawer"
              >
                <div class="el-drawer-header">
                  <h3>下载报告</h3>
                </div>
                <div class="el-drawer-content">
                  <el-form :model="addDownloadReportForm">
                    <el-form-item prop="isCompliance">
                      <label slot="label">报告模板:</label>
                      <el-radio-group
                        v-model="addDownloadReportForm.isCompliance"
                      >
                        <el-radio :label="0">全量报告</el-radio>
                        <el-radio :label="2">整改报告</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="el-drawer-footer">
                  <div class="buttonBox" style="display:inline-block">
                    <el-button type="primary" @click="saveDownloadReport()"
                      >保存</el-button
                    >
                    <el-button @click="cancelDownloadReport()">取消</el-button>
                  </div>
                </div>
              </el-drawer>
              <el-tooltip effect="dark" content="详情" placement="top-start">
                <template v-if="scope.row.detectionStatus == 2">
                  <i
                    class="el-icon-tickets detailIcon"
                    @click="detailTask(scope.row.taskId)"
                  ></i>
                </template>
                <template v-else>
                  <i class="el-icon-tickets disabledIcon"></i>
                </template>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                content="下载应用"
                placement="top-start"
              >
                <i
                  class=" el-icon-sold-out dowmloadApplicationIcon"
                  @click="downloadApk(scope.row.taskId)"
                ></i>
              </el-tooltip>

              <!-- <el-tooltip effect="dark" content="删除" placement="top-start">
                <template v-if="scope.row.detectionStatus == 2">
                  <i
                    class="el-icon-delete deleteIcon"
                    @click="deleteTask(scope.row.taskId)"
                  >
                  </i>
                </template>
                <template v-else>
                  <i class="el-icon-delete  disabledIcon"></i>
                </template>
              </el-tooltip> -->
              <el-tooltip effect="dark" content="删除" placement="top-start">
                <i
                  class="el-icon-delete deleteIcon"
                  @click="deleteTask(scope.row.taskId)"
                >
                </i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="iosBase">
      <pagination @pageChanged="onPageChanged"></pagination>
    </div>
  </div>
</template>
<script>
import api from "../../request/api";
import pagination from "../../common/pagination";
import pageMixins from "../../../utils/pageMixins";
export default {
  name: "ios",
  components: { pagination },
  mixins: [pageMixins],
  inject: ["reload"],
  data() {
    return {
      pickOptionsStart: {
        disabledDate: time => {
          return (
            time.getTime() >
              new Date(this.ruleForm.maxDetectionTime).getTime() ||
            time.getTime() > Date.now()
          );
        }
      },
      pickOptionsEnd: {
        disabledDate: time => {
          return (
            time.getTime() <
              new Date(this.ruleForm.minDetectionTime).getTime() ||
            time.getTime() > Date.now()
          );
        }
      },
      ruleForm: {
        appName: "",
        appVersion: "",
        detectionStatus: "",
        minDetectionTime: "",
        maxDetectionTime: ""
      },
      addDownloadReportForm: {
        isCompliance: 0
      },
      addTaskDrawer: false,
      uploadShow: true,
      fileList: [],
      uploadTaskFileItem: [],
      uploadForm: [],
      activeNames: [],
      detectorStrategyList: [],
      rules: {
        detectorStrategyId: [
          {
            required: true,
            message: "请选择检测策略",
            trigger: "blur"
          }
        ]
      },
      detectionStatusOptions: [
        { value: "0", label: "等待检测" },
        { value: "4", label: "引擎检测完成" },
        { value: "3", label: "检测失败" },
        { value: "1", label: "检测中" },
        { value: "2", label: "已完成" }
      ],
      loading: false,
      listItem: [],
      curpage: 1,
      limit: 10,
      downloadReportDrawer: false,
      taskId: null
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    async getData() {
      const params = {};
      params.queryInfo = this.ruleForm;
      params.queryInfo.terminalType = 2;
      this.getDataItem(this.addPageInfo(params));
    },
    getDataItem(params) {
      api.detectorAndroidService.androidList(params).then(res => {
        if (res.code == "00") {
          const count = res.data.count,
            { pn: number, limit: size } = params;
          this.listItem = res.data.items;
          this.curpage = number;
          this.limit = size;
          this.onGotPageData({ totalElements: count, size, number });
        }
      });
    },
    search(ruleForm) {
      const params = {};
      params.queryInfo = ruleForm;
      params.queryInfo.terminalType = 2;
      this.loading = true;
      this.addPageInfo(params);
      this.getDataItem(params);
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    detailTask(id) {
      this.$router.push({ path: "/home/detector/ios/detail", query: { id } });
    },
    refresh() {
      this.reload();
    },
    addTask() {
      this.addTaskDrawer = true;
    },
    /* 控制上传的数量 */
    handleExceed() {
      this.$message.warning("最多只能上传5个文件哦");
    },
    /* 上传任务开始 */
    uploadTaskFile(file) {
      const params = new FormData(),
        _this = this;
      params.append("file", file.file);
      //进度条配置
      const config = {
        onUploadProgress: ProgressEvent => {
          const progressPercent =
            ((ProgressEvent.loaded / ProgressEvent.total) * 100) | 0;
          file.onProgress({ percent: progressPercent });
        }
      };
      api.uploadService.uploadFile(params, config).then(res => {
        if (res.code == "00") {
          _this.uploadForm.push({ detectorStrategyId: "" });
          _this.uploadTaskFileItem.push(res.data);
          _this.uploadShow = false;
          api.detrctorTaskService.findStrategyList(2).then(res => {
            if (res.code == "00") {
              this.detectorStrategyList = res.data;
            }
          });
          for (var i = 0; i < _this.uploadTaskFileItem.length; i++) {
            _this.activeNames.push(i + 1);
            _this.activeNames = Array.from(new Set(_this.activeNames));
          }
        }
      });
    },
    saveTask() {
      let allValid = true;
      const detectionStrategyDtoList = this.uploadTaskFileItem.map(
        (item, index) => {
          const result = {
            detectionAppInfo: {
              appFileName: item.appFileName,
              appIcon: item.appIcon,
              appMbyte: item.appMbyte,
              appName: item.appName,
              appPackage: item.appPackage,
              appPath: item.appPath,
              appVersion: item.appVersion,
              detectionCount: item.detectionCount,
              md5: item.md5,
              terminalType: item.terminalType
            },
            detectionStrategyId: this.uploadForm[index].detectorStrategyId
          };
          this.$refs["uploadForm"][index].validate(valid => {
            if (!valid) {
              allValid = false;
            }
          });
          return result;
        }
      );
      if (allValid) {
        api.detectorAndroidService
          .saveAndStartDetection(detectionStrategyDtoList)
          .then(res => {
            if (res.code == "00") {
              this.$notify({
                message: "开始检测",
                type: "success"
              });
            }
            this.addTaskDrawer = false;
            this.reload();
          });
      }
    },
    cancelTask() {
      if (this.uploadTaskFileItem.length) {
        new this.$messageTips(({ confirm }) => {
          confirm({ content: "会清空当前上传的文件,是否继续?" });
        }).then(() => {
          this.addTaskDrawer = false;
          this.$refs.uploadTask.clearFiles();
          this.reload();
        });
      } else {
        this.addTaskDrawer = false;
      }
    },
    //删除任务
    deleteTask(id) {
      const _this = this;
      new this.$messageTips(({ confirm }) => {
        confirm({ content: "确定要删除应用及其所有检测记录?" });
      }).then(res => {
        api.detectorAndroidService.deleteAndroidListById(id).then(res => {
          if (res.code == "00") {
            _this.$message({ type: "success", message: "删除成功" });
            _this.reload();
          }
        });
      });
    },
    //下载应用
    downloadApk(id) {
      const Authorization = localStorage.getItem("Authorization"),
        downloadUrl =
          this.api.baseUrl +
          "/detector/android/downloadApk?id=" +
          id +
          "&Authorization=" +
          Authorization;
      window.location.href = downloadUrl;
    },
    //下载报告
    downloadReport(id) {
      this.taskId = id;
      this.downloadReportDrawer = true;
    },
    //保存下载报告
    saveDownloadReport() {
      const id = this.taskId,
        Authorization = localStorage.getItem("Authorization"),
        isCompliance = this.addDownloadReportForm.isCompliance,
        downloadUrl =
          this.api.baseUrl +
          "/detector/android/downloadReport?id=" +
          id +
          "&isCompliance=" +
          isCompliance +
          "&Authorization=" +
          Authorization;
      window.location.href = downloadUrl;
      this.downloadReportDrawer = false;
      /* this.reload(); */
    },
    //取消下载报告
    cancelDownloadReport() {
      this.downloadReportDrawer = false;
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(to.name);
    if (to.name == "iosDetail") {
      this.$store.commit("getCacheComponents", ["ios"]);
    } else {
      this.$store.commit("getCacheComponents", []);
    }
    next();
  }
};
</script>
<style>
.iosHeader {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.iosBody {
  margin-top: 20px;
}
.iosBody .appIcon {
  width: 40px;
  height: 40px;
  border-radius: 3px;
  vertical-align: middle;
}
.iosBody .detectionStatusimg {
  width: 25px;
  height: 25px;
  border-radius: 3px;
  vertical-align: middle;
}
.iosBody .version {
  display: flex;
  align-items: center;
}
.ios .el-input {
  width: auto;
}
.ios .searchForm {
  display: flex;
}
.ios .operateBox {
  margin-left: 15px;
}
.disabledIcon {
  font-size: 22px;
  margin-right: 10px;
  cursor: not-allowed;
  background: #517fc3;
  color: #517fc394;
}
.ios .el-table {
  font-size: 12px;
  border: 1px solid #dcdee2;
  border-bottom: 1px solid transparent;
}
.ios .el-table thead {
  color: #515a6e !important;
  font-weight: 700;
}
.ios .el-table__header-wrapper {
  background: #f8f8f9;
}
.ios .el-table__header-wrapper th {
  background: #f2f5f7;
}
.ios .el-table ::before {
  background: white;
}
.dowmloadApplicationIcon,
.detailIcon,
.downloadReportIcon,
.deleteIcon {
  font-size: 22px;
  color: #517fc3;
  margin-right: 10px;
  cursor: pointer;
}
.ios .el-drawer-header {
  width: 100%;
  position: fixed;
  background: white;
  z-index: 99;
  height: 50px;
  padding: 17px 20px;
  border-bottom: 1px solid #ebebeb;
}
.el-drawer {
  box-sizing: border-box !important;
  overflow-y: auto !important;
}
.ios .el-drawer-content {
  margin-top: 50px;
  position: relative;
  overflow: auto;
  padding: 0px 20px 40px 20px;
}
.ios .el-drawer-header h3 {
  color: #333;
  font-size: 16px;
  font-weight: 600;
}
.ios .el-upload-dragger {
  width: 100%;
  height: 230px;
  margin-top: 20px;
}
.ios .el-drawer-header {
  width: 100%;
  position: fixed;
  background: white;
  z-index: 99;
  height: 50px;
  padding: 17px 20px;
  border-bottom: 1px solid #ebebeb;
}
.ios .el-drawer-header h3 {
  color: #333;
  font-size: 16px;
  font-weight: 600;
}
.applicationInfoCollapse img {
  width: 55%;
  border-radius: 15px;
  margin: 30px 35px 0 0;
  vertical-align: middle;
}
.ios .el-collapse-item__header.is-active {
  font-weight: 700;
  font-size: 16px;
}
.applicationInfoCollapse .el-row:first-child p {
  line-height: 36px;
  color: #606266;
  margin: 10px 0;
}
.applicationInfoCollapse .appName {
  font-size: 16px;
  font-weight: 700;
}
.el-upload {
  width: 100%;
}
.el-upload_tip {
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
  color: #a3a9b1;
}
.iosBase {
  margin-top: 15px;
}
.ios .el-drawer-footer {
  width: 40%;
  position: fixed;
  bottom: 0px;
  background: white;
  z-index: 9;
  padding: 10px 20px;
  border-top: 1px solid #ebebeb;
  right: 0;
  text-align: right;
}
</style>
