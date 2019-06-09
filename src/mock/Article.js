import Mock from 'mockjs'
import store from '@/store'
import Tools from '@/plugins/tools'

const pageSize = store.state.pageSize
let maxId = 98

const extraData = Mock.mock({
  // 这里必须提前加入Mock.mock解析，不然下面的extraData.extra.reverse()会无效
  [`extra|${maxId}`]: [
    {
      art_id: '@increment',
      art_pubdate: '@now',
      art_title: '@ctitle(10, 20)',
      artsort_id: '@int(1,7)',
      art_source: '@cword(3, 10)',
      art_order: '@int(0,1000)',
      art_gourl: 'http://@domain',
      art_simg: [
        {
          name: '1',
          url:
            'data:image/gif;base64,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'
        }
      ],
      art_content: '@cparagraph'
    }
  ]
})

extraData.extra.reverse()

const dataListAll = {
  code: 0,
  msg: '操作成功',
  pageSize: pageSize,
  total: maxId
}

Mock.mock(/\/Article\/listAll/, 'get', options => {
  let tempDataListAll = dataListAll
  const p = Tools.getParam('p', options.url)
  const keyword = Tools.getParam('keyword', options.url)
  const artsortId = parseInt(Tools.getParam('artsort_id', options.url))
  const orderType = Tools.getParam('orderType', options.url)
  let tempExtra = extraData.extra
  if (orderType === 'setorder') {
    tempExtra.sort((m, n) => {
      if (m.art_order < n.art_order) {
        return 1
      } else if (m.art_order === n.art_order) {
        return m.art_id < n.art_id ? 1 : -1
      }
      return -1
    })
  } else {
    tempExtra.sort((m, n) => {
      return m.art_id < n.art_id ? 1 : -1
    })
  }
  tempDataListAll.total = tempExtra.length
  if (artsortId !== 0 && tempExtra.length > 0) {
    tempExtra = tempExtra.filter(item => {
      return item.artsort_id === artsortId
    })
    tempDataListAll.total = tempExtra.length
  }
  if (keyword !== '' && tempExtra.length > 0) {
    tempExtra = tempExtra.filter(item => {
      return item.art_title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
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

const dataSuccess = {
  code: 0,
  msg: '操作成功'
}

Mock.mock(/\/Article\/delSelection/, 'post', options => {
  const result = JSON.parse(options.body)
  const ids = result.ids.valueOf()
  extraData.extra = extraData.extra.filter(item => {
    if (ids.includes(item.art_id.toString())) {
      dataListAll.total--
      return false
    }
    return true
  })
  dataSuccess.total = dataListAll.total
  return dataSuccess
})

const dataError = {
  code: 1,
  msg: '文章不存在或者已删除'
}

Mock.mock(/\/Article\/del/, 'post', options => {
  const result = JSON.parse(options.body)
  const id = result.id
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
  dataSuccess.total = dataListAll.total
  return dataSuccess
})

Mock.mock(/\/Article\/add/, 'post', options => {
  const result = JSON.parse(options.body)
  result.art_id = ++maxId
  extraData.extra.unshift(result)
  dataListAll.total++
  return dataSuccess
})

Mock.mock(/\/Article\/edit/, 'post', options => {
  const result = JSON.parse(options.body)
  let isExists = false
  extraData.extra = extraData.extra.map(item => {
    if (item.art_id === result.art_id) {
      isExists = true
      Object.assign(item, result)
    }
    return item
  })
  if (!isExists) {
    return dataError
  }
  return dataSuccess
})

Mock.mock(/\/Article\/detail/, 'get', options => {
  const id = parseInt(Tools.getParam('id', options.url))
  let tempData
  extraData.extra.every(item => {
    if (item.art_id === id) {
      tempData = {}
      tempData.code = 0
      tempData.msg = '操作成功'
      tempData.extra = item
      return false
    }
    return true
  })
  return tempData || dataError
})

const dataArtsortError = {
  code: 1,
  msg: '分类下有文章，请先删除文章'
}

// 为了检测方便，模拟环境下将分类下文章检测放到Article中，实际开发中建议放到Artsort中
Mock.mock(/\/Article\/checkArtsort/, 'get', options => {
  const id = parseInt(Tools.getParam('id', options.url))
  let isExists = extraData.extra.some(item => item.artsort_id === id)
  return isExists ? dataArtsortError : dataSuccess
})
