import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import lockr from 'lockr'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$http = axios
Vue.prototype.qs = qs
Vue.prototype.lockr = lockr

lockr.prefix = 'ex'
// axios.defaults.baseURL = (process.env.NODE_ENV === 'production' ? "http://192.168.64.88" : "http://192.168.64.88")
axios.defaults.timeout = 10 * 1000
axios.defaults.headers['Content-Type'] = 'application/json'

axios.interceptors.request.use(
  config => {
    // add token
    lockr.set('token', 'test')
    var token = lockr.get('token')
    if (config.method === 'post') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      let data = qs.parse(config.data)

      config.data = qs.stringify({
        token: token,
        ...data
      })
    } else if (config.method === 'get') {
      config.params = {
        token: token,
        ...config.params
      }
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
