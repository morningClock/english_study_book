<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登录页面</span>
        <router-link to="/register" tag="a" style="float: right;color:blue;" type="text">前往注册</router-link>
      </div>
      <el-form label-position="left" label-width="80px" :model="userForm" ref="userForm" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input v-model="userForm.captcha"></el-input>
          <div v-if="captcha" v-html="captcha"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    let checkCaptcha = async (rule, value, callback) => {
      // 失焦 发送GET /checkCaptcha 校验
      if (value === '') {
        callback(new Error('请输入验证码'));
      }
      let res = await this.$http.get(`/captcha/check?captchaID=${this.captchaID}&captcha=${value}`)
      if(res.data.success) {
        callback();
      } else{
        callback(new Error(res.data.message));
      }
    };
    return {
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
    submitForm() {
      this.$refs['userForm'].validate(async (valid) => {
        if (valid) {
          let res = await this.$http.post('/user/login', this.userForm)
          localStorage.setItem('token', res.data.token)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async getCaptcha () {
      // 获取验证码
      let res = await this.$http.get('/captcha/get')
      this.captcha = res.data.captcha
      // 保存验证码唯一的id
      this.captchaID = res.data._id
    }
  },
  created () {
    // 获取验证码
    this.getCaptcha()
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