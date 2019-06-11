import Mock from 'mockjs'
import store from '@/store'
import Tools from '@/plugins/tools'

const pageSize = store.state.pageSize
let maxId = 2

const extraData = {
  extra: [
    {
      group_id: 1,
      group_title: '系统用户组',
      group_rules: '1,2,3',
      group_status: '1'
    },
    {
      group_id: 2,
      group_title: '测试用户组',
      group_rules: '1,2,3,4',
      group_status: '1'
    }
  ]
}

let dataListAll = {
  code: 0,
  msg: '操作成功',
  pageSize: pageSize,
  total: maxId
}

Mock.mock(/\/Group\/listAll/, 'get', options => {
  const p = Tools.getParam('p', options.url)
  const keyword = Tools.getParam('keyword', options.url)
  let tempExtra = extraData.extra.sort((m, n) => {
    if (m.group_title === n.group_title) {
      return 0
    }
    return m.group_title > n.group_title ? -1 : 1
  })
  dataListAll.total = tempExtra.length
  if (keyword !== '' && tempExtra.length > 0) {
    tempExtra = tempExtra.filter(
      item =>
        item.group_title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    )

    dataListAll.total = tempExtra.length
  }
  let pExtraData =
    tempExtra.length > 0
      ? tempExtra.slice(pageSize * (p - 1), pageSize * p)
      : tempExtra
  dataListAll.extra = pExtraData
  return dataListAll
})

const dataEditSuccess = {
  code: 0,
  msg: '操作成功'
}

const dataEditError = {
  code: 1,
  msg: '分组不存在或者已删除'
}

const dataExistsError = {
  code: 1,
  msg: '分组已存在'
}

Mock.mock(/\/Group\/add/, 'post', options => {
  const result = JSON.parse(options.body)
  const isExists = extraData.extra.some(
    item => item.group_title.toLowerCase() === result.group_title.toLowerCase()
  )
  if (isExists) {
    return dataExistsError
  }
  result.group_id = ++maxId
  result.group_status = '1'
  extraData.extra.push(result)
  dataListAll.total++
  return dataEditSuccess
})

Mock.mock(/\/Group\/edit/, 'post', options => {
  const result = JSON.parse(options.body)
  let equalOthers = extraData.extra.some(
    item =>
      item.group_id !== result.group_id &&
      item.group_title === result.group_title
  )
  if (equalOthers) {
    return dataExistsError
  }
  let isExists = false
  extraData.extra = extraData.extra.map(item => {
    if (item.group_id === result.group_id) {
      isExists = true
      Object.assign(item, result)
    }
    return item
  })
  if (!isExists) {
    return dataEditError
  }
  return dataEditSuccess
})

Mock.mock(/\/Group\/detail/, 'get', options => {
  const id = parseInt(Tools.getParam('id', options.url))
  let tempData
  extraData.extra.every(item => {
    if (item.group_id === id) {
      tempData = {}
      tempData.code = 0
      tempData.msg = '操作成功'
      tempData.extra = item
      return false
    }
    return true
  })
  return tempData || dataEditError
})

Mock.mock(/\/Group\/changeStatus/, 'post', options => {
  const result = JSON.parse(options.body)
  let isExists = false
  extraData.extra = extraData.extra.map(item => {
    if (item.group_id === result.group_id) {
      isExists = true
      Object.assign(item, result)
    }
    return item
  })
  if (!isExists) {
    return dataEditError
  }
  return dataEditSuccess
})

Mock.mock(/\/Group\/del/, 'post', options => {
  const result = JSON.parse(options.body)
  const id = result.id
  let isExists = false
  extraData.extra = extraData.extra.filter(item => {
    if (item.group_id === id) {
      isExists = true
    }
    return item.group_id !== id
  })
  if (!isExists) {
    return dataEditError
  }
  dataListAll.total--
  dataEditSuccess.total = dataListAll.total
  return dataEditSuccess
})

const groupData = {
  code: 0,
  msg: '操作成功'
}

Mock.mock(/\/Group\/getGroup/, 'get', options => {
  const ids = Tools.getParam('groupIds', options.url).split(',')
  const tempData = []
  extraData.extra.forEach(item => {
    if (ids.includes(item.group_id.toString())) {
      item.group_rules.length > 0 &&
        item.group_rules.split(',').forEach(rule => {
          const tempRule = parseInt(rule)
          if (!tempData.includes(tempRule)) {
            tempData.push(tempRule)
          }
        })
    }
  })
  groupData.extra = tempData
  return groupData
})
