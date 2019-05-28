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
      artsort_name: '',
      art_source: '@cword(3, 10)',
      art_gourl: 'http://@domain',
      art_simg: [],
      art_content: '@cparagraph'
    }
  ]
})

extraData.extra = extraData.extra.map(item => {
  item.artsort_name = `分类${item.artsort_id}`
  return item
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

let dataError = {
  code: 1,
  msg: '文章不存在或者已删除'
}

Mock.mock(/\/Article\/del/, 'post', function (options) {
  let result = JSON.parse(options.body)
  let id = result.id
  let isExists = false
  extraData.extra = extraData.extra.filter(item => {
    if (item.art_id === id) {
      isExists = true
    }
    return item.art_id !== id
  })
  if (!isExists) {
    return dataError
  }
  dataListAll.total--
  return dataSuccess
})

Mock.mock(/\/Article\/edit/, 'post', function (options) {
  let result = JSON.parse(options.body)
  if (result.art_id === 0) {
    // add
    result.art_id = ++maxId
    extraData.extra.unshift(result)
    dataListAll.total++
  } else {
    // edit
    let isExists = false
    extraData.extra = extraData.extra.map(item => {
      if (item.art_id === result.art_id) {
        isExists = true
        return Object.assign(item, result)
      }
      return item
    })
    if (!isExists) {
      return dataError
    }
  }

  return dataSuccess
})

Mock.mock(/\/Article\/detail/, 'get', function (options) {
  let id = parseInt(Tools.getParam('id', options.url))
  let tempData
  extraData.extra.forEach(item => {
    if (item.art_id === id) {
      tempData = {}
      tempData.code = 0
      tempData.msg = '操作成功'
      tempData.extra = item
      tempData.extra.art_simg = [
        {
          name: '1',
          url:
            'data:image/jpeg;base64,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'
        },
        {
          name: '2',
          url:
            'data:image/gif;base64,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'
        }
      ]
    }
  })
  return tempData || dataError
})
