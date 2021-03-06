const express = require('express')
const router = express.Router()

// 引入user相关接口
require('./user.js')(router)
require('./words.js')(router)

const authMiddleware = require('../../middlewares/auth.js')

module.exports = app => {
  /**
   * GET /test
   * [测试接口服务是否正常]
   * @return 'success'
   */
  router.get('/test',  (req, res) => {
    console.log(req.body)
    res.send('success')
  })


  // 导出接口
  app.use('/web/api', router)
}