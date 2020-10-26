/**
 * 用户单词表
 */
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userId: {type: mongoose.SchemaTypes.ObjectId, require: true},
  wordList: [
    {
      // 该用户记录的单词id，可以通过该数组查询单词列表详情
      wordId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Word'},
      read: {type: Number, default: 0},      // 单词阅读次数
      practice: {type: Number, default: 0},  // 单词训练次数
      error: {type: Number, default: 0}      // 单词训练错误次数
    }
  ]
})

module.exports = mongoose.model('UserWordList', userSchema)