<template>
  <el-container>
    <el-header height="40px">
      <div style="float: left; width:167px;padding-left:6px">
        <el-popconfirm title="确定退出?" @confirm="logout">
          <template #reference>
            <i class="el-icon-switch-button" title="退出" style="color:blue;cursor: pointer;"></i>
          </template>
        </el-popconfirm>
        <i class="el-icon-lock" title="修改密码" style="margin-left: 6px;color:blue;cursor: pointer;" @click="editPassword"></i>
        <i class="el-icon-s-custom" style="margin-left: 6px"></i><span>{{username}}</span>
      </div>
      <div style="float: left; margin-left:10px">
        <i class="el-icon-menu"></i><span style="padding-left: 5px">{{title}}</span>
      </div>

    </el-header>
    <el-container>
      <el-aside width="200px"><Menu @setTitle="setTitle"/></el-aside>
      <el-main v-loading="loading"><router-view></router-view></el-main>
    </el-container>
  </el-container>


  <el-dialog title="修改密码" v-model="editPasswordV" :close-on-click-modal="false" width="400px">
    <el-form ref="passwordForm" :model="passwordForm" :rules="rules" label-width="80px">
      <el-form-item label="当前密码" prop="oldPassword">
        <el-input type="password" autocomplete="new-password" v-model="passwordForm.oldPassword" class="my-input" maxlength="16"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" autocomplete="new-password" v-model="passwordForm.newPassword" class="my-input" maxlength="16"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="newPassword2">
        <el-input type="password" autocomplete="new-password" v-model="passwordForm.newPassword2" class="my-input" maxlength="16"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editPasswordV = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </span>
    </template>
  </el-dialog>

</template>
<script>
const action = "/security/home/"
import Menu from './components/security/Menu.vue'
export default {
  data() {
    return {
      loading: false,
      title: '首页',
      username: '',

      passwordForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: '',
      },
      rules: {
        oldPassword: [{required: true, message: '必填'}],
        newPassword: [{required: true, message: '必填'}],
        newPassword2: [{required: true, message: '必填'}],
      },
      editPasswordV: false,
    }
  },
  components: {
    Menu
  },
  methods: {
    logout() {
      this.commonAxios.post(`${action}logout`, {}).then(() => {
        this.$router.push('/');
      })
    },
    editPassword() {
      this.editPasswordV = true;
    },
    updatePassword() {
      this.$refs['passwordForm'].validate((valid) => {
        if (!valid) return;
        if (this.passwordForm.newPassword !== this.passwordForm.newPassword2) {
          this.$message.warning("新密码和确认密码不一致");
          return;
        }
        let param = {oldPassword: this.passwordForm.oldPassword, newPassword: this.passwordForm.newPassword}
        this.commonAxios.post(`${action}updatePassword`, param).then(() => {
          this.$message.success("修改密码成功，请重新登录");
          this.$router.push('/');
        })
      })
    },
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
      this.commonAxios.get(`${action}getCurrentUser`, {}).then((res) => {
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
  background-color: #D3DCE6;
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

.my-input {
  width: 250px;
}
</style>
