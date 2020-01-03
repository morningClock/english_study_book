// 引入express
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 允许跨域类型配置
app.all('*', (req, res, next) => {
  // 允许任何跨域请求
  res.header('Access-Control-Allow-Origin', '*')
  // 允许content-type,Authorization的头部信息
  res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
  // 允许跨域请求类型
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() == 'options')
    //让options尝试请求快速结束
    res.send(200)
  else
    next()
})

// 连接mongodb数据库
require('./plugins/db.js')();

// 引入路由(传入app实例)
require('./routes/web')(app)


// 开启服务
app.listen('3001', () => console.log(`Example app listening on port 3001!`))