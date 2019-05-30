import Mock from 'mockjs'
import store from '@/store'

const users = [
  {
    username: 'other',
    password: '123456'
  },
  {
    username: 'admin',
    password: 'admin'
  }
]

const dataSessionSuccess = {
  code: 0,
  msg: '登录成功',
  extra: { token: store.state.testToken }
}

const dataSessionError = {
  code: 1,
  msg: '用户名或密码错误'
}

// 和后端一致，不建议直接返回用户名和密码的判断方式
Mock.mock(/\/Login\/check/, 'post', function (options) {
  const result = JSON.parse(options.body)
  for (let key in users) {
    if (
      users[key].username === result['username'] &&
      users[key].password === result['password']
    ) {
      return dataSessionSuccess
    }
  }
  return dataSessionError
})
