<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>注册页面</span>
        <router-link to="/login" tag="a" style="float: right;color:blue;" type="text">前往登录</router-link>
      </div>
      <el-form label-position="left" label-width="80px" :model="userForm" ref="userForm" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['userForm'].validate(async (valid) => {
        if (valid) {
          let res = await this.$http.post('/user/register', this.userForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
  .box-card {
    position:absolute;
    width: 400px;
    top: 40%;
    left: 50%;
    transition: all 0.5s;
  }
  .box-card {
    transform: translate(-50%,-50%);
  }
</style>