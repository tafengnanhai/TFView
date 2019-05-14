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
    testToken: 'this is test token which will be replaced by backend'
  },
  mutations: {
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
      if (state.username === '' || state.token === '') {
        router.push('login')
      }
    },
    toggleMenu: (state) => {
      state.isCollapse = !state.isCollapse
      let asideWidth = state.isCollapse ? '64px' : '240px'
      document.getElementById('aside').style.width = asideWidth
      let showSitename = state.isCollapse ? '' : 'TFView'
      document.getElementById('sitename').innerHTML = showSitename
      let siteWidth = state.isCollapse ? '20px' : '120px'
      document.getElementById('sitename').style.width = siteWidth
    },
    logout: (state) => {
      lockr.rm('username')
      lockr.rm('token')
      state.username = ''
      state.token = ''
      state.isCollapse = false
    }
  },
  actions: {
    checkLoginStatus: (context) => {
      context.commit('checkLoginStatus')
    },
    toggleMenu: (context) => {
      context.commit('toggleMenu')
    },
    logout: (context) => {
      context.commit('logout')
    }
  }
})
