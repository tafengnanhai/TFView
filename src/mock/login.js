import Mock from 'mockjs'
// 定义请求链接，类型，还有返回数据
Mock.mock(/art/, 'get', {
  username: 'admin',
  password: 'admin'
})
