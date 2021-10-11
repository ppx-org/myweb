<template>
  <el-col :span="8">
    <el-form :inline="true" :model="form" class="my-query-form">
      <el-form-item label="用户名称">
        <el-input v-model="form.username" placeholder="用户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryPage">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 600px">
      <el-table-column prop="roleName" label="用户名称" @click="test()">
        <template v-slot="col">
          <el-link type="primary" @click="selectUser(col.row)" href="#">{{ col.row.username }}</el-link>
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
      },
      selectedUserId: '',
      selectedUsername: '无',
      userRoleList: [],
      queryRoleList: []
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
        this.userRuleList = res.data.content;
        this.$forceUpdate();
      })
    },
    userAddRole(item) {
      if (!this.selectedUserId) {
        return this.$message.warning("请先选择用户")
      }
      const param = {userId:this.selectedUserId, roleId:item.roleId}
      this.axios.post(`${ctrl}saveUserRole`, param).then(() => {
        this.$message.success("保存成功");
      })
    }
  },
  mounted() {
    this.queryPage();
  }
}
</script>
