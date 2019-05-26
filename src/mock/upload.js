import Mock from 'mockjs'
let dataUpload = {
  code: 0,
  msg: 'success',
  extra: [
    {
      url: 'xxx'
    },
    {
      url: 'xxx'
    }
  ]
}
Mock.mock(/\/upload/, 'post', dataUpload)
