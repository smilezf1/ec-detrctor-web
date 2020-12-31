<template>
  <div class="roleManagement">
    <div class="roleManagementHeader">
      <p>当前位置: 角色管理</p>
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
                <!--  check-strictly -->
                <el-tree
                  ref="tree"
                  :data="menuTreeData"
                  node-key="id"
                  show-checkbox
                  :default-checked-keys="setMenuList"
                  :props="defaultProps"
                  @check="handleCheck"
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
      xx: []
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
      this.checkedNodes = treeStatus.checkedNodes;

      /*  const selected = treeStatus.checkedKeys.indexOf(checkedNodes.id);
      if (selected !== -1) {
        this.selectedParent(checkedNodes);
        this.uniteChildSame(checkedNodes, true);
      } else {
        if (checkedNodes.children !== undefined) {
          if (checkedNodes.children.length !== 0) {
            this.uniteChildSame(checkedNodes, false);
          }
        }
      } */

      this.setMenuList = [];
      this.setBtnList = [];
      treeStatus.checkedNodes.forEach(v => {
        if (v.id.indexOf("T") != -1) {
          this.setMenuList.push(v.id);
        } else if (v.id.indexOf("B") != -1) {
          this.setBtnList.push(v.id);
        }
      });
    },
    /* uniteChildSame(treeList, isSelected) {
      this.$refs.tree.setChecked(treeList.id, isSelected);
      if (treeList.children) {
        for (let i = 0; i < treeList.children.length; i++) {
          this.uniteChildSame(treeList.children[i], isSelected);
        }
      }
    },
    selectedParent(checkedNodes) {
      let currentNode = this.$refs.tree.getNode(checkedNodes);
      if (currentNode.parent.key) {
        this.$refs.tree.setChecked(currentNode.parent, true);
        this.selectedParent(currentNode.parent);
      }
    }, */
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
          } else if (item.id.indexOf("B") != -1) {
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
