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

let data1Success = {
  code: 0,
  msg: '登录成功',
  extra: { token: store.state.testToken }
}

let data1Error = {
  code: 1,
  msg: '用户名或密码错误'
}

// 和后端一致，不建议直接返回用户名和密码的判断方式
Mock.mock(/\/v1\/sessions\/\w+/, 'post', function (options) {
  let username = Tools.getParam('username', options.body)
  let password = Tools.getParam('password', options.body)
  let data = data1Error
  for (let key in users) {
    if (users[key].username === username && users[key].password === password) {
      data = data1Success
    }
  }
  return data
})

let data2 = {
  code: -1,
  msg: store.state.timeoutMsg
}

data2 = {
  code: 0,
  msg: 'success'
}
// 用户状态验证
Mock.mock(/\/v1\/sessions\/\w+/, 'get', data2)
