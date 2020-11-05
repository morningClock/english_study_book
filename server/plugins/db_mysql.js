const config = require('../configs/keys')
let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});

/**
 * 二封Promise查询语句
 */
connection.querySync = (sql, params) => {
  return new Promise((resolve) => {
    connection.query(sql, params, (error, results, fields) => {
      if (error){
        throw error;
      }
      resolve(results)
    });
  })
}

/**
 * 普通查询语句
 */
connection.find = (sql, params) => {
  return new Promise((resolve) => {
    connection.query(sql, params, (error, results, fields) => {
      if (error){
        throw error;
      }
      // connected!
      // 查询成功
      resolve(results.length ? results : null)
      
      // console.log('query results:', results)
      // console.log('query fields:', fields)
    });
  })
}

/**
 * 普通查询语句,返回单条首结果
 */
connection.findOne = (sql, params) => {
  return new Promise((resolve) => {
    connection.query(sql, params, (error, results, fields) => {
      if (error){
        throw error;
      }
      // connected!
      // 查询成功
      resolve(results.length ? results[0] : null)
    });
  })
}

/**
 * 插入单条记录
 */
connection.insertOne = (tableName, insertObj) => {
  let keys = []
  let placeholder = []
  let values = []
  for(key in insertObj){
    keys.push(key)
    placeholder.push('?')
    values.push(insertObj[key])
  }
  let sql = `INSERT INTO ${tableName}(${keys.join(',')}) VALUES(${placeholder.join(',')})`

  return new Promise((resolve) => {
    connection.query(sql, values, (error, results, fields) => {
      if (error){
        throw error;
      }
      resolve(results)
    });
  })
}

module.exports = connection