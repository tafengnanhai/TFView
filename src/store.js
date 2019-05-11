import Vue from 'vue'
import Vuex from 'vuex'
import lockr from 'lockr'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showRouterLink: false,
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
      state.username = lockr.get('username')
      state.token = lockr.get('token')
    }
  },
  actions: {

  }
})
