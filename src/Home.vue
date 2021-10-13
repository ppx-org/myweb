<template>
  <el-container>
    <el-aside width="200px"><Menu /></el-aside>
    <el-container>
      <el-header height="55px">发版系统</el-header>
      <el-main v-loading="loading"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from './components/security/Menu.vue'
export default {
  data() {
    return {
      loading: false
    }
  },
  components: {
    Menu
  },
  methods: {
    showLoading() {
      this.loadingStatus = true;
      setTimeout(function (thisObj) {
        if (thisObj.loadingStatus) {
          thisObj.loading = true
        }
      }, 300, this)
    },
    hideLoading() {
      this.loadingStatus = false;
      this.loading = false
    }
  },
  created() {
    this._setShowLoading(this.showLoading);
    this._setHideLoading(this.hideLoading);
    this._setLoadingAuto(true);
  },
  watch: {
    '$route'() {
      this._setLoadingAuto(true);
    }
  }
}
</script>

<style>
html, body {
  margin:0;
  height: 100%;
}
#app {
  height: 100%;
  min-width: 1300px;
}
.el-container  {
  height: 100%;
}
</style>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 55px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}
</style>
