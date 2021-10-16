<template>
  <el-row justify="center" style="align-items:center; height: 400px">
    <el-form ref="loginForm" :model="form" status-icon :rules="rules" label-width="120px" size="small">
      <el-form-item prop="username" label-width="0">
        <el-input v-model="form.username" placeholder="请输入你的账号">
          <template #prepend><i class="el-icon-user"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label-width="0">
        <el-input type="password" v-model="form.password" placeholder="请输入你的密码">
          <template #prepend><i class="el-icon-lock"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label-width="0">

        <el-input v-model="form.code" placeholder="请输入i的值">
          <template #prepend><el-image src="/src/assets/code.png" style="width:100px"></el-image></template>
        </el-input>
      </el-form-item>
      <el-form-item label-width="0" style="text-align: center">
        <el-button type="primary" @click="submitForm('loginForm')">login</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
const action = "/security/home/"
export default {
  data() {
    const checkUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入你的账号'))
      }
      return true;
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入你的密码'))
      }
      return true;
    }
    return {
      form: {
        username: 'test',
        password: 'test',
        code: '',
      },
      rules: {
        username: [{validator: checkUsername, trigger: 'blur'}],
        password: [{validator: validatePassword, trigger: 'blur'}]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;

        this.commonAxios.post(`${action}login`, this.form).then((res) => {
          localStorage.setItem("my_token", res.data.content.token);
          this.$store.state.username = res.data.content.username;
          this.$router.push('/Home');
        })
      })
    },
  }
}
</script>
