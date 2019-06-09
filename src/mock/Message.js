import Mock from 'mockjs'
import store from '@/store'

let dataListAll = {
  code: 0,
  msg: '操作成功'
}

let maxId = 2

const extraData = {
  extra: [
    {
      admin_id: 1,
      reg_new: false,
      reg_total: 10
    },
    {
      admin_id: 2,
      reg_new: false,
      reg_total: 1
    }
  ]
}

const dataSuccess = {
  code: 0,
  msg: '操作成功'
}

Mock.mock(/\/Message\/edit/, options => {
  const result = JSON.parse(options.body)
  dataListAll.extra = extraData.extra.map(item => {
    if (item.admin_id === store.state.userid) {
      Object.assign(item, result)
    }
    return item
  })
  return dataSuccess
})

const data = {
  code: 0,
  msg: '操作成功'
}

Mock.mock(/\/Message\/detail/, 'get', function (options) {
  // 如果用户信息未设置则进行首次默认设置
  let isExists = false
  extraData.extra.every(item => {
    if (item.admin_id === store.state.userid) {
      data.extra = item
      isExists = true
      return false
    }
    return true
  })
  if (!isExists) {
    data.extra = {
      admin_id: ++maxId,
      reg_new: false,
      reg_total: 1
    }
    extraData.extra.push(data.extra)
    dataListAll.extra = extraData.extra
  }
  return data
})
