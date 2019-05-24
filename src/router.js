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
          path: '/index/main',
          name: 'index_main',
          meta: {
            label: '首页面板',
            keepAlive: true
          },
          components: {
            main: () => import(/* webpackChunkName: "index_main" */ './views/index/main.vue')
          }
        },
        {
          path: '/article/index',
          name: 'article_index',
          meta: {
            label: '文章管理',
            keepAlive: true
          },
          components: {
            main: () => import(/* webpackChunkName: "article_index" */ './views/article/index.vue')
          }
        },
        {
          path: '/artsort/index',
          name: 'artsort_index',
          meta: {
            label: '分类管理',
            keepAlive: true
          },
          components: {
            main: () => import(/* webpackChunkName: "artsort_index" */ './views/artsort/index.vue')
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
        showRouterLink: false,
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "404" */ './views/404/index.vue')
    }
  ]
})
