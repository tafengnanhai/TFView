import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import lockr from 'lockr'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    userid: 0,
    username: '',
    token: '',
    testToken: 'this is test token which will be replaced by backend',
    rules: [],
    authTip: '没有权限',
    regNew: false,
    regTotal: 1,
    pageSize: 8,
    reloadPageTime: new Date().getTime()
  },
  mutations: {
    // 需要同步的操作不要放到actions中，放到mutations中
    initAccount: (state, data) => {
      lockr.set('userid', data.userid)
      lockr.set('username', data.username)
      lockr.set('token', data.token)
      lockr.set('rules', data.rules)
      state.userid = data.userid
      state.username = data.username
      state.token = data.token
      state.rules = data.rules
    },
    recoverAccount: state => {
      state.userid = lockr.get('userid', '')
      state.username = lockr.get('username', '')
      state.token = lockr.get('token', '')
      state.rules = lockr.get('rules', [])
    },
    checkLoginStatus: state => {
      if (
        lockr.get('userid') === undefined ||
        lockr.get('username') === undefined ||
        lockr.get('token') === undefined ||
        lockr.get('rules') === undefined ||
        state.userid === '' ||
        state.username === '' ||
        state.token === '' ||
        state.rules === []
      ) {
        router.push({ path: '/login', query: { from: 'timeout' } })
      }
    },
    toggleMenu: state => {
      state.isCollapse = !state.isCollapse
      const asideWidth = state.isCollapse ? '64px' : '160px'
      document.getElementById('aside').style.width = asideWidth
      const showSitename = state.isCollapse ? '' : 'TFView'
      document.getElementById('sitename').innerHTML = showSitename
      const siteWidth = state.isCollapse ? '20px' : '120px'
      document.getElementById('sitename').style.width = siteWidth
    },
    updateRegNewMsg: (state, reg) => {
      state.regNew = reg.reg_new
      state.regTotal = reg.reg_total
    },
    updateReloadPageTime: state => {
      state.reloadPageTime = new Date().getTime()
    },
    checkRuleAction: (state, path) => {
      return state.rules.includes(`Action${path.replace(/\//g, '-')}`)
    },
    checkRuleElement: (state, element) => {
      return state.rules.includes(`Element${element.replace(/\//g, '-')}`)
    },
    logout: state => {
      lockr.rm('userid')
      lockr.rm('username')
      lockr.rm('token')
      lockr.rm('rules')
      state.userid = ''
      state.username = ''
      state.token = ''
      state.rules = []
      state.isCollapse = false
    }
  },
  actions: {
    // 可以或者必须异步的操作放到actions中
    checkLoginStatus: context => {
      context.commit('checkLoginStatus')
    },
    toggleMenu: context => {
      context.commit('toggleMenu')
    },
    updateRegNewMsg: (context, reg) => {
      context.commit('updateRegNewMsg', reg)
    },
    updateReloadPageTime: context => {
      context.commit('updateReloadPageTime')
    },
    logout: context => {
      context.commit('logout')
    }
  },
  getters: {
    // 为了使用return所以借用了下getters
    checkRuleAction: state => path => {
      if (
        state.userid !== 1 &&
        !state.rules.includes(`Action${path.replace(/\//g, '-')}`)
      ) {
        return { code: 1, msg: '没有权限' }
      } else {
        return { code: 0, msg: '拥有权限' }
      }
    },
    checkRuleElement: state => element => {
      return (
        state.userid === 1 ||
        state.rules.includes(`Element${element.replace(/\//g, '-')}`)
      )
    }
  }
})
