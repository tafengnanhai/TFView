import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import NProgress from 'nprogress'
import qs from 'qs'
import lockr from 'lockr'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { openLoading, closeLoading } from '@/plugins/loading'
import 'element-ui/lib/theme-chalk/index.css'
// import 'vue2-animate/dist/vue2-animate.min.css'
import '@/assets/css/master.css'
import 'nprogress/nprogress.css'

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
  NProgress.start()
  store.commit('isShowRouterLink', to.meta.showRouterLink)
  if (to.name === 'login') {
    openLoading('body', true)
  } else {
    openLoading()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
  closeLoading()
  if (to.name !== 'login') {
    store.dispatch('checkLoginStatus')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
