/**
 * 用户登录信息表
 */
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {type: String, require: true},
  email: {type: String, require: true},
  password: {
    type: String,
    require: true,
    // 查询时不被选择
    // select: false
  }
})

module.exports = mongoose.model('User', userSchema)