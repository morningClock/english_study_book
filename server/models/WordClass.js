const mongoose = require('mongoose')

const wordClassSchema = new mongoose.Schema({
  // 全称
  name: { type:'String', required: true},
  // 缩写,
  abbreviation: { type:'String', required: true},
  // 词性的拼写
  translation: { type:'String', required: true}
})

module.exports = mongoose.model('WordClass', wordClassSchema)