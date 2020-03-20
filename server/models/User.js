const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {type: String, require: true},
  email: {type: String, require: true},
  password: {
    type: String,
    require: true,
    // 查询时不被选择
    // select: false
  },
  words: [
    // 该用户记录的单词
    {type: mongoose.SchemaTypes.ObjectId, ref: 'Word'}
  ]
})

module.exports = mongoose.model('User', userSchema)