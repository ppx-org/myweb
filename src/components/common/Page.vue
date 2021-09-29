<template>
    <el-pagination @size-change="queryPage" @current-change="queryPage" v-model:currentPage="page.current"
                   layout="total, sizes, prev, pager, next"
                   :page-sizes="[3, 10, 100]" v-model:page-size="page.size" :total="page.total">
    </el-pagination>
</template>

<script>
export default {
    props: ["query"],
    data() {
        return {
            page: {
                size: 3,
                current: 1,
                total: 0,
                sort: [],
                dir: []
            }
        }
    },
    methods: {
        queryPage() {
            this.query();
        },
        getParams(formObject) {
            let paraPage = {...this.page}
            paraPage.total = null;
            return this.utils.stringify(paraPage) + "&" + this.utils.stringify(formObject);
        },
        setPage(backJson) {
            this.page.size = backJson.page.size;
            this.page.total = backJson.page.total;
            this.page.current = backJson.page.current;
        },
        setOrder(sort) {
            // exampleDate descending|ascending
            sort.prop = sort.prop === null ? "" : sort.prop;
            sort.order = sort.order === null ? "" : sort.order;

            this.page.sort = [sort.prop];
            this.page.dir = [sort.order.replace("ending", "")];
            this.query();
        }
    }
}
</script>
