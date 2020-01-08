<template>
  <div class="login bg-primary-1">
    <div class="login-background">
      <div class="box-card">
        <div class="box-position">
          <div class="cartoon">
            <img class="head" src="../../assets/img/tou.png" alt="">
          </div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>登录页面</span>
              <router-link to="/register" tag="a" style="float: right;color:blue;" type="text">前往注册</router-link>
            </div>
            <el-form label-position="left" label-width="80px" :model="userForm" ref="userForm" :rules="rules">
              <el-form-item label="账号" prop="username">
                <el-input v-model="userForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="userForm.password"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="captcha">
                <el-input v-model="userForm.captcha"></el-input>
                <div style="display:inline-block" v-if="captcha" v-html="captcha" @click="getCaptcha"></div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm()" class="bg-red">登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    let checkCaptcha = async (rule, value, callback) => {
      // 失焦 发送GET /checkCaptcha 校验
      if (value === '') {
        return callback(new Error('请输入验证码'))
      }
      try {
        await this.$http.get(`/captcha/check?captchaID=${this.captchaID}&captcha=${value}`)
        return callback()
      } catch (e) {
        return callback(new Error(e.response.data.message))
      }
    }
    return {
      // 展示验证码图片
      captcha: '',
      // 验证码唯一的id
      captchaID: '',
      userForm: {
        username: '',
        password: '',
        captcha: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
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
    submitForm () {
      this.$refs['userForm'].validate(async (valid) => {
        if (valid) {
          try {
            let res = await this.$http.post('/user/login', this.userForm)
            if (res.data.success) {
              console.log(res.data)
              localStorage.setItem('token', res.data.token)
              this.$message.success(res.data.message)
              this.$router.push('/')
            }
          } catch (e) {
            console.log(e)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async getCaptcha () {
      // 获取验证码
      let res = await this.$http.get('/captcha/get')
      this.captcha = res.data.captcha
      // 保存验证码唯一的id
      this.captchaID = res.data.captchaID
    }
  },
  created () {
    // 获取验证码
    this.getCaptcha()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/login.scss';
</style>
