<template>
  <div class="menuManagement">
    <div class="menuManagementHeader">
      <p>当前位置:菜单管理</p>
    </div>

    <div class="operateBox">
      <el-button
        type="primary"
        size="small"
        @click="addCatalogue()"
        class="addCatalogueButton"
        >新增目录</el-button
      >
      <el-drawer
        title="新增目录"
        :visible.sync="addCatalogueDrawer"
        :with-header="false"
        :wrapperClosable="false"
        :close-on-press-escape="false"
        size="30%"
        ref="addCatalogueDrawer"
        @close="resetForm('addCatalogueForm')"
      >
        <div class="el-drawer-header">
          <h3>新增目录</h3>
        </div>
        <div class="el-drawer-content">
          <el-form
            :model="addCatalogueForm"
            :rules="rules"
            ref="addCatalogueForm"
          >
            <el-form-item label="资源名称" prop="name">
              <el-input
                v-model="addCatalogueForm.name"
                auto-complete="off"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="资源类型" prop="type">
              <el-select v-model="addCatalogueForm.type" size="small">
                <el-option label="目录" value="M"></el-option>
                <el-option label="链接" value="T" :disabled="true"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资源图标" prop="icon">
              <el-input
                v-model="addCatalogueForm.icon"
                auto-complete="off"
                size="small"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="el-drawer-footer">
          <el-button
            type="primary"
            @click="saveAddCatalogue('addCatalogueForm', addCatalogueForm)"
            >保存</el-button
          >
          <el-button @click="cancelAddCatalogueForm" plain>取消</el-button>
        </div>
      </el-drawer>
    </div>
    <div class="menuManagementBody">
      <template>
        <el-table ref="menusTable" :row-style="showRow" :data="menusItem">
          <el-table-column prop="name" label="资源名称" min-width="30%">
            <template slot-scope="scope">
              <span :class="['type' + scope.row.type]">
                <i
                  v-if="scope.row.children"
                  @click="openToggle(scope.row)"
                  :class="[
                    scope.row.open
                      ? 'el-icon-caret-bottom'
                      : 'el-icon-caret-right'
                  ]"
                ></i>
                <span v-if="scope.row.type === 'M'"
                  ><i class="el-icon-folder"></i
                ></span>
                <span v-if="scope.row.type === 'T'"
                  ><i class="el-icon-document"></i
                ></span>
                {{ scope.row.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="资源路径" min-width="30%">
            <template slot-scope="scope">
              {{ scope.row.address }}
            </template>
          </el-table-column>
          <el-table-column
            prop="icon"
            label="资源图标"
            :show-overflow-tooltip="true"
            min-width="30%"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.icon }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="资源类型" min-width="30%">
            <template slot-scope="scope">
              <span v-if="scope.row.type === 'M'">目录</span>
              <span v-if="scope.row.type === 'T'">链接</span>
            </template>
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
                ref="editDrawer"
                size="30%"
              >
                <div class="el-drawer-header">
                  <h3>编辑目录</h3>
                </div>
                <div class="el-drawer-content">
                  <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="资源名称" prop="name">
                      <el-input
                        v-model="form.name"
                        auto-complete="off"
                        size="small"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="资源类型" prop="type">
                      <el-select
                        v-model="form.type"
                        size="small"
                        :disabled="true"
                      >
                        <el-option label="目录" value="M"></el-option>
                        <el-option label="链接" value="T"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="资源路径"
                      prop="address"
                      v-if="form.type == 'T'"
                    >
                      <el-input
                        v-model="form.address"
                        auto-complete="off"
                        size="small"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      label="资源图标"
                      prop="icon"
                      v-if="form.type == 'M'"
                    >
                      <el-input
                        v-model="form.icon"
                        auto-complete="off"
                        size="small"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="el-drawer-footer">
                  <el-button
                    type="primary"
                    @click="saveAmendCatalogue('form', form, scope.row.id)"
                    >保存</el-button
                  >
                  <el-button @click="cancelForm" plain>取消</el-button>
                </div>
              </el-drawer>
              <!-- 只有在资源类型为目录时才能显示新增链接 -->
              <el-button
                size="small"
                type="success"
                @click="addLink(scope.row.id)"
                v-if="scope.row.type === 'M'"
                >新增链接</el-button
              >
              <el-drawer
                title="新增链接"
                :visible.sync="addLinkDrawer"
                :with-header="false"
                :wrapperClosable="false"
                :close-on-press-escape="false"
                ref="addLinkDrawer"
                size="30%"
              >
                <div class="el-drawer-header">
                  <h3>新增链接</h3>
                </div>
                <div class="el-drawer-content">
                  <el-form
                    :model="addLinkForm"
                    :rules="addLinkFormRules"
                    ref="addLinkForm"
                  >
                    <el-form-item label="资源名称" prop="name">
                      <el-input
                        v-model="addLinkForm.name"
                        auto-complete="off"
                        size="small"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="资源类型" prop="type">
                      <el-select v-model="addLinkForm.type" size="small">
                        <el-option
                          label="目录"
                          value="M"
                          :disabled="true"
                        ></el-option>
                        <el-option label="链接" value="T"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="资源路径" prop="address">
                      <el-input
                        v-model="addLinkForm.address"
                        auto-complete="off"
                        size="small"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="el-drawer-footer">
                  <el-button
                    type="primary"
                    @click="saveAddLink('addLinkForm', addLinkForm)"
                    >保存</el-button
                  >
                  <el-button @click="cancelAddLinkForm" plain>取消</el-button>
                </div>
              </el-drawer>
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
  </div>
</template>
<script>
import api from "../request/api";
import Vue from "vue";
export default {
  name: "menuManagement",
  inject: ["reload"],
  data() {
    return {
      addCatalogueDrawer: false,
      addCatalogueForm: {
        name: "",
        type: "",
        icon: ""
      },
      rules: {
        name: { required: true, message: "请输入资源名称", trigger: "blur" },
        icon: { required: true, message: "请输入资源图标", trigger: "blur" },
        type: { required: true, message: "请输入资源类型", trigger: "blur" },
        address: { required: true, message: "请输入资源路径", trigger: "blur" }
      },
      addLinkFormRules: {
        name: [{ required: true, message: "请输入资源名称", trigger: "blur" }],
        type: [{ required: true, message: "请输入资源类型", trigger: "blur" }],
        address: [
          { required: true, message: "请输入资源路径", trigger: "blur" }
        ]
      },
      form: {
        name: "",
        type: "",
        address: "",
        icon: ""
      },
      addLinkForm: {
        name: "",
        type: "",
        address: ""
      },
      menusItem: [],
      editDrawer: false,
      addLinkDrawer: false,
      linkID: null
    };
  },
  beforeMount() {
    api.systemService.menuManageList().then(res => {
      if (res.code == "00") {
        this.menusItem = this.listToTree(res.data);
      }
    });
  },
  methods: {
    //将扁平数组转化为树形结构
    listToTree(list) {
      let map = {},
        node,
        tree = [],
        i;
      for (i = 0; i < list.length; i++) {
        map[list[i].id] = list[i];
        list[i].children = [];
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.pId != "-1") {
          map[node.pId].children.push(node);
        } else {
          tree.push(node);
        }
      }
      return tree;
    },
    //树节点的展开
    openToggle(item) {
      Vue.set(item, "open", !item.open);
      for (let j = 0; j < this.menusItem.length; j++) {
        if (this.menusItem[j].id !== item.id) {
          continue;
        }
        if (item.open) {
          let menusItem = this.menusItem;
          item.children.forEach((child, index) => {
            menusItem.splice(j + index + 1, 0, child);
          });
        } else {
          this.menusItem.splice(j + 1, item.children.length);
        }
        break;
      }
    },
    addCatalogue() {
      this.addCatalogueDrawer = true;
    },
    cancelAddCatalogueForm() {
      this.addCatalogueDrawer = false;
    },
    resetForm() {
      this.$refs["addCatalogueForm"].resetFields();
    },
    showRow(row) {
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true;
      row.row._show = show;
      return show
        ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
        : "display:none;";
    },
    //保存修改的目录
    saveAmendCatalogue(formName, form, id) {
      const { name, icon, type } = form,
        reg = /[1-9][0-9]*/g,
        ids = parseInt(id.match(reg)[0]);
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = { id: ids, name, icon, type };
          api.systemService.menuManageEditSave(params).then(res => {
            if (res.code == "00") {
              this.reload();
              this.$notify.success({
                message: "保存成功",
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
    //保存新增的目录
    saveAddCatalogue(formName, addCatalogueForm) {
      const { name, type, icon } = addCatalogueForm;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = { name, icon, type, pId: "" };
          api.systemService.menuManageSaveAddCatalogue(params).then(res => {
            if (res.code == "00") {
              this.reload();
              this.$notify.success({
                message: "新增成功",
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
    //编辑目录
    edit(id) {
      this.editDrawer = true;
      api.systemService.menuManageEdit(id).then(res => {
        if (res.code == "00") {
          this.form = res.data;
        }
      });
    },
    cancelForm() {
      this.editDrawer = false;
    },
    cancelAddLinkForm() {
      this.addLinkDrawer = false;
    },
    //新增链接
    addLink(id) {
      this.addLinkDrawer = true;
      this.linkID = id;
    },
    //保存新增的链接
    saveAddLink(formName, addLinkForm) {
      const { name, address, type } = addLinkForm,
        pId = this.linkID;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = { pId, name, type, address };
          api.systemService.menuManageSaveAddCatalogue(params).then(res => {
            if (res.code == "00") {
              this.reload();
              this.$notify.success({
                message: "新增成功",
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
    //停用
    blockUp(id) {
      new this.$messageTips(({ alert }) => {
        alert({ content: "确定要停用吗?", tip: "确定停用" });
      }).then(() => {
        api.systemService.menuManageBlockUp(id).then(res => {
          if (res.code == "00") {
            this.reload();
            this.$notify({
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
        api.systemService.menuManageLaunch(id).then(res => {
          if (res.code == "00") {
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
.menuManagementHeader {
  line-height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.typeM {
  margin-left: 5px;
}

.typeT {
  margin-left: 20px;
}
.editIcon,
.addCatalogueIcon,
.addLinkIcon,
.closeIcon,
.checkIcon {
  font-size: 22px;
  color: #517fc3;
  margin-right: 10px;
  cursor: pointer;
}
.menuManagement .el-drawer-footer {
  width: 30%;
}
.menuManagement .el-select {
  width: 100%;
}
.menuManagement .el-form {
  margin-top: 20px;
}
.menuManagementBody {
  margin-top: 15px;
}
</style>
