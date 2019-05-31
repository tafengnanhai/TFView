import Mock from 'mockjs'
import store from '@/store'
import Tools from '@/plugins/tools'

/* const pageSize = store.state.pageSize */
let maxId = 2

const extraData = [
  {
    admin_id: 1,
    admin_username: 'other',
    admin_password: '123456'
  },
  {
    admin_id: 2,
    admin_username: 'admin',
    admin_password: 'admin'
  }
]

/* let dataListAll = {
  code: 0,
  msg: '操作成功',
  pageSize: pageSize,
  total: maxId
} */

const dataLoginSuccess = {
  code: 0,
  msg: '登录成功',
  extra: { token: store.state.testToken }
}

const dataLoginError = {
  code: 1,
  msg: '用户名或密码错误'
}

// 和后端一致，不建议直接返回用户名和密码的判断方式
Mock.mock(/\/Admin\/check/, 'post', function (options) {
  const result = JSON.parse(options.body)
  if (
    extraData.some(
      item =>
        item.admin_username === result.username &&
        item.admin_password === result.password
    )
  ) {
    return dataLoginSuccess
  }
  return dataLoginError
})

const dataEditSuccess = {
  code: 0,
  msg: '操作成功'
}

const dataEditError = {
  code: 1,
  msg: '用户名不存在或者已删除'
}
Mock.mock(/\/Article\/add/, 'post', function (options) {
  const result = JSON.parse(options.body)
  result.admin_id = ++maxId
  extraData.extra.push(result)
  extraData.total++
  return dataEditSuccess
})

Mock.mock(/\/Article\/edit/, 'post', function (options) {
  const result = JSON.parse(options.body)
  let isExists = false
  extraData.extra = extraData.extra.map(item => {
    if (item.admin_username === result.admin_username) {
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

Mock.mock(/\/Article\/detail/, 'get', function (options) {
  const id = parseInt(Tools.getParam('id', options.url))
  let tempData
  extraData.extra.every(item => {
    if (item.admin_id === id) {
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
