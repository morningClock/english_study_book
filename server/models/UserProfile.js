const mongoose = require('mongoose')

const userProfileSchema = new mongoose.Schema({
  // 姓名
  nickname: { type: String, required: true},
  // 头像
  avatar: { type: String },
  // 性别
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  // 创建时间
  created_time: {
    type: Date,
    // 必填
    default: Date.now
  },
  // 状态
  status: {
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [0, 1, 2],
    default: 0
  }
})

module.exports = mongoose.model('UserProfile', userProfileSchema)