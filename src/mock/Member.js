import Mock from 'mockjs'
import store from '@/store'

const Random = Mock.Random

const dataMemberGeneralStat = Mock.mock({
  code: 0,
  msg: '操作成功',
  extra: {
    today: '@integer(1, 1000)',
    week: '@integer(1000, 10000)',
    month: '@integer(10000, 100000)',
    all: '@integer(1000000, 10000000)'
  }
})
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
Mock.mock(/\/Member\/getGeneralStat/, 'get', options => {
  // 这里仅仅选择几个操作模拟下后端接口控制，实时开发时可以统一通过后端处理，不需要逐个调整（比如在基类中或者中间件等）
  const authResult = store.getters.checkRuleAction(options.url)
  return authResult.code === 0 ? dataMemberGeneralStat : authResult
})
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

Mock.mock(/\/Member\/getDayDiffStat/, 'get', options => {
  const authResult = store.getters.checkRuleAction(options.url)
  return authResult.code === 0 ? dataMemberDayDiff : authResult
})

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

const dataMemberMonthDiff = {
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
}

Mock.mock(/\/Member\/getMonthDiffStat/, 'get', dataMemberMonthDiff)

const dataMemberCity = Mock.mock({
  code: 0,
  msg: '操作成功',
  extra: [
    { name: '济南市', value: '@int(100,10000)' },
    { name: '青岛市', value: '@int(100,10000)' },
    { name: '淄博市', value: '@int(100,10000)' },
    { name: '枣庄市', value: '@int(100,10000)' },
    { name: '东营市', value: '@int(100,10000)' },
    { name: '烟台市', value: '@int(100,10000)' },
    { name: '潍坊市', value: '@int(100,10000)' },
    { name: '济宁市', value: '@int(100,10000)' },
    { name: '泰安市', value: '@int(100,10000)' },
    { name: '威海市', value: '@int(100,10000)' },
    { name: '日照市', value: '@int(100,10000)' },
    { name: '临沂市', value: '@int(100,10000)' },
    { name: '德州市', value: '@int(100,10000)' },
    { name: '聊城市', value: '@int(100,10000)' },
    { name: '滨州市', value: '@int(100,10000)' },
    { name: '菏泽市', value: '@int(100,10000)' },
    { name: '省外', value: '@int(100,10000)' }
  ]
})

Mock.mock(/\/Member\/getCityStat/, 'get', options => {
  dataMemberCity.extra.sort((m, n) => {
    if (m.value < n.value) {
      return 1
    } else if (m.value > n.value) {
      return -1
    }
    return 0
  })
  return dataMemberCity
})

const dataMemberNow = {
  code: 0,
  msg: '操作成功'
}

const dataMemberNowExtraData = Mock.mock([
  { name: '济南市', value: '@int(1,100)' },
  { name: '青岛市', value: '@int(1,100)' },
  { name: '淄博市', value: '@int(1,100)' },
  { name: '枣庄市', value: '@int(1,100)' },
  { name: '东营市', value: '@int(1,100)' },
  { name: '烟台市', value: '@int(1,100)' },
  { name: '潍坊市', value: '@int(1,100)' },
  { name: '济宁市', value: '@int(1,100)' },
  { name: '泰安市', value: '@int(1,100)' },
  { name: '威海市', value: '@int(1,100)' },
  { name: '日照市', value: '@int(1,100)' },
  { name: '临沂市', value: '@int(1,100)' },
  { name: '德州市', value: '@int(1,100)' },
  { name: '聊城市', value: '@int(1,100)' },
  { name: '滨州市', value: '@int(1,100)' },
  { name: '菏泽市', value: '@int(1,100)' },
  { name: '省外', value: '@int(1,100)' }
])

Mock.mock(/\/Member\/getCityNow/, 'get', options => {
  const tempExtra = dataMemberNowExtraData
  dataMemberNow.extra = tempExtra.filter(() => {
    return Random.integer(1, 10) === 5
  })
  return dataMemberNow
})

const dataMsg = {
  code: 0,
  msg: '操作成功',
  extra: {
    max_id: new Date().getTime()
  }
}

Mock.mock(/\/Member\/checkMsg/, 'get', options => {
  dataMsg.extra.max_id = new Date().getTime()
  return dataMsg
})
