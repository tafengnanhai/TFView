import Mock from 'mockjs'
import store from '@/store'
import Tools from '@/plugins/tools'

const pageSize = store.state.pageSize
let maxId = 2

const extraData = {
  extra: [
    {
      rule_id: 1,
      rule_name: '【操作】首页面板==汇总统计',
      rule_title: 'Action-Member-getGeneralStat',
      rule_condition: ''
    },
    {
      rule_id: 2,
      rule_name: '【操作】首页面板==更新日志',
      rule_title: 'Action-Site-getUpdateRecords',
      rule_condition: ''
    }
  ]
}

let dataListAll = {
  code: 0,
  msg: '操作成功',
  pageSize: pageSize,
  total: maxId
}

Mock.mock(/\/Rule\/listAll/, 'get', options => {
  const p = Tools.getParam('p', options.url)
  const keyword = Tools.getParam('keyword', options.url)
  let tempExtra = extraData.extra
  dataListAll.total = tempExtra.length
  if (keyword !== '' && tempExtra.length > 0) {
    tempExtra = tempExtra.filter(item => {
      return (
        item.rule_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
        item.rule_title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      )
    })
    dataListAll.total = tempExtra.length
  }
  let pExtraData =
    tempExtra.length > 0
      ? tempExtra.slice(pageSize * (p - 1), pageSize * p)
      : tempExtra
  dataListAll = { ...dataListAll, extra: pExtraData }
  return dataListAll
})

const dataEditSuccess = {
  code: 0,
  msg: '操作成功'
}

const dataEditError = {
  code: 1,
  msg: '规则不存在或者已删除'
}

const dataExistsError = {
  code: 1,
  msg: '规则名称已存在'
}

Mock.mock(/\/Rule\/add/, 'post', options => {
  const result = JSON.parse(options.body)
  const isExists = extraData.extra.some(item => {
    return item.rule_name.toLowerCase() === result.rule_name.toLowerCase()
  })
  if (isExists) {
    return dataExistsError
  }
  result.rule_id = ++maxId
  extraData.extra.push(result)
  dataListAll.total++
  return dataEditSuccess
})

Mock.mock(/\/Rule\/edit/, 'post', options => {
  const result = JSON.parse(options.body)
  let isExists = false
  let equalOthers = false
  extraData.extra = extraData.extra.map(item => {
    if (item.rule_id === result.rule_id) {
      isExists = true
      Object.assign(item, result)
    }
    if (
      item.rule_id !== result.rule_id &&
      item.rule_name === result.rule_name
    ) {
      equalOthers = true
    }
    return item
  })
  if (!isExists) {
    return dataEditError
  }
  if (equalOthers) {
    return dataExistsError
  }
  return dataEditSuccess
})

Mock.mock(/\/Rule\/detail/, 'get', options => {
  const id = parseInt(Tools.getParam('id', options.url))
  let tempData
  extraData.extra.every(item => {
    if (item.rule_id === id) {
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

Mock.mock(/\/Rule\/del/, 'post', options => {
  const result = JSON.parse(options.body)
  const id = result.id
  let isExists = false
  extraData.extra = extraData.extra.filter(item => {
    if (item.rule_id === id) {
      isExists = true
    }
    return item.rule_id !== id
  })
  if (!isExists) {
    return dataEditError
  }
  dataListAll.total--
  dataEditSuccess.total = dataListAll.total
  return dataEditSuccess
})
