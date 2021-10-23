<template>
  <el-form :inline="true" :model="form" class="my-query-form">
    <el-form-item label="字典类型" style="width:200px">
      <el-select v-model="form.dictType" @change="queryPage">
        <el-option label="全部" value="" selected></el-option>
        <el-option :key="v" v-for="(l,v) in dict.dictType" :label="l" :value="v"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="queryPage">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="addFormV=true">新增</el-button>
    </el-form-item>
  </el-form>

  <el-table empty-text="-" stripe :data="tableData" border style="width: 100%">
    <el-table-column prop="dictType" label="字典类型" width="220" :formatter="(v) => dict.dictType[v.dictType]"></el-table-column>
    <el-table-column prop="dictVal" label="字典值" width="200"></el-table-column>
    <el-table-column prop="dictName" label="字典名称" width="250"></el-table-column>
    <el-table-column prop="dictEnable" label="字典状态" width="100">
      <template v-slot="col">
        <span :style="col.row.dictEnable ? '' : 'color:#ACA899'">{{dict.dictEnable[col.row.dictEnable]}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" fixed="right">
      <template v-slot="col">
        <el-button @click="edit(col.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <my-page ref="Page" :query="queryPage"></my-page>

  <el-dialog title="新增" v-model="addFormV" :close-on-click-modal="false" width="480px">
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
      <el-form-item label="字典类型" prop="dictType">
        <el-select v-model="addForm.dictType" class="my-input">
          <el-option v-for="(l,v) in dict.dictType" :label="l" :value="v" :key="v"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字典值" prop="dictVal">
        <el-input v-model="addForm.dictVal" maxlength="3" class="my-input"></el-input>
      </el-form-item>
      <el-form-item label="字典名称" prop="dictName">
        <el-input v-model="addForm.dictName" maxlength="16" class="my-input"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addFormV = false">取 消</el-button>
        <el-button type="primary" @click="insert">确 定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog title="编辑" v-model="editFormV" :close-on-click-modal="false" width="480px">
    <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
      <el-form-item label="字典类型" prop="dictType">
        <el-select v-model="editForm.dictType" class="my-input" disabled>
          <el-option v-for="(l,v) in dict.dictType" :label="l" :value="v" :key="v"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字典值" prop="dictVal">
        <el-input v-model="editForm.dictVal" maxlength="3" class="my-input" disabled></el-input>
      </el-form-item>
      <el-form-item label="字典名称" prop="dictName">
        <el-input v-model="editForm.dictName" maxlength="16" class="my-input"></el-input>
      </el-form-item>
      <el-form-item label="字典状态" prop="dictType">
        <el-select v-model="editForm.dictEnable" class="my-input">
          <el-option v-for="(l,v) in dict.dictEnable" :label="l" :value="v" :key="v"></el-option>
        </el-select>
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
const action = "/base/dict/"
export default {
  data() {
    return {
      advanced: false,
      tableData: [],
      form: {
        dictVal: '',
        dictType: '',
        dictName: '',
        dictEnable: '',
      },
      addForm: {...this.form},
      editForm: {...this.form},
      rules: {
        dictType: [{required: true, message: '必填'}],
        dictVal: [{required: true, message: '必填'}],
        dictName: [{required: true, message: '必填'}],
      },
      addFormV: false,
      editFormV: false,
      dict: {
        dictType: {'base-sex': '性别', 'base-test': '测试'},
        dictEnable: {'true':'正常', 'false':'作废'},
      },
    }
  },
  methods: {
    queryPage() {
      let params = this.$refs.Page.getParams(this.form);
      this.axios.get(`${action}page`, {params}).then((res) => {
        this.$refs.Page.setPage(res.data);
        this.tableData = res.data.content;
      })
    },
    insert() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) return;
        this.axios.post(`${action}insert`, this.addForm, {headers: {hideLoading: false}}).then(() => {
          this.addFormV = false;
          this.queryPage();
        })
      })
    },
    edit(row) {
      this.editForm = {...row};
      this.editForm.dictEnable = row.dictEnable ? 'true' : 'false';
      this.editFormV = true;
    },
    update() {
      this.axios.post(`${action}update`, this.editForm, {headers: {hideLoading: false}}).then(() => {
        this.editFormV = false;
        this.queryPage();
      })
    },
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
