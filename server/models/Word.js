const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
  // 名称
  name: { type:'String', required: true},
  // 词性
  class: [ { type:'String', required: true} ],
  // 翻译
  translation: [ { type:'String', required: true} ],
  // 用法
  useage: [ { type:'String'} ]
})

module.exports = mongoose.model('Word', wordSchema)