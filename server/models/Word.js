/**
 * 单词库表
 */
const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
  // 名称
  name: { type:'String', required: true},
  // 翻译结果
  translations: [
    {
      // 释意
      explain: { type:'String', required: true},
      // 词性(关联词性表并查出)
      wordClassId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'WordClass'}
    }
  ],
  // 用法（句子）
  useage: [ { type:'String'} ]
})

module.exports = mongoose.model('Word', wordSchema)