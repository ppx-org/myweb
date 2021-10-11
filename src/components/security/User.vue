<template>
  <el-col :span="8">
    <el-form :inline="true" :model="form" class="my-query-form">
      <el-form-item>
        <el-button @click="addFormV=true">新增</el-button>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryPage">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border>
      <el-table-column prop="username" label="用户名" width="250">
        <template v-slot="col">
          <el-link type="primary" @click="selectUser(col.row)" href="#">{{ col.row.username }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template v-slot="col">
          <el-button size="mini" @click="edit(col.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <my-page ref="Page" :query="queryPage"></my-page>
  </el-col>

  <el-col :span="4" style="margin-left:10px; display: flex;width: 300px" class="el-table--mini">
      <div >
        <span>用户角色（选中:{{selectedUsername}}）</span>
        <div style="" v-if="userRoleList.length == 0" class="el-table__empty-text">暂无数据</div>
        <div style="margin-top:18px">
          <div :key="'user' + v" v-for="(v) in userRoleList" style="margin-top:12px">
            <el-popconfirm title="确定删除吗？" @confirm="userDelRole(v)">
              <template #reference><i class="el-icon-delete"></i></template>
            </el-popconfirm>
            {{v.roleName}}
          </div>
        </div>
      </div>
  </el-col>

  <el-col :span="4" style="margin-left:10px;">
    <div>
      <div>
        <span>待选角色</span>
        <el-button type="primary" @click="queryRole">查询</el-button>
      </div>
      <div>
        <div :key="'query' + v" v-for="(v) in queryRoleList" style="margin-top:12px">
          <a @click="userAddRole(v)" class="el-icon-circle-plus"></a>{{v.roleName}}
        </div>
      </div>
    </div>
  </el-col>

  <el-dialog title="新增" v-model="addFormV" :close-on-click-modal="false" width="500px">
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="username">
        <el-input type="password" v-model="addForm.password" style="width: 300px;"></el-input>
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
      <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="editForm.password" style="width: 300px;"></el-input>
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
      this.editForm = {userId: row.id, username: row.username};
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
      });
    },
    userDelRole(v) {
      this.axios.post(`${ctrl}userDelRole`, {resId:this.selectedUserId, roleId:v}).then((res) => {
        this.userRoleList = res.data.content;
        this.$forceUpdate();
      })
    },
    userAddRole(item) {
      if (!this.selectedUserId) {
        return this.$message.warning("请先选择用户")
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
