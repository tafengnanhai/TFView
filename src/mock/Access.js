import Mock from 'mockjs'
import Tools from '@/plugins/tools'

const extraData = {
  extra: [
    {
      admin_id: 1,
      group_id: 1
    },
    {
      admin_id: 1,
      group_id: 2
    },
    {
      admin_id: 2,
      group_id: 1
    }
  ]
}

let dataListForGroup = {
  code: 0,
  msg: '操作成功'
}

Mock.mock(/\/Access\/listForGroup/, 'get', options => {
  const id = parseInt(Tools.getParam('id', options.url))
  dataListForGroup.extra = extraData.extra.filter(item => item.group_id === id)
  return dataListForGroup
})

let dataSuccess = {
  code: 0,
  msg: '操作成功'
}

Mock.mock(/\/Access\/edit/, 'post', options => {
  const result = JSON.parse(options.body)
  extraData.extra = extraData.extra.filter(
    item => item.group_id !== result.group_id
  )
  result.admin_id.forEach(item => {
    const tempData = {}
    tempData.group_id = result.group_id
    tempData.admin_id = item
    extraData.extra.push(tempData)
  })

  return dataSuccess
})
