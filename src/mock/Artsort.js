import Mock from 'mockjs'

let dataListAll = Mock.mock({
  code: 0,
  msg: '操作成功',
  extra: [
    {
      artsort_id: 1,
      artsort_order: 1,
      artsort_parentid: 0,
      artsort_name: '分类1',
      artsort_type: '',
      children: [
        {
          artsort_id: 2,
          artsort_order: 2,
          artsort_parentid: 1,
          artsort_name: '分类2',
          artsort_type: '',
          children: [
            {
              artsort_id: 3,
              artsort_order: 3,
              artsort_parentid: 2,
              artsort_name: '分类3',
              artsort_type: ''
            },
            {
              artsort_id: 4,
              artsort_order: 4,
              artsort_parentid: 2,
              artsort_name: '分类4',
              artsort_type: ''
            }
          ]
        },
        {
          artsort_id: 5,
          artsort_order: 5,
          artsort_parentid: 1,
          artsort_name: '分类5',
          artsort_type: ''
        }
      ]
    },
    {
      artsort_id: 6,
      artsort_order: 6,
      artsort_parentid: 0,
      artsort_name: '分类6',
      artsort_type: ''
    },
    {
      artsort_id: 7,
      artsort_order: 7,
      artsort_parentid: 0,
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

Mock.mock(/\/Artsort\/editAll/, 'post', function (options) {
  // 实际开发中这里应该增加服务器端的有效性校验（如父类不存在，分类下有文章，分类下有子类等）
  dataListAll.extra = JSON.parse(options.body)
  return dataSuccess
})
