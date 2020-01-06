import axios from 'axios'
// 消息提示
import { Message } from 'element-ui'

const http = axios.create({
  baseURL: 'http://localhost:3001/web/api'
})

// 请求拦截器
http.interceptors.request.use(function (config) {
  // console.log(config)
  const token = 'Bearer ' + localStorage.getItem('token')
  // 请求携带token
  config.headers.authorization = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response)
  return response
}, function (error) {
  if (error.response) {
    let message = error.response.data.message ? error.response.data.message : '发生错误'
    Message.error(message)
  } else {
    Message.error('发生错误')
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default http
