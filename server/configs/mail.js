module.exports = (options) => {
  return {
    emailserver: {
      host: "smtp.163.com",
      // port: 25,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'englishstudybook@163.com', // generated ethereal user
        pass: 'english163' // generated ethereal password
      }
    },
    mail: {
      from: '"EnglishStudyBook验证 👻" <englishstudybook@163.com>', // sender address
      to: options.targetmail, // 接受列表
      subject: "EnglishStudyBook验证 👻", // 主题
      html: `你的验证码：<b>${options.captchaCode}</b>` // html正文
    }
  }
}