
<template>
  <el-row class="row-bg" justify="center" style="align-items:center; height: 400px">
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="120px" size="small">

      <el-form-item prop="username" label-width="0">
        <el-input v-model="ruleForm.username" placeholder="请输入你的账号">
          <template #prepend><i class="el-icon-user"></i></template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password" label-width="0">
        <el-input type="password" v-model="ruleForm.username" placeholder="请输入你的账号">
          <template #prepend><i class="el-icon-lock"></i></template>
        </el-input>
      </el-form-item>

<!--      <el-form-item label="username" prop="username">-->
<!--        <el-input v-model.number="ruleForm.username" autocomplete="off" style="width:200px"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="password" prop="password">-->
<!--        <el-input v-model="ruleForm.password" type="password" autocomplete="new-password" style="width:200px"/>-->
<!--      </el-form-item>-->
      <el-form-item label-width="0" style="text-align: center">
        <el-button type="primary" @click="submitForm('ruleForm')">login</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    const checkUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Please input the age001'))
      }
      return true;
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      }
      return true;
    }
    return {
      ruleForm: {
        username: 'test',
        password: 'test',
      },
      rules: {
        username: [{ validator: checkUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]

      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let api = "/security/login/login";
          this.axios.post(api, this.ruleForm).then((res) => {
            console.log(res.data)
            if (res.data.code == 0) {
              let token = res.data.content;
              localStorage.setItem("my_token", token);
              // alert("登录成功");
              this.$router.push('/Home')
            }
            else {
              alert(res.data.content);
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
