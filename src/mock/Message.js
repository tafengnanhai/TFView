import Mock from 'mockjs'
import store from '@/store'

const dataListAll = {
  code: 0,
  msg: '操作成功',
  extra: [
    {
      user_id: 1,
      reg_new: false,
      reg_total: 10
    },
    {
      user_id: 2,
      reg_new: true,
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
  dataListAll.extra = dataListAll.extra.map(item => {
    if (item.user_id === store.state.userid) {
      Object.assign(item, result)
    }
    return item
  })
  return dataSuccess
})

const data = {
  code: 0,
  msg: '操作成功',
  extra: {
    user_id: 1,
    reg_new: true,
    reg_total: 1
  }
}

Mock.mock(/\/Message\/detail/, 'get', function (options) {
  dataListAll.extra.every(item => {
    if (item.user_id === store.state.userid) {
      data.extra = item
      return false
    }
    return true
  })
  return data
})
