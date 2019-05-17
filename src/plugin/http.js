import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import lockr from 'lockr'
import router from '@/router'
import ElementUI from 'element-ui'
import { showLoading, hideLoading } from '@/plugin/loading'
import 'element-ui/lib/theme-chalk/index.css'
import { Promise } from 'core-js'

Vue.use(ElementUI)

// axios control
// axios.defaults.baseURL = 'http://api.tfview.com'
axios.defaults.timeout = 10 * 1000
axios.defaults.headers['Content-Type'] = 'application/json'
export const operData = (obj) => {
  return new Promise((resolve, reject) => {
    obj.showSuccessTip = (obj.showSuccessTip === undefined ? false : obj.showSuccessTip)
    obj.showErrTip = (obj.showErrTip === undefined ? true : obj.showErrTip)
    obj.neeLogin = (obj.neeLogin === undefined ? true : obj.neeLogin)
    axios[obj.sendType](obj.url, obj.param).then((res) => {
      if (res.data.code === 0) {
        obj.showSuccessTip && Vue.prototype.$message.success(res.data.msg)
      } else if (res.data.code === 1) {
        obj.showErrTip && Vue.prototype.$message.error(res.data.msg)
      } else if (res.data.code === -1) {
        obj.neeLogin && router.push({ path: '/login', query: { from: 'timeout' } })
      }
      resolve(res.data)
    }).catch((error) => {
      reject(error.data)
    })
  })
}

axios.interceptors.request.use(
  request => {
    showLoading()
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
