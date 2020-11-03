<template>
  <div class="detectorStrategy">
    <div class="detectorStrategyHeader">
      <p>当前位置:检测策略配置</p>
    </div>
    <div class="searchForm">
      <div class="searchBox">
        <el-form :model="ruleForm" ref="ruleForm">
          <el-input
            size="small"
            placeholder="请输入策略名称"
            v-model="ruleForm.strategyName"
          ></el-input>
          <el-input
            size="small"
            placeholder="请输入创建者"
            v-model="ruleForm.userName"
          ></el-input>
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
          >新增检测策略</el-button
        >
        <!-- 新增检测策略 -->
        <el-drawer
          title="新增检测策略"
          :visible.sync="addTaskDrawer"
          :with-header="false"
          :wrapperClosable="false"
          :close-on-press-esape="false"
          :destroy-on-close="true"
          size="40%"
          class="addTaskDrawer"
        >
          <div class="el-drawer-header">
            <h3>新增检测策略</h3>
          </div>
          <div class="el-drawer-content">
            <el-form
              :model="detectorStrategyForm"
              :rules="rules"
              ref="detectorStrategyForm"
            >
              <el-form-item prop="strategyName">
                <label slot="label">检测策略名称:</label>
                <el-input
                  style="width:70%"
                  size="small"
                  v-model="detectorStrategyForm.strategyName"
                ></el-input>
              </el-form-item>
              <el-form-item prop="strategyIsDynamic" v-if="terminalType == 1">
                <label slot="label">是否动态检测:</label>
                <el-select
                  placeholder="是否动态检测"
                  size="small"
                  style="width:70%"
                  v-model="detectorStrategyForm.strategyIsDynamic"
                  :popper-append-to-body="false"
                >
                  <el-option :value="1" key="1" label="是">是</el-option>
                  <el-option :value="0" key="0" label="否">否</el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="strategyIsShelling" v-if="terminalType == 1">
                <label slot="label"
                  >是&nbsp;&nbsp;否&nbsp;&nbsp;脱&nbsp;&nbsp;壳:</label
                >
                <el-select
                  placeholder="是否脱壳"
                  size="small"
                  style="width:70%"
                  v-model="detectorStrategyForm.strategyIsShelling"
                  :popper-append-to-body="false"
                >
                  <el-option :value="1" key="1" label="是">是</el-option>
                  <el-option :value="0" key="0" label="否">否</el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <label slot="label"
                  >&nbsp;&nbsp;适&nbsp;&nbsp;用&nbsp;&nbsp;系&nbsp;&nbsp;统:</label
                >
                <el-radio-group
                  v-model="detectorStrategyForm.strategyType"
                  @change="handleRadioChange"
                >
                  <el-radio :label="1">Android</el-radio>
                  <el-radio :label="2">iOS</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <!-- <label slot="label"
                  >检测项目({{
                    terminalType == 1
                      ? xx.length + defaultdetectorAndroidItemList.length
                      : xx.length + defaultdetectorIosItemList.length
                  }}/{{ detectorTypeDetailList.length }}项)</label
                > -->
                <label slot="label"
                  >&nbsp;&nbsp;检&nbsp;&nbsp;测&nbsp;&nbsp;项&nbsp;&nbsp;目:</label
                >
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="selectedOptions"
                  @change="handleCheckAllChange"
                  >全选</el-checkbox
                >
              </el-form-item>
              <el-collapse v-model="activeNames">
                <el-collapse-item
                  v-for="(item, index) in detectorTypeList"
                  :key="item.id"
                  :name="index"
                  v-show="item.children.length"
                >
                  <label slot="title">
                    <span> {{ item.name }}</span>
                    <el-checkbox
                      :indeterminate="item.isSubIndeterminate"
                      v-model="item.isSubCheckedAll"
                      @change="
                        checked => subHandleCheckAllChange(checked, index)
                      "
                      style="margin-left:20px;"
                      :disabled="
                        item.code == 'titleCode17' ||
                          item.code == 'titleCode001'
                      "
                      >全选</el-checkbox
                    >
                  </label>
                  <template v-if="terminalType == 1">
                    <el-checkbox-group
                      v-model="item.selectedOptions"
                      @change="item => AndroidHandleCheckChange(item, index)"
                    >
                      <el-checkbox
                        v-for="subItem in item.children"
                        :key="subItem.id"
                        :label="subItem.key"
                        :disabled="
                          subItem.code == 'titleCode17' ||
                            subItem.code == 'titleCode001'
                        "
                        style="width:45%;margin-bottom:15px;"
                        >{{ subItem.name }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </template>
                  <template v-if="terminalType == 2">
                    <el-checkbox-group
                      v-model="item.selectedOptions"
                      @change="item => iosHandleCheckChange(item, index)"
                    >
                      <el-checkbox
                        v-for="subItem in item.children"
                        :key="subItem.id"
                        :label="subItem.key"
                        :disabled="
                          subItem.code == 'titleCode17' ||
                            subItem.code == 'titleCode001'
                        "
                        style="width:45%;margin-bottom:15px;"
                        >{{ subItem.name }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </template>
                </el-collapse-item>
              </el-collapse>
            </el-form>
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
    <div class="detectorStrategyBody">
      <template>
        <el-table
          ref="listItem"
          :data="listItem"
          v-loading="loading"
          element-loading-text="加载中"
        >
          <el-table-column type="index" label="序号" width="100">
            <template slot-scope="scope">
              <span>{{ (curPage - 1) * limit + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <!--  <el-table-column
            v-show="true"
            prop="strategy_id"
            width="100"
            label="ID"
          ></el-table-column> -->
          <el-table-column
            prop="strategy_name"
            label="策略名称"
            width="250"
          ></el-table-column>
          <el-table-column prop="strategy_type" label="适用系统" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.strategy_type == '1'">Android</span>
              <span v-if="scope.row.strategy_type == '2'">iOS</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="strategy_count"
            label="检测项数量"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="strategy_is_dynamic"
            label="是否动态检测"
            width="180"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.strategy_is_dynamic == '1'">是</span>
              <span v-if="scope.row.strategy_is_dynamic == '0'">否</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="strategy_is_shelling"
            label="是否脱壳"
            width="140"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.strategy_is_shelling == '1'">是</span>
              <span v-if="scope.row.strategy_is_shelling == '0'">否</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="创建者"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            width="180"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip effect="dark" content="详情" placement="top-start">
                <i
                  class="el-icon-tickets detailIcon"
                  @click="
                    detail(scope.row.strategy_id, scope.row.strategy_type)
                  "
                ></i>
              </el-tooltip>
              <!-- 检测策略详情 -->
              <el-drawer
                title="检测策略详情"
                :visible.sync="detectorStrategyDetailDrawer"
                :with-header="false"
                :wrapperClosable="false"
                :close-on-press-esape="false"
                :destroy-on-close="true"
                size="40%"
              >
                <div class="el-drawer-header">
                  <h3>检测策略详情</h3>
                </div>
                <div class="el-drawer-content">
                  <template v-if="detectorStrategyDetailItem">
                    <el-form :model="detectorStrategyDetailItem">
                      <el-form-item
                        >检测策略名称:&nbsp;&nbsp;{{
                          detectorStrategyDetailItem.strategyName
                        }}</el-form-item
                      >
                      <el-form-item
                        >适用系统:&nbsp;&nbsp;
                        <el-radio-group
                          v-model="detectorStrategyDetailItem.strategyType"
                        >
                          <el-radio :label="1" disabled>Android</el-radio>
                          <el-radio :label="2" disabled>iOS</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item
                        >检测项目{{
                          detectorStrategyDetailItem.detectionItemList.length
                        }}项</el-form-item
                      >
                      <el-collapse v-model="activeNames">
                        <el-collapse-item
                          v-for="(item,
                          index) in detectorStrategyDetailItem.children"
                          :name="index"
                          :key="item.id"
                          v-show="item.children.length"
                        >
                          <label slot="title">{{ item.name }}</label>
                          <el-checkbox
                            v-for="subItem in item.children"
                            :key="subItem.id"
                            style="width:45%;margin-bottom:15px"
                            :disabled="true"
                            :checked="true"
                            >{{ subItem.name }}</el-checkbox
                          >
                        </el-collapse-item>
                      </el-collapse>
                    </el-form>
                  </template>
                </div>
                <div class="el-drawer-footer">
                  <div class="buttonBox" style="display:inline-block">
                    <el-button @click="cancelDetectorStrategyDetail()" plain
                      >取消</el-button
                    >
                  </div>
                </div>
              </el-drawer>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="detectorStrategyBase">
      <pagination @pageChanged="onPageChanged"></pagination>
    </div>
  </div>
</template>
<script>
import api from "../../request/api";
import pagination from "../../common/pagination";
import pageMixins from "../../../utils/pageMixins";
export default {
  name: "detectorStrategy",
  components: { pagination },
  mixins: [pageMixins],
  inject: ["reload"],
  data() {
    return {
      listItem: [],
      curPage: 1,
      limit: 10,
      loading: false,
      addTaskDrawer: false,
      detectorStrategyDetailDrawer: false,
      detectorStrategyDetailList: null,
      detectorAndroidItemOptions: [],
      detectorIosItemOptions: [],
      ruleForm: {
        strategyName: "",
        userName: ""
      },
      detectorStrategyForm: {
        strategyName: "",
        strategyIsDynamic: "",
        strategyIsShelling: "",
        strategyType: 1
      },
      rules: {
        strategyName: {
          required: true,
          message: "请输入检测策略名称",
          trigger: "blur"
        },
        strategyIsDynamic: {
          required: true,
          message: "请选择是否动态检测",
          trigger: "blur"
        },
        strategyIsShelling: {
          required: true,
          message: "请选择是否脱壳",
          trigger: "blur"
        }
      },
      detectorAndroidItemList: [],
      detectorIosItemList: [],
      defaultdetectorAndroidItemList: [],
      defaultdetectorIosItemList: [],
      detectorTypeList: [],
      detectorAndroidTypeDetailList: [],
      detectorIosTypeDetailList: [],
      detectorTypeDetailList: [],
      detectorStrategyDetailItem: null,
      isIndeterminate: true,
      activeNames: [],
      terminalType: 1,
      allChecked: false,
      selectedOptions: []
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    handleRadioChange(value) {
      this.terminalType = value;
      this.getDetectorList(value);
    },
    async getData() {
      const params = {};
      params.queryInfo = this.ruleForm;
      params.queryInfo.terminalType = this.terminalType;
      this.getDataItem(this.addPageInfo(params));
    },
    getDataItem(params) {
      api.detrctorTaskService.findStrategyPage(params).then(res => {
        if (res.code == "00") {
          const count = res.data.count,
            { pn: number, limit: size, queryInfo } = params;
          this.listItem = res.data.items;
          this.curPage = number;
          this.limit = size;
          this.onGotPageData({ totalElements: count, size, number, queryInfo });
        }
      });
    },
    search(ruleForm) {
      this.loading = true;
      const params = {};
      params.queryInfo = ruleForm;
      this.addPageInfo(params);
      this.getDataItem(params);
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    refresh() {
      this.reload();
    },
    //得到Androis,ios默认选项
    getDefaultOption(array, terminalType) {
      if (terminalType == 1) {
        array.forEach(v => {
          this.detectorAndroidItemList.push(v.key);
          this.detectorAndroidItemList = Array.from(
            new Set(this.detectorAndroidItemList)
          );
        });
        this.defaultdetectorAndroidItemList = this.detectorAndroidItemList;
        return this.defaultdetectorAndroidItemList;
      } else {
        array.forEach(v => {
          this.detectorIosItemList.push(v.key);
          this.detectorIosItemList = Array.from(
            new Set(this.detectorIosItemList)
          );
        });
        this.defaultdetectorIosItemList = this.detectorIosItemList;
        return this.defaultdetectorIosItemList;
      }
    },
    //得到Android,Ios的全部选项
    getAllOptions(list, terminalType) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].children.length != 0) {
          list[i].children.forEach(v => {
            if (terminalType == 1) {
              this.detectorAndroidItemOptions.push(v.key);
              this.detectorAndroidItemOptions = Array.from(
                new Set(this.detectorAndroidItemOptions)
              );
            } else {
              this.detectorIosItemOptions.push(v.key);
              this.detectorIosItemOptions = Array.from(
                new Set(this.detectorIosItemOptions)
              );
            }
          });
        }
        this.activeNames.push(i);
      }
    },
    //得到Android,Ios数组的数据
    getAllList(array, detailArray, terminalType) {
      if (array) {
        array.map((v, i) => {
          v.selectedOptions = [];
          v.children = [];
          v.isSubCheckedAll = false;
          v.isSubIndeterminate = false;
          detailArray.some(item => {
            if (item.code == v.code) {
              v.children.push(item);
              v.children.forEach((subItem, subIndex) => {
                subItem.key = i + "-" + subItem.id;
                subItem.checkedCount = false;
              });
            }
          });

          if (v.code == "titleCode17" || v.code == "titleCode001") {
            v.isSubCheckedAll = true;
            this.getDefaultOption(v.children, terminalType);
          }
          if (v.code == "titleCode17") {
            v.selectedOptions = this.detectorAndroidItemList;
          }
          if (v.code == "titleCode001") {
            v.selectedOptions = this.detectorIosItemList;
          }
        });
      }
      return array;
    },
    getDetectorList(terminalType) {
      const getDetectionItemList = api.detectorStrategyService
        .getDetectionItemList(terminalType)
        .then(res => {
          if (res.code == "00") {
            return res.data;
          }
        });
      const getDetectionItemTypeList = api.detectorStrategyService
        .getDetectionItemTypeList(terminalType)
        .then(res => {
          if (res.code == "00") {
            return res.data;
          }
        });
      Promise.all([getDetectionItemList, getDetectionItemTypeList]).then(
        item => {
          this.detectorTypeList = item[1];
          this.detectorTypeDetailList = item[0];
          this.getAllList(
            this.detectorTypeList,
            this.detectorTypeDetailList,
            terminalType
          );
          this.getAllOptions(this.detectorTypeList, terminalType);
        }
      );
    },
    /* 新增检测策略 */
    addTask() {
      this.addTaskDrawer = true;
      this.getDetectorList(this.terminalType);
    },
    //检测项目全选
    handleCheckAllChange(val) {
      const terminalType = this.terminalType;
      this.allChecked = val;
      this.isIndeterminate = false;
      this.detectorTypeList.forEach(v => {
        v.isSubCheckedAll = val ? true : false;
        if (v.code == "titleCode17" || v.code == "titleCode001") {
          v.isSubCheckedAll = true;
        }
        if (terminalType == 1) {
          v.selectedOptions = val
            ? this.detectorAndroidItemOptions
            : this.defaultdetectorAndroidItemList;
        } else {
          v.selectedOptions = val
            ? this.detectorIosItemOptions
            : this.defaultdetectorIosItemList;
        }
      });
    },
    //全选 子项目subHandleCheckAllChange
    subHandleCheckAllChange(val, index) {
      const terminalType = this.terminalType,
        selectedOptions = this.getSelectedOptions(
          this.detectorTypeList[index].children,
          val,
          index
        );
      if (terminalType == 1) {
        this.detectorTypeList[index].selectedOptions = val
          ? selectedOptions
          : this.defaultdetectorAndroidItemList;
      } else {
        this.detectorTypeList[index].selectedOptions = val
          ? selectedOptions
          : this.defaultdetectorIosItemList;
      }
      this.isIndeterminate = true;
    },
    //单独选
    //Android
    AndroidHandleCheckChange(val, index) {
      const checkedCount = this.detectorTypeList[index].selectedOptions.length,
        allOptionsLength = this.countArray(
          this.detectorAndroidItemOptions,
          index
        );
      this.detectorTypeList[index].isSubCheckedAll =
        checkedCount == allOptionsLength;
      this.detectorTypeList[index].isSubIndeterminate =
        checkedCount > 0 && checkedCount < allOptionsLength;
    },
    //ios
    iosHandleCheckChange(val, index) {
      const checkedCount = this.detectorTypeList[index].selectedOptions.length,
        allOptionsLength = this.countArray(this.detectorIosItemOptions, index);
      this.detectorTypeList[index].isSubCheckedAll =
        checkedCount == allOptionsLength;
      this.detectorTypeList[index].isSubIndeterminate =
        checkedCount > 0 && checkedCount < allOptionsLength;
    },
    getSelectedOptions(array, checked, index) {
      const terminalType = this.terminalType;
      this.selectedOptions = [];
      array.forEach((v, i) => {
        if (checked) {
          this.selectedOptions.push(v.key);
        } else {
          this.selectedOptions = this.selectedOptions.splice(0, v.key);
        }
      });
      return this.selectedOptions;
    },
    //统计数量 测试
    countArray(array, index) {
      if (array) {
        let count = 0,
          regex = new RegExp(`^${index}-*`);
        array.forEach(v => {
          if (regex.test(v)) {
            count++;
          }
        });
        return count;
      }
    },
    //求数组中长度最大的值
    /* findMax(array) {
      let max = array[0].selectedOptions;
      for (let i = 1; i < array.length; i++) {
        if (array[i].selectedOptions.length > max.length) {
          max = array[i].selectedOptions;
        }
      }
      return this.removeWhipptree(max);
    }, */
    //将数组中选中的值进行合并
    mergeArray(array) {
      let combinedArray = [];
      for (let i = 0; i < array.length; i++) {
        combinedArray = combinedArray.concat(array[i].selectedOptions);
      }
      return combinedArray;
    },
    //将数组中数字-去掉
    removeWhipptree(array) {
      let processedArray = [];
      array.forEach(v => {
        if (v) {
          processedArray.push(v.split("-")[1]);
        }
      });
      return processedArray;
    },
    //保存新增的检测策略
    saveTask() {
      const _this = this;
      let allValid = true,
        taskList = this.detectorStrategyForm;
      _this.$refs["detectorStrategyForm"].validate((valid, message) => {
        if (!valid) {
          if (message.strategyIsShelling) {
            _this.$message.error("请选择是否脱壳!");
          }
          if (message.strategyIsDynamic) {
            _this.$message.error("请选择是否动态检测!");
          }
          if (message.strategyName) {
            _this.$message.error("请输入检测策略名称！");
          }
          allValid = false;
        }
        if (this.terminalType == 1) {
          //选中的项+默认项
          this.detectionItemList = this.removeWhipptree(
            this.mergeArray(this.detectorTypeList)
          ).concat(this.removeWhipptree(this.defaultdetectorAndroidItemList));
          this.detectionItemList = Array.from(new Set(this.detectionItemList));
        } else {
          this.detectionItemList = this.removeWhipptree(
            this.mergeArray(this.detectorTypeList)
          ).concat(this.removeWhipptree(this.defaultdetectorIosItemList));
          this.detectionItemList = Array.from(new Set(this.detectionItemList));
        }
        if (allValid) {
          const strategyItemDto = {
            detectionItemList: this.detectionItemList,
            strategyIsDynamic: taskList.strategyIsDynamic,
            strategyIsShelling: taskList.strategyIsShelling,
            strategyName: taskList.strategyName,
            strategyType: taskList.strategyType
          };
          api.detectorStrategyService
            .saveOrUpdateStrategy(strategyItemDto)
            .then(res => {
              if (res.code == "00") {
                _this.addTaskDrawer = false;
                _this.$notify({
                  message: "新增检测策略成功",
                  type: "success",
                  duration: 1000
                });
                _this.reload();
              }
            });
        }
      });
    },
    //取消保存新增的检测策略
    cancelTask() {
      this.addTaskDrawer = false;
    },
    /* 详情 */
    detail(id, type) {
      this.detectorStrategyDetailDrawer = true;
      const getDetectorTitleList = api.detectorStrategyService
          .getDetectionItemTypeList(type)
          .then(res => {
            if (res.code == "00") {
              return res.data;
            }
          }),
        getDetectorDetailList = api.detectorAndroidService
          .getStrategyDetail(id)
          .then(res => {
            if (res.code == "00") {
              return res.data;
            }
          });
      Promise.all([getDetectorTitleList, getDetectorDetailList]).then(item => {
        this.detectorStrategyDetailItem = item[1];
        this.detectorStrategyDetailItem.children = this.getAllList(
          item[0],
          item[1].detectionItemList,
          this.terminalType
        );
        this.getAllOptions(
          this.detectorStrategyDetailItem.children,
          this.terminalType
        ); //得到activeNames
      });
    },
    //取消查看检测策略详情
    cancelDetectorStrategyDetail() {
      this.detectorStrategyDetailDrawer = false;
    }
  },
  mounted() {}
};
</script>
<style>
.detectorStrategyHeader {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.detailIcon {
  font-size: 22px;
  color: #517fc3;
  margin-right: 10px;
  cursor: pointer;
}
.detectorStrategy .el-checkbox__input.is-checked .el-checkbox__inner,
.detectorStrategy
  .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner,
.detectorStrategy
  .el-checkbox__input.is-disabled.is-indeterminate
  .el-checkbox__inner,
.detectorStrategy .el-radio__input.is-checked .el-radio__inner,
.detectorStrategy .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #517fc3;
  border-color: #517fc3;
}
.el-checkbox__input.is-checked + .el-checkbox__label,
.el-radio__input.is-checked + .el-radio__label,
.el-pager li.active {
  color: #517fc3;
}
.el-radio__input.is-disabled.is-checked .el-radio__inner {
  background-color: #5aa4f0 !important;
}
.el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #606266;
}
.detectorStrategy .el-collapse-item__header {
  padding-left: 0px;
}
.searchBox .el-input {
  width: auto;
}
.detectorStrategy .searchForm {
  display: flex;
}
.detectorStrategy .operateBox {
  margin-left: 15px;
}
.detectorStrategyBody {
  margin-top: 15px;
}
.detectorStrategyBase {
  margin-top: 15px;
}
.detectorStrategy .el-drawer-header {
  width: 100%;
  position: fixed;
  background: white;
  z-index: 99;
  height: 50px;
  padding: 17px 20px;
  border-bottom: 1px solid #ebebeb;
}
.detectorStrategy .el-drawer-header h3 {
  color: #333;
  font-size: 16px;
  font-weight: 600;
}
.el-drawer {
  box-sizing: border-box !important;
  overflow-y: auto !important;
}
.detectorStrategy .el-drawer-content {
  margin: 50px 0 60px 0;
  position: relative;
  overflow: auto;
  padding: 20px;
}
.detectorStrategy .el-form-item__label {
  text-align: left;
}
.detectorStrategy .el-select-dropdown {
  position: absolute !important;
  top: 35px !important;
  left: 0 !important;
  height: 205% !important;
  overflow-y: auto !important;
}
.detectorStrategy .el-drawer-footer {
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
.el-drawer {
  box-sizing: border-box !important;
  overflow-y: auto !important;
}
</style>
