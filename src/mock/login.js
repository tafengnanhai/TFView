import Mock from 'mockjs'
import store from '@/store'

let rnd = Math.round(Math.random())

let data = {
  code: rnd,
  msg: rnd === 0 ? '登录成功' : '用户名或者密码错误',
  extra: { token: store.state.testToken }
}

// 随机返回成功或者失败
Mock.mock(/\/user\/\w+/, 'get', data)
