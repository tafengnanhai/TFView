import Mock from 'mockjs'
import Tools from '@/plugin/tools'
let extraData = Mock.mock({
  'extra|98': [{
    art_id: '@increment',
    art_pubdate: '@date("yyyy-MM-dd")',
    art_title: '@word(25, 50)',
    artsort_name: '@word(3, 5)'
  }]
})
let data =
  Mock.mock({
    code: 0,
    msg: 'success'
  })

Mock.mock(/\/v1\/articles/, 'get', function (req) {
  let p = decodeURI(Tools.getParam('p', req.url))
  let pExtraData = extraData.extra.slice(p - 1, 10)
  data = { ...data, extra: pExtraData }
  return data
})
