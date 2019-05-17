import Mock from 'mockjs'
let data = {
  code: 0,
  msg: 'success',
  extra: [
    {
      timestamp: '2019/5/15',
      title: '功能更新3',
      content: '更新了某某功能',
      detailTime: '2019/5/15 21:17'
    },
    {
      timestamp: '2019/5/12',
      title: '功能更新2',
      content: '更新了某某功能',
      detailTime: '2019/5/12 21:17'
    },
    {
      timestamp: '2019/5/11',
      title: '功能更新1',
      content: '更新了某某功能',
      detailTime: '2019/5/11 21:17'
    }
  ]
}
Mock.mock(/\/v1\/site\/update/, 'get', data)
