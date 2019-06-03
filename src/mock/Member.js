import Mock from 'mockjs'

const dataMemberGeneralStat = {
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
/* dataMemberGeneralStat = {
  code: 1,
  msg: '获取综合统计失败，请稍后重试'
} */

// 模拟超时
/* dataMemberGeneralStat = {
  code: -1,
  msg: '未登陆或超时，请重新登陆'
} */
Mock.mock(/\/Member\/getGeneralStat/, 'get', dataMemberGeneralStat)

const dataMemberDayDiff = Mock.mock({
  code: 0,
  msg: '操作成功',
  extra: {
    labels: '@range(24)',
    datasets: [
      {
        label: '今日注册',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: '#F56C6C',
        'data|24': ['@integer(1, 100)']
      },
      {
        label: '昨日注册',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#409EFF',
        'data|24': ['@integer(1, 100)']
      }
    ]
  }
})

Mock.mock(/\/Member\/getDayDiffStat/, 'get', dataMemberDayDiff)

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
        'data|7': ['@integer(1000, 10000)']
      },
      {
        label: '上周注册',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#409EFF',
        'data|7': ['@integer(1000, 10000)']
      }
    ]
  }
}
Mock.mock(/\/Member\/getWeekDiffStat/, 'get', dataMemberWeekDiff)

let d = new Date()
const m = d.getMonth()
d.setMonth(m)
d.setDate(0)
const lastMonthDay = d.getDate()
d.setMonth(m + 1)
d.setDate(0)
const thisMonthDay = d.getDate()
const diffMonthDay =
  (lastMonthDay > thisMonthDay ? lastMonthDay : thisMonthDay) + 1

const dataMemberMonthDiff = Mock.mock({
  code: 0,
  msg: '操作成功',
  extra: {
    labels: `@range(1,${diffMonthDay})`,
    datasets: [
      {
        label: '本月注册',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: '#F56C6C',
        [`data|${new Date().getDate()}`]: ['@integer(1000, 10000)']
      },
      {
        label: '上月注册',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#409EFF',
        [`data|${lastMonthDay}`]: ['@integer(1000, 10000)']
      }
    ]
  }
})

Mock.mock(/\/Member\/getMonthDiffStat/, 'get', dataMemberMonthDiff)

const dataMsg = {
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
