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
  send: ({
    url,
    param,
    sendType = 'get',
    showSuccessTip = false,
    showErrTip = true,
    needLogin = true
  } = {}) => {
    return new Promise(resolve => {
      axios[sendType](url, param)
        .then(res => {
          if (res.data.code === 0) {
            showSuccessTip && Message.success(res.data.msg)
          } else if (res.data.code === 1) {
            showErrTip && Message.error(res.data.msg)
          } else if (res.data.code === -1) {
            needLogin &&
              router.push({ path: '/login', query: { from: 'timeout' } })
          }
          resolve(res.data)
        })
        .catch(() => {})
    })
  }
  // 如果显式处理异常更换为以下代码
  /*
  send: ({
    url,
    param,
    sendType = 'get',
    showSuccessTip = false,
    showErrTip = true,
    needLogin = true
  } = {}) => {
    sendType = sendType || 'get'
    showSuccessTip = showSuccessTip || false
    showErrTip = showErrTip || true
    neeLogin = neeLogin || true
    return new Promise((resolve, reject) => {
      axios[sendType](url, param)
        .then(res => {
          if (res.data.code === 0) {
            showSuccessTip && Message.success(res.data.msg)
          } else if (res.data.code === 1) {
            showErrTip && Message.error(res.data.msg)
          } else if (res.data.code === -1) {
            needLogin &&
              router.push({ path: '/login', query: { from: 'timeout' } })
          }
          resolve(res.data)
        })
        .catch(error => {
          reject(error.data)
        })
    })
  }
  */
}

axios.interceptors.request.use(
  request => {
    if (!request.url.endsWith('backend')) {
      NProgress.start()
      Loading.open()
    }
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
