import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

import ElementUI from 'element-ui'
Vue.use(ElementUI)

// 消息提示
import {Message} from 'element-ui'
Vue.prototype.$message = Message

import './assets/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

import http from './http'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
