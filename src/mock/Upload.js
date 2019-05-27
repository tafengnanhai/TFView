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
// 这里已经转为base64，原则上不再需要上传接口，只是为了应对action属性
Mock.mock(/\/Upload\/index/, 'post', dataUpload)
