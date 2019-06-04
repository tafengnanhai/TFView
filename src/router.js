import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/index/main',
      component: () =>
        import(/* webpackChunkName: "index" */ './views/index.vue'),
      children: [
        {
          path: '/index/main',
          name: 'index-main',
          meta: {
            label: '首页面板',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "index-main" */ './views/index/main.vue')
          }
        },
        /* 内容管理 */
        {
          path: '/article/index',
          name: 'article-index',
          meta: {
            label: '文章管理',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "article-index" */ './views/article/index.vue')
          }
        },
        {
          path: '/artsort/index',
          name: 'artsort-index',
          meta: {
            label: '分类管理',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "artsort-index" */ './views/artsort/index.vue')
          }
        },
        /* 注册统计 */
        {
          path: '/member/stat-diff',
          name: 'member-stat-diff',
          meta: {
            label: '对比统计',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "member-stat-diff" */ './views/member/stat-diff.vue')
          }
        },
        /* 消息提醒 */
        {
          path: '/message/edit',
          name: 'message-edit',
          meta: {
            label: '消息提醒',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "message-edit" */ './views/message/edit.vue')
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/login.vue')
    },
    {
      path: '*',
      name: 'four04',
      meta: {
        keepAlive: true
      },
      component: () =>
        import(/* webpackChunkName: "404" */ './views/404/index.vue')
    }
  ]
})
