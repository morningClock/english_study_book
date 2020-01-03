import axios from 'axios'

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
  return Promise.reject(error);
});

export default http
