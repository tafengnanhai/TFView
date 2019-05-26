import Mock from 'mockjs'
import store from '@/store'

let users = [
  {
    username: 'other',
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
Mock.mock(/\/Login\/check/, 'post', function (options) {
  let result = JSON.parse(options.body)
  let data = dataSessionError
  for (let key in users) {
    if (users[key].username === result['username'] && users[key].password === result['password']) {
      data = dataSessionSuccess
    }
  }
  return data
})
