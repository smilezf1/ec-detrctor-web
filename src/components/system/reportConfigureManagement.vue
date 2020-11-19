<template>
  <div class="reportConfigureManagement">
    <div class="repoerConfigureManagementHeader">
      <p>当前位置:报告模板配置</p>
    </div>
    <div class="searchForm">
      <div class="searchBox">
        <el-form :model="ruleForm" ref="ruleForm">
          <el-input
            placeholder="请输入报告名称"
            size="small"
            v-model="ruleForm.reportTitle"
          ></el-input>
        </el-form>
      </div>
      <div class="operateBox">
        <el-button type="primary" size="small" @click="search(ruleForm)"
          >查询</el-button
        >
        <el-button type="primary" size="small" @click="addReportStrategy()"
          >新增报告策略</el-button
        >
        <el-drawer
          title="新增报告策略"
          :visible.sync="addReportStrategyDrawer"
          :with-header="false"
          :wrapperClosable="false"
          :close-on-press-esape="false"
          :destroy-on-close="true"
          size="40%"
          class="addReportStrategyDrawer"
        >
          <div class="el-drawer-header">
            <h3>新增报告策略</h3>
          </div>
          <div class="el-drawer-content">
            <el-form
              :model="reportStrategyForm"
              :rules="rules"
              ref="reportStrategyForm"
            >
              <el-form-item>
                <label slot="label">模板类型:</label>
                <el-radio-group
                  v-model="reportStrategyForm.templateType"
                  @change="handleRadioChange"
                >
                  <el-radio label="1">Android</el-radio>
                  <el-radio label="2">iOS</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="reportCorporateName">
                <label slot="label">公司名称:</label>
                <el-input
                  size="small"
                  v-model="reportStrategyForm.reportCorporateName"
                ></el-input>
              </el-form-item>
              <el-form-item prop="reportName">
                <label slot="label">报告名称:</label>
                <el-input
                  size="small"
                  v-model="reportStrategyForm.reportName"
                ></el-input>
              </el-form-item>
              <el-form-item prop="reportTitle">
                <label slot="label">报告标题:</label>
                <el-input
                  size="small"
                  v-model="reportStrategyForm.reportTitle"
                ></el-input>
              </el-form-item>
              <el-form-item prop="reportHeaderLogo">
                <label slot="label">报告页眉:</label>
                <el-upload
                  drag
                  action="/"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    建议分辨率221*55 <em>点击上传</em>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item prop="reportFooterLog">
                <label slot="label">报告页脚:</label>
                <el-upload
                  drag
                  action="/"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    建议分辨率267*26 <em>点击上传</em>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item prop="reportCoverLogo">
                <label slot="label">首页logo:</label>
                <el-upload
                  drag
                  action="/"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    建议分辨率321*210 <em>点击上传</em>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item prop="reportWatermarkLogo">
                <label slot="label">报告水印:</label>
                <el-upload
                  drag
                  action="/"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    建议分辨率800*600 <em>点击上传</em>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
          <div class="el-drawer-footer">
            <div class="buttonBox" style="display:inline-block">
              <el-button type="primary" @click="saveAddReportStrategy()"
                >保存</el-button
              >
              <el-button @click="cancelAddReportStrategy()" plain
                >取消</el-button
              >
            </div>
          </div>
        </el-drawer>
        <!-- 新增报告策略Drawer开始 -->
        <!-- 新增报告策略Drawer结束 -->
        <el-button type="primary" size="small" @click="refresh()"
          >刷新</el-button
        >
      </div>
    </div>
    <div class="reportConfigureManagementBody">
      <template>
        <el-table
          :data="listItem"
          v-loading="loading"
          element-loading-text="加载中"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="report_corporate_name"
            label="公司名称"
          ></el-table-column>
          <el-table-column
            prop="report_name"
            label="报告名称"
          ></el-table-column>
          <el-table-column
            prop="report_title"
            label="报告标题"
          ></el-table-column>
          <el-table-column prop="template_id" label="策略模板类型">
            <template slot-scope="scope">
              <span v-if="scope.row.template_id == '1'">Android</span>
              <span v-if="scope.row.template_id == '2'">iOS</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
          ></el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
              <el-tooltip effect="dark" content="编辑" placement="top-start">
                <i
                  class="el-icon-edit-outline editIcon"
                  @click="editReportStrategy(scope.row.id)"
                ></i>
              </el-tooltip>
              <el-tooltip effect="dark" content="详情" placement="top-start">
                <i
                  class="el-icon-tickets detailIcon"
                  @click="reportDetailDetail(scope.row.id)"
                ></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="reportConfigureManagementBase">
      <pagination @pageChanged="onPageChanged"></pagination>
    </div>
  </div>
