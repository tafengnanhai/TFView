import axios from 'axios'
import lockr from 'lockr'
import router from '@/router'
import NProgress from 'nprogress'
import Loading from '@/plugins/loading'
import Message from '@/plugins/message'

// axios.defaults.baseURL = 'http://api.tfview.com'
axios.defaults.timeout = 10 * 1000
axios.defaults.headers['Content-Type'] = 'application/json'

export default {
  send: (obj) => {
    return new Promise((resolve, reject) => {
      obj.sendType = obj.sendType || 'get'
      obj.showSuccessTip = obj.showSuccessTip || false
      obj.showErrTip = obj.showErrTip || true
      obj.neeLogin = obj.neeLogin || true
      axios[obj.sendType](obj.url, obj.param).then((res) => {
        if (res.data.code === 0) {
          obj.showSuccessTip && Message.success(res.data.msg)
        } else if (res.data.code === 1) {
          obj.showErrTip && Message.error(res.data.msg)
        } else if (res.data.code === -1) {
          obj.neeLogin && router.push({ path: '/login', query: { from: 'timeout' } })
        }
        resolve(res.data)
      }).catch((error) => {
        reject(error.data)
      })
    })
  }
}

axios.interceptors.request.use(
  request => {
    NProgress.start()
    Loading.open()
    request.headers['Token'] = lockr.get('token') // use $_SERVER['HTTP_TOKEN'] in php
    if (request.method === 'post') {
      request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return request
  },
  error => {
    NProgress.done()
    Loading.close()
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    NProgress.done()
    Loading.close()
    return response
  },
  error => {
    NProgress.done()
    Loading.close()
    Promise.reject(error)
  }
)
