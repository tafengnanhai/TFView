import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import lockr from 'lockr'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showRouterLink: false,
    isCollapse: false,
    username: '',
    token: '',
    testToken: 'this is test token which will be replaced by backend',
    timeoutMsg: '未登陆或超时，请重新登陆',
    pageSize: 10,
    tempActiveTabName: '/index/main',
    reloadPageTime: new Date().getTime(),
    tabs: [
      {
        label: '首页面板',
        name: '/index/main'
      }
    ]
  },
  mutations: { // 需要同步的操作不要放到actions中
    isShowRouterLink: (state, result) => {
      state.showRouterLink = result
    },
    initAccount: (state, data) => {
      lockr.set('username', data.username)
      lockr.set('token', data.token)
      state.username = data.username
      state.token = data.token
    },
    recoverAccount: (state) => {
      state.username = lockr.get('username', '')
      state.token = lockr.get('token', '')
    },
    checkLoginStatus: (state) => {
      if (lockr.get('username') === undefined || lockr.get('token') === undefined || state.username === '' || state.token === '') {
        router.push({ path: '/login', query: { from: 'timeout' } })
      }
    },
    toggleMenu: (state) => {
      state.isCollapse = !state.isCollapse
      let asideWidth = state.isCollapse ? '64px' : '160px'
      document.getElementById('aside').style.width = asideWidth
      let showSitename = state.isCollapse ? '' : 'TFView'
      document.getElementById('sitename').innerHTML = showSitename
      let siteWidth = state.isCollapse ? '20px' : '120px'
      document.getElementById('sitename').style.width = siteWidth
    },
    addTab: (state, newTab) => {
      state.tempActiveTabName = newTab.name
      let tabs = state.tabs
      let isExists = tabs.some((tab, index) => {
        return tab.label === newTab.label
      })
      !isExists && state.tabs.push(newTab)
    },
    removeTab: (state, targetName) => {
      let tabs = state.tabs
      if (state.tempActiveTabName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              state.tempActiveTabName = nextTab.name
            }
          }
        })
      }
      state.tabs = tabs.filter(tab => tab.name !== targetName)
    },
    updateActiveTabName: (state, val) => {
      state.tempActiveTabName = val
      router.push({ path: val })
    },
    updateReloadPageTime: (state) => {
      state.reloadPageTime = new Date().getTime()
    },
    logout: (state) => {
      lockr.rm('username')
      lockr.rm('token')
      state.username = ''
      state.token = ''
      state.isCollapse = false
    }
  },
  actions: { // 可以或者必须异步的操作放到actions中
    checkLoginStatus: (context) => {
      context.commit('checkLoginStatus')
    },
    toggleMenu: (context) => {
      context.commit('toggleMenu')
    },
    removeTab: (context, targetName) => {
      context.commit('removeTab', targetName)
    },
    updateReloadPageTime: (context) => {
      context.commit('updateReloadPageTime')
    },
    logout: (context) => {
      context.commit('logout')
    }
  }
})
