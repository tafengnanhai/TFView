import axios from 'axios'
import qs from 'qs'
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
      obj.sendType = (obj.sendType === undefined ? 'get' : obj.sendType)
      obj.showSuccessTip = (obj.showSuccessTip === undefined ? false : obj.showSuccessTip)
      obj.showErrTip = (obj.showErrTip === undefined ? true : obj.showErrTip)
      obj.neeLogin = (obj.neeLogin === undefined ? true : obj.neeLogin)
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
    let token = lockr.get('token')
    if (request.method === 'post') {
      request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      let data = qs.parse(request.data)

      request.data = qs.stringify({
        token: escape(token),
        ...data
      })
    } else if (request.method === 'get') {
      request.params = {
        token: escape(token),
        ...request.params
      }
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
