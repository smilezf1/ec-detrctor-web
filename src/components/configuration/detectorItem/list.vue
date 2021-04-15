<template>
  <div class="detectorItem">
    <div class="detectorItemHeader">
      <p>当前位置:检测项配置</p>
    </div>
    <div class="detectorItemBody">
      <template>
        <div class="searchForm">
          <div class="searchBox">
            <el-form :model="ruleForm">
              <el-input
                size="small"
                placeholder="请输入检测项名称"
                v-model="ruleForm.name"
              ></el-input>
            </el-form>
          </div>
          <div class="operateBox">
            <el-button
              type="primary"
              size="small"
              @click="search()"
              class="searchButton"
              >查询</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="refresh()"
              class="refreshButton"
              >刷新</el-button
            >
          </div>
        </div>
        <el-tabs @tab-click="handleClick">
          <el-tab-pane label="Android">
            <el-table ref="listItem" :data="listItem">
              <el-table-column type="index" label="序号" min-width="10%">
                <template slot-scope="scope">
                  <span>{{ (curPage - 1) * limit + scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="20%"
                prop="name"
                label="检测项名称"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                min-width="15%"
                prop="riskGroup"
                label="风险等级"
              ></el-table-column>
              <el-table-column
                min-width="20%"
                prop="itemTypeName"
                label="检测项分类"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                min-width="60%"
                prop="riskDesc"
                label="检测项描述"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column label="操作" min-width="20%">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="primary"
                    @click="
                      detailDetectorItem(
                        scope.row.id,
                        scope.row.name,
                        scope.row.riskGroup,
                        scope.row.itemTypeName,
                        scope.row.riskDesc,
                        'Android'
                      )
                    "
                    >详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 检测项详情drawer开始 android-->
            <el-drawer
              title="检测项详情"
              :visible.sync="detailDetectorAndroidItemDrawer"
              :with-header="false"
              :wrapperClosable="false"
              :close-on-press-esape="false"
              :destroy-on-close="true"
              size="30%"
            >
              <div class="el-drawer-header">
                <h3>检测项详情</h3>
              </div>
              <div class="el-drawer-content">
                <template v-if="detailItem">
                  <el-form>
                    <el-form-item>
                      <label slot="label"
                        >检测项名称:&nbsp;&nbsp;{{ detailItem.name }}</label
                      >
                    </el-form-item>
                    <el-form-item>
                      <label slot="label"
                        >风险等级:&nbsp;&nbsp;{{ detailItem.riskGroup }}</label
                      >
                    </el-form-item>
                    <el-form-item>
                      <label slot="label"
                        >适用系统:&nbsp;&nbsp;{{ detailItem.type }}</label
                      >
                    </el-form-item>
                    <el-form-item
                      ><label slot="label"
                        >检测项分类:&nbsp;&nbsp;{{
                          detailItem.itemTypeName
                        }}</label
                      ></el-form-item
                    >
                    <el-form-item>
                      <label slot="label"
                        >检测项描述:&nbsp;&nbsp;{{ detailItem.riskDesc }}</label
                      >
                    </el-form-item>
                  </el-form>
                </template>
              </div>
              <div class="el-drawer-footer">
                <div class="buttonBox" style="display:inline-block">
                  <el-button @click="cancel()" plain>取消</el-button>
                </div>
              </div>
            </el-drawer>
            <!-- 检测项详情drawrandroid结束 -->

            <div class="detectorItemBase">
              <pagination @pageChanged="onPageChanged"></pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="iOS">
            <el-table ref="listItem" :data="listItem">
              <el-table-column type="index" label="序号" min-width="10%">
                <template slot-scope="scope">
                  <span>{{ (curPage - 1) * limit + scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="20%"
                prop="name"
                label="检测项名称"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                min-width="15%"
                prop="riskGroup"
                label="风险等级"
              ></el-table-column>
              <el-table-column
                min-width="20%"
                prop="itemTypeName"
                label="检测项分类"
              ></el-table-column>
              <el-table-column
                min-width="60%"
                prop="riskDesc"
                label="检测项描述"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column label="操作" min-width="20%">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="
                      detailDetectorItem(
                        scope.row.id,
                        scope.row.name,
                        scope.row.riskGroup,
                        scope.row.itemTypeName,
                        scope.row.riskDesc,
                        'iOS'
                      )
                    "
                    >详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="detectorItemBase">
              <pagination @pageChanged="onPageChanged"></pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
        <!-- 检测项详情drawer ios -->
        <el-drawer
          title="检测项详情"
          :visible.sync="detailDetectorIosItemDrawer"
          :with-header="false"
          size="30%"
          :direction="direction"
          :show-close="false"
        >
          <div class="el-drawer-header">
            <h3>检测项详情</h3>
          </div>
          <div class="el-drawer-content">
            <template v-if="detailItem">
              <el-form>
                <el-form-item>
                  <label slot="label"
                    >检测项名称:&nbsp;&nbsp;{{ detailItem.name }}</label
                  >
                </el-form-item>
                <el-form-item>
                  <label slot="label"
                    >风险等级:&nbsp;&nbsp;{{ detailItem.riskGroup }}</label
                  >
                </el-form-item>
                <el-form-item>
                  <label slot="label"
                    >适用系统:&nbsp;&nbsp;{{ detailItem.type }}</label
                  >
                </el-form-item>
                <el-form-item
                  ><label slot="label"
                    >检测项分类:&nbsp;&nbsp;{{ detailItem.itemTypeName }}</label
                  ></el-form-item
                >
                <el-form-item>
                  <label slot="label"
                    >检测项描述:&nbsp;&nbsp;{{ detailItem.riskDesc }}</label
                  >
                </el-form-item>
              </el-form>
            </template>
          </div>
          <div class="el-drawer-footer">
            <div class="buttonBox" style="display:inline-block">
              <el-button @click="cancel()" plain>取消</el-button>
            </div>
          </div>
        </el-drawer>
        <!-- 检测项详情drawer结束ios -->
      </template>
    </div>
  </div>
</template>
<script>
import api from "../../request/api";
import pagination from "../../common/pagination";
import pageMixins from "../../../utils/pageMixins";
export default {
  name: "detectorItem",
  components: { pagination },
  mixins: [pageMixins],
  inject: ["reload"],
  data() {
    return {
      direction: "rtl",
      listItem: [],
      iosListItem: [],
      detailDetectorAndroidItemDrawer: false,
      detailDetectorIosItemDrawer: false,
      curPage: 1,
      limit: 10,
      iosCurPage: 1,
      iosLimit: 10,
      terminalType: 1,
      detailItem: null,
      ruleForm: {
        name: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const params = {};
      params.queryInfo = this.ruleForm;
      params.queryInfo.terminalType = this.terminalType;
      this.getDataItem(this.addPageInfo(params));
    },
    getDataItem(params) {
      api.detectorItemService.findDetectionItemList(params).then(res => {
        if (res.code == "00") {
          const count = res.data.count,
            { pn: number, limit: size, queryInfo } = params;
          this.listItem = res.data.items;
          this.curPage = number;
          this.limit = size;
          this.onGotPageData({
            totalElements: count,
            size,
            number,
            queryInfo
          });
        }
      });
    },
    handleClick(tab) {
      if (tab.label == "Android") {
        this.terminalType = 1;
        this.onPageChanged({ curPage: 1, pageSize: 10 });
      } else {
        this.terminalType = 2;
        this.onPageChanged({ curPage: 1, pageSize: 10 });
      }
      this.getData(tab.label);
    },
    //查询
    search() {
      this.getData();
    },
    //刷新
    refresh() {
      this.reload();
    },
    //检测项详情
    detailDetectorItem(id, name, riskGroup, itemTypeName, riskDesc, type) {
      const item = { id, name, riskGroup, itemTypeName, riskDesc, type };
      this.detailItem = item;
      if (this.terminalType == 1) {
        this.detailDetectorAndroidItemDrawer = true;
      } else {
        this.detailDetectorIosItemDrawer = true;
      }
    },
    cancel() {
      if (this.terminalType == 1) {
        this.detailDetectorAndroidItemDrawer = false;
      } else {
        this.detailDetectorIosItemDrawer = false;
      }
    }
  }
};
</script>
<style>
.detectorItemHeader {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.detectorItem .el-form-item__label {
  text-align: left;
}
.detectorItem .searchForm {
  display: flex;
}
.detectorItem .operateBox {
  margin-left: 15px;
}
.detectorItem .el-drawer-footer {
  width: 30%;
}
.searchBox .el-input {
  width: auto;
}
.detectorItemBase {
  margin-top: 15px;
}
.el-popup-parent--hidden > .el-tooltip {
  background: red;
  font-size: 12px;
  max-width: 400px;
}
</style>
