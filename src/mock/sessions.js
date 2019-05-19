import Mock from 'mockjs'
import store from '@/store'
import Tools from '@/plugins/tools'

let users = [
  {
    username: 'willson',
    password: '123456'
  },
  {
    username: 'admin',
    password: 'admin'
  }
]

let dataSessionSuccess = {
  code: 0,
  msg: '登录成功',
  extra: { token: store.state.testToken }
}

let dataSessionError = {
  code: 1,
  msg: '用户名或密码错误'
}

// 和后端一致，不建议直接返回用户名和密码的判断方式
Mock.mock(/\/v1\/sessions\/\w+/, 'post', function (options) {
  let username = Tools.getParam('username', options.body)
  let password = Tools.getParam('password', options.body)
  let data = dataSessionError
  for (let key in users) {
    if (users[key].username === username && users[key].password === password) {
      data = dataSessionSuccess
    }
  }
  return data
})
