import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import lockr from 'lockr'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { showLoading, hideLoading } from '@/plugins/loading'
import 'element-ui/lib/theme-chalk/index.css'
// import 'vue2-animate/dist/vue2-animate.min.css'
import '@/assets/css/master.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$http = axios
Vue.prototype.qs = qs
Vue.prototype.lockr = lockr

// recover account
store.commit('recoverAccount')

// router control
router.beforeEach((to, from, next) => {
  store.commit('isShowRouterLink', to.meta.showRouterLink)
  if (to.name === 'login') {
    showLoading('body', true)
  } else {
    showLoading()
  }
  next()
})

router.afterEach((to, from) => {
  hideLoading()
  if (to.name !== 'login') {
    // 检查登录状态
    store.dispatch('checkLoginStatus')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
