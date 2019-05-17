import Mock from 'mockjs'
let data = {
  today: 1,
  weeek: 2,
  month: 3,
  all: 4
}
Mock.mock(/\/v1\/stat\/total/, 'get', data)
