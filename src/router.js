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
          name: 'index_main',
          meta: {
            label: '首页面板',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "index_main" */ './views/index/main.vue')
          }
        },
        /* 内容管理 */
        {
          path: '/article/index',
          name: 'article_index',
          meta: {
            label: '文章管理',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "article_index" */ './views/article/index.vue')
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
            main: () =>
              import(/* webpackChunkName: "artsort_index" */ './views/artsort/index.vue')
          }
        },
        /* 注册统计 */
        {
          path: '/member/stat_diff',
          name: 'member_stat_diff',
          meta: {
            label: '对比统计',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "member_stat_diff" */ './views/member/stat_diff.vue')
          }
        },
        /* 消息提醒 */
        {
          path: '/message/edit',
          name: 'message_edit',
          meta: {
            label: '消息提醒',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "message_edit" */ './views/message/edit.vue')
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
      name: 'Four04',
      meta: {
        keepAlive: true
      },
      component: () =>
        import(/* webpackChunkName: "404" */ './views/404/index.vue')
    }
  ]
})
