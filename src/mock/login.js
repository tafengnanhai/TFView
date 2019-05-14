import Mock from 'mockjs'
import store from '@/store'

let rnd = Math.round(Math.random())

let data = {
  code: rnd,
  msg: rnd === 0 ? '登录成功' : '用户名或者密码错误',
  extra: { token: store.state.testToken }
}

// 和后端一致，随机返回成功或者失败，不建议直接返回用户名和密码的判断方式
Mock.mock(/\/login\/\w+/, 'get', data)

// 用户状态验证
Mock.mock(/\/check\/\w+/, 'get', data)
