import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Index/Home.vue'
const Login = () => import('../views/UserCenter/Login')
const Register = () => import('../views/UserCenter/Register')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {isPublic: true}
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {isPublic: true}
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.meta.isPublic) {
//     // 公开可访问
//     return next()
//   } else{
//     // 不可访问的跳转回login
//     return next('/login')
//   }
// })

export default router