import Mock from 'mockjs'

const dataMemberStat = {
  code: 0,
  msg: '操作成功',
  extra: {
    today: Mock.mock('@integer(1, 1000)'),
    week: Mock.mock('@integer(1000, 10000)'),
    month: Mock.mock('@integer(10000, 100000)'),
    all: Mock.mock('@integer(1000000, 10000000)')
  }
}
// 模拟错误
/* dataMemberStat = {
  code: 1,
  msg: '获取综合统计失败，请稍后重试'
} */

// 模拟超时
/* dataMemberStat = {
  code: -1,
  msg: '未登陆或超时，请重新登陆'
} */
Mock.mock(/\/Member\/getGeneralStat/, 'get', dataMemberStat)

const dataMemberWeekDiff = {
  code: 0,
  msg: '操作成功',
  extra: {
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    datasets: [
      {
        label: '本周注册',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: '#F56C6C',
        data: [
          Mock.mock('@integer(1, 1000)'),
          Mock.mock('@integer(1, 1000)'),
          Mock.mock('@integer(1, 1000)'),
          Mock.mock('@integer(1, 1000)'),
          Mock.mock('@integer(1, 1000)'),
          Mock.mock('@integer(1, 1000)'),
          Mock.mock('@integer(1, 1000)')
        ]
      },
      {
        label: '上周注册',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#409EFF',
        data: [
          Mock.mock('@integer(1, 1000)'),
          Mock.mock('@integer(1, 1000)'),
          Mock.mock('@integer(1, 1000)'),
          Mock.mock('@integer(1, 1000)'),
          Mock.mock('@integer(1, 1000)'),
          Mock.mock('@integer(1, 1000)'),
          Mock.mock('@integer(1, 1000)')
        ]
      }
    ]
  }
}
Mock.mock(/\/Member\/getWeekDiffStat/, 'get', dataMemberWeekDiff)

let dataMsg = {
  code: 0,
  msg: '操作成功',
  extra: {
    max_id: new Date().getTime()
  }
}

Mock.mock(/\/Member\/checkMsg/, 'get', function (options) {
  dataMsg.extra.max_id = new Date().getTime()
  return dataMsg
})
