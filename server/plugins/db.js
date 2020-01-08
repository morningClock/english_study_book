/**
 * 连接mongodb数据库
 */
module.exports = async () => {
  const mongoose = require('mongoose');
  const keys = require('../configs/keys.js')
  await mongoose.connect(keys.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('mongodb is connection'))
  .catch(err => console.log(err));
}