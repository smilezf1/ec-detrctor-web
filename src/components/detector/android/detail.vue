/*
<template>
  <div class="androidDetail">
    <div class="androidDetailHeader">
      <p>当前位置:Android检测详细</p>
    </div>
    <div class="operateBox">
      <el-button type="primary" size="small" class="back" @click="back()"
        >返回</el-button
      >
      <!--   <el-button
        type="primary"
        size="small"
        class="downloadReport"
        @click="downloadReport()"
        icon="el-icon-download"
        >下载报告</el-button
      > -->
    </div>
    <div class="androidBody">
      <!-- 应用信息 -->
      <template v-if="listItem">
        <div class="applicationMessage">
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
                  <cite style="color:#00d4eb">
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

        <div class="detectorMessage">
          <el-tabs type="border-card" v-if="detailListItem">
            <!-- 基本信息 -->
            <el-tab-pane label="基本信息">
              <el-row>
                <!-- #606266 -->
                <el-col :span="12"
                  >应用名称:&nbsp;&nbsp;&nbsp;&nbsp;{{
                    listItem.appInfo.appName
                  }}</el-col
                >
                <el-col :span="12"
                  >包名:&nbsp;&nbsp;&nbsp;&nbsp;{{
                    listItem.appInfo.appPackage
                  }}</el-col
                >
              </el-row>
              <el-row>
                <el-col :span="12"
                  >版本信息:&nbsp;&nbsp;&nbsp;&nbsp;{{
                    listItem.appInfo.appVersion
                  }}</el-col
                >
                <el-col :span="12"
                  >文件大小:&nbsp;&nbsp;&nbsp;&nbsp;
                  {{ listItem.appInfo.appMbyte }}MB</el-col
                >
              </el-row>
              <el-row>
                <el-col :span="12"
                  >文件MD5:&nbsp;&nbsp;&nbsp;&nbsp;{{
                    listItem.appInfo.md5
                  }}</el-col
                >
                <el-col :span="12"
                  >加固厂商:&nbsp;&nbsp;&nbsp;&nbsp;{{
                    listItem.appInfo.dealer
                  }}</el-col
                >
              </el-row>
              <el-row style="display:flex;align-items:center">
                <el-col :span="1.5">签名信息:&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
                <el-col :span="20.5">
                  <pre>{{ listItem.appInfo.signature }}</pre>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="应用权限列表">
              <el-table :data="detailListItem.permissionList">
                <el-table-column
                  type="index"
                  label="序号"
                  width="80"
                ></el-table-column>
                <el-table-column
                  prop="permissionDesc"
                  label="权限描述"
                ></el-table-column>
                <el-table-column
                  prop="permissionName"
                  label="权限名称"
                ></el-table-column>
                <el-table-column
                  prop="sensitiveLevel"
                  label="敏感等级"
                ></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="敏感行为评测">
              <el-table :data="detailListItem.sensitiveList">
                <el-table-column type="index" label="序号" width="80">
                </el-table-column>
                <el-table-column
                  prop="sensitiveItem"
                  label="敏感行为项"
                ></el-table-column>
                <el-table-column
                  prop="sensitiveDesc"
                  label="	
行为描述"
                ></el-table-column>
                <el-table-column
                  prop="sensitiveResult"
                  label="	
评测结果"
                ></el-table-column>
              </el-table>
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
                ></el-table-column>
                <el-table-column label="标识" prop="sdkMark"></el-table-column>
                <el-table-column label="行为" prop="sdkDesc"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="恶意应用评测">
              <el-collapse v-model="detailListItem.titleCode05.activeNames">
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode05"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="getClass(item.riskGroup)"
                >
                  <el-row>
                    <!--  <el-col :span="2"> <b>评测目的</b></el-col>
                    <el-col :span="20"
                      ><span>{{ item.detectionPurpose }}</span></el-col
                    > -->
                    <el-col
                      >评测目的:&nbsp;&nbsp;{{ item.detectionPurpose }}</el-col
                    ></el-row
                  >
                  <el-row
                    ><el-col
                      >评测等级:&nbsp;&nbsp;{{ item.riskGroup }}</el-col
                    ></el-row
                  >
                  <el-row>
                    <el-col :span="1.5">评测过程:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测依据:</el-col>
                    <el-col :span="20.5">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="1">评测描述:</el-col>
                    <el-col :span="20">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测结果: </el-col>
                    <el-col :span="20.5" style="margin-left:10px">
                      <pre> {{ item.resultDesc }}</pre>
                    </el-col>
                  </el-row>
                  <el-row
                    ><el-col>解决方案:{{ item.solution }}</el-col></el-row
                  >
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="应用代码安全评测 ">
              <el-collapse v-model="detailListItem.titleCode06.activeNames">
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode06"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="getClass(item.riskGroup)"
                >
                  <!-- <el-table>
                    <el-table-column :label="col">评测目的</el-table-column>
                  </el-table> -->
                  <!--  <el-row>
                    <el-col
                      >评测目的:&nbsp;&nbsp;{{ item.detectionPurpose }}</el-col
                    ></el-row
                  >
                  <el-row>
                    <el-col
                      >评测等级:&nbsp;&nbsp;{{ item.riskGroup }}</el-col
                    ></el-row
                  >
                  <el-row>
                    <el-col :span="1.5">评测过程:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测依据:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.riskReason }}</pre></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="1">评测描述:</el-col>
                    <el-col :span="20">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测结果:</el-col>
                    <el-col :span="20.5" style="margin-left:10px">
                      <pre>{{ item.resultDesc }}</pre>
                    </el-col>
                  </el-row>
                  <el-col>解决方案:{{ item.solution }}</el-col> -->
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="应用调试安全评测">
              <el-collapse v-model="detailListItem.titleCode07.activeNames">
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode07"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="getClass(item.riskGroup)"
                >
                  <el-col
                    >评测目的:&nbsp;&nbsp;{{ item.detectionPurpose }}</el-col
                  >
                  <el-row
                    ><el-col
                      >评测等级:&nbsp;&nbsp;{{ item.riskGroup }}</el-col
                    ></el-row
                  >
                  <el-row>
                    <el-col :span="1.5">评测过程:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测依据:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.riskReason }}</pre></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="1">评测描述:</el-col>
                    <el-col :span="20">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测结果:</el-col>
                    <el-col :span="20.5" style="margin-left:10px">
                      <pre>{{ item.resultDesc }}</pre>
                    </el-col>
                  </el-row>
                  <el-row
                    ><el-col>解决方案:{{ item.solution }}</el-col></el-row
                  >
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="应用运行环境评测">
              <el-collapse v-model="detailListItem.titleCode08.activeNames">
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode08"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="getClass(item.riskGroup)"
                >
                  <el-row
                    ><el-col
                      >评测目的:&nbsp;&nbsp;{{ item.detectionPurpose }}</el-col
                    ></el-row
                  >
                  <el-row
                    ><el-col
                      >评测等级:&nbsp;&nbsp;{{ item.riskGroup }}</el-col
                    ></el-row
                  >
                  <el-row>
                    <el-col :span="1.5">评测过程:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测依据:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.riskReason }}</pre></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="1">评测描述:</el-col>
                    <el-col :span="20">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="1.5">评测结果:</el-col>
                    <el-col :span="20.5" style="margin-left:10px">
                      <pre>{{ item.resultDesc }}</pre>
                    </el-col>
                  </el-row>
                  <el-row
                    ><el-col>解决方案:{{ item.solution }}</el-col></el-row
                  >
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="数据存储安全评测">
              <el-collapse v-model="detailListItem.titleCode09.activeNames">
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode09"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="getClass(item.riskGroup)"
                >
                  <el-row
                    ><el-col
                      >评测目的:&nbsp;&nbsp;{{ item.detectionPurpose }}</el-col
                    ></el-row
                  >
                  <el-row
                    ><el-col
                      >评测等级:&nbsp;&nbsp;{{ item.riskGroup }}</el-col
                    ></el-row
                  >
                  <el-row>
                    <el-col :span="1.5">评测过程:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测依据:</el-col>
                    <el-col :span="20.5">
                      <pre>{{ item.riskReason }}</pre>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="1">评测描述:</el-col>
                    <el-col :span="20">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测结果:</el-col>
                    <el-col :span="20.5" style="margin-left:10px">
                      <pre>{{ item.resultDesc }}</pre>
                    </el-col>
                  </el-row>
                  <el-row
                    ><el-col>解决方案:{{ item.solution }}</el-col></el-row
                  >
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="加密算法安全评测">
              <el-collapse v-model="detailListItem.titleCode10.activeNames">
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode10"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="getClass(item.riskGroup)"
                >
                  <el-row
                    ><el-col
                      >评测目的:&nbsp;&nbsp;{{ item.detectionPurpose }}</el-col
                    ></el-row
                  >
                  <el-row
                    ><el-col
                      >评测等级:&nbsp;&nbsp;{{ item.riskGroup }}</el-col
                    ></el-row
                  >
                  <el-row>
                    <el-col :span="1.5">评测过程:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测依据:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.riskReason }}</pre></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="1">评测描述:</el-col>
                    <el-col :span="20">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测结果:</el-col>
                    <el-col :span="20.5" style="margin-left:10px">
                      <pre>{{ item.resultDesc }}</pre>
                    </el-col>
                  </el-row>
                  <el-row
                    ><el-col>解决方案:{{ item.solution }}</el-col></el-row
                  >
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="应用组件安全评测">
              <el-collapse v-model="detailListItem.titleCode11.activeNames">
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode11"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="getClass(item.riskGroup)"
                >
                  <el-row
                    ><el-col
                      >评测目的:&nbsp;&nbsp;{{ item.detectionPurpose }}</el-col
                    ></el-row
                  >
                  <el-row
                    ><el-col
                      >评测等级:&nbsp;&nbsp;{{ item.riskGroup }}</el-col
                    ></el-row
                  >
                  <el-row>
                    <el-col :span="1.5">评测过程:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测依据:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.riskReason }}</pre></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="1">评测描述:</el-col>
                    <el-col :span="20">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测结果:</el-col>
                    <el-col :span="20.5" style="margin-left:10px">
                      <pre>{{ item.resultDesc }}</pre>
                    </el-col>
                  </el-row>
                  <el-row
                    ><el-col>解决方案:{{ item.solution }}</el-col></el-row
                  >
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="WebView组件风险">
              <el-collapse v-model="detailListItem.titleCode12.activeNames">
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode12"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="getClass(item.riskGroup)"
                >
                  <el-row
                    ><el-col
                      >评测目的:&nbsp;&nbsp;{{ item.detectionPurpose }}</el-col
                    ></el-row
                  >
                  <el-row
                    ><el-col
                      >评测等级:&nbsp;&nbsp;{{ item.riskGroup }}</el-col
                    ></el-row
                  >
                  <el-row>
                    <el-col :span="1.5">评测过程:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测依据:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.riskReason }}</pre></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="1">评测描述:</el-col>
                    <el-col :span="20">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测结果:</el-col>
                    <el-col :span="20.5" style="margin-left:10px">
                      <pre>{{ item.resultDesc }}</pre>
                    </el-col>
                  </el-row>
                  <el-row
                    ><el-col>解决方案:{{ item.solution }}</el-col></el-row
                  >
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="数据输入安全评测">
              <el-collapse v-model="detailListItem.titleCode13.activeNames">
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode13"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="getClass(item.riskGroup)"
                >
                  <el-row
                    ><el-col
                      >评测目的:&nbsp;&nbsp;{{ item.detectionPurpose }}</el-col
                    ></el-row
                  >
                  <el-row
                    ><el-col
                      >评测等级:&nbsp;&nbsp;{{ item.riskGroup }}</el-col
                    ></el-row
                  >
                  <el-row>
                    <el-col :span="1.5">评测过程:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测依据:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.riskReason }}</pre></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="1">评测描述:</el-col>
                    <el-col :span="20">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测结果:</el-col>
                    <el-col :span="20.5" style="margin-left:10px">
                      <pre>{{ item.resultDesc }}</pre>
                    </el-col>
                  </el-row>
                  <el-row
                    ><el-col>解决方案:{{ item.solution }}</el-col></el-row
                  >
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="数据输出安全评测">
              <el-collapse v-model="detailListItem.titleCode14.activeNames">
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode14"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="getClass(item.riskGroup)"
                >
                  <el-row
                    ><el-col
                      >评测目的:&nbsp;&nbsp;{{ item.detectionPurpose }}</el-col
                    ></el-row
                  >
                  <el-row
                    ><el-col
                      >评测等级:&nbsp;&nbsp;{{ item.riskGroup }}</el-col
                    ></el-row
                  >
                  <el-row>
                    <el-col :span="1.5">评测过程:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测依据:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.riskReason }}</pre></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="1">评测描述:</el-col>
                    <el-col :span="20">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测结果:</el-col>
                    <el-col :span="20.5" style="margin-left:10px">
                      <pre>{{ item.resultDesc }}</pre>
                    </el-col>
                  </el-row>
                  <el-row
                    ><el-col>解决方案:{{ item.solution }}</el-col></el-row
                  >
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="通讯传输安全评测">
              <el-collapse v-model="detailListItem.titleCode15.activeNames">
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode15"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="getClass(item.riskGroup)"
                >
                  <el-row
                    ><el-col
                      >评测目的:&nbsp;&nbsp;{{ item.detectionPurpose }}</el-col
                    ></el-row
                  >
                  <el-row
                    ><el-col
                      >评测等级:&nbsp;&nbsp;{{ item.riskGroup }}</el-col
                    ></el-row
                  >
                  <el-row>
                    <el-col :span="1.5">评测过程:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.detectionDetail }}</pre></el-col
                    >
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测依据:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.riskReason }}</pre></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="1">评测描述:</el-col>
                    <el-col :span="20">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测结果:</el-col>
                    <el-col :span="20.5" style="margin-left:10px">
                      <pre>{{ item.resultDesc }}</pre>
                    </el-col>
                  </el-row>
                  <el-row
                    ><el-col>解决方案:{{ item.solution }}</el-col></el-row
                  >
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="安全漏洞评测">
              <el-collapse v-model="detailListItem.titleCode16.activeNames">
                <el-collapse-item
                  v-for="(item, index) in detailListItem.titleCode16"
                  :key="item.id"
                  :title="item.name"
                  :name="index"
                  :class="getClass(item.riskGroup)"
                >
                  <el-row
                    ><el-col
                      >评测目的:&nbsp;&nbsp;{{ item.detectionPurpose }}</el-col
                    ></el-row
                  >
                  <el-row
                    ><el-col
                      >评测等级:&nbsp;&nbsp;{{ item.riskGroup }}</el-col
                    ></el-row
                  >
                  <el-row>
                    <el-col :span="1.5">评测过程:</el-col>
                    <el-col :span="20.5">
                      <pre>{{ item.detectionDetail }}</pre>
                    </el-col>
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测依据:</el-col>
                    <el-col :span="20.5"
                      ><pre>{{ item.riskReason }}</pre></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="1">评测描述:</el-col>
                    <el-col :span="20">{{ item.riskDesc }}</el-col>
                  </el-row>
                  <el-row style="display:flex;align-items:center">
                    <el-col :span="1.5">评测结果:</el-col>
                    <el-col :span="20.5" style="margin-left:10px">
                      <pre>{{ item.resultDesc }}</pre>
                    </el-col>
                  </el-row>
                  <el-row
                    ><el-col>解决方案:{{ item.solution }}</el-col></el-row
                  >
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
      detailListItem: null
    };
  },
  mounted() {
    const id = this.$route.query.id;
    api.androidService.detailAndroidListById(id).then(res => {
      if (res.code == "00") {
        this.listItem = res.data;
      }
    });
    api.androidService.detailItemAndroidListById(id, 1).then(res => {
      if (res.code == "00") {
        this.detailListItem = res.data;
        let detailListItem = this.detailListItem;
        for (let key in detailListItem) {
          if (key.indexOf("titleCode") != -1) {
            detailListItem[key].activeNames = [];
            for (let i = 0; i < detailListItem[key].length; i++) {
              detailListItem[key].activeNames.push(i);
            }
          }
        }
        console.log(this.detailListItem);
      }
    });
  },
  methods: {
    back() {
      this.$router.back();
    },
    //得到风险等级
    getClass(riskGroup) {
      if (riskGroup == "高危") {
        return "dangerInfoItem";
      } else if (riskGroup == "中危") {
        return "mediumInfoItem";
      } else if (riskGroup == "低危") {
        return "lowInfoItem";
      } else {
        return "na";
      }
    }
    /*  downloadReport() {
      const id = this.$route.query.id;
      console.log("下载报告");
    } */
  }
};
</script>
<style>
pre {
  font-family: sans-serif;
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
.applicationMessageBody .el-row {
  display: flex;
  align-items: center;
}
.applicationMessageBody .appInfoImg {
  width: 112px;
  height: 112px;
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
  padding: 20px 0;
  color: #606266;
  font-size: 14px;
  line-height: 20px;
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
.androidBody .na .el-collapse-item__header {
  background: rgb(0, 212, 235);
}
.el-table {
  font-size: 12px;
  border: 1px solid #dcdee2;
  border-bottom: 1px solid transparent;
}
.el-table thead {
  color: #515a6e !important;
  font-weight: 700;
}
.el-table__header-wrapper {
  background: #f8f8f9;
}
.el-table__header-wrapper th {
  background: #f2f5f7;
}
.el-table ::before {
  background: white;
}
</style>
*/
