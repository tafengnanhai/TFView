import Mock from 'mockjs'
// 定义请求链接，类型，还有返回数据
Mock.mock(/check/, 'get', {
  username: 'admin',
  password: 'admin',
  token: 'this is test token which will be replaced by backend'
})
