import Mock from 'mockjs'

let dataListAll = Mock.mock({
  code: 0,
  msg: 'success',
  extra: [{
    artsort_id: 1,
    artsort_name: '@cword(3, 5)',
    children: [
      {
        artsort_id: 11,
        artsort_name: '@cword(3, 5)',
        children: [
          {
            artsort_id: 111,
            artsort_name: '@cword(3, 5)'
          },
          {
            artsort_id: 112,
            artsort_name: '@cword(3, 5)'
          }
        ]
      },
      {
        artsort_id: 12,
        artsort_name: '@cword(3, 5)'
      }
    ]
  },
  {
    artsort_id: 2,
    artsort_name: '@cword(3, 5)'
  },
  {
    artsort_id: 3,
    artsort_name: '@cword(3, 5)'
  }]
})

Mock.mock(/\/Artsort\/listAll/, 'get', dataListAll)
