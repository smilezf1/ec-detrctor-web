<template>
  <div class="androidDetail">
    <div class="androidDetailHeader">
      <p>当前位置:Android检测详细</p>
    </div>
    <div class="operateBox">
      <el-button type="primary" size="small" class="back" @click="back()"
        >返回</el-button
      >
    </div>
    <div class="androidBody">
      <template v-if="listItem">
        <div class="applicationMessage">
          <!-- 应用信息 -->
          <div class="applicationMessageHeader">
            <div class="applicationMessageHeaderLeft">
              <span class="title">应用信息</span>
            </div>
            <div class="applicationMessageHeaderRight">
              <span
                ><i class="el-icon-menu"></i>&nbsp;检测模板:&nbsp;&nbsp;&nbsp;
                <span style="color:#333">{{
                  listItem.taskInfo.detectionFormwork
                }}</span></span
              >
              <span
                ><i class="el-icon-date"></i
                >&nbsp;检测时间:&nbsp;&nbsp;&nbsp;<span style="color:#333">{{
                  listItem.taskInfo.detectionTime
                }}</span></span
              >
            </div>
          </div>
          <div class="applicationMessageBody">
            <el-row :span="24">
              <el-col :span="4">
                <div class="app-box">
                  <img
                    class="appInfoImg"
                    :src="'data:image/jpg;base64,' + listItem.appInfo.appIcon"
                  />
                  <p>应用:{{ listItem.appInfo.appName }}</p>
                  <p>大小:{{ listItem.appInfo.appMbyte }}MB</p>
                  <p>版本:{{ listItem.appInfo.appVersion }}</p>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="imgBox">
                  <img src="../../../assets/tested.png" />
                  <cite style="color:#11C2D6">
                    <span v-if="listItem.countDto">
                      {{ listItem.countDto.score }}
                    </span>
                    <span v-else>N/A</span>
                  </cite>
                </div>
                <p>检测分数</p>
              </el-col>
              <el-col :span="5">
                <div class="imgBox">
                  <img src="../../../assets/danger.png" />
                  <cite style="color:red">
                    <span v-if="listItem.countDto">
                      {{ listItem.countDto.nx }}</span
                    >
                    <span v-else>N/A</span>
                  </cite>
                </div>
                <p>高危(未通过)</p>
              </el-col>
              <el-col :span="5">
                <div class="imgBox">
                  <img src="../../../assets/mDanger.png" />
                  <cite style="color:#ed7d31">
                    <span v-if="listItem.countDto">{{
                      listItem.countDto.ny
                    }}</span>
                    <span v-else>N/A</span>
                  </cite>
                </div>
                <p>中危(未通过)</p>
              </el-col>
              <el-col :span="5">
                <div class="imgBox">
                  <img src="../../../assets/lDanger.png" />

                  <cite style="color:#ffbc93">
                    <span v-if="listItem.countDto">
                      {{ listItem.countDto.nz }}</span
                    >
                    <span v-else>N/A</span>
                  </cite>
                </div>
                <p>低危(未通过)</p>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 检测结果 -->
        <div class="detectorResult">
          <div class="searchForm">
            <div class="searchBox">
              <el-form :model="searchForm">
                <el-autocomplete
                  v-model="searchForm.detectorKeyword"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入检测项关键字"
                  size="small"
                ></el-autocomplete>
                <el-select size="small" v-model="searchForm.status">
                  <el-option
                    v-for="item in options"
                    :key="item.isCompliance"
                    :label="item.label"
                    :value="item.isCompliance"
                  ></el-option>
                </el-select>
              </el-form>
            </div>
            <div class="operateBox">
              <el-button type="primary" size="small" @click="search(searchForm)"
                >查询</el-button
              >
            </div>
          </div>
        </div>
        <div class="detectorMessage">
          <el-tabs
            type="border-card"
            v-if="detailListItem"
            v-loading="loading"
            element-loading-text="拼命加载中"
          >
            <!-- 基本信息 -->
            <el-tab-pane label="基本信息" class="appInfo">
              <el-row type="flex">
                <el-col :span="1"><span>应用名称</span></el-col>
                <el-col :span="21"
                  ><span>{{ listItem.appInfo.appName }}</span></el-col
                >
              </el-row>
              <el-row type="flex">
                <el-col :span="1"><span>包名</span></el-col>
                <el-col :span="21"
                  ><span>{{ listItem.appInfo.appPackage }}</span></el-col
                ></el-row
              >
              <el-row type="flex">
                <el-col :span="1"><span>版本信息</span></el-col>
                <el-col :span="21"
                  ><span>{{ listItem.appInfo.appVersion }}</span></el-col
                >
              </el-row>
              <el-row type="flex">
                <el-col :span="1"><span>文件大小</span></el-col>
                <el-col :span="21"
                  ><span>{{ listItem.appInfo.appMbyte }}</span></el-col
                >
              </el-row>
              <el-row type="flex">
                <el-col :span="1"><span>文件MD5</span></el-col>
                <el-col :span="21"
                  ><span>{{ listItem.appInfo.md5 }}</span></el-col
                >
              </el-row>
              <el-row type="flex">
                <el-col :span="1"><span>加固厂商</span></el-col>
                <el-col :span="21"
                  ><span>{{ listItem.appInfo.dealer }}</span></el-col
                >
              </el-row>
              <el-row type="flex">
                <el-col :span="1"><span>签名信息</span></el-col>
                <el-col :span="21"
                  ><pre>{{ listItem.appInfo.signature }}</pre></el-col
                >
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="应用权限列表">
              <el-table
                :data="permissionListTableData"
                v-if="permissionListTableData"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  width="80"
                ></el-table-column>
                <el-table-column
                  prop="permissionName"
                  label="权限名称"
                  width="450"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="sensitiveLevel"
                  label="敏感等级"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="permissionType"
                  label="权限分类"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="permissionDesc"
                  label="权限描述"
                ></el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane label="敏感行为评测">
              <el-collapse>
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode03"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="
                    getRiskGradeColor(
                      item.result,
                      item.riskGroup,
                      '敏感行为评测'
                    )
                  "
                >
                  <el-row type="flex">
                    <el-col :span="1"> <span>评测目的</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>评测等级</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.riskGroup }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测过程</el-col>
                    <el-col :span="21"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测依据</el-col>
                    <el-col :span="21">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测描述</el-col>
                    <el-col :span="21">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row type="flex" class="evaluationResult">
                    <el-col :span="1">评测结果</el-col>
                    <el-col :span="21" style="margin-left:10px">
                      <pre> {{ item.resultDesc }}</pre>
                      <el-image
                        style="width:200px"
                        :src="'data:image/png;base64,' + item.pic"
                        :preview-src-list="[
                          'data:image/png;base64,' + item.pic
                        ]"
                        v-if="item.pic"
                      >
                      </el-image>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>解决方案</span></el-col>
                    <el-col :span="21"
                      ><pre>{{ item.solution }}</pre></el-col
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="第三方SDK统计">
              <el-table :data="detailListItem.sdkList">
                <el-table-column
                  type="index"
                  label="序号"
                  width="80"
                ></el-table-column>
                <el-table-column
                  label="SDK名称"
                  prop="sdkName"
                  width="250"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  label="标识"
                  prop="sdkMark"
                  width="250"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  label="SDK类型"
                  prop="sdkType"
                  width="100"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column label="地址" prop="sdkLink"></el-table-column>
                <el-table-column label="描述" prop="sdkDesc"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="恶意应用评测">
              <!-- detailListItem.titleCode05.activeNames 默认展开项 -->
              <el-collapse>
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode05"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="
                    getRiskGradeColor(
                      item.result,
                      item.riskGroup,
                      '恶意应用评测'
                    )
                  "
                >
                  <el-row type="flex">
                    <el-col :span="1"> <span>评测目的</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>评测等级</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.riskGroup }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测过程</el-col>
                    <el-col :span="21"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测依据</el-col>
                    <el-col :span="21">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测描述</el-col>
                    <el-col :span="21">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row type="flex" class="evaluationResult">
                    <el-col :span="1">评测结果</el-col>
                    <el-col :span="21" style="margin-left:10px">
                      <pre> {{ item.resultDesc }}</pre>
                      <el-image
                        style="width:200px"
                        :src="'data:image/png;base64,' + item.pic"
                        :preview-src-list="[
                          'data:image/png;base64,' + item.pic
                        ]"
                        v-if="item.pic"
                      >
                      </el-image>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>解决方案</span></el-col>
                    <el-col :span="21"
                      ><pre>{{ item.solution }}</pre></el-col
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>

            <el-tab-pane label="应用代码安全评测">
              <!-- detailListItem.titleCode06.activeNames -->
              <el-collapse>
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode06"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="
                    getRiskGradeColor(
                      item.result,
                      item.riskGroup,
                      '应用代码安全评测'
                    )
                  "
                >
                  <el-row type="flex">
                    <el-col :span="1"> <span>评测目的</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>评测等级</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.riskGroup }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测过程</el-col>
                    <el-col :span="21"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测依据</el-col>
                    <el-col :span="21">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测描述</el-col>
                    <el-col :span="21">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row type="flex" class="evaluationResult">
                    <el-col :span="1">评测结果</el-col>
                    <el-col :span="21">
                      <pre>{{ item.resultDesc }}</pre>
                      <el-image
                        style="width:200px"
                        :src="'data:image/png;base64,' + item.pic"
                        :preview-src-list="[
                          'data:image/png;base64,' + item.pic
                        ]"
                        v-if="item.pic"
                      >
                      </el-image>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>解决方案</span></el-col>
                    <el-col :span="21"
                      ><pre v-html="item.solution">{{
                        item.solution
                      }}</pre></el-col
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="应用调试安全评测">
              <!-- detailListItem.titleCode07.activeNames -->
              <el-collapse>
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode07"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="
                    getRiskGradeColor(
                      item.result,
                      item.riskGroup,
                      '应用调试安全评测'
                    )
                  "
                >
                  <el-row type="flex">
                    <el-col :span="1"> <span>评测目的</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>评测等级</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.riskGroup }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测过程</el-col>
                    <el-col :span="21"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测依据</el-col>
                    <el-col :span="21">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测描述</el-col>
                    <el-col :span="21">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row type="flex" class="evaluationResult">
                    <el-col :span="1">评测结果</el-col>
                    <el-col :span="21" style="margin-left:10px">
                      <pre> {{ item.resultDesc }}</pre>
                      <el-image
                        style="width:200px"
                        :src="'data:image/png;base64,' + item.pic"
                        :preview-src-list="[
                          'data:image/png;base64,' + item.pic
                        ]"
                        v-if="item.pic"
                      >
                      </el-image>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>解决方案</span></el-col>
                    <el-col :span="21"
                      ><pre>{{ item.solution }}</pre></el-col
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="应用运行环境评测">
              <!-- detailListItem.titleCode08.activeNames -->
              <el-collapse>
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode08"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="
                    getRiskGradeColor(
                      item.result,
                      item.riskGroup,
                      '应用运行环境评测'
                    )
                  "
                >
                  <el-row type="flex">
                    <el-col :span="1"> <span>评测目的</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>评测等级</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.riskGroup }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测过程</el-col>
                    <el-col :span="21"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测依据</el-col>
                    <el-col :span="21">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测描述</el-col>
                    <el-col :span="21">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row type="flex" class="evaluationResult">
                    <el-col :span="1">评测结果</el-col>
                    <el-col :span="21" style="margin-left:10px">
                      <pre> {{ item.resultDesc }}</pre>
                      <el-image
                        style="width:200px"
                        :src="'data:image/png;base64,' + item.pic"
                        :preview-src-list="[
                          'data:image/png;base64,' + item.pic
                        ]"
                        v-if="item.pic"
                      >
                      </el-image>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>解决方案</span></el-col>
                    <el-col :span="21"
                      ><pre>{{ item.solution }}</pre></el-col
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="数据存储安全评测">
              <!-- detailListItem.titleCode09.activeNames -->
              <el-collapse>
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode09"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="
                    getRiskGradeColor(
                      item.result,
                      item.riskGroup,
                      '数据存储安全评测'
                    )
                  "
                >
                  <el-row type="flex">
                    <el-col :span="1"> <span>评测目的</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>评测等级</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.riskGroup }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测过程</el-col>
                    <el-col :span="21"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测依据</el-col>
                    <el-col :span="21">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测描述</el-col>
                    <el-col :span="21">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row type="flex" class="evaluationResult">
                    <el-col :span="1">评测结果</el-col>
                    <el-col :span="21" style="margin-left:10px">
                      <pre> {{ item.resultDesc }}</pre>
                      <el-image
                        style="width:200px"
                        :src="'data:image/png;base64,' + item.pic"
                        :preview-src-list="[
                          'data:image/png;base64,' + item.pic
                        ]"
                        v-if="item.pic"
                      >
                      </el-image>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>解决方案</span></el-col>
                    <el-col :span="21"
                      ><pre>{{ item.solution }}</pre></el-col
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="加密算法安全评测">
              <!-- detailListItem.titleCode10.activeNames" -->
              <el-collapse>
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode10"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="
                    getRiskGradeColor(
                      item.result,
                      item.riskGroup,
                      '加密算法安全评测'
                    )
                  "
                >
                  <el-row type="flex">
                    <el-col :span="1"> <span>评测目的</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>评测等级</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.riskGroup }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测过程</el-col>
                    <el-col :span="21"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测依据</el-col>
                    <el-col :span="21">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测描述</el-col>
                    <el-col :span="21">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row type="flex" class="evaluationResult">
                    <el-col :span="1">评测结果</el-col>
                    <el-col :span="21" style="margin-left:10px">
                      <pre> {{ item.resultDesc }}</pre>
                      <el-image
                        style="width:200px"
                        :src="'data:image/png;base64,' + item.pic"
                        :preview-src-list="[
                          'data:image/png;base64,' + item.pic
                        ]"
                        v-if="item.pic"
                      >
                      </el-image>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>解决方案</span></el-col>
                    <el-col :span="21"
                      ><pre>{{ item.solution }}</pre></el-col
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="应用组件安全评测">
              <!-- detailListItem.titleCode11.activeNames -->
              <el-collapse>
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode11"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="
                    getRiskGradeColor(
                      item.result,
                      item.riskGroup,
                      '应用组件安全评测'
                    )
                  "
                >
                  <el-row type="flex">
                    <el-col :span="1"> <span>评测目的</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>评测等级</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.riskGroup }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测过程</el-col>
                    <el-col :span="21"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测依据</el-col>
                    <el-col :span="21">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测描述</el-col>
                    <el-col :span="21">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row type="flex" class="evaluationResult">
                    <el-col :span="1">评测结果</el-col>
                    <el-col :span="21" style="margin-left:10px">
                      <pre> {{ item.resultDesc }}</pre>
                      <el-image
                        style="width:200px"
                        :src="'data:image/png;base64,' + item.pic"
                        :preview-src-list="[
                          'data:image/png;base64,' + item.pic
                        ]"
                        v-if="item.pic"
                      >
                      </el-image>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>解决方案</span></el-col>
                    <el-col :span="21"
                      ><pre>{{ item.solution }}</pre></el-col
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="WebView组件风险">
              <!-- detailListItem.titleCode12.activeNames -->
              <el-collapse>
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode12"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="
                    getRiskGradeColor(
                      item.result,
                      item.riskGroup,
                      'WebView组件风险'
                    )
                  "
                >
                  <el-row type="flex">
                    <el-col :span="1"> <span>评测目的</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>评测等级</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.riskGroup }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测过程</el-col>
                    <el-col :span="21"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测依据</el-col>
                    <el-col :span="21">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测描述</el-col>
                    <el-col :span="21">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row type="flex" class="evaluationResult">
                    <el-col :span="1">评测结果</el-col>
                    <el-col :span="21" style="margin-left:10px">
                      <pre> {{ item.resultDesc }}</pre>
                      <el-image
                        style="width:200px"
                        :src="'data:image/png;base64,' + item.pic"
                        :preview-src-list="[
                          'data:image/png;base64,' + item.pic
                        ]"
                        v-if="item.pic"
                      >
                      </el-image>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>解决方案</span></el-col>
                    <el-col :span="21"
                      ><pre>{{ item.solution }}</pre></el-col
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="数据输入安全评测">
              <!-- detailListItem.titleCode13.activeNames -->
              <el-collapse>
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode13"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="
                    getRiskGradeColor(
                      item.result,
                      item.riskGroup,
                      '数据输入安全评测'
                    )
                  "
                >
                  <el-row type="flex">
                    <el-col :span="1"> <span>评测目的</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>评测等级</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.riskGroup }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测过程</el-col>
                    <el-col :span="21"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测依据</el-col>
                    <el-col :span="21">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测描述</el-col>
                    <el-col :span="21">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row type="flex" class="evaluationResult">
                    <el-col :span="1">评测结果</el-col>
                    <el-col :span="21" style="margin-left:10px">
                      <pre> {{ item.resultDesc }}</pre>
                      <el-image
                        style="width:200px"
                        :src="'data:image/png;base64,' + item.pic"
                        :preview-src-list="[
                          'data:image/png;base64,' + item.pic
                        ]"
                        v-if="item.pic"
                      >
                      </el-image>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>解决方案</span></el-col>
                    <el-col :span="21"
                      ><pre>{{ item.solution }}</pre></el-col
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="数据输出安全评测">
              <!-- v-model="detailListItem.titleCode14.activeNames" -->
              <el-collapse>
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode14"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="
                    getRiskGradeColor(
                      item.result,
                      item.riskGroup,
                      '数据输出安全评测'
                    )
                  "
                >
                  <el-row type="flex">
                    <el-col :span="1"> <span>评测目的</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>评测等级</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.riskGroup }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测过程</el-col>
                    <el-col :span="21"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测依据</el-col>
                    <el-col :span="21">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测描述</el-col>
                    <el-col :span="21">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row type="flex" class="evaluationResult">
                    <el-col :span="1">评测结果</el-col>
                    <el-col :span="21" style="margin-left:10px">
                      <pre> {{ item.resultDesc }}</pre>
                      <el-image
                        style="width:200px"
                        :src="'data:image/png;base64,' + item.pic"
                        :preview-src-list="[
                          'data:image/png;base64,' + item.pic
                        ]"
                        v-if="item.pic"
                      >
                      </el-image>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>解决方案</span></el-col>
                    <el-col :span="21"
                      ><pre>{{ item.solution }}</pre></el-col
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="通讯传输安全评测">
              <!-- v-model="detailListItem.titleCode15.activeNames" -->
              <el-collapse>
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode15"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="
                    getRiskGradeColor(
                      item.result,
                      item.riskGroup,
                      '通讯传输安全评测'
                    )
                  "
                >
                  <el-row type="flex">
                    <el-col :span="1"> <span>评测目的</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>评测等级</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.riskGroup }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测过程</el-col>
                    <el-col :span="21"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测依据</el-col>
                    <el-col :span="21">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测描述</el-col>
                    <el-col :span="21">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row type="flex" class="evaluationResult">
                    <el-col :span="1">评测结果</el-col>
                    <el-col :span="21" style="margin-left:10px">
                      <pre> {{ item.resultDesc }}</pre>
                      <el-image
                        style="width:200px"
                        :src="'data:image/png;base64,' + item.pic"
                        :preview-src-list="[
                          'data:image/png;base64,' + item.pic
                        ]"
                        v-if="item.pic"
                      >
                      </el-image>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>解决方案</span></el-col>
                    <el-col :span="21"
                      ><pre>{{ item.solution }}</pre></el-col
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="安全漏洞评测">
              <!-- v-model="detailListItem.titleCode16.activeNames" -->
              <el-collapse>
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode16"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="
                    getRiskGradeColor(
                      item.result,
                      item.riskGroup,
                      '安全漏洞评测'
                    )
                  "
                >
                  <el-row type="flex">
                    <el-col :span="1"> <span>评测目的</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>评测等级</span></el-col>
                    <el-col :span="21"
                      ><span>{{ item.riskGroup }}</span></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测过程</el-col>
                    <el-col :span="21"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测依据</el-col>
                    <el-col :span="21">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1">评测描述</el-col>
                    <el-col :span="21">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row type="flex" class="evaluationResult">
                    <el-col :span="1">评测结果</el-col>
                    <el-col :span="21" style="margin-left:10px">
                      <pre> {{ item.resultDesc }}</pre>
                      <el-image
                        style="width:200px"
                        :src="'data:image/png;base64,' + item.pic"
                        :preview-src-list="[
                          'data:image/png;base64,' + item.pic
                        ]"
                        v-if="item.pic"
                      >
                      </el-image>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="1"><span>解决方案</span></el-col>
                    <el-col :span="21"
                      ><pre>{{ item.solution }}</pre></el-col
                    >
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import api from "../../request/api";
export default {
  name: "androidDetail",
  data() {
    return {
      listItem: null,
      detailListItem: null,
      searchForm: {
        detectorKeyword: "",
        status: "全部"
      },
      options: [
        { label: "全部", isCompliance: 0 },
        { label: "通过", isCompliance: 1 },
        { label: "未通过", isCompliance: 2 }
      ],
      detectorKeyword: "",
      detectorItemList: [],
      timeout: "",
      loading: false,
      permissionListTableData: []
    };
  },
  created() {
    this.getDetectorList(1);
  },
  mounted() {
    const id = this.$route.query.id,
      params = {
        taskId: id,
        terminalType: 1,
        isCompliance: 0,
        itemName: ""
      };
    api.detectorAndroidService.detailAndroidListById(id).then(res => {
      if (res.code == "00") {
        this.listItem = res.data;
      }
    });
    this.getDetailItem(params);
  },
  methods: {
    back() {
      this.$router.back();
    },
    querySearchAsync(queryString, cb) {
      const detectorItemList = this.detectorItemList,
        results = queryString
          ? detectorItemList.filter(this.createStateFilter(queryString))
          : detectorItemList;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return item => {
        return item.value.indexOf(queryString) !== -1;
      };
    },
    //得到检测项的所有数据
    getDetectorList(terminalType) {
      const detectorItemList = api.detectorStrategyService
        .getDetectionItemList(terminalType)
        .then(res => {
          if (res.code == "00") {
            const data = JSON.parse(
              JSON.stringify(res.data).replace(/name/g, "value")
            );
            this.detectorItemList = data;
          }
        });
    },
    //得到检测详细数据
    getDetailItem(params) {
      api.detectorAndroidService.detailItemAndroidListById(params).then(res => {
        if (res.code == "00") {
          this.detailListItem = res.data;
          let detailListItem = this.detailListItem;
          this.getPermissionList(detailListItem.permissionList);
          for (let key in detailListItem) {
            if (key.indexOf("titleCode") != -1) {
              detailListItem[key].activeNames = [];
              for (let i = 0; i < detailListItem[key].length; i++) {
                detailListItem[key].activeNames.push(i);
              }
            }
          }
        }
      });
    },
    //封装应用权限列表数据
    getPermissionList(list) {
      const data = [];
      if (list.dangerous) {
        data.push(...list.dangerous);
      }
      if (list.signature) {
        data.push(...list.signature);
      }
      if (list.deprecated) {
        data.push(...list.deprecated);
      }
      if (list.other) {
        data.push(...list.other);
      }
      if (list.normal) {
        data.push(...list.normal);
      }
      if (list.customer) {
        data.push(...list.customer);
      }
      this.permissionListTableData = data;
    },
    //得到风险等级
    getRiskGradeColor(result, riskGroup, name) {
      if (result == "安全") {
        return "none";
      } else {
        if (riskGroup == "高危") {
          return "dangerInfoItem";
        } else if (riskGroup == "中危") {
          return "mediumInfoItem";
        } else if (riskGroup == "低危") {
          return "lowInfoItem";
        } else {
          if ((name = "敏感行为评测")) {
            return "lowInfoItem";
          } else {
            return "none";
          }
        }
      }
    },
    search(searchForm) {
      this.loading = true;
      if (searchForm.status == "全部") {
        searchForm.status = 0;
      }
      const id = this.$route.query.id,
        params = {
          taskId: id,
          terminalType: 1,
          isCompliance: searchForm.status,
          itemName: searchForm.detectorKeyword
        };
      this.getDetailItem(params);
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
};
</script>
<style>
pre {
  display: inline-block;
  font-family: sans-serif;
  margin-right: 10px;
}
.el-button--primary:hover,
.el-button--primary {
  background: #517fc3;
  border-color: #517fc3;
}
.androidDetailHeader {
  line-height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.androidBody {
  margin-top: 15px;
}
.androidBody .el-icon-arrow-left,
.androidBody .el-icon-arrow-right {
  color: #517fc3;
  font-weight: 700;
  font-size: 18px;
}
.androidBody .el-tabs__nav-wrap.is-scrollable {
  padding: 0 40px;
}
.androidBody .el-tabs__nav-prev {
  left: 10px;
}
.androidBody .el-tabs__nav-next {
  right: 10px;
}
.androidBody .searchForm {
  display: flex;
}
.androidBody .searchForm .operateBox {
  margin-left: 15px;
}
.androidBody .el-input {
  width: auto;
  margin-right: 15px;
}
.androidBody .detectorResult {
  margin-top: 15px;
}
.androidBody .detectorResult .searchBox .el-form {
  display: flex;
  align-items: center;
}
.androidBody .evaluationResult .el-col:last-of-type {
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.applicationMessage {
  border: 1px solid #e3e5e5;
  background: #f9fafa;
  padding: 20px;
}
.applicationMessageHeader:after {
  content: "";
  display: block;
  clear: both;
}
.applicationMessageHeaderLeft {
  float: left;
}
.applicationMessageHeaderLeft .title {
  color: #353535;
  font-weight: 550;
}
.applicationMessageHeaderRight {
  float: right;
  font-size: 14px;
}
.applicationMessageHeaderRight > span {
  margin-right: 10px;
}

.applicationMessageBody {
  margin-top: 20px;
}
.applicationMessageBody .imgBox {
  display: inline-block;
  position: relative;
}
.applicationMessageBody .imgBox cite {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
}
.applicationMessageBody .imgBox img {
  width: 100px;
}
.applicationMessageBody .el-row {
  display: flex;
  align-items: center;
}
.applicationMessageBody .appInfoImg {
  width: 60px;
  height: 60px;
}
.applicationMessageBody .appBox {
  display: inline-block;
}
.applicationMessage .el-col {
  text-align: center;
}
.applicationMessageBody .el-col p:first-of-type {
  margin-top: 15px;
}
.applicationMessageBody p {
  font-size: 13px;
  margin-bottom: 5px;
}
.detectorMessage {
  margin-top: 15px;
}
.detectorMessage .el-col {
  padding: 10px 0;
  color: #606266;
  font-size: 14px;
  line-height: 20px;
}
.detectorMessage .el-collapse-item__content,
.detectorMessage .detectorMessage .el-tabs__content {
  font-family: 微软雅黑;
  padding-bottom: 0px;
}
.detectorMessage .el-collapse-item__content .el-row .el-col:first-of-type {
  display: flex;
  align-items: center;
  font-weight: bolder;
  color: rgb(0, 0, 0);
  font-size: 12px;
  border-right: 1px solid rgb(220, 222, 226);
}
.detectorMessage .el-collapse-item__content .el-row .el-col:last-of-type {
  margin-left: 15px;
  font-size: 12px;
  color: #525252;
}
.detectorMessage .el-tabs__content .el-row .el-col:first-of-type {
  display: flex;
  align-items: center;
  font-weight: bolder;
  color: rgb(0, 0, 0);
  font-size: 12px;
  border-right: 1px solid rgb(220, 222, 226);
  margin-left: 20px;
}
.detectorMessage .el-tabs__content .el-row .el-col:last-of-type {
  margin-left: 15px;
  font-size: 12px;
  color: #525252;
}
.detectorMessage .el-tabs--border-card > .el-tabs__content .appInfo {
  border: 1px solid rgb(220, 222, 226);
}

.detectorMessage .el-row:not(:last-child) {
  border-bottom: 1px solid rgb(230, 230, 230);
}

.androidBody .el-collapse-item__header {
  font-size: 17px;
  background: #f2f5f7;
  font-size: 12px;
  padding-left: 10px;
}
.androidBody .dangerInfoItem .el-collapse-item__header {
  background: #fbc6c6;
}
.androidBody .mediumInfoItem .el-collapse-item__header {
  background: rgb(237, 125, 49);
}
.androidBody .lowInfoItem .el-collapse-item__header {
  background: rgb(255, 188, 147);
}
.androidBody .none .el-collapse-item__header {
  background: rgb(0, 212, 235);
}
.androidBody .el-collapse-item__wrap {
  border: 1px solid rgb(230, 230, 230);
}
</style>

