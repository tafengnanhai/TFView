import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import lockr from 'lockr'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import { showLoading, hideLoading } from './loading'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.qs = qs
Vue.prototype.lockr = lockr

// =============== router control ====================
router.beforeEach((to, from, next) => {
  showLoading()
  next()
})

router.afterEach((to, from) => {
  hideLoading()
})

// =============== lockr control ====================
lockr.prefix = 'tfcms'

// =============== axios control ====================

// axios.defaults.baseURL = (process.env.NODE_ENV === 'production' ? "http://192.168.64.88" : "http://192.168.64.88")
axios.defaults.timeout = 10 * 1000
axios.defaults.headers['Content-Type'] = 'application/json'

axios.interceptors.request.use(
  request => {
    showLoading()
    // add token
    lockr.set('token', 'test')
    var token = lockr.get('token')
    if (request.method === 'post') {
      request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      let data = qs.parse(request.data)

      request.data = qs.stringify({
        token: token,
        ...data
      })
    } else if (request.method === 'get') {
      request.params = {
        token: token,
        ...request.params
      }
    }
    return request
  },
  error => {
    hideLoading()
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    hideLoading()
    return response
  },
  error => {
    hideLoading()
    Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
