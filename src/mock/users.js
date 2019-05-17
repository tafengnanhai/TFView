import Mock from 'mockjs'
import store from '@/store'

let data = {
  code: 0,
  msg: '登录成功',
  extra: { token: store.state.testToken }
}

// 和后端一致，不建议直接返回用户名和密码的判断方式
Mock.mock(/\/v1\/users\/\w+/, 'post', data)

data = {
  code: -1,
  msg: store.state.timeoutMsg
}

data = {
  code: 0,
  msg: 'success'
}
// 用户状态验证
Mock.mock(/\/v1\/check\/\w+/, 'get', data)

data = {
  code: 0,
  msg: '操作成功',
  extra: {
    today: Mock.mock('@integer(1, 1000)'),
    week: Mock.mock('@integer(1000, 10000)'),
    month: Mock.mock('@integer(10000, 100000)'),
    all: Mock.mock('@integer(1000000, 10000000)')
  }
}
// 模拟错误
// data = {
//   code: 1,
//   msg: '获取综合统计失败，请稍后重试'
// }

// 模拟超时
// data = {
//   code: -1,
//   msg: store.state.timeoutMsg
// }
Mock.mock(/\/v1\/users\/stat/, 'get', data)
