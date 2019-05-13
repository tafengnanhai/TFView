import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import lockr from 'lockr'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showRouterLink: false,
    showMenu: true,
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
        router.push({ name: 'login' })
      }
    },
    toggleMenu: (state) => {
      state.showMenu = !state.showMenu
    }
  },
  actions: {
    checkLoginStatus: (context) => {
      context.commit('checkLoginStatus')
    },
    toggleMenu: (context) => {
      context.commit('toggleMenu')
    }
  }
})
