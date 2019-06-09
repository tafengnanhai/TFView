import Mock from 'mockjs'
import store from '@/store'
import Tools from '@/plugins/tools'

const pageSize = store.state.pageSize
let maxId = 100

const extraData = Mock.mock({
  [`extra|${maxId}`]: [
    {
      log_id: '@increment',
      log_userid: '@int(1,10000000)',
      log_ip: '@ip',
      log_time: '@now',
      log_content: '@ctitle(3, 6)'
    }
  ]
})

extraData.extra.reverse()

let dataListAll = {
  code: 0,
  msg: '操作成功',
  pageSize: pageSize,
  total: maxId
}

Mock.mock(/\/LogSys\/listAll/, 'get', options => {
  const p = Tools.getParam('p', options.url)
  let userid = Tools.getParam('keyword', options.url)
  userid = userid === '' ? 0 : parseInt(userid)
  let tempExtra = extraData.extra
  dataListAll.total = tempExtra.length
  if (userid !== 0 && tempExtra.length > 0) {
    tempExtra = tempExtra.filter(item => {
      return item.log_userid === userid
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