</template>
<script>
import api from "../request/api";
import pagination from "../common/pagination";
import pageMixins from "../../utils/pageMixins";
import Pagination from "../../../../../securityManagementPlatform/src/components/common/pagination.vue";
export default {
  name: "reportConfigureManagement",
  inject: ["reload"],
  components: { pagination },
  mixins: [pageMixins],
  data() {
    return {
      ruleForm: {
        reportTitle: ""
      },
      addReportStrategyDrawer: false,
      reportStrategyForm: {
        templateType: "1",
        reportCorporateName: "",
        reportName: "",
        reportTitle: "",
        reportHeaderLogo: "",
        reportFooterLog: "",
        reportCoverLogo: "",
        reportWatermarkLogo: ""
      },
      rules: {
        reportCorporateName: {
          required: true,
          message: "请输入公司名称",
          trigger: "blur"
        },
        reportName: {
          required: true,
          message: "请输入报告名称",
          trigger: "blur"
        },
        reportTitle: {
          required: true,
          message: "请输入报告标题",
          trigger: "blur"
        },
        reportHeaderLogo: {
          required: true,
          message: "请上传报告页眉",
          trigger: "blur"
        },
        reportFooterLog: {
          required: true,
          message: "请上传报告页脚",
          trigger: "blur"
        },
        reportCoverLogo: {
          required: true,
          message: "请上传首页logo",
          trigger: "blur"
        },
        reportWatermarkLogo: {
          required: true,
          message: "请上传报告水印",
          trigger: "blur"
        }
      },
      loading: false,
      listItem: [],
      curpage: 1,
      limit: 10
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const params = {};
      params.queryInfo = this.ruleForm;
      this.getReportStrategyList(this.addPageInfo(params));
    },
    getReportStrategyList(params) {
      api.systemService.getReportStrategyList(params).then(res => {
        const count = res.data.count,
          number = params.pn,
          size = params.limit;
        this.listItem = res.data.items;
        this.curpage = number;
        this.limit = size;
        this.onGotPageData({ totalElements: count, size, number });
      });
    },
    search() {
      console.log("查询");
    },
    refresh() {
      console.log("刷新");
    },
    addReportStrategy() {
      this.addReportStrategyDrawer = true;
    },
    handleRadioChange() {},
    editReportStrategy(id) {
      console.log("编辑");
    },
    saveAddReportStrategy() {
      console.log("保存新增的报告策略");
    },
    cancelAddReportStrategy() {
      this.addReportStrategyDrawer = false;
    },
    reportDetailDetail(id) {
      console.log("详情");
    }
  }
};
</script>
<style>
.repoerConfigureManagementHeader {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.reportConfigureManagement .searchForm {
  display: flex;
}
.reportConfigureManagement .searchForm .operateBox {
  display: inline-block;
  box-sizing: border-box;
  margin: 0px 0px 15px 10px;
}
.reportConfigureManagement .el-input {
  width: 70%;
}
.reportConfigureManagementBase {
  margin-top: 10px;
}
.el-button + .el-button {
  margin-right: 10px;
}
.reportConfigureManagement .addReportStrategyDrawer .el-input__inner,
.reportConfigureManagement .addReportStrategyDrawer .el-upload-dragger {
  border-radius: 0px;
}
.reportConfigureManagement .el-upload {
  width: 70%;
}
.reportConfigureManagement .el-upload-dragger {
  width: 100%;
}
.reportConfigureManagement .editIcon,
.detailIcon {
  font-size: 22px;
  color: #517fc3;
  margin-right: 10px;
  cursor: pointer;
}
</style>
