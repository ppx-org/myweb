<template>
  <el-pagination @size-change="queryPage" @current-change="queryPage" v-model:currentPage="page.page" class="my-pagination"
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
        size: 3, page: 1, total: 0, sort: []
      }
    }
  },
  methods: {
    queryPage() {
      this.query();
    },
    getParams(formObject) {
      let r = Object.assign({page: this.page.page - 1, size: this.page.size, sort: this.page.sort}, formObject);
      console.log(">>> request getParams")
      console.log(r)
      return r;
    },
    setPage(backJson) {
      this.page.total = backJson.totalElements;
    },
    setOrder(sort) {
      console.log(sort.column)
      // exampleDate descending|ascending  传参sort=firstname&sort=lastname,desc
      sort.prop = sort.prop == null ? "" : sort.prop;
      sort.order = sort.order == null ? "" : sort.order;
      this.page.sort = [sort.prop + "," + sort.order.replace("ending", "")];
      this.query();
    }
  }
}
</script>
