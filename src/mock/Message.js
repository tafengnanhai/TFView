import Mock from 'mockjs'

const data = {
  code: 0,
  msg: '操作成功',
  extra: {
    reg_new: false,
    reg_total: 100
  }
}

const dataSuccess = {
  code: 0,
  msg: '操作成功'
}

Mock.mock(/\/Message\/edit/, options => {
  const result = JSON.parse(options.body)
  data.extra = result
  return dataSuccess
})

Mock.mock(/\/Message\/detail/, 'get', data)
