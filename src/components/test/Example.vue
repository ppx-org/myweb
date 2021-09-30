
<template>
    <el-form :inline="true" :model="form" class="act-query-form">
        <el-form-item>
            <el-button @click="addFormV=true">新增</el-button>
        </el-form-item>
        <el-form-item label="name">
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
        <el-table-column prop="exampleName" label="exampleName"></el-table-column>
        <el-table-column prop="exampleType" label="exampleType" :formatter="(v) => dict.exampleType[v.exampleType]"></el-table-column>
        <el-table-column sortable="custom" prop="exampleTime" label="exampleTime" width="180"></el-table-column>
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
    <my-page ref="Page" :query="queryPage"></my-page>
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
                dict: {
                    exampleType: {'t':'TYPE', 'y':'YES'}
                }
            }
        },
        methods: {
            queryPage() {
              let params = this.$refs.Page.getParams(this.form);
              this.axios.get(`${ctrl}page`, {params}).then((res) => {
                this.$refs.Page.setPage(res.data);
                this.tableData = res.data.content;
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
