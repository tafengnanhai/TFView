import Mock from 'mockjs'

let dataListAll = Mock.mock({
  code: 0,
  msg: '操作成功',
  extra: [
    {
      artsort_id: 1,
      artsort_name: '@cword(3, 5)',
      children: [
        {
          artsort_id: 2,
          artsort_name: '@cword(3, 5)',
          children: [
            {
              artsort_id: 3,
              artsort_name: '@cword(3, 5)'
            },
            {
              artsort_id: 4,
              artsort_name: '@cword(3, 5)'
            }
          ]
        },
        {
          artsort_id: 5,
          artsort_name: '@cword(3, 5)'
        }
      ]
    },
    {
      artsort_id: 6,
      artsort_name: '@cword(3, 5)'
    },
    {
      artsort_id: 7,
      artsort_name: '@cword(3, 5)'
    }
  ]
})

Mock.mock(/\/Artsort\/listAll/, 'get', dataListAll)
