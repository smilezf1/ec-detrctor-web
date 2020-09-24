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
                  style="width:60%"
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
          <el-table-column type="index" label="序号" width="150">
            <!--  <template slot-scope="scope">
              <span>{{ (curPage - 1) * limit + scope.$index + 1 }}</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="name" label="角色名称" width="300">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column prop="status" label="是否有效" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.status === '1'">是</span>
              <span v-if="scope.row.status === '0'">否</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            :show-overflow-tooltip="true"
            width="300"
          >
            <template slot-scope="scope">{{ scope.row.createTime }}</template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间"
            :show-overflow-tooltip="true"
            width="300"
          >
            <template slot-scope="scope">{{ scope.row.updateTime }}</template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="400">
            <template slot-scope="scope">
              <el-tooltip effect="dark" content="编辑" placement="top-start">
                <i
                  class="el-icon-edit-outline editIcon"
                  @click="edit(scope.row.id)"
                ></i>
              </el-tooltip>
              <el-drawer
                title="编辑"
                :visible.sync="editDrawer"
                :with-header="false"
                :wrapperClosable="false"
                :close-on-press-escape="false"
                size="40%"
                ref="editDrawer"
              >
                <div class="el-drawer-header">
                  <h3>编辑</h3>
                </div>
                <div class="el-drawer-content">
                  <el-form :model="editForm" ref="editForm">
                    <el-form-item label="角色名称">
                      <el-input
                        v-model="editForm.name"
                        auto-complete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效">
                      <el-input
                        v-model="editForm.status"
                        :disabled="true"
                      ></el-input>
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

              <el-tooltip
                effect="dark"
                content="设置菜单"
                placement="top-start"
                v-if="scope.row.status == 1"
              >
                <i
                  class=" el-icon-setting settingIcon"
                  @click="setting(scope.row.id)"
                ></i>
              </el-tooltip>
              <el-dialog
                title="菜单列表"
                :visible.sync="menuDialog"
                width="20%"
              >
                <el-tree
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
              <el-tooltip
                effect="dark"
                content="停用"
                placement="top-start"
                v-if="scope.row.status == 1"
              >
                <i
                  class="el-icon-circle-close closeIcon"
                  @click="blockUp(scope.row.id)"
                ></i>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                content="启用"
                placement="top-start"
                v-if="scope.row.status == 0"
              >
                <i
                  class="el-icon-circle-check checkIcon"
                  @click="launch(scope.row.id)"
                ></i>
              </el-tooltip>
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
import pageMixins from "../../pageMixins";
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
      defaultProps: {
        children: "children",
        label: "label"
      },
      addRoleDrawer: false,
      menuTreeData: [],
      menuList: [],
      setMenuList: [],
      setParMentList: [],
      checkedNodes: [], //菜单选中的列表数据
      curpage: 1,
      limit: 10
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
      console.log("取消保存角色");
      this.addRoleDrawer = false;
    },
    //编辑
    edit(id) {
      this.editDrawer = true;
      this.editId = id;
      api.systemService.roleManageDetail(id).then(res => {
        if (res.code == "00") {
          this.editForm.name = res.data.name;
          if (res.data.status === "1") {
            this.editForm.status = "是";
          } else if (res.data.status === "0") {
            this.editForm.status = "否";
          }
        }
      });
    },
    //保存编辑的角色
    saveEditForm(formName, editForm) {
      const name = editForm.name,
        id = this.editId,
        params = { id, name };
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
    },
    //设置菜单开始
    handleCheck(checkedNodes, checkedKeys) {
      this.checkedNodes = checkedKeys.checkedNodes;
      this.checkedNodes.forEach(v => {
        console.log(v.id);
      });
    },
    //设置菜单
    setting(id) {
      this.menuDialog = true;
      this.setMenuId = id;
      api.systemService.roleManageSettingMenu(id).then(res => {
        let data = res.data;
        (data = JSON.parse(JSON.stringify(data).replace(/name/g, "label"))),
          (this.menuTreeData = this.toTreeData(data));
        for (var j = 0; j < this.menuTreeData.length; j++) {
          if (this.menuTreeData[j].children) {
            for (var k = 0; k < this.menuTreeData[j].children.length; k++) {
              if (this.menuTreeData[j].children[k].id.startsWith("T")) {
                this.menuTreeData[j].children[k].id = this.menuTreeData[
                  j
                ].children[k].id;
              }
            }
          }
          if (this.menuTreeData[j].id.startsWith("M")) {
            this.menuTreeData[j].id = this.menuTreeData[j].id;
          }
        }
        this.menuTreeData.forEach((v, i) => {
          if (v.children) {
            v.children.forEach((v, i) => {
              if (v.checked == true) {
                if (v.pId.startsWith("M")) {
                  this.setParMentList.push(v.pId);
                  this.setParMentList = Array.from(
                    new Set(this.setParMentList)
                  );
                }
                this.setMenuList.push(v.id);
                this.setMenuList = Array.from(new Set(this.setMenuList));
              }
            });
          } else {
            if (v.checked == true) {
              this.setMenuList.push(v.id);
              this.setMenuList = Array.from(new Set(this.setMenuList));
            }
          }
        });
      });
    },
    //刷新
    refresh() {
      this.reload();
    },
    cancelForm() {
      this.editDrawer = false;
    },
    setMenuSave() {
      let id = this.setMenuId,
        nodes = this.checkedNodes,
        menuList = this.menuList;
      if (nodes && nodes.length != 0) {
        for (var i = 0; i < nodes.length; i++) {
          if (!nodes[i].id.indexOf("T")) {
            nodes[i].id = nodes[i].id.replace("T", "");
            menuList.push(nodes[i].id);
            menuList = Array.from(new Set(menuList));
            console.log(menuList, "菜单选中的值");
          } else {
            console.log(nodes[i].id, "333");
          }
        }
      }
      this.$confirm("确定要更新菜单列表吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          console.log(menuList, "选中的值");
          const params = { btnList: [], itemList: menuList, roleId: id };
          console.log(menuList, "更新菜单列表");
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
        })
        .catch(() => {});
    },
    resetForm() {},
    //停用
    blockUp(id) {
      this.$alert("确定要停用吗?", "确定停用", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
        })
        .catch(() => {});
    },
    //启用
    launch(id) {
      this.$alert("确定要启用吗?", "确定启用", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
        })
        .catch(() => {});
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

.roleManagement .el-input {
  width: auto;
}
.roleManagement .operateBox {
  display: inline-block;
  box-sizing: border-box;
  margin: 0px 0px 15px 10px;
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
.el-drawer-header {
  height: 50px;
  padding: 17px 20px;
  border-bottom: 1px solid #ebebeb;
}
.el-drawer-content {
  padding: 20px;
}
.el-drawer-header h3 {
  color: #333;
  font-size: 16px;
  font-weight: 600;
}
.el-drawer-footer {
  width: 30%;
  position: fixed;
  bottom: 0;
  right: 0;
  text-align: right;
  padding: 10px 20px;
  border-top: 1px solid #ebebeb;
}
.roleManagement .el-table {
  font-size: 12px;
  border: 1px solid #dcdee2;
  border-bottom: 1px solid transparent;
}
.roleManagement .el-table thead {
  color: #515a6e !important;
  font-weight: 700;
}
.roleManagement .el-table__header-wrapper {
  background: #f8f8f9;
}
.roleManagement .el-table__header-wrapper th {
  background: #f2f5f7;
}
.roleManagement .el-table ::before {
  background: white;
}
.roleManagementBase {
  margin-top: 10px;
}
</style>
