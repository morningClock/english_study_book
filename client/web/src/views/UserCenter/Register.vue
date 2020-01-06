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
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
          <el-button @click="sendEmail">点击获取验证</el-button>
        </el-form-item>
        <el-form-item label="邮箱验证" prop="captcha">
          <el-input v-model="userForm.captcha"></el-input>
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
    let checkCaptcha = async (rule, value, callback) => {
      // 失焦 发送GET /checkCaptcha 校验
      if (value === '') {
        return callback(new Error('请输入校验码'))
      }
      let res = await this.$http.get('/captcha/check', {
        params: {
          captchaID: this.captchaID,
          captcha: value
        }
      })
      if (!res.data.error) {
        return callback()
      } else {
        return callback(new Error(res.data.message))
      }
    }
    return {
      captchaID: '',
      userForm: {
        username: '',
        password: '',
        email: '',
        captcha: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        captcha: [
          // 自定义校验
          { validator: checkCaptcha, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async sendEmail () {
      let res = await this.$http.get('/captcha/sendmail', {
        params: {
          email: this.userForm.email
        }
      })
      // 发送成功，接受唯一标识captchaID
      this.captchaID = res.data.captchaID
    },
    submitForm () {
      this.$refs['userForm'].validate(async (valid) => {
        if (valid) {
          let res = await this.$http.post('/user/register', this.userForm)
          if (res.data) {
            console.log(res.data)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
