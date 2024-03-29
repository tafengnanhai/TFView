import Mock from 'mockjs'
import Tools from '@/plugins/tools'

let maxId = 7
const dataListAll = {
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
}

Mock.mock(/\/Artsort\/listAll/, 'get', dataListAll)

const dataSuccess = {
  code: 0,
  msg: '操作成功'
}

const dataError = {
  code: 1,
  msg: '分类不存在或者已删除'
}

Mock.mock(/\/Artsort\/editAll/, 'post', options => {
  // 实际开发中这里应该增加服务器端的有效性校验（如父类不存在，分类下有文章，分类下有子类等）
  dataListAll.extra = JSON.parse(options.body)
  return dataSuccess
})

const recursiveEdit = function (extraData, result, tempData) {
  extraData.forEach(item => {
    if (item.artsort_id === result.artsort_id) {
      result.isExists = true
      Object.assign(item, result)
    }
    tempData.push(item)
    if (item.children) {
      tempData[item.length - 1] = {}
      tempData[item.length - 1].children = []
      recursiveEdit(item.children, result, tempData[item.length - 1].children)
    }
  })
}

Mock.mock(/\/Artsort\/add/, 'post', options => {
  let result = JSON.parse(options.body)
  result.artsort_id = ++maxId
  dataListAll.extra.unshift(result)
  dataListAll.total++
  return dataSuccess
})

Mock.mock(/\/Artsort\/edit/, 'post', options => {
  let result = JSON.parse(options.body)
  let tempData = []
  result.isExists = false
  recursiveEdit(dataListAll.extra, result, tempData)
  dataListAll.extra = tempData
  if (!result.isExists) {
    return dataError
  }
  return dataSuccess
})

const recursiveGetDetail = function (extraData, id, tempData) {
  extraData.every(item => {
    if (item.artsort_id === id) {
      tempData.code = 0
      tempData.msg = '操作成功'
      tempData.extra = item
      return false
    }
    if (item.children) {
      recursiveGetDetail(item.children, id, tempData)
    }
    return true
  })
}

Mock.mock(/\/Artsort\/detail/, 'get', options => {
  let id = parseInt(Tools.getParam('id', options.url))
  let tempData = {}
  recursiveGetDetail(dataListAll.extra, id, tempData)
  return tempData || dataError
})
