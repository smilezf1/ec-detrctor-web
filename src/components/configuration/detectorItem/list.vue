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
              @click="search(ruleForm)"
              class="searchButton"
              >查询</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="refresh()"
              style="margin-left:10px"
              class="refreshButton"
              >刷新</el-button
            >
          </div>
        </div>
        <el-tabs @tab-click="handleClick">
          <el-tab-pane label="Android">
            <el-table ref="listItem" :data="listItem">
              <el-table-column type="index" label="序号" width="60">
                <template slot-scope="scope">
                  <span>{{ (curPage - 1) * limit + scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                width="250"
                prop="name"
                label="检测项名称"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                width="180"
                prop="riskGroup"
                label="风险等级"
              ></el-table-column>
              <el-table-column
                width="200"
                prop="itemTypeName"
                label="检测项分类"
              ></el-table-column>
              <el-table-column
                width="800"
                prop="riskDesc"
                label="检测项描述"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="dark"
                    content="详情"
                    placement="top-start"
                  >
                    <i
                      class="el-icon-tickets detailIcon"
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
                    ></i>
                  </el-tooltip>

                  <el-drawer
                    title="检测项详情"
                    :visible.sync="detailDetectorAndroidItemDrawer"
                    :with-header="false"
                    :wrapperClosable="false"
                    :close-on-press-esape="false"
                    :destroy-on-close="true"
                    size="40%"
                  >
                    <div class="el-drawer-header">
                      <h3>检测项详情</h3>
                    </div>
                    <div class="el-drawer-content">
                      <template v-if="detailItem">
                        <el-form>
                          <el-form-item>
                            <label slot="label"
                              >检测项名称:&nbsp;&nbsp;{{
                                detailItem.name
                              }}</label
                            >
                          </el-form-item>
                          <el-form-item>
                            <label slot="label"
                              >风险等级:&nbsp;&nbsp;{{
                                detailItem.riskGroup
                              }}</label
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
                              >检测项描述:&nbsp;&nbsp;{{
                                detailItem.riskDesc
                              }}</label
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
                </template>
              </el-table-column>
            </el-table>
            <div class="detectorItemBase">
              <pagination @pageChanged="onPageChanged"></pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="iOS">
            <el-table ref="listItem" :data="listItem">
              <el-table-column type="index" label="序号" width="60">
                <template slot-scope="scope">
                  <span>{{ (curPage - 1) * limit + scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                width="250"
                prop="name"
                label="检测项名称"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                width="180"
                prop="riskGroup"
                label="风险等级"
              ></el-table-column>
              <el-table-column
                width="200"
                prop="itemTypeName"
                label="检测项分类"
              ></el-table-column>
              <el-table-column
                width="800"
                prop="riskDesc"
                label="检测项描述"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="dark"
                    content="详情"
                    placement="top-start"
                  >
                    <i
                      class="el-icon-tickets detailIcon"
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
                    ></i>
                  </el-tooltip>
                  <el-drawer
                    title="检测项详情"
                    :visible.sync="detailDetectorIosItemDrawer"
                    :with-header="false"
                    size="40%"
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
                              >检测项名称:&nbsp;&nbsp;{{
                                detailItem.name
                              }}</label
                            >
                          </el-form-item>
                          <el-form-item>
                            <label slot="label"
                              >风险等级:&nbsp;&nbsp;{{
                                detailItem.riskGroup
                              }}</label
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
                              >检测项描述:&nbsp;&nbsp;{{
                                detailItem.riskDesc
                              }}</label
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
                </template>
              </el-table-column>
            </el-table>
            <div class="detectorItemBase">
              <pagination @pageChanged="onPageChanged"></pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
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
  beforeMount() {
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
    search(ruleForm) {
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
  },
  mounted() {
    api.detectorItemService.findDetectionItemList;
  }
};
</script>
<style>
:focus {
  outline: 0;
}
.el-tooltip__popper {
  max-width: 400px;
  text-align: justify;
  line-height: 20px;
}
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
.refreshButton,
.searchButton {
  background: #517fc3;
  border-color: #517fc3;
}
.detailIcon {
  font-size: 22px;
  color: #517fc3;
  margin-right: 10px;
  cursor: pointer;
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
.el-pager li.active {
  color: #517fc3;
}
</style>
