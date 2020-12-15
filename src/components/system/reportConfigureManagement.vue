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
              <el-form-item prop="templateType">
                <label slot="label">模板类型:</label>
                <el-radio-group
                  v-model="reportStrategyForm.templateType"
                  @change="label => handleRadioChange(label, 'add')"
                >
                  <el-radio :label="1">Android</el-radio>
                  <el-radio :label="2">iOS</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="templateId">
                <label slot="label">报告模板:</label>
                <el-radio-group
                  v-model="reportStrategyForm.templateId"
                  style="margin-top:13px"
                >
                  <el-radio
                    style="margin-bottom:20px"
                    v-for="item in reportTemplateList"
                    :key="item.id"
                    :label="item.id"
                    >{{ item.templateName }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="reportName">
                <label slot="label">报告名称:</label>
                <el-input
                  size="small"
                  v-model="reportStrategyForm.reportName"
                ></el-input>
              </el-form-item>
              <el-form-item prop="reportCorporateName">
                <label slot="label">公司名称:</label>
                <el-input
                  size="small"
                  v-model="reportStrategyForm.reportCorporateName"
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
                <label slot="label">&nbsp;&nbsp;报告页眉:</label>
                <el-upload
                  ref="upload"
                  drag
                  action="/"
                  :http-request="
                    templateType =>
                      uploadTaskFile(templateType, 'reportHeaderLogo', 'add')
                  "
                  :limit="1"
                  list-type="picture"
                  :on-exceed="handleExceed"
                  v-if="!reportStrategyForm.reportHeaderLogo"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    建议分辨率221*55 <em>点击上传</em>
                  </div>
                </el-upload>
                <template v-else>
                  <img
                    :src="
                      this.api.baseUrl +
                        `/api/common/viewFile/${reportStrategyForm.reportHeaderLogo}?Authorization=${getAuthorization}`
                    "
                    style="width:70%"
                  />
                  <el-upload
                    ref="upload"
                    action="/"
                    :http-request="
                      templateType =>
                        uploadTaskFile(templateType, 'reportHeaderLogo', 'add')
                    "
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                    :limit="1"
                    list-type="picture"
                    :on-exceed="handleExceed"
                  >
                    <div class="amendUploadImageBtn">
                      <span>修改</span>
                    </div>
                  </el-upload>
                </template>
              </el-form-item>
              <el-form-item prop="reportFooterLogo">
                <label slot="label">&nbsp;&nbsp;报告页脚:</label>
                <el-upload
                  ref="upload"
                  drag
                  action="/"
                  :http-request="
                    templateType =>
                      uploadTaskFile(templateType, 'reportFooterLogo', 'add')
                  "
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                  :limit="1"
                  list-type="picture"
                  :on-exceed="handleExceed"
                  v-if="!reportStrategyForm.reportFooterLogo"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    建议分辨率267*26 <em>点击上传</em>
                  </div>
                </el-upload>
                <template v-else>
                  <img
                    :src="
                      this.api.baseUrl +
                        `/api/common/viewFile/${reportStrategyForm.reportFooterLogo}?Authorization=${getAuthorization}`
                    "
                    style="width:70%"
                  />
                  <el-upload
                    ref="upload"
                    action="/"
                    :http-request="
                      templateType =>
                        uploadTaskFile(templateType, 'reportFooterLogo', 'add')
                    "
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                    :limit="1"
                    list-type="picture"
                    :on-exceed="handleExceed"
                  >
                    <div class="amendUploadImageBtn">
                      <span>修改</span>
                    </div>
                  </el-upload>
                </template>
              </el-form-item>
              <el-form-item prop="reportCoverLogo">
                <label slot="label">&nbsp;&nbsp;首页logo:</label>
                <el-upload
                  ref="upload"
                  drag
                  action="/"
                  :http-request="
                    templateType =>
                      uploadTaskFile(templateType, 'reportCoverLogo', 'add')
                  "
                  list-type="picture"
                  :limit="1"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                  v-if="!reportStrategyForm.reportCoverLogo"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    建议分辨率321*210 <em>点击上传</em>
                  </div>
                </el-upload>
                <template v-else>
                  <img
                    :src="
                      this.api.baseUrl +
                        `/api/common/viewFile/${reportStrategyForm.reportCoverLogo}?Authorization=${getAuthorization}`
                    "
                    style="width:70%"
                  />
                  <el-upload
                    ref="upload"
                    action="/"
                    :http-request="
                      templateType =>
                        uploadTaskFile(templateType, 'reportCoverLogo', 'add')
                    "
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                    :limit="1"
                    list-type="picture"
                    :on-exceed="handleExceed"
                  >
                    <div class="amendUploadImageBtn">
                      <span>修改</span>
                    </div>
                  </el-upload>
                </template>
              </el-form-item>
              <el-form-item prop="reportWatermarkLogo">
                <label slot="label">&nbsp;&nbsp;报告水印:</label>
                <el-upload
                  ref="upload"
                  drag
                  action="/"
                  :http-request="
                    templateType =>
                      uploadTaskFile(templateType, 'reportWatermarkLogo', 'add')
                  "
                  list-type="picture"
                  :limit="1"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                  v-if="!reportStrategyForm.reportWatermarkLogo"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    建议分辨率800*600 <em>点击上传</em>
                  </div>
                </el-upload>
                <template v-else>
                  <img
                    :src="
                      this.api.baseUrl +
                        `/api/common/viewFile/${reportStrategyForm.reportWatermarkLogo}?Authorization=${getAuthorization}`
                    "
                    style="width:70%"
                  />
                  <el-upload
                    ref="upload"
                    action="/"
                    :http-request="
                      templateType =>
                        uploadTaskFile(
                          templateType,
                          'reportWatermarkLogoo',
                          'add'
                        )
                    "
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                    :limit="1"
                    list-type="picture"
                    :on-exceed="handleExceed"
                  >
                    <div class="amendUploadImageBtn">
                      <span>修改</span>
                    </div>
                  </el-upload>
                </template>
              </el-form-item>
            </el-form>
          </div>
          <div class="el-drawer-footer">
            <div class="buttonBox" style="display:inline-block">
              <el-button
                type="primary"
                @click="saveAddReportStrategy('reportStrategyForm')"
                >保存</el-button
              >
              <el-button
                @click="cancelAddReportStrategy('reportStrategyForm')"
                plain
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
            min-width="10%"
          ></el-table-column>
          <el-table-column
            prop="report_name"
            label="报告名称"
            min-width="20%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="report_corporate_name"
            label="公司名称"
            min-width="20%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="report_title"
            label="报告标题"
            min-width="20%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="template_id"
            label="策略模板类型"
            min-width="20%"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.template_type == '1'">Android</span>
              <span v-if="scope.row.template_type == '2'">iOS</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="20%"
          ></el-table-column>
          <el-table-column prop="operate" label="操作" min-width="40%">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="editReportStrategy(scope.row.id)"
                >编辑</el-button
              >
              <!-- 报告策略编辑Drawer开始 -->
              <el-drawer
                title="编辑报告策略"
                :visible.sync="editReportStrategyDrawer"
                :with-header="false"
                :wrapperClosable="false"
                :close-on-press-escape="false"
                :destroy-on-close="true"
                size="40%"
                class="editReportStrategyDrawer"
              >
                <div class="el-drawer-header">
                  <h3>编辑报告策略</h3>
                </div>
                <div class="el-drawer-content">
                  <template v-if="reportStrategyDetailList">
                    <el-form
                      :model="reportStrategyDetailList"
                      :rules="rules"
                      ref="reportStrategyDetailList"
                    >
                      <el-form-item prop="templateType">
                        <label slot="label">模板类型</label>
                        <el-radio-group
                          v-model="reportStrategyDetailList.templateType"
                          @change="label => handleRadioChange(label, 'edit')"
                        >
                          <el-radio :label="1">Android</el-radio>
                          <el-radio :label="2"> iOS</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item prop="templateId">
                        <label slot="label">报告模板:</label>
                        <el-radio-group
                          v-model="reportStrategyDetailList.templateId"
                          style="margin-top:13px"
                        >
                          <el-radio
                            style="margin-bottom:20px"
                            v-for="item in reportTemplateList"
                            :key="item.id"
                            :label="item.id"
                            >{{ item.templateName }}</el-radio
                          >
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item prop="reportCorporateName">
                        <label slot="label">公司名称:</label>
                        <el-input
                          size="small"
                          v-model="reportStrategyDetailList.reportCorporateName"
                        ></el-input>
                      </el-form-item>
                      <el-form-item prop="reportName">
                        <label slot="label">报告名称:</label>
                        <el-input
                          size="small"
                          v-model="reportStrategyDetailList.reportName"
                        ></el-input>
                      </el-form-item>
                      <el-form-item prop="reportTitle">
                        <label slot="label">报告标题:</label>
                        <el-input
                          size="small"
                          v-model="reportStrategyDetailList.reportTitle"
                        ></el-input>
                      </el-form-item>
                      <el-form-item prop="reportHeaderLogo">
                        <label slot="label">&nbsp;&nbsp;报告页眉:</label>
                        <el-upload
                          drag
                          action="/"
                          :http-request="
                            templateType =>
                              uploadTaskFile(
                                templateType,
                                'reportHeaderLogo',
                                'edit'
                              )
                          "
                          :limit="1"
                          list-type="picture"
                          :on-exceed="handleExceed"
                          v-if="!reportStrategyDetailList.reportHeaderLogo"
                          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                        >
                          <i class="el-icon-upload"></i>
                          <div class="el-upload__text">
                            建议分辨率221*55 <em>点击上传</em>
                          </div>
                        </el-upload>
                        <template v-else>
                          <img
                            :src="
                              api.baseUrl +
                                `/api/common/viewFile/${reportStrategyDetailList.reportHeaderLogo}?Authorization=${getAuthorization}`
                            "
                            style="width:70%"
                          />
                          <el-upload
                            action="/"
                            :http-request="
                              templateType =>
                                uploadTaskFile(
                                  templateType,
                                  'reportHeaderLogo',
                                  'edit'
                                )
                            "
                            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                            :limit="1"
                            list-type="picture"
                            :on-exceed="handleExceed"
                          >
                            <div class="amendUploadImageBtn">
                              <span>修改</span>
                            </div>
                          </el-upload>
                        </template>
                      </el-form-item>
                      <el-form-item prop="reportFooterLogo">
                        <label slot="label">&nbsp;&nbsp;报告页脚:</label>
                        <el-upload
                          drag
                          action="/"
                          :http-request="
                            templateType =>
                              uploadTaskFile(
                                templateType,
                                'reportFooterLogo',
                                'edit'
                              )
                          "
                          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                          :limit="1"
                          list-type="picture"
                          :on-exceed="handleExceed"
                          v-if="!reportStrategyDetailList.reportFooterLogo"
                        >
                          <i class="el-icon-upload"></i>
                          <div class="el-upload__text">
                            建议分辨率267*26 <em>点击上传</em>
                          </div>
                        </el-upload>
                        <template v-else>
                          <img
                            :src="
                              api.baseUrl +
                                `/api/common/viewFile/${reportStrategyDetailList.reportFooterLogo}?Authorization=${getAuthorization}`
                            "
                            style="width:70%"
                          />
                          <el-upload
                            action="/"
                            :http-request="
                              templateType =>
                                uploadTaskFile(
                                  templateType,
                                  'reportFooterLogo',
                                  'edit'
                                )
                            "
                            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                            :limit="1"
                            list-type="picture"
                            :on-exceed="handleExceed"
                          >
                            <div class="amendUploadImageBtn">
                              <span>修改</span>
                            </div>
                          </el-upload>
                        </template>
                      </el-form-item>
                      <el-form-item prop="reportCoverLogo">
                        <label slot="label">&nbsp;&nbsp;首页logo:</label>
                        <el-upload
                          drag
                          action="/"
                          :http-request="
                            templateType =>
                              uploadTaskFile(
                                templateType,
                                'reportCoverLogo',
                                'edit'
                              )
                          "
                          list-type="picture"
                          :limit="1"
                          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                          v-if="!reportStrategyDetailList.reportCoverLogo"
                        >
                          <i class="el-icon-upload"></i>
                          <div class="el-upload__text">
                            建议分辨率321*210 <em>点击上传</em>
                          </div>
                        </el-upload>
                        <template v-else>
                          <img
                            :src="
                              api.baseUrl +
                                `/api/common/viewFile/${reportStrategyDetailList.reportCoverLogo}?Authorization=${getAuthorization}`
                            "
                            style="width:70%"
                          />
                          <el-upload
                            action="/"
                            :http-request="
                              templateType =>
                                uploadTaskFile(
                                  templateType,
                                  'reportCoverLogo',
                                  'edit'
                                )
                            "
                            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                            :limit="1"
                            list-type="picture"
                            :on-exceed="handleExceed"
                          >
                            <div class="amendUploadImageBtn">
                              <span>修改</span>
                            </div>
                          </el-upload>
                        </template>
                      </el-form-item>
                      <el-form-item prop="reportWatermarkLogo">
                        <label slot="label">&nbsp;&nbsp;报告水印:</label>
                        <el-upload
                          drag
                          action="/"
                          :http-request="
                            templateType =>
                              uploadTaskFile(
                                templateType,
                                'reportWatermarkLogo',
                                'edit'
                              )
                          "
                          list-type="picture"
                          :limit="1"
                          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                          v-if="!reportStrategyDetailList.reportWatermarkLogo"
                        >
                          <i class="el-icon-upload"></i>
                          <div class="el-upload__text">
                            建议分辨率800*600 <em>点击上传</em>
                          </div>
                        </el-upload>
                        <template v-else>
                          <img
                            :src="
                              api.baseUrl +
                                `/api/common/viewFile/${reportStrategyDetailList.reportWatermarkLogo}?Authorization=${getAuthorization}`
                            "
                            style="width:70%"
                          />
                          <el-upload
                            action="/"
                            :http-request="
                              templateType =>
                                uploadTaskFile(
                                  templateType,
                                  'reportWatermarkLogo',
                                  'edit'
                                )
                            "
                            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                            :limit="1"
                            list-type="picture"
                            :on-exceed="handleExceed"
                          >
                            <div class="amendUploadImageBtn">
                              <span>修改</span>
                            </div>
                          </el-upload>
                        </template>
                      </el-form-item>
                    </el-form>
                  </template>
                </div>
                <div class="el-drawer-footer">
                  <el-button
                    type="primary"
                    @click="saveEditReportStrategy('reportStrategyDetailList')"
                    >保存</el-button
                  >
                  <el-button plain @click="cancelEditReportStrategy()"
                    >取消</el-button
                  >
                </div>
              </el-drawer>

              <!-- 报告策略编辑Drawer结束 -->
              <el-button
                size="small"
                type="success"
                @click="reportDetail(scope.row.id)"
                >详情</el-button
              >
              <!-- 报告策略详情Drawer开始 -->
              <el-drawer
                title="报告策略详情"
                :visible.sync="reportStrategyDetailDrawer"
                :with-header="false"
                :wrapperClosable="false"
                :close-on-press-escape="false"
                :destroy-on-close="true"
                size="35%"
                class="reportStrategyDetailDrawer"
              >
                <div class="el-drawer-header">
                  <h3>报告策略详情</h3>
                </div>
                <div class="el-drawer-content">
                  <template v-if="reportStrategyDetailList">
                    <el-form :model="reportStrategyDetailList">
                      <el-form-item prop="templateType">
                        <label slot="label"
                          >模板类型:<span v-if="templateType == 1"
                            >Android</span
                          >
                          <span v-if="templateType == 2">iOS</span>
                        </label>
                      </el-form-item>
                      <el-form-item prop="templateName">
                        <label slot="label"
                          >报告模板:{{
                            reportStrategyDetailList.templateName
                          }}</label
                        >
                      </el-form-item>
                      <el-form-item prop="reportCorporateName">
                        <label slot="label"
                          >公司名称:{{
                            reportStrategyDetailList.reportCorporateName
                          }}</label
                        >
                      </el-form-item>
                      <el-form-item prop="reportName">
                        <label slot="label"
                          >报告名称:{{
                            reportStrategyDetailList.reportName
                          }}</label
                        >
                      </el-form-item>
                      <el-form-item prop="reportTitle">
                        <label slot="label"
                          >报告标题:{{
                            reportStrategyDetailList.reportTitle
                          }}</label
                        >
                      </el-form-item>
                      <template
                        v-if="reportStrategyDetailList.reportHeaderLogo"
                      >
                        <el-form-item prop="reportHeaderLogo">
                          <label slot="label">报告页眉:</label>
                          <img
                            style="width:40%"
                            :src="
                              api.baseUrl +
                                `/api/common/viewFile/${reportStrategyDetailList.reportHeaderLogo}?Authorization=${getAuthorization}`
                            "
                          />
                        </el-form-item>
                      </template>
                      <template
                        v-if="reportStrategyDetailList.reportFooterLogo"
                      >
                        <el-form-item prop="reportFooterLogo">
                          <label slot="label">报告页脚:</label>
                          <img
                            style="width:40%"
                            :src="
                              api.baseUrl +
                                `/api/common/viewFile/${reportStrategyDetailList.reportFooterLogo}?Authorization=${getAuthorization}`
                            "
                          />
                        </el-form-item>
                      </template>
                      <template v-if="reportStrategyDetailList.reportCoverLogo">
                        <el-form-item prop="reportCoverLogo">
                          <label slot="label">首页logo:</label>
                          <img
                            style="width:40%"
                            :src="
                              api.baseUrl +
                                `/api/common/viewFile/${reportStrategyDetailList.reportCoverLogo}?Authorization=${getAuthorization}`
                            "
                          />
                        </el-form-item>
                      </template>
                      <template
                        v-if="reportStrategyDetailList.reportWatermarkLogo"
                      >
                        <el-form-item prop="reportWatermarkLogo">
                          <label slot="label">报告水印:</label>
                          <img
                            style="width:40%"
                            :src="
                              api.baseUrl +
                                `/api/common/viewFile/${reportStrategyDetailList.reportWatermarkLogo}?Authorization=${getAuthorization}`
                            "
                          />
                        </el-form-item>
                      </template>
                    </el-form>
                  </template>
                </div>
                <div class="el-drawer-footer">
                  <el-button plain @click="cancelReportDetail()"
                    >取消</el-button
                  >
                </div>
              </el-drawer>
              <!--报告策略详情Drawer结束 -->
              <el-button
                size="small"
                type="danger"
                @click="deleteReport(scope.row.id)"
                >删除</el-button
              >
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
      reportStrategyDetailDrawer: false,
      editReportStrategyDrawer: false,
      reportStrategyDetailList: null,
      reportStrategyForm: {
        templateType: 1,
        reportCorporateName: "",
        reportName: "",
        reportTitle: "",
        reportHeaderLogo: "",
        reportFooterLogo: "",
        reportCoverLogo: "",
        reportWatermarkLogo: "",
        templateId: ""
      },
      rules: {
        templateType: {
          required: true,
          message: "请选择模板类型",
          trigger: "blur"
        },
        templateId: {
          required: true,
          message: "请选择报告模板类型",
          trigger: "blur"
        },
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
        }
        /* reportHeaderLogo: {
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
        } */
      },
      loading: false,
      listItem: [],
      curpage: 1,
      limit: 10,
      reportTemplateList: [],
      templateType: 1
    };
  },
  computed: {
    getAuthorization() {
      return localStorage.getItem("Authorization");
    }
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
    //得到不同的报告模板
    getReportTemplateList(params) {
      api.systemService.getReportTemplateList(params).then(res => {
        this.reportTemplateList = res.data;
      });
    },
    //上传页眉页脚水印
    uploadTaskFile(file, type, formType) {
      const params = new FormData(),
        _this = this;
      params.append("file", file.file);
      api.uploadService.uploadReportConfigurationFile(params).then(res => {
        _this.setFileKey(type, res.data.fileKey, formType);
      });
    },
    //设置fileKey
    setFileKey(type, data, formType) {
      if (formType == "add") {
        this.$set(this.reportStrategyForm, type, data);
      } else if (formType == "edit") {
        this.$set(this.reportStrategyDetailList, type, data);
      }
    },
    //限制文件上传的数量
    handleExceed(file, fileList) {
      this.$message.warning("最多只能上传一个文件!");
    },
    search(ruleForm) {
      const params = {};
      params.queryInfo = ruleForm;
      this.loading = true;
      this.addPageInfo(params);
      this.getReportStrategyList(params);
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    refresh() {
      this.reload();
    },
    addReportStrategy() {
      this.addReportStrategyDrawer = true;
      const params = { templateType: this.templateType };
      this.getReportTemplateList(params);
    },
    handleRadioChange(...paramter) {
      const templateType = paramter[0],
        type = paramter[1],
        params = { templateType };
      this.getReportTemplateList(params);
      if (type == "add") {
        this.reportStrategyForm.templateId = "";
      } else if (type == "edit") {
        this.reportStrategyDetailList.templateId = "";
      }
    },
    saveAddReportStrategy(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = this.reportStrategyForm;
          api.systemService.saveOrUpdateReportStrategy(params).then(res => {
            if (res.code == "00") {
              this.addReportStrategyDrawer = false;
              this.$notify({
                message: "新增报告策略成功!",
                type: "success",
                duration: 1000
              });
              this.reload();
            }
          });
        } else {
          return false;
        }
      });
    },
    cancelAddReportStrategy(formName) {
      this.addReportStrategyDrawer = false;
      /* this.$refs[formName].resetFields();
      this.$refs["upload"].clearFiles(); */
      this.reload();
    },
    getReportDetail(id) {
      api.systemService.getReportStrategyDetail(id).then(res => {
        if (res.code == "00") {
          this.reportStrategyDetailList = res.data;
          const params = {
            templateType: this.reportStrategyDetailList.templateType
          };
          this.getReportTemplateList(params);
        }
      });
    },
    reportDetail(id) {
      this.reportStrategyDetailDrawer = true;
      this.getReportDetail(id);
    },
    deleteReport(id) {
      new this.$messageTips(({ confirm }) => {
        confirm({ content: "确定要删除该报告策略?" });
      }).then(res => {
        api.systemService.deleteReportTemplate(id).then(res => {
          if (res.code == "00") {
            this.$message({ type: "success", message: "删除成功" });
            this.reload();
          }
        });
      });
    },
    cancelReportDetail() {
      this.reportStrategyDetailDrawer = false;
    },
    //编辑报告策略
    editReportStrategy(id) {
      this.editReportStrategyDrawer = true;
      this.getReportDetail(id);
    },
    //保存编辑的报告策略
    saveEditReportStrategy(formName) {
      const {
          id,
          reportCorporateName,
          reportCoverLogo,
          reportFooterLogo,
          reportHeaderLogo,
          reportName,
          reportTitle,
          reportWatermarkLogo,
          templateId,
          templateType
        } = this.reportStrategyDetailList,
        params = {
          id,
          reportCorporateName,
          reportCoverLogo,
          reportFooterLogo,
          reportHeaderLogo,
          reportName,
          reportTitle,
          reportWatermarkLogo,
          templateId,
          templateType
        };
      this.$refs[formName].validate((valid, message) => {
        if (valid) {
          api.systemService.saveOrUpdateReportStrategy(params).then(res => {
            if (res.code == "00") {
              this.$notify({
                message: "编辑报告策略成功!",
                type: "success",
                duration: 1000
              });
              this.editReportStrategyDrawer = false;
              this.reload();
            }
          });
        } else {
          return false;
        }
      });
    },
    //取消编辑的报告策略
    cancelEditReportStrategy() {
      this.editReportStrategyDrawer = false;
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
.reportConfigureManagement .addReportStrategyDrawer .el-input,
.reportConfigureManagement .editReportStrategyDrawer .el-input {
  width: 70%;
}
.reportConfigureManagementBase {
  margin-top: 10px;
}
.reportConfigureManagement .el-button + .el-button {
  margin-right: 10px;
}
.reportConfigureManagement .addReportStrategyDrawer .el-input__inner,
.reportConfigureManagement .addReportStrategyDrawer .el-upload-dragger,
.reportConfigureManagement .editReportStrategyDrawer .el-input__inner,
.reportConfigureManagement .editReportStrategyDrawer .el-upload-dragger {
  border-radius: 0px;
}
.reportConfigureManagement .el-upload {
  width: 70%;
}
.reportConfigureManagement .el-upload-dragger {
  width: 100%;
}
.editIcon,
.detailIcon,
.deleteIcon {
  font-size: 22px;
  color: #517fc3;
  margin-right: 10px;
  cursor: pointer;
}
.reportConfigureManagement .el-upload-list--picture {
  width: 69%;
  margin-left: 11%;
}
.reportConfigureManagement .el-radio-group {
  width: 70%;
}
.reportConfigureManagement .el-radio-group .el-radio {
  width: 40%;
}
.reportConfigureManagement .el-table::before {
  height: 0px;
}
.reportConfigureManagement .amendUploadImageBtn {
  text-align: left;
  margin-left: 16%;
  color: #517fc3;
}
.reportStrategyDetailDrawer .el-drawer-footer {
  width: 35%;
}
</style>
