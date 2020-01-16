import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../views/UserCenter/Login')
const Register = () => import('../views/UserCenter/Register')
const Home = () => import('../views/Index/Home.vue')
const WordBook = () => import('../views/WordBook/WordBook.vue')
const UserStatlistics = () => import('../views/UserStatlistics/UserStatlistics.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { isPublic: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { isPublic: true }
    },
    {
      path: '/',
      component: Home,
      children: [
        { path: 'word', component: WordBook },
        { path: 'stat', component: UserStatlistics }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.getItem('token')) {
    // 非公开不可访问
    return next('/login')
  } else {
    return next()
  }
})

export default router
