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
              <span>注册页面</span>
              <router-link to="/login" tag="a" style="float: right;color:blue;" type="text">前往登录</router-link>
            </div>
            <el-form label-position="left" label-width="80px" :model="userForm" ref="userForm" :rules="rules">
              <el-form-item label="账号" prop="username">
                <el-input v-model="userForm.username"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="userForm.email"></el-input>
                <!-- 如果点击，则必须等60秒后才能再次发送 -->
                <el-button
                  :disabled="!sendable"
                  @click="sendable ? sendEmail() : ''"
                  v-text="sendBtnText"></el-button>
              </el-form-item>
              <el-form-item label="邮箱验证" prop="captcha">
                <el-input v-model="userForm.captcha"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="userForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm()">注册</el-button>
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
  name: 'Register',
  data () {
    let checkCaptcha = async (rule, value, callback) => {
      // 失焦 发送GET /checkCaptcha 校验
      if (value === '') {
        return callback(new Error('请输入校验码'))
      }
      try {
        await this.$http.get('/captcha/check', {
          params: {
            captchaID: this.captchaID,
            captcha: value
          }
        })
        return callback()
      } catch (e) {
        return callback(new Error(e.response.data.message))
      }
    }
    return {
      sendTimer: null,
      waitTime: 60,
      nowTime: 0,
      sendBtnText: '请输入正确邮箱地址',
      sendable: false,
      captchaID: '',
      userForm: {
        username: '',
        password: '',
        email: '',
        captcha: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        captcha: [
          // 自定义校验
          { validator: checkCaptcha, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'userForm.email': function () {
      if (this.sendTimer) return
      // 不存在延时，更新可点击状态与文本
      this.handleSendMailBtn()
      this.handleSendBtnText()
    }
  },
  methods: {
    handleSendBtnText () {
      this.sendBtnText = this.sendable ? '点击发送验证码' : '请输入正确邮箱地址'
    },
    handleSendMailBtn () {
      // 改变发送按钮是否可点击
      this.$refs['userForm'].validateField('email', async (valid) => {
        if (!valid) {
          this.sendable = true
        } else {
          this.sendable = false
        }
      })
    },
    async sendEmail () {
      // 限制点击发送按钮
      if (this.sendTimer) return
      this.sendTimer = setInterval(() => {
        this.sendable = false
        this.nowTime += 1
        this.sendBtnText = `等待${this.waitTime - this.nowTime}秒后重新发送`
        if (this.nowTime >= this.waitTime) {
          this.sendable = true
          this.nowTime = 0
          this.handleSendBtnText()
          clearInterval(this.sendTimer)
          this.sendTimer = null
        }
      }, 1000)
      // 请求发送邮件
      let res = await this.$http.get('/captcha/sendmail', {
        params: {
          email: this.userForm.email
        }
      })
      if (res.data) {
        // 发送成功，接受唯一标识captchaID
        this.captchaID = res.data.captchaID
        // 设置延时
      }
    },
    submitForm () {
      this.$refs['userForm'].validate(async (valid) => {
        if (valid) {
          let res = await this.$http.post('/user/register', this.userForm)
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.$router.push('/login')
          }
        } else {
          this.$message.error('请根据提示修改填写内容！')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/login.scss';
</style>
