import Mock from 'mockjs'
import store from '@/store'
import Tools from '@/plugins/tools'

let pageSize = store.state.pageSize
let maxId = 98
let extraData = Mock.mock({
  'extra|98': [
    {
      art_id: '@increment',
      art_pubdate: '@now',
      art_title: '@ctitle(10, 20)',
      artsort_id: '@int(1,7)',
      artsort_name: '@cword(3, 5)'
    }
  ]
})
extraData.extra.reverse()
let dataListAll = Mock.mock({
  code: 0,
  msg: '操作成功',
  pageSize: pageSize,
  total: 98
})

Mock.mock(/\/Article\/listAll/, 'get', function (options) {
  let tempDataListAll = dataListAll
  let p = Tools.getParam('p', options.url)
  let keyword = Tools.getParam('keyword', options.url)
  let tempExtra = extraData.extra
  tempDataListAll.total = tempExtra.length
  if (keyword !== '' && tempExtra.length > 0) {
    tempExtra = tempExtra.filter(item => {
      return item.art_title.indexOf(keyword) !== -1
    })
    tempDataListAll.total = tempExtra.length
  }
  let pExtraData =
    tempExtra.length > 0
      ? tempExtra.slice(pageSize * (p - 1), pageSize * p)
      : tempExtra
  tempDataListAll = { ...tempDataListAll, extra: pExtraData }
  return tempDataListAll
})

let dataSuccess = {
  code: 0,
  msg: '操作成功'
}

Mock.mock(/\/Article\/del/, 'post', function (options) {
  let result = JSON.parse(options.body)
  let id = result.id
  extraData.extra = extraData.extra.filter(item => {
    return item.art_id !== id
  })
  dataListAll.total--
  return dataSuccess
})

Mock.mock(/\/Article\/add/, 'post', function (options) {
  let result = JSON.parse(options.body)
  result.art_id = ++maxId
  result.artsort_name = Mock.mock('@cword(3,5)') // 实际开发中会从Artsort处获取
  extraData.extra.unshift(result)
  dataListAll.total++
  return dataSuccess
})

let dataError = {
  code: 1,
  msg: '文章不存在或者已删除'
}

Mock.mock(/\/Article\/detail/, 'get', function (options) {
  let id = parseInt(Tools.getParam('id', options.url))
  let tempData
  extraData.extra.forEach(item => {
    if (item.art_id === id) {
      tempData = item
    }
  })
  return tempData || dataError
})
