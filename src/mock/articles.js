import Mock from 'mockjs'
let data =
  Mock.mock({
    code: 0,
    msg: 'success',
    'extra|10': [{
      art_id: '@increment',
      art_pubdate: '@date("yyyy-MM-dd")',
      art_title: '@word(25, 50)',
      artsort_name: '@word(3, 5)'
    }]
  })
Mock.mock(/\/v1\/articles/, 'get', data)
