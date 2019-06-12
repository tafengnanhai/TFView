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
              import(/* webpackChunkName: "index" */ './views/index/main.vue')
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
              import(/* webpackChunkName: "article" */ './views/article/index.vue')
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
              import(/* webpackChunkName: "artsort" */ './views/artsort/index.vue')
          }
        },
        /* 监控统计 */
        {
          path: '/member/stat-diff',
          name: 'member-stat-diff',
          meta: {
            label: '注册对比',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "member" */ './views/member/stat-diff.vue')
          }
        },
        {
          path: '/member/stat-city',
          name: 'member-stat-city',
          meta: {
            label: '城市统计',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "member" */ './views/member/stat-city.vue')
          }
        },
        {
          path: '/member/stat-now',
          name: 'member-stat-now',
          meta: {
            label: '实时活跃',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "member" */ './views/member/stat-now.vue')
          }
        },
        /* 系统管理 */
        {
          path: '/admin/index',
          name: 'admin-index',
          meta: {
            label: '系统用户',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "system" */ './views/admin/index.vue')
          }
        },
        {
          path: '/rule/index',
          name: 'rule-index',
          meta: {
            label: '规则管理',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "system" */ './views/rule/index.vue')
          }
        },
        {
          path: '/group/index',
          name: 'group-index',
          meta: {
            label: '分组管理',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "system" */ './views/group/index.vue')
          }
        },
        /* 日志管理 */
        {
          path: '/logsys/index',
          name: 'logsys-index',
          meta: {
            label: '系统日志',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "log" */ './views/logsys/index.vue')
          }
        },
        {
          path: '/logmember/index',
          name: 'logmember-index',
          meta: {
            label: '用户日志',
            keepAlive: true
          },
          components: {
            main: () =>
              import(/* webpackChunkName: "log" */ './views/logmember/index.vue')
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
              import(/* webpackChunkName: "message" */ './views/message/edit.vue')
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
