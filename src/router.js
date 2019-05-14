import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'admin',
      meta: {
        showRouterLink: false
      },
      component: () => import(/* webpackChunkName: "admin" */ './views/admin.vue'),
      children: [
        {
          path: '/article/index',
          name: 'article_index',
          components: {
            main: () => import(/* webpackChunkName: "article_index" */ './views/article/index.vue')
          }
        },
        {
          path: '/sort/index',
          name: 'sort_index',
          components: {
            main: () => import(/* webpackChunkName: "sort_index" */ './views/sort/index.vue')
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        showRouterLink: true
      },
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
    },
    {
      path: '*',
      name: 'Four04',
      meta: {
        showRouterLink: false
      },
      component: () => import(/* webpackChunkName: "404" */ './views/404/index.vue')
    }
  ]
})
