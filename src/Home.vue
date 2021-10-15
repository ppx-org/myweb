<template>
  <el-container>
    <el-header height="40px">
      <div style="float: left; width:167px;padding-left:6px"><span>账号:</span><span>{{username}}</span></div>
      <div style="float: left; margin-left:10px">
        <i class="el-icon-menu"></i><span style="padding-left: 5px">{{title}}</span>
      </div>

    </el-header>
    <el-container>
      <el-aside width="200px"><Menu @setTitle="setTitle"/></el-aside>
      <el-main v-loading="loading"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from './components/security/Menu.vue'
export default {
  data() {
    return {
      loading: false,
      title: '首页',
      username: '',
    }
  },
  components: {
    Menu
  },
  methods: {
    setTitle(title) {
      this.title = title;
    },
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

    this.username = this.$store.state.username;
    if (!this.username) {
      this.commonAxios.get("/security/home/getCurrentUser", {}).then((res) => {
        this.username = res.data.content.username;
      })
    }
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
  /*background-color: #B3C0D1;*/
  background-color: #D3DCE6;;
  color: #333;
  line-height: 40px;
  color: black;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding: 2px;
}
body > .el-container {
  margin-bottom:1px;
}

/*.el-container:nth-child(5) .el-aside,*/
/*.el-container:nth-child(6) .el-aside {*/
/*  line-height: 260px;*/
/*}*/
/*.el-container:nth-child(7) .el-aside {*/
/*  line-height: 320px;*/
/*}*/
</style>
