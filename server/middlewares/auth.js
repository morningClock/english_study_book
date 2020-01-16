const jwt = require('jsonwebtoken')
const keys = require('../configs/keys.js')

module.exports = (options) => {
  // 取出authorization后半部分
  return async (req, res, next) => {
    const token = req.headers.authorization.split(' ').pop()
    try {
      // 发生错误直接catch
      jwt.verify(token, keys.secret)
      next()
    } catch(err) {
      res.status(499).send({message:'token 无效'})
    }
    
  }
}