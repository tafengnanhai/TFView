import Mock from 'mockjs'
import Tools from '@/plugins/tools'

let maxId = 7
let dataListAll = Mock.mock({
  code: 0,
  msg: '操作成功',
  extra: [
    {
      artsort_id: 1,
      artsort_name: '分类1',
      artsort_type: '',
      children: [
        {
          artsort_id: 2,
          artsort_name: '分类2',
          artsort_type: '',
          children: [
            {
              artsort_id: 3,
              artsort_name: '分类3',
              artsort_type: ''
            },
            {
              artsort_id: 4,
              artsort_name: '分类4',
              artsort_type: ''
            }
          ]
        },
        {
          artsort_id: 5,
          artsort_name: '分类5',
          artsort_type: ''
        }
      ]
    },
    {
      artsort_id: 6,
      artsort_name: '分类6',
      artsort_type: ''
    },
    {
      artsort_id: 7,
      artsort_name: '分类7',
      artsort_type: ''
    }
  ]
})

Mock.mock(/\/Artsort\/listAll/, 'get', dataListAll)

let dataSuccess = {
  code: 0,
  msg: '操作成功'
}

let dataError = {
  code: 1,
  msg: '分类不存在或者已删除'
}

Mock.mock(/\/Artsort\/editAll/, 'post', function (options) {
  // 实际开发中这里应该增加服务器端的有效性校验（如父类不存在，分类下有文章，分类下有子类等）
  dataListAll.extra = JSON.parse(options.body)
  return dataSuccess
})

Mock.mock(/\/Artsort\/edit/, 'post', function (options) {
  let result = JSON.parse(options.body)
  if (result.artsort_id === 0) {
    // add
    result.artsort_id = ++maxId
    dataListAll.extra.unshift(result)
    dataListAll.total++
  } else {
    // edit
    let isExists = false
    dataListAll.extra = dataListAll.extra.map(item => {
      if (item.artsort_id === result.artsort_id) {
        isExists = true
        return Object.assign(item, result)
      }
      return item
    })
    if (!isExists) {
      return dataError
    }
  }
  return dataSuccess
})

Mock.mock(/\/Artsort\/detail/, 'get', function (options) {
  let id = parseInt(Tools.getParam('id', options.url))
  let tempData
  dataListAll.extra.every(item => {
    if (item.artsort_id === id) {
      tempData = {}
      tempData.code = 0
      tempData.msg = '操作成功'
      tempData.extra = item
      console.log(tempData)
      return false
    }
    return true
  })
  return tempData || dataError
})
