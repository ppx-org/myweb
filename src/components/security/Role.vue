<template>

  <el-col :span="8">
    <el-form :inline="true" :model="form" class="my-query-form">
      <el-form-item label="角色名称">
        <el-input v-model="form.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryPage">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 600px">
      <el-table-column prop="roleName" label="角色名称" @click="test()">
        <template v-slot="col">
          <el-link type="primary" @click="test(col.row)" href="#">{{ col.row.roleName }}</el-link>
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
    test(item) {
      // listResIdByRole
      let params = {roleId:item.roleId};
      this.axios.get(`${ctrl}listResIdByRole`, {params}).then((res) => {
        this.$refs.resTree.setCheckedNodes([]);


        // this.$refs.resTree.setCheckedNodes(res.data.content)
        const checkedResId = res.data.content;
        for (let i = 0; i < checkedResId.length; i++) {
          this.$refs.resTree.setChecked(checkedResId[i], true, false);
        }
        // this.checkedKeys = res.data.content;
      });

      this.selectedRoleId = item.roleId;
      this.selectedRoleName = item.roleName;

      // setCheckedNodes
      // let nodes = this.$refs.resTree.getCheckedNodes(false, true);
      // let id = [];
      // for (let i = 0; i < nodes.length; i++) {
      //   id.push(nodes[i].id);
      // }
      // alert(id);
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
      const treeData = [{id: 0, title: '资源x', sub: res.data.content}]
      this.data = treeData;
    })
  },
  mounted() {
    this.queryPage();
  }
}
</script>
