import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/Admin',
      name: 'admin',
      meta: {
        showRouterLink: false
      },
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue')
    },
    {
      path: '/Login',
      name: 'login',
      meta: {
        showRouterLink: true
      },
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    }
  ]
})
