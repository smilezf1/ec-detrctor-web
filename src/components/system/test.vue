<template>
  <div class="roleManagement">
    <div class="roleManagementHeader">
      <p>当前位置: test管理</p>
    </div>
    <div class="searchForm">
      <div class="searchBox">
        <el-form :model="ruleForm" ref="ruleForm">
          <el-input
            placeholder="请输入角色名称"
            size="small"
            v-model="ruleForm.name"
          ></el-input>
          <el-select
            placeholder="是否有效"
            v-model="ruleForm.status"
            size="small"
          >
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
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
          @click="addRole()"
          class="addRoleButton"
          >新增角色</el-button
        >
        <el-drawer
          title="新增角色"
          :visible.sync="addRoleDrawer"
          :with-header="false"
          :wrapperClosable="false"
          :close-on-press-escape="false"
          size="30%"
          ref="addRoleDrawer"
          @close="resetForm('addRoleForm')"
        >
          <div class="el-drawer-header">
            <h3>新增角色</h3>
          </div>
          <div class="el-drawer-content">
            <el-form :model="addRoleForm" :rules="rules" ref="addRoleForm">
              <el-form-item label="角色名称" prop="name">
                <el-input
                  v-model="addRoleForm.name"
                  auto-complete="off"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="el-drawer-footer">
            <el-button
              type="primary"
              @click="saveaddRole('addRoleForm', addRoleForm)"
              >保存</el-button
            >
            <el-button @click="cancelSaveaddRole()" plain>取消</el-button>
          </div>
        </el-drawer>
        <el-button
          type="primary"
          size="small"
          @click="refresh()"
          class="refreshButton"
          >刷新</el-button
        >
      </div>
    </div>
    <div class="roleManagementBody">
      <template>
        <el-table
          ref="listItem"
          :data="listItem"
          v-loading="loading"
          element-loading-text="加载中"
        >
          <el-table-column type="index" label="序号" min-width="10%">
            <template slot-scope="scope">
              <span>{{ (curpage - 1) * limit + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="角色名称" min-width="20%">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column prop="status" label="是否有效" min-width="10%">
            <template slot-scope="scope">
              <span v-if="scope.row.status === '1'">是</span>
              <span v-if="scope.row.status === '0'">否</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            :show-overflow-tooltip="true"
            min-width="30%"
          >
            <template slot-scope="scope">{{ scope.row.createTime }}</template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间"
            :show-overflow-tooltip="true"
            min-width="30%"
          >
            <template slot-scope="scope">{{ scope.row.updateTime }}</template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" min-width="40%">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="edit(scope.row.id)"
                >编辑</el-button
              >
              <el-drawer
                title="编辑"
                :visible.sync="editDrawer"
                :with-header="false"
                :wrapperClosable="false"
                :close-on-press-escape="false"
                size="30%"
                ref="editDrawer"
              >
                <div class="el-drawer-header">
                  <h3>编辑</h3>
                </div>
                <div class="el-drawer-content">
                  <el-form
                    :model="editForm"
                    ref="editForm"
                    :rules="editFormRules"
                  >
                    <el-form-item label="角色名称" prop="name">
                      <el-input
                        v-model="editForm.name"
                        auto-complete="off"
                        size="small"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效">
                      <el-select
                        v-model="editForm.status"
                        size="small"
                        disabled
                      >
                        <el-option
                          label="是"
                          value="1"
                          :value-key="1"
                        ></el-option>
                        <el-option
                          label="否"
                          value="0"
                          :value-key="0"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="el-drawer-footer">
                  <el-button
                    type="primary"
                    @click="saveEditForm('editForm', editForm)"
                    >保存</el-button
                  >
                  <el-button @click="cancelForm" plain>取消</el-button>
                </div>
              </el-drawer>
              <el-button
                size="small"
                type="success"
                @click="setting(scope.row.id)"
                >设置菜单</el-button
              >
              <el-dialog
                title="菜单列表"
                :visible.sync="menuDialog"
                width="20%"
              >
                <el-tree
                  ref="tree"
                  :data="menuTreeData"
                  node-key="id"
                  show-checkbox
                  default-expand-all
                  :default-checked-keys="setMenuList"
                  :props="defaultProps"
                  @check-change="permissionCheckChange"
                  :check-strictly="true"
                  :render-content="renderContent"
                ></el-tree>
                <div class="el-dialog-footer" style="text-align:center">
                  <el-button type="primary" @click="setMenuSave"
                    >确定</el-button
                  >
                </div>
              </el-dialog>
              <el-button
                size="small"
                type="danger"
                v-if="scope.row.status == 1"
                @click="blockUp(scope.row.id)"
                >停用</el-button
              >
              <el-button
                size="small"
                type="warning"
                v-if="scope.row.status == 0"
                @click="launch(scope.row.id)"
                >启用</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="roleManagementBase">
      <pagination @pageChanged="onPageChanged"></pagination>
    </div>
  </div>
</template>
<script>
import api from "../request/api";
import pagination from "../common/pagination";
import pageMixins from "../../utils/pageMixins";
import $ from "jquery";
export default {
  name: "manageAbout",
  components: { pagination },
  mixins: [pageMixins],
  inject: ["reload"],
  data() {
    return {
      listItem: [],
      loading: false,
      editDrawer: false,
      menuDialog: false,
      editForm: {
        name: "",
        status: ""
      },
      ruleForm: {
        name: "",
        status: ""
      },
      addRoleForm: {
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", tirgger: "blur" }]
      },
      editFormRules: {
        name: { required: true, message: "请输入角色名称", tirgger: "blur" },
        status: { required: true, message: "是否有效", trigger: "blur" }
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      addRoleDrawer: false,
      menuTreeData: [],
      menuList: [],
      setMenuList: [],
      setBtnList: [],
      curpage: 1,
      limit: 10,
      xx: [],
      menuTreeStore: {} //菜单树store
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    async getData() {
      const params = {};
      params.queryInfo = this.ruleForm;
      this.getDataItem(this.addPageInfo(params));
    },
    getDataItem(params) {
      api.systemService.roleManageList(params).then(res => {
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
    },
    //查询
    search(ruleForm) {
      const params = {};
      params.queryInfo = ruleForm;
      this.loading = true;
      this.addPageInfo(params);
      this.getDataItem(params);
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    //将数据转化为树形结构
    toTreeData(data) {
      data.forEach(item => {
        delete item.children;
      });
      let map = {};
      data.forEach(i => {
        map[i.id] = i;
      });
      let treeData = [];
      data.forEach(child => {
        const mapItem = map[child.pId];
        if (mapItem) {
          (mapItem.children || (mapItem.children = [])).push(child);
        } else {
          treeData.push(child);
        }
      });
      return treeData;
    },
    //新增角色
    addRole() {
      this.addRoleDrawer = true;
    },
    //保存新增的角色
    saveaddRole(formName, form) {
      const name = form.name;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = { name };
          api.systemService.roleManageSave(params).then(res => {
            if (res.code == "00") {
              this.reload();
              this.$notify.success({
                message: "新增角色成功",
                showClose: false,
                duration: 1000
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    cancelSaveaddRole() {
      this.addRoleDrawer = false;
    },
    //编辑
    edit(id) {
      this.editDrawer = true;
      this.editId = id;
      api.systemService.roleManageDetail(id).then(res => {
        if (res.code == "00") {
          this.editForm = res.data;
        }
      });
    },
    //保存编辑的角色
    saveEditForm(formName, editForm) {
      const name = editForm.name,
        id = this.editId,
        params = { id, name };
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          api.systemService.roleManageSave(params).then(res => {
            if (res.code == "00") {
              this.reload();
              this.editDrawer = false;
              this.$notify.success({
                message: "编辑成功",
                showClose: false,
                duration: 1000
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    //设置菜单开始
    handleCheck(checkedNodes, treeStatus) {
      /* this.checkedNodes = treeStatus.checkedNodes;
      this.setMenuList = [];
      this.setBtnList = [];
      console.log(treeStatus.checkedNodes, "##");
      treeStatus.checkedNodes.forEach(v => {
        if (v.id.indexOf("T") != -1) {
          this.setMenuList.push(v.id);
        } else if (v.id.indexOf("B") != -1) {
          this.setBtnList.push(v.id);
        }
      }); */
    },
    //选中节点
    selectMenuNode(data, node) {
      if (this.selectBtn) {
        this.selectBtn = false;
        return;
      }
      let isChecked = !node.checked,
        key = node.key;
      if (isChecked) {
        this.addCheckedKeys(key);
      } else {
        this.removeCheckedKeys(key);
      }
    },
    //权限切换
    permissionCheckChange(data, isChecked, subIsChecked) {
      let store = this.$refs.tree.store,
        node = store.getNode(data.id);
      if (!isChecked) {
        //取消子节点选中
        let operateItems = $(
            "#operate_panel_" + data.id + ".el-checkbox__input"
          ),
          operateCheckedItems = $("#operate_panel_" + data.id + " input");
        operateItems.removeClass("is-checked");
        operateCheckedItems.attr("checked", false);
        this.selectBtn = false;
        if (!subIsChecked) {
          this.cancelCheckedChildNodes(node);
        }
        //取消选中父
        if (node.parent.level > 0 && node.parent.checked) {
          this.cancelCheckedParentNode(node);
          this.currentLevel = node.level;
        } else {
          this.currentLevel = null;
        }
      } else {
        if (!this.selectBtn) {
          let operateItems = $(
              "#operate_panel_" + data.id + " .el-checkbox__input"
            ),
            operateCheckedItems = $("#operate_panel_" + data.id + " input");
          operateItems.addClass("is-checked");
          operateCheckedItems.attr("checked", true);
        } else {
          this.selectBtn = false;
        }
        // 大于当前层级的 不执行选中子节点
        if (this.currentLevel && node.level < this.currentLevel) {
          if (node.level == this.currentLevel - 1) {
            this.currentLevel = null;
          }
          return false;
        }

        // 选中父
        if (node.parent.level > 0 && !node.parent.checked) {
          this.checkedParentNode(node);
          this.currentLevel = node.level;
        } else {
          this.currentLevel = null;
        }
        // 选中子菜单
        this.checkedChildNodes(node);
      }
    },
    //选中父节点
    checkedParentNode(node) {
      let level = node.parent.level;
      if (level == 0) {
        this.currentLevel = null;
        return false;
      }

      let data = node.parent.data,
        store = this.$refs.tree.store,
        parentNode = store.getNode(data.id);
      if (parentNode) {
        this.addCheckedKeys(parentNode.key);
        this.checkedParentNode(parentNode);
      }
    },
    //选中所有子节点
    checkedChildNodes(node) {
      let childNodes = node.childNodes;
      if (!childNodes || childNodes.length <= 0) {
        return false;
      }
      // 迭代子节点
      childNodes.forEach(child => {
        let key = child.key;
        this.addCheckedKeys(key);
        this.checkedChildNodes(child);
      });
    },
    //取消选中父节点
    cancelCheckedParentNode(node) {
      let level = node.parent.level;
      if (level <= 0) {
        return false;
      }
      let store = this.$refs.tree.store,
        data = node.parent.data,
        parentNode = store.getNode(data.id),
        childNodes = parentNode.childNodes,
        isChecked = false;
      if (!childNodes || childNodes.length <= 0) {
        return false;
      }
      childNodes.forEach(child => {
        isChecked = isChecked || child.checked;
      });
      if (!isChecked) {
        this.removeCheckedKeys(data.id);
      }
    },
    //取消选中子节点
    cancelCheckedChildNodes(node) {
      let childNodes = node.childNodes;
      if (!childNodes || childNodes.length <= 0) {
        return false;
      }
      let checkedKeys = this.$refs.tree.getCheckedKeys();
      childNodes.forEach(child => {
        let key = child.key,
          index = $.inArray(key, checkedKeys);
        if (index != -1) {
          checkedKeys.splice(index, 1);
          this.$refs.tree.setCheckedKeys(checkedKeys);
        }
      });
    },
    //移除选中key
    removeCheckedKeys(key) {
      let checkedKeys = this.$refs.tree.getCheckedKeys(),
        index = $.inArray(key, checkedKeys);
      if (index != -1) {
        checkedKeys.splice(index, 1);
        this.$refs.tree.setCheckedKeys(checkedKeys);
      }
    },
    //添加选中key
    addCheckedKeys(key) {
      let checkedKeys = this.$refs.tree.getCheckedKeys();
      if ($.inArray(key, checkedKeys) != -1) {
        return false;
      }
      checkedKeys.push(key);
      this.$refs.tree.setCheckedKeys(checkedKeys);
    },
    renderContent: function(createElement, { node, data, store }) {
      let _this = this,
        elements = [],
        btnNodeList = data.btnNodeList;
      this.menuTreeStore = store;
      if (btnNodeList) {
        let btnNode = null;
        for (let i = 0; i < btnNodeList.length; i++) {
          btnNode = btnNodeList[i];
          /*  elements.push(
            this.createOperateElement(_this, createElement, btnNode)
          ); */
        }
      }

      //操作面板
      var operatePanel = createElement(
        "div",
        {
          attrs: {
            class: "tree-operate-panel",
            id: "operate_panel_" + data.id
          }
        },
        elements
      );

      //显示标题
      var label = createElement(
        "span",
        {
          on: {
            click: function() {
              _this.selectMenuNode(data, node);
            }
          }
        },
        node.label
      );

      return createElement("span", [label, operatePanel]);
    },
    // 创建操作按钮
    /* createOperateElement(self, createElement, btnNode) {
      let spanInnerEle = createElement("span", {
          attrs: {
            class: "el-checkbox__inner el-checkbox__input"
          }
        }),
        inputEle = createElement("input", {
          attrs: {
            class: "el-checkbox__original",
            name: "el-checkbox_btn",
            type: "checkbox",
            value: btnNode.id,
            id: "operate_item_" + btnNode.id
          },
          on: {
            click: function(event) {
              self.selectBtn = true;
              let $item = $("#operate_item_" + btnNode.id),
                isChecked = !$item.attr("checked");
              $item.attr("checked", isChecked);
              if (isChecked) {
                $("#operate_" + btnNode.id).addClass("is-checked");
                self.addCheckedKeys(btnNode.parentNodeId);
              } else {
                $("#operate_" + btnNode.id).removeClass("is-checked");
                self.removeCheckedKeys(btnNode.id);
              }
            }
          }
        });

      var spanInputEle = createElement(
        "span",
        {
          attrs: {
            class: "el-checkbox__input",
            name: "el-checkbox_btn_span",
            id: "operate_" + btnNode.id
          }
        },
        [spanInnerEle, inputEle]
      );

      var spanLabelEle = createElement(
        "span",
        {
          attrs: {
            class: "el-checkbox__label"
          }
        },
        btnNode.nodeName
      );

      // label 父标签
      var labelEle = createElement(
        "label",
        {
          attrs: {
            class: "tree-operate el-checkbox"
          }
        },
        [spanInputEle, spanLabelEle]
      );
      return labelEle;
    },
 */
    //返回数组中指定值,并返回它的索引
    inArray(value, array) {
      if (Array.prototype.indexOf) {
        return array.indexOf(value);
      } else {
        for (let i = 0; i < array.length; i++) {
          if (array[i] === value) {
            return i;
          }
        }
      }
      return -1;
    },

    //设置菜单
    setting(id) {
      this.menuDialog = true;
      this.setMenuId = id;
      api.systemService.roleManageSettingMenu(id).then(res => {
        let data = res.data;
        (data = JSON.parse(JSON.stringify(data).replace(/name/g, "label"))),
          (this.menuTreeData = this.toTreeData(data));
        this.setSelectedList(this.menuTreeData);
      });
    },
    setSelectedList(menuTreeData) {
      for (let item of menuTreeData) {
        if (item.checked == true) {
          if (item.id.indexOf("T") != -1) {
            this.setMenuList.push(item.id);
          }
          if (item.id.indexOf("B") != -1) {
            this.setBtnList.push(item.id);
          }
        }
        if (item.children) {
          this.setSelectedList(item.children);
        }
      }
      this.setMenuList = Array.from(new Set(this.setMenuList));
      this.setBtnList = Array.from(new Set(this.setBtnList));
    },
    removeInitial(list) {
      let array = [];
      for (let item of list) {
        array.push(item.slice(1));
      }
      return array;
    },
    //刷新
    refresh() {
      this.reload();
    },
    cancelForm() {
      this.editDrawer = false;
    },
    setMenuSave() {
      const menuList = [],
        id = this.setMenuId;
      this.setMenuList = this.removeInitial(this.setMenuList);
      this.setBtnList = this.removeInitial(this.setBtnList);
      new this.$messageTips(({ confirm }) => {
        confirm({ content: "确定要更新菜单列表吗?" });
      }).then(res => {
        const params = {
          btnList: this.setBtnList,
          itemList: this.setMenuList,
          roleId: id
        };
        api.systemService.roleManageSettingMenuSave(params).then(res => {
          if (res.code == "00") {
            this.$notify({
              message: "更新成功",
              type: "success",
              duration: 1000
            });
            this.reload();
            this.menuDialog = false;
          }
        });
      });
    },
    resetForm() {},
    //停用
    blockUp(id) {
      new this.$messageTips(({ alert }) => {
        alert({ content: "确定要停用吗?", tip: "确定停用" });
      }).then(() => {
        api.systemService.roleManageBolockUp(id).then(res => {
          if (res.code === "00") {
            this.reload();
            this.$notify.success({
              message: "停用成功",
              type: "warning",
              showClose: false,
              duration: 1000
            });
          }
        });
      });
    },
    //启用
    launch(id) {
      new this.$messageTips(({ alert }) => {
        alert({ content: "确定要启用吗?", tip: "确定启用" });
      }).then(() => {
        api.systemService.roleManageLaunch(id).then(res => {
          if (res.code === "00") {
            this.reload();
            this.$notify.success({
              message: "启用成功",
              showClose: false,
              duration: 1000
            });
          }
        });
      });
    }
  }
};
</script>
<style>
.roleManagementHeader {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.searchBox .el-input {
  margin: 0px 5px 5px 0px;
}
.searchForm {
  display: flex;
}
.roleManagement .searchBox {
  margin-bottom: 15px;
  display: flex;
}
.roleManagement .operateBox {
  display: inline-block;
  box-sizing: border-box;
  margin: 0px 0px 15px 10px;
}
.roleManagement .searchBox .el-input {
  width: auto;
}
.roleManagement .el-drawer-footer {
  width: 30%;
}
.roleManagementBody .el-select,
.roleManagementBody .el-input {
  width: 100%;
}
.editIcon,
.settingIcon,
.closeIcon,
.checkIcon {
  font-size: 22px;
  color: #517fc3;
  margin-right: 10px;
  cursor: pointer;
}
.roleManagementBase {
  margin-top: 10px;
}
</style>
