import Mock from 'mockjs'
// import store from '@/store'
let data
data = {
  code: 0,
  msg: 'success',
  extra: [{
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1517 弄',
    zip: 200333
  }, {
    date: '2016-05-01',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1519 弄',
    zip: 200333
  }]
}
// 模拟错误
// data = {
//   code: 1,
//   msg: '获取综合统计失败，请稍后重试'
// }

// 模拟超时
// data = {
//   code: 1,
//   msg: store.state.timeoutMsg
// }
Mock.mock(/\/v1\/articles/, 'get', data)
