import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import NProgress from 'nprogress'
import lockr from 'lockr'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/master.css'
import 'nprogress/nprogress.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$http = axios
Vue.prototype.lockr = lockr

// recover account
store.commit('recoverAccount')

// router control
router.beforeEach((to, from, next) => {
  NProgress.start()
  to.name !== 'login' && store.dispatch('checkLoginStatus')
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
