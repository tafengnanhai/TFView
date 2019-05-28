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
// 原则行不需要这个接口，图片是转换为base64的，并且最后统一提交，但是如果不设置action和自动上传，不会触发beforeUpload
Mock.mock(/\/Upload\/index/, 'post', dataUpload)
