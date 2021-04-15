<template>
  <div class="userManagement">
    <div class="userManagementHeader">
      <p>当前位置: 用户管理</p>
    </div>
    <header>
      <div class="searchBox">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          :label-position="labelPosition"
        >
          <el-input
            placeholder="请输入用户姓名"
            size="small"
            v-model="ruleForm.trueName"
          ></el-input>
          <el-input
            placeholder="请输入登录名"
            size="small"
            v-model="ruleForm.userName"
          ></el-input>
          <el-input
            placeholder="请输入手机号"
            size="small"
            v-model="ruleForm.mobile"
          ></el-input>
          <el-input
            placeholder="请输入邮箱"
            size="small"
            v-model="ruleForm.email"
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
          @click="addUser()"
          style="margin-right:10px"
          class="addButton"
          >新增用户</el-button
        >
        <el-drawer
          title="新增用户"
          :visible.sync="addUserDrawer"
          :with-header="false"
          :wrapperClosable="false"
          :close-on-press-escape="false"
          ref="addUserDrawer"
          @close="resetForm('addUserForm')"
          size="30%"
          class="addUserDrawer"
        >
          <div class="el-drawer-header">
            <h3>新增用户</h3>
          </div>
          <div class="el-drawer-content">
            <el-form :model="addUserForm" ref="addUserForm" :rules="editRules">
              <el-form-item prop="trueName" label="用户名">
                <el-input
                  size="small"
                  v-model="addUserForm.trueName"
                  autocomplete="off"
                  maxlength="20"
                ></el-input>
              </el-form-item>
              <el-form-item prop="userName" label="登录名">
                <el-input
                  size="small"
                  v-model="addUserForm.userName"
                  autocomplete="off"
                  maxlength="20"
                ></el-input>
              </el-form-item>
              <el-form-item prop="pass" label="用户密码">
                <el-input
                  size="small"
                  show-password
                  v-model="addUserForm.pass"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="checkPass" label="确认密码">
                <el-input
                  size="small"
                  show-password
                  v-model="addUserForm.checkPass"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="sex" label="性别">
                <el-select
                  v-model="addUserForm.sex"
                  size="small"
                  placeholder="请选择性别"
                >
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="mobile" label="手机号">
                <el-input
                  size="small"
                  v-model="addUserForm.mobile"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="email" label="电子邮箱">
                <el-input
                  size="small"
                  v-model="addUserForm.email"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="status" label="是否有效">
                <el-select
                  v-model="addUserForm.status"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="el-drawer-footer">
            <el-button
              type="primary"
              @click="saveaddUserForm('addUserForm', addUserForm)"
              >保存</el-button
            >
            <el-button @click="canceladdUserForm()" plain>取消</el-button>
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
    </header>
    <div class="userManagementBody">
      <template>
        <el-table
          :data="listItem"
          ref="listItem"
          v-loading="loading"
          element-loading-text="加载中"
        >
          <el-table-column type="index" label="序号" min-width="10%">
            <template slot-scope="scope">
              <span>{{ (curpage - 1) * limit + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="trueName"
            label="用户名"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="登录名"
            min-width="15%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="sex" label="性别" min-width="8%">
            <template slot-scope="scope">
              <span v-if="scope.row.sex == '1'">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号"
            min-width="15%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="电子邮箱"
            min-width="15%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="status" label="是否有效" min-width="10%">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '1'">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            :show-overflow-tooltip="true"
            min-width="15%"
          ></el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间"
            :show-overflow-tooltip="true"
            min-width="15%"
          ></el-table-column>
          <el-table-column label="操作" prop="operate" min-width="50%">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="edit(scope.row.id)"
                >编辑</el-button
              >

              <el-button
                size="small"
                type="warning"
                @click="resetPassword(scope.row.id)"
                >重置密码</el-button
              >

              <el-button
                size="small"
                type="success"
                v-if="scope.row.status == 1"
                @click="setRole(scope.row.id)"
                >设置角色</el-button
              >
              <el-dialog
                title="角色列表"
                :visible.sync="dialogVisible"
                width="20%"
              >
                <el-tree
                  :data="roleTreeData"
                  node-key="id"
                  show-checkbox
                  :default-checked-keys="setRoleList"
                  @check="handleCheck"
                ></el-tree>
                <div class="el-dialog-footer" style="text-align:center">
                  <el-button type="primary" @click="setRoleSave"
                    >确定</el-button
                  >
                </div>
              </el-dialog>
              <el-button
                size="small"
                type="danger"
                v-if="
                  !(scope.row.userName == getLocalStorageUserName) &&
                    scope.row.status == 1
                "
                @click="blockUp(scope.row.id)"
                >停用</el-button
              >
              <el-button
                type="danger"
                size="small"
                v-if="scope.row.status == 0"
                @click="launch(scope.row.id)"
                >启用</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 编辑用户开始drawer -->
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
            <h3>编辑</h3>
          </div>
          <div class="el-drawer-content">
            <el-form
              :model="editForm"
              ref="editForm"
              :rules="editRules"
              :label-position="labelPosition"
            >
              <el-form-item prop="trueName" label="用户名">
                <el-input
                  v-model="editForm.trueName"
                  autocomplete="off"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item prop="userName" label="登录名">
                <el-input
                  v-model="editForm.userName"
                  :disabled="editForm.userName == getLocalStorageUserName"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item prop="sex" label="性别">
                <el-select v-model="editForm.sex" size="small">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="mobile" label="手机号">
                <el-input
                  size="small"
                  v-model="editForm.mobile"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="email" label="电子邮箱">
                <el-input
                  v-model="editForm.email"
                  autocomplete="off"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item prop="status" label="是否有效">
                <el-select
                  v-model="editForm.status"
                  :disabled="editForm.userName == getLocalStorageUserName"
                  size="small"
                >
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="el-drawer-footer">
            <el-button
              type="primary"
              @click="editFormSave('editForm', editForm)"
            >
              保存</el-button
            >
            <el-button plain @click="editFormCancel">取消</el-button>
          </div>
        </el-drawer>
        <!-- 编辑用户drawer结束 -->
        <!-- 重置密码drawer开始 -->
        <el-drawer
          title="重置密码"
          :visible.sync="resetPasswordDrawer"
          :with-header="false"
          :wrapperClosable="false"
          :close-on-press-escape="false"
          ref="resetPasswordDrawer"
          size="30%"
        >
          <div class="el-drawer-header">
            <h3>重置密码</h3>
          </div>
          <div class="el-drawer-content">
            <el-form
              :model="resetPasswordForm"
              ref="resetPasswordForm"
              :rules="resetPasswordRules"
              :label-position="labelPosition"
            >
              <el-form-item label="用户密码" prop="pass">
                <el-input
                  size="small"
                  show-password
                  v-model="resetPasswordForm.pass"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  size="small"
                  show-password
                  v-model="resetPasswordForm.checkPass"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="el-drawer-footer">
            <el-button
              type="primary"
              @click="saveresetPassword('resetPasswordForm', resetPasswordForm)"
              >保存</el-button
            >
            <el-button @click="cancelresetPassword()" plain>取消</el-button>
          </div>
        </el-drawer>
        <!-- 重置密码drawer结束 -->
      </template>
    </div>
    <div class="userManageBase">
      <pagination @pageChanged="onPageChanged"></pagination>
    </div>
  </div>
</template>
<script>
import api from "../request/api";
import md5 from "js-md5";
import pagination from "../common/pagination";
import pageMixins from "../../utils/pageMixins";
export default {
  name: "userList",
  components: { pagination },
  mixins: [pageMixins],
  inject: ["reload"],
  data() {
    const validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.resetPasswordForm.checkPass !== "") {
            this.$refs.resetPasswordForm.validateField("checkPass");
          }
          callback();
        }
      },
      validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.resetPasswordForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      },
      validatePass3 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.addUserForm.checkPass !== "") {
            this.$refs.addUserForm.validateField("checkPass");
          }
          callback();
        }
      },
      validatePass4 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.addUserForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
    return {
      loading: false,
      ruleForm: {
        trueName: "",
        userName: "",
        mobile: "",
        email: "",
        status: ""
      },
      addUserForm: {
        trueName: "",
        userName: "",
        pass: "",
        checkPass: "",
        sex: "",
        mobile: "",
        email: "",
        isDynamic: "",
        isShelling: "",
        status: ""
      },
      editForm: {
        trueName: "",
        userName: "",
        sex: "",
        mobile: "",
        email: "",
        isDynamic: "",
        isShelling: "",
        status: ""
      },
      resetPasswordForm: {
        pass: "",
        checkPass: ""
      },
      roleList: [],
      setRoleList: [],
      listItem: [],
      roleTreeData: [],
      loading: false,
      labelPosition: "right",
      resetPasswordId: null,
      editRules: {
        trueName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
        pass: [{ required: true, validator: validatePass3, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass4, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^[1][3|4|5|6|7|8|9][0-9]{9}$/,
            message: "请输入正确的手机号"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        sex: [{ required: true, message: "请输入性别", trigger: "change" }],
        isDynamic: [
          { required: true, message: "是否动态检测", trigger: "change" }
        ],
        isShelling: [
          { required: true, message: "是否脱壳", tirgger: "change" }
        ],
        status: [{ required: true, message: "是否有效", trigger: "change" }]
      },
      dialogVisible: false,
      resetPasswordDrawer: false,
      addUserDrawer: false,
      editDrawer: false,
      resetPasswordRules: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      curpage: 1,
      limit: 10
    };
  },
  computed: {
    getLocalStorageUserName: function() {
      return JSON.parse(localStorage.getItem("userInfo")).userName;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const params = {};
      params.queryInfo = this.ruleForm;
      this.getDataItem(this.addPageInfo(params));
    },
    getDataItem(params) {
      api.systemService.userManageList(params).then(res => {
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
    refresh() {
      this.reload();
    },
    handleCheck(checkedNodes, checkedKeys) {
      /* this.checkedNodes = checkedKeys.checkedNodes; */
      this.setRoleList = [];
      checkedKeys.checkedNodes.forEach(v => {
        this.setRoleList.push(v.id);
      });
    },
    editFormCancel() {
      this.editDrawer = false;
    },
    //编辑
    edit(id) {
      this.editDrawer = true;
      this.editId = id;
      api.systemService.userManageDetail(id).then(res => {
        if (res.code == "00") {
          this.editForm = res.data;
        }
      });
    },
    //编辑保存
    editFormSave(formName, form) {
      const id = this.editId,
        { trueName, userName, email, mobile, status, sex } = form;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = { id, trueName, userName, email, mobile, status, sex };
          api.systemService.userManageSave(params).then(res => {
            if (res.code == "00") {
              this.editDrawer = false;
              this.reload();
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
    //重置密码
    resetPassword(id) {
      this.resetPasswordId = id;
      this.resetPasswordDrawer = true;
    },
    cancelresetPassword() {
      this.resetPasswordDrawer = false;
    },
    //保存存置密码
    saveresetPassword(formName, form) {
      const id = this.resetPasswordId,
        password = md5(form.pass),
        checkPass = md5(form.checkPass),
        params = { id, password, checkPass };
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.systemService.userManageResetPwd(params).then(res => {
            if (res.code == "00") {
              this.$notify.success({
                message: "重置密码成功",
                showClose: false,
                duration: 1000
              });
            }
          });
          this.resetPasswordDrawer = false;
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
        api.systemService.userManageBolockUp(id).then(res => {
          if (res.code === "00") {
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
        api.systemService.userManageLaunch(id).then(res => {
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
    },
    //设置角色开始
    setRole(id) {
      this.setRoleId = id;
      this.dialogVisible = true;
      api.systemService.userManageSetRole(id).then(res => {
        if (res.code == "00") {
          let data = res.data;
          data = JSON.parse(JSON.stringify(data).replace(/name/g, "label"));
          this.roleTreeData = data;
          this.roleTreeData.forEach((v, i) => {
            if (v.checked == true) {
              this.setRoleList.push(v.id);
              this.setRoleList = Array.from(new Set(this.setRoleList));
            }
          });
        }
      });
    },
    setRoleSave() {
      const id = this.setRoleId,
        roleList = this.setRoleList;
      new this.$messageTips(({ confirm }) => {
        confirm({ content: "确定要更新用户角色吗?" });
      }).then(res => {
        const params = { roleList, userId: id };
        api.systemService.userManageSaveUserRole(params).then(res => {
          if (res.code == "00") {
            this.$notify({
              message: "更新成功",
              type: "success",
              duration: 1000
            });
            this.reload();
            this.dialogVisible = false;
          }
        });
      });
    },
    //设置角色结束
    //新增用户
    addUser() {
      this.addUserDrawer = true;
    },
    //保存新增的用户
    saveaddUserForm(formName, form) {
      const trueName = form.trueName,
        userName = form.userName,
        password = md5(form.pass),
        mobile = form.mobile,
        email = form.email,
        sex = form.sex,
        status = form.status;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            trueName,
            userName,
            password,
            mobile,
            email,
            sex,
            status
          };
          api.systemService.userManageCheckUserName(userName).then(res => {
            if (res) {
              api.systemService.userManageSave(params).then(res => {
                if (res.code == "00") {
                  this.addUserDrawer = false;
                  this.reload();
                  this.$notify.success({
                    message: "新增用户成功",
                    showClose: false,
                    duration: 1000
                  });
                }
              });
            } else {
              this.$message.error("登录名已存在");
            }
          });
        } else {
          return false;
        }
      });
    },
    canceladdUserForm() {
      this.addUserDrawer = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.userManagementHeader {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.userManagementBody {
  width: 99%;
  margin-top: 15px;
}
.userManagement .searchBox .el-input {
  margin: 0px 5px 5px 0px;
  width: auto;
}
.userManagement header {
  box-sizing: border-box;
  display: flex;
}
.userManagement .searchBox {
  width: 75%;
}
.userManagement .searchBox .el-input,
.userManagement .searchBox .el-select {
  width: 18%;
}
.userManagement .searchBox .el-select .el-input {
  width: 100%;
}
.userManagement .el-drawer-content .el-select {
  width: 100%;
}
.userManagement .operateBox {
  width: 20%;
}
.userManagement .el-drawer-footer {
  width: 30%;
}
.userManagementBase {
  margin-top: 20px;
}
.userManageBase {
  margin-top: 10px;
}
</style>
