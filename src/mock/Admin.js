import Mock from 'mockjs'
import store from '@/store'
import Tools from '@/plugins/tools'

const pageSize = store.state.pageSize
let maxId = 3

const extraData = {
  extra: [
    {
      admin_id: 1,
      admin_username: 'admin',
      admin_password: 'admin',
      admin_status: '1'
    },
    {
      admin_id: 2,
      admin_username: 'other',
      admin_password: '123456',
      admin_status: '1'
    },
    {
      admin_id: 3,
      admin_username: 'test',
      admin_password: '123456',
      admin_status: '1'
    }
  ]
}

let dataListAll = {
  code: 0,
  msg: '操作成功',
  pageSize: pageSize,
  total: maxId
}

let dataListForGroup = {
  code: 0,
  msg: '操作成功'
}

const dataLoginSuccess = {
  code: 0,
  msg: '登录成功',
  extra: { token: store.state.testToken }
}

const dataLoginError = {
  code: 1,
  msg: '用户名或密码错误'
}

const dataStatusError = {
  code: 1,
  msg: '用户已被禁用，请联系管理员'
}

// 和后端一致，不建议直接返回用户名和密码的判断方式
Mock.mock(/\/Admin\/check/, 'post', options => {
  const result = JSON.parse(options.body)
  let status = '1'
  if (
    extraData.extra.some(
      item =>
        item.admin_username === result.username &&
        item.admin_password === result.password &&
        (dataLoginSuccess.extra.userid = item.admin_id) &&
        (status = item.admin_status)
    )
  ) {
    return status === '1' ? dataLoginSuccess : dataStatusError
  }
  return dataLoginError
})

Mock.mock(/\/Admin\/listAll/, 'get', options => {
  const p = Tools.getParam('p', options.url)
  const keyword = Tools.getParam('keyword', options.url)
  let tempExtra = extraData.extra // 实际开发中后端会设置返回的字段，不会返回密码等敏感信息
  dataListAll.total = tempExtra.length
  if (keyword !== '' && tempExtra.length > 0) {
    tempExtra = tempExtra.filter(
      item =>
        item.admin_username.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
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

Mock.mock(/\/Admin\/listForGroup/, 'get', options => {
  dataListForGroup.extra = extraData.extra.slice(1)
  return dataListForGroup
})

const dataEditSuccess = {
  code: 0,
  msg: '操作成功'
}

const dataEditError = {
  code: 1,
  msg: '用户名不存在或者已删除'
}

const dataExistsError = {
  code: 1,
  msg: '用户名已经存在'
}

const dataSuperError = {
  code: 1,
  msg: '被操作用户是超级用户，操作已取消'
}

const dataSelfError = {
  code: 1,
  msg: '不能对自己执行该操作哦'
}

Mock.mock(/\/Admin\/add/, 'post', options => {
  const result = JSON.parse(options.body)
  const isExists = extraData.extra.some(
    item =>
      item.admin_username.toLowerCase() === result.admin_username.toLowerCase()
  )
  if (isExists) {
    return dataExistsError
  }
  result.admin_id = ++maxId
  result.admin_status = '1'
  extraData.extra.push(result)
  dataListAll.total++
  return dataEditSuccess
})

Mock.mock(/\/Admin\/edit/, 'post', options => {
  // 为了避免前端直接修改localStorage，服务器端会对userid, username和token进行校验，任何一个修改都会校验失败，重新登陆
  const result = JSON.parse(options.body)
  if (result.admin_id === 1 && store.state.userid !== 1) {
    return dataSuperError
  }
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

Mock.mock(/\/Admin\/detail/, 'get', options => {
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

Mock.mock(/\/Admin\/changeStatus/, 'post', options => {
  const result = JSON.parse(options.body)
  if (result.admin_id === 1) {
    return dataSuperError
  }
  if (result.admin_id === store.state.userid) {
    return dataSelfError
  }
  let isExists = false
  extraData.extra = extraData.extra.map(item => {
    if (item.admin_id === result.admin_id) {
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

Mock.mock(/\/Admin\/del/, 'post', options => {
  const result = JSON.parse(options.body)
  const id = result.id
  if (id === 1) {
    return dataSuperError
  }
  if (id === store.state.userid) {
    return dataSelfError
  }
  let isExists = false
  extraData.extra = extraData.extra.filter(item => {
    if (item.admin_id === id) {
      isExists = true
    }
    return item.admin_id !== id
  })
  if (!isExists) {
    return dataEditError
  }
  dataListAll.total--
  dataEditSuccess.total = dataListAll.total
  return dataEditSuccess
})
