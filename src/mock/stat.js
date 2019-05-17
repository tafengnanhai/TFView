import Mock from 'mockjs'
// import store from '@/store'
let data
data = {
  code: 0,
  msg: '操作成功',
  today: Mock.mock('@integer(1, 1000)'),
  weeek: Mock.mock('@integer(1000, 10000)'),
  month: Mock.mock('@integer(10000, 100000)'),
  all: Mock.mock('@integer(1000000, 10000000)')
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
Mock.mock(/\/v1\/stat\/total/, 'get', data)
