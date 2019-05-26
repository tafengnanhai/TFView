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
let dataListAll =
  Mock.mock({
    code: 0,
    msg: 'success',
    pageSize: pageSize,
    total: 98
  })

Mock.mock(/\/articles/, 'get', function (options) {
  let p = Tools.getParam('p', options.url)
  let keyword = Tools.getParam('keyword', options.url)
  let tempExtra = extraData.extra
  dataListAll.total = tempExtra.length
  if (keyword !== '' && extraData.extra.length > 0) {
    tempExtra = extraData.extra.filter((item) => {
      return item.art_title.indexOf(keyword) !== -1
    })
    dataListAll.total = tempExtra.length
  }
  let pExtraData = (tempExtra.length > 0 ? tempExtra.slice(pageSize * (p - 1), pageSize * p) : tempExtra)
  dataListAll = { ...dataListAll, extra: pExtraData }
  return dataListAll
})

let dataDelete = {
  code: 0,
  msg: 'success'
}

Mock.mock(/\/articles\/(\d+)/, 'delete', function (options) {
  let id = parseInt(Tools.getSection(3, options.url))
  let tempExtra = []
  for (let i = 0; i < extraData.extra.length; i++) {
    let obj = extraData.extra[i]
    if (parseInt(obj.art_id) !== id) {
      tempExtra.push(obj)
    }
  }
  extraData.extra = tempExtra
  dataListAll.total--
  return dataDelete
})
