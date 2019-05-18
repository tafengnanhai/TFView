import Mock from 'mockjs'
import store from '@/store'
import Tools from '@/plugins/tools'

let pageSize = store.state.pageSize
let extraData = Mock.mock({
  'extra|98': [{
    art_id: '@increment',
    art_pubdate: '@date("yyyy-MM-dd")',
    art_title: '@word(25, 50)',
    artsort_name: '@word(3, 5)'
  }]
})
let data1 =
  Mock.mock({
    code: 0,
    msg: 'success',
    pageSize: pageSize,
    total: 98
  })

Mock.mock(/\/v1\/articles/, 'get', function (options) {
  let p = decodeURI(Tools.getParam('p', options.url))
  let pExtraData = extraData.extra.slice(pageSize * (p - 1), pageSize * p)
  data1 = { ...data1, extra: pExtraData }
  return data1
})

let data2 = {
  code: 0,
  msg: 'success'
}

Mock.mock(/\/v1\/articles\/(\d+)/, 'delete', function (options) {
  let id = Tools.getSection(3, options.url)
  console.log(id)
  return data2
})
