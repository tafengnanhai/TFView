import Mock from 'mockjs'
let dataUpload = {
  code: 0,
  msg: '操作成功',
  extra: [
    {
      url: 'xxx'
    },
    {
      url: 'xxx'
    }
  ]
}
Mock.mock(/\/Upload\/index/, 'post', dataUpload)
