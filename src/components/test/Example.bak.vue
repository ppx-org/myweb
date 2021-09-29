
<template>
    <el-form :inline="true" :model="form" class="act-query-form">
        <el-form-item>
            <el-button @click="addFormV=true">新增</el-button>
        </el-form-item>
        <el-form-item label="客户">
            <el-input v-model="form.exampleName" placeholder="客户"></el-input>
        </el-form-item>
        <el-form-item label="类型">
            <el-select v-model="form.exampleType" placeholder="类型">
                <el-option v-for="(l,v) in dict.exampleType" :label="l" :value="v"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期">
            <el-date-picker v-model="form.exampleDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="时间">
            <el-date-picker v-model="form.exampleTime" type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item><el-button type="primary" @click="queryPage">查询</el-button></el-form-item>
    </el-form>

    <el-table @sort-change="(v) => this.$refs.Page.setOrder(v)" :data="tableData" border style="width: 100%">
        <el-table-column sortable="custom" prop="exampleDate" label="日期" width="180"></el-table-column>
        <el-table-column prop="exampleName" label="客户" width="180"></el-table-column>
        <el-table-column prop="exampleType" label="类型" :formatter="(v) => dict.exampleType[v.exampleType]"></el-table-column>
        <el-table-column prop="exampleTime" label="创建时间" width="180"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="mini" @click="edit(scope.row.exampleId)">编辑</el-button>
                <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.exampleId)">
                    <template #reference>
                        <el-button size="mini" type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <act-page ref="Page" :query="queryPage"></act-page>

    <el-dialog title="新增" v-model="addFormV" :close-on-click-modal="false" width="500px">
        <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
            <el-form-item label="客户" prop="exampleName">
                <el-input v-model="addForm.exampleName" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="addForm.exampleType" style="width: 300px;">
                    <el-option v-for="(l,v) in dict.exampleType" :label="l" :value="v"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker v-model="addForm.exampleDate" type="date"></el-date-picker>
            </el-form-item>
            <el-form-item label="时间">
                <el-date-picker v-model="addForm.exampleTime" type="datetime"></el-date-picker>
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
            <el-form-item label="客户"><el-input v-model="editForm.exampleName"></el-input></el-form-item>
            <el-form-item label="类型">
                <el-select v-model="editForm.exampleType" placeholder="类型">
                    <el-option v-for="(l,v) in dict.exampleType" :label="l" :value="v"></el-option>
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
    const ctrl = "/test/example/"
    export default {
        data() {
            return {
                tableData: [],
                form: {
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
                    exampleType: {'0':'类型0', '1':'类型1'}
                }
            }
        },
        methods: {
            insert() {
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        this.showLoading(true);
                        this.axios.post(`${ctrl}insert`, this.addForm).then((res) => {
                            this.addFormV = false;
                            this.queryPage();
                        })
                    }
                })
            },
            edit(id) {
                this.showLoading(true);
                this.axios.get(`${ctrl}get?id=${id}`).then((res) => {
                    this.showLoading(false);
                    this.editFormV = true;
                    this.editForm = res.data
                })
            },
            update() {
                this.showLoading(true);
                this.axios.post(`${ctrl}update`, this.editForm).then((res) => {
                    this.editFormV = false;
                    this.queryPage();
                })
            },
            del(id) {
                this.showLoading(true);
                this.axios.post(`${ctrl}del?id=${id}`).then((res) => {
                    this.queryPage();
                })
            },
            queryPage() {
                this.showLoading(true);
                let params = this.$refs.Page.getParams(this.form);
                this.axios.get(`${ctrl}queryPage?${params}`).then((res) => {
                    this.$refs.Page.setPage(res);
                    this.tableData = res.data;
                    this.showLoading(false);
                })
            }
        },
        mounted() {
            this.queryPage();
        }
    }
</script>

<style scoped>
</style>
