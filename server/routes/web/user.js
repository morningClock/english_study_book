const jwt = require('jsonwebtoken')
const md5 = require('md5')
const keys = require('../../configs/keys.js')
// 数据库
const mySQL = require('../../plugins/db_mysql')
// 生成验证码图片
const svgCaptcha = require('svg-captcha')
// 发送邮件
const nodemailer = require('nodemailer')

const randomCode = require('../../plugins/random.js')

module.exports = router => {
  /**
   * GET /captcha/get
   * [获取验证码]
   * @return 'success'
   */
  router.get('/captcha/get', (req, res) => {
    // 验证码逻辑
    // 1.生成验证码
    // 2.对验证码加上id，携带加密的text，用于校验时唯一识别
    // 3.返回到前端
    
    // 生成svg标签
    const captcha = svgCaptcha.create();
    // 该图片独特的id,5分钟后失效
    const captchaID = jwt.sign({
      text: md5(captcha.text.toLowerCase() + keys.secret)
    }, keys.secret, {expiresIn: 60*5})
    // 生成携带加密验证码的token
    // 用于验证对应验证码使用
    res.send({
      captchaID: captchaID,
      captcha: captcha.data,
    })
  })

  /**
   * GET /captcha/check
   * @params captchaID
   * @params captcha
   * [验证验证码]
   * @return 'success'
   */
  router.get('/captcha/check', (req, res) => {
    // 校验验证码逻辑
    // 1.获取captchaID与前端输入的验证码
    // 2.将captchaID的payload
    // 3.校验payload的text与输入的验证码md5
    // 相同则成功，不相同则失败
    try{
      const decoded = jwt.verify(req.query.captchaID, keys.secret);
      if(decoded.text !== md5(req.query.captcha + keys.secret)) {
        return res.status(441).send({message: '验证码输入错误!'})
      }
      return res.send({message: '验证码通过!'})
    } catch (e) {
      return res.status(441).send({message: '验证码失效,请重新输入!'})
    }
   
  })

  /**
   * POST /login
   * [登录接口]
   * @return 
   */
  router.post('/user/login', async (req, res) => {
    // 登录逻辑
    // 1.获取登录表单信息
    // 2.校验是否存在用户
    // 3.校验密码
    // 4.通过校验，签发token(60小时有效)
    let user = await mySQL.findOne(`select * from user where username = ?`, [req.body.username])
    if(!user) {
      return res.status(441).send({success: false, message: '用户不存在'})
    } else if(user.password !== md5(req.body.password + keys.secret)) {
      return res.status(441).send({success: false, message: '密码错误'})
    }
    // 密码正确,签发token
    const token = jwt.sign({
      'id': user.id,
      'username': user.username
    }, keys.secret, {expiresIn: 60*60*60})
    res.send({success: true, token: token, message: '登陆成功!'})
  })

   /**
   * POST /register
   * [注册接口]
   * @return 
   */
  router.post('/user/register', async (req, res) => {
    // 注册逻辑
    // 1.接受注册表单
    // 2.检查是否存在用户，存在返回已存在用户
    // 3.不存在新建用户
    const body = req.body
    const isExist = await mySQL.findOne(`select * from user where email = ?`, [req.body.email])
    if(isExist) {
      return res.status(441).send({
        success: false,
        message: '用户已存在'
      })
    }
    // 加密+特殊字串
    const newUser = {
      email: body.email,
      username: body.username,
      password: md5(body.password + keys.secret)
    }
    let user = await mySQL.insertOne('user', newUser)
    console.log('新增用户：', user)
    return res.send({
      success: true,
      message: newUser.username + ' 注册成功'
    })
  })

  /**
   * GET /captcha/sendmail
   * @params email       注册邮箱
   * [邮箱注册接口]
   * @return 该次验证唯一标识
   */
  router.get('/captcha/sendmail', async (req, res) => {
    // 邮箱注册逻辑
    // 1.检测是否存在使用该邮箱的用户
    // 2.不存在则发送随机验证码字串(一分钟有效)
    // 3.用户输入验证码，正确则验证成功
    // (60秒可以重新发送验证码字串)
    const targetmail = req.query.email
    let captchaCode = randomCode()
    const isExist = await mySQL.findOne(`select * from user where email = ?`, [req.body.email])
    if(isExist) {
      return res.status(441).send({
        success: false,
        message: '邮箱已被注册'
      })
    }
    // 发送验证码
    // 引入邮箱配置
    const mailConfig = require('../../configs/mail.js')({
      targetmail,
      captchaCode
    })
    try{
      // 新建发送者
      let transporter = nodemailer.createTransport(mailConfig.emailserver);
      // 发送邮件
      let info = await transporter.sendMail(mailConfig.mail);
      
      // jwt加密验证码，用于回传时识别来源以及要识别的验证码
      const captchaID = jwt.sign({
        text: md5(captchaCode + keys.secret)
      }, keys.secret, {expiresIn: 60*5})

      res.send({
        captchaID: captchaID
      })
    } catch(e) {
      res.status(441).send({'message': '无效邮箱'})
    }
    
  })

  /**
   * POST /reset
   * [修改密码接口]
   * @return 'success'
   */
  router.post('/user/reset', (req, res) => {
    res.send('reset success')
  })

  /**
   * GET /profile
   * [获取个人中心信息]
   * @return 'success'
   */
  router.get('/user/profile', (req, res) => {
    res.send('profile success')
  })

  /**
   * POST /profile
   * [修改个人信息]
   * @return 'success'
   */
  router.post('/user/profile', (req, res) => {
    res.send('profile success')
  })

  return router
}