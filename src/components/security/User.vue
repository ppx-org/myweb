<template>
  <el-col :span="10" style="width:600px">
    <el-form :inline="true" :model="form" class="my-query-form">
      <el-form-item>
        <el-button @click="addFormV=true">新增</el-button>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="form.username" placeholder="用户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryPage">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border >
      <el-table-column prop="userId" label="用户ID" width="100"></el-table-column>
      <el-table-column prop="username" label="用户名称" width="">
        <template v-slot="col">
          <el-link type="primary" @click="selectUser(col.row)" href="#">{{ col.row.username }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="col">
          <el-button size="mini" @click="edit(col.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <my-page ref="Page" :query="queryPage"></my-page>
  </el-col>

  <el-col :span="5" style="margin-left:10px; width: 300px">
    <el-form :inline="true" class="my-query-form">
      <el-form-item>
        用户（{{selectedUsername}}）的角色
      </el-form-item>
    </el-form>

    <el-table :data="userRoleList" border >
      <el-table-column prop="roleName" label="角色名称" width=""></el-table-column>
      <el-table-column label="操作" width="100">
        <template v-slot="col">
          <el-popconfirm title="确定删除吗？" @confirm="userDelRole(col.row)">
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-col>

  <el-col :span="5" style="margin-left:10px; width: 300px">
    <el-form :inline="true" class="my-query-form">
      <el-form-item>待选角色</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryRole">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="queryRoleList" border>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column label="操作" width="110">
        <template v-slot="col">
          <el-button size="mini" @click="userAddRole(col.row)">添加角色</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-col>


  <el-dialog title="新增" v-model="addFormV" :close-on-click-modal="false" width="480px">
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="addForm.username" class="my-input" maxlength="16"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="username">
        <el-input type="password" v-model="addForm.password" class="my-input" maxlength="16"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addFormV = false">取 消</el-button>
        <el-button type="primary" @click="insert">确 定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog title="编辑" v-model="editFormV" :close-on-click-modal="false" width="500px">
    <el-form ref="editForm" :model="editForm" label-width="80px">
      <el-form-item label="用户名称" prop="username">
          <el-input v-model="editForm.username" class="my-input" maxlength="16"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input type="password" v-model="editForm.password" class="my-input" maxlength="16"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editFormV = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
const ctrl = "/security/user/"
export default {
  data() {
    return {
      tableData: [],
      form: {
        userId: '',
        username: '',
        password: '',
      },
      selectedUserId: '',
      selectedUsername: '无',
      userRoleList: [],
      queryRoleList: [],

      addForm: {...this.form},
      editForm: {...this.form},
      rules: {
        username: [
          {required: true, message: '必填'}
        ],
        password: [
          {required: true, message: '必填'}
        ],
      },
      addFormV: false,
      editFormV: false,
      passwordOld: '',
    }
  },
  methods: {
    queryPage() {
      let params = this.$refs.Page.getParams(this.form);
      this.axios.get(`${ctrl}page`, {params}).then((res) => {
        this.$refs.Page.setPage(res.data);
        this.tableData = res.data.content;
      })
    },
    insert() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) return;
        this.axios.post(`${ctrl}insert`, this.addForm).then(() => {
          this.addFormV = false;
          this.queryPage();
        })
      })
    },
    edit(row) {
      this.editForm = {userId: row.userId, username: row.username, password: row.password};
      this.passwordOld = row.password;
      this.editFormV = true;
    },
    update() {
      const editForm = {...this.editForm};
      if (this.editForm.password === this.passwordOld) {
        editForm.password = null;
      }
      this.axios.post(`${ctrl}update`, editForm).then(() => {
          this.editFormV = false;
          this.queryPage();
      })
    },
    selectUser(item) {
      let params = {userId:item.userId};
      this.axios.get(`${ctrl}listUserRole`, {params}).then((res) => {
        this.userRoleList = res.data.content;
      });

      this.selectedUserId = item.userId;
      this.selectedUsername = item.username;
    },
    queryRole() {
      this.axios.get(`${ctrl}listRole`, {}).then((res) => {
        this.queryRoleList = res.data.content;
        this.$forceUpdate();
      });
    },
    userDelRole(row) {
      this.axios.post(`${ctrl}userDelRole`, {userId:this.selectedUserId, roleId:row.roleId}).then((res) => {
        this.userRoleList = res.data.content;
        this.$forceUpdate();
      })
    },
    userAddRole(item) {
      if (!this.selectedUserId) {
        return this.$message.warning("请先选择用户")
      }
      for (let i = 0; i < this.userRoleList.length; i++) {
        if (this.userRoleList[i].roleId === item.roleId) {
          return this.$message.warning("角色已经存在");
        }
      }
      const param = {userId:this.selectedUserId, roleId:item.roleId}
      this.axios.post(`${ctrl}saveUserRole`, param).then((res) => {
        this.userRoleList = res.data.content;
        this.$forceUpdate();
      })
    }
  },
  mounted() {
    this.queryPage();
  }
}
</script>

<style scoped>
.my-input {
  width: 300px;
}
</style>