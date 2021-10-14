<template>

  <el-col :span="8">
    <el-form :inline="true" :model="form" class="my-query-form">
      <el-form-item>
        <el-button @click="addFormV=true">新增</el-button>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input v-model="form.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryPage">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 600px">
      <el-table-column prop="roleName" label="角色名称">
        <template v-slot="col">
          <el-link type="primary" @click="selectRole(col.row)" href="#">{{ col.row.roleName }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="col">
          <el-button @click="edit(col.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="del(col.row)">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <my-page ref="Page" :query="queryPage"></my-page>
  </el-col>

  <el-col :span="6" style="margin-left:10px">
    <el-form :inline="true" class="my-query-form">
      <el-form-item>
        <el-button type="primary" @click="saveRoleRes">保存</el-button>
      </el-form-item>
      <span>选中：{{selectedRoleName}}</span>
    </el-form>
  <el-tree ref="resTree"
           :data="data"
           show-checkbox
           node-key="id"
           :default-expanded-keys="[0]"
           :default-checked-keys="checkedKeys"
           :props="defaultProps" style="width: 400px;"/>
  </el-col>

  <el-dialog title="新增" v-model="addFormV" :close-on-click-modal="false" width="480px">
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addForm.roleName" class="my-input" maxlength="16"></el-input>
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
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="editForm.roleName" class="my-input" maxlength="16"></el-input>
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
const ctrl = "/security/role/"
export default {
  data() {
    return {
      checkedKeys: [],
      data: [],
      defaultProps: {children: 'sub', label: 'title'},

      tableData: [],
      form: {
        roleId: '',
        roleName: '',
      },
      addForm: {...this.form},
      editForm: {...this.form},
      addFormV: false,
      editFormV: false,
      rules: {
        roleName: [
          {required: true, message: '必填'}
        ]
      },
      selectedRoleId: '',
      selectedRoleName: '无'
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
        this.axios.post(`${ctrl}insert`, this.addForm, {headers: {hideLoading: false}}).then(() => {
          this.addFormV = false;
          this.queryPage();
        })
      })
    },
    edit(row) {
      this.editForm = {roleId: row.roleId, roleName: row.roleName};
      this.editFormV = true;
    },
    update() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) return;
        this.axios.post(`${ctrl}update`, this.editForm, {headers: {hideLoading: false}}).then(() => {
          this.editFormV = false;
          this.queryPage();
        })
      })
    },
    del(row) {
      this.axios.post(`${ctrl}del?id=${row.roleId}`).then(() => {
        this.queryPage();
      })
    },
    selectRole(role) {
      let params = {roleId:role.roleId};
      this.axios.get(`${ctrl}listResIdByRole`, {params}).then((res) => {
        this.$refs.resTree.setCheckedNodes([]);
        const checkedResId = res.data.content;
        for (let i = 0; i < checkedResId.length; i++) {
          this.$refs.resTree.setChecked(checkedResId[i], true, false);
        }
      });

      this.selectedRoleId = role.roleId;
      this.selectedRoleName = role.roleName;
    },
    saveRoleRes() {
      if (!this.selectedRoleId) {
        return this.$message.warning("请先选择角色")
      }
      let nodes = this.$refs.resTree.getCheckedNodes(false, true);
      let resId = [];
      for (let i = 0; i < nodes.length; i++) {
        resId.push(nodes[i].id);
      }
      console.log("00000000")
      console.log(resId)

      const param = {roleId:this.selectedRoleId, resId:resId}
      this.axios.post(`${ctrl}saveRoleRes`, param).then(() => {
        this.$message.success("保存成功");
      })
    }
  },
  created: function() {
    let api = "/security/res/listAllRes";
    this.axios.get(api, {}).then((res) => {
      const treeData = [{id: 0, title: '资源', sub: res.data.content}]
      this.data = treeData;
    })
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