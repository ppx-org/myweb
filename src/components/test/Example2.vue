<template>
  <el-form :inline="true" :model="form" class="my-query-form">
    <el-row>
    <el-form-item label="客户">
      <el-input v-model="form.exampleName" placeholder="客户"></el-input>
    </el-form-item>
    <el-form-item label="类型" style="width:150px">
      <el-select v-model="form.exampleType" placeholder="类型">
        <el-option :key="v" v-for="(l,v) in dict.exampleType" :label="l" :value="v"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker v-model="form.exampleDate" type="date" value-format="YYYY-MM-DD"></el-date-picker>
    </el-form-item>
    <el-form-item label="时间">
      <el-date-picker v-model="form.exampleTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
    </el-form-item>
    <el-form-item>
      <a href="#" @click="advanced = !advanced">
        <span>{{ advanced ? '收起' : '展开'}}</span>
        <i :class="advanced ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
      </a>
      <el-button type="primary" @click="queryPage">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="addFormV=true">新增</el-button>
    </el-form-item>
    </el-row>

    <el-collapse-transition>
    <el-row v-show="advanced">
      <el-form-item label="时间">
        <el-date-picker v-model="form.exampleTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
      </el-form-item>
    </el-row>
    </el-collapse-transition>
  </el-form>

  <el-table empty-text="-" stripe @sort-change="(v) => this.$refs.Page.setOrder(v)" :data="tableData" border
            style="width: 100%">
    <el-table-column prop="exampleName" label="exampleName" width="380" sortable="custom"></el-table-column>
    <el-table-column prop="exampleType" label="exampleType" width="380" :formatter="(v) => dict.exampleType[v.exampleType]"></el-table-column>
    <el-table-column prop="exampleTime" label="exampleTime" width="580"></el-table-column>
    <el-table-column prop="exampleTime" label="创建时间" width="580"></el-table-column>
    <el-table-column label="操作" fixed="right" width="150">
      <template v-slot="col">
        <el-button @click="edit(col.row.exampleId)">编辑</el-button>
        <el-popconfirm title="确定删除吗？" @confirm="del(col.row)">
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <my-page ref="Page" :query="queryPage"></my-page>

  <el-dialog title="新增" v-model="addFormV" :close-on-click-modal="false" width="480px">
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
      <el-form-item label="客户" prop="exampleName">
        <el-input v-model="addForm.exampleName" maxlength="16" class="my-input"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="addForm.exampleType" class="my-input">
          <el-option v-for="(l,v) in dict.exampleType" :label="l" :value="v" :key="v"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker v-model="addForm.exampleDate" type="date" style="width:300px"></el-date-picker>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker v-model="addForm.exampleTime" type="datetime"  style="width:300px"></el-date-picker>
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
      <el-form-item label="客户">
        <el-input v-model="editForm.exampleName" maxlength="16" class="my-input"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="editForm.exampleType" placeholder="类型" class="my-input">
          <el-option v-for="(l,v) in dict.exampleType" :label="l" :value="v" :key="v"></el-option>
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
const action = "/test/example/"
export default {
  data() {
    return {
      advanced: false,
      tableData: [],
      form: {
        exampleId: '',
        exampleName: '',
        exampleType: '',
        exampleDate: '',
        exampleTime: ''
      },
      addForm: {...this.form},
      editForm: {...this.form},
      rules: {
        exampleName: [
          {required: true, message: '必填'}
        ]
      },
      addFormV: false,
      editFormV: false,
      dict: {
        exampleType: {'t': 'TYPE', 'y': 'YES'}
      }
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
    edit(id) {
      this.axios.get(`${action}get?id=${id}`).then((res) => {
        this.editForm = res.data.content;
        this.editFormV = true;
      })
    },
    update() {
      this.axios.post(`${action}update`, this.editForm, {headers: {hideLoading: false}}).then(() => {
        this.editFormV = false;
        this.queryPage();
      })
    },
    del(row) {
      this.axios.post(`${action}del?id=${row.exampleId}`).then(() => {
        this.queryPage();
      })
    },
  },
  mounted() {
    this.queryPage();
    this.addForm.exampleType = 't';
  }
}
</script>

<style scoped>
.my-input {
  width: 300px;
}
</style>
