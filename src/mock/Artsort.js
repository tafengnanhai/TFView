import Mock from 'mockjs'

let dataListAll = Mock.mock({
  code: 0,
  msg: '操作成功',
  extra: [
    {
      artsort_id: 1,
      artsort_name: '分类1',
      children: [
        {
          artsort_id: 2,
          artsort_name: '分类2',
          children: [
            {
              artsort_id: 3,
              artsort_name: '分类3'
            },
            {
              artsort_id: 4,
              artsort_name: '分类4'
            }
          ]
        },
        {
          artsort_id: 5,
          artsort_name: '分类5'
        }
      ]
    },
    {
      artsort_id: 6,
      artsort_name: '分类6'
    },
    {
      artsort_id: 7,
      artsort_name: '分类7'
    }
  ]
})

Mock.mock(/\/Artsort\/listAll/, 'get', dataListAll)
