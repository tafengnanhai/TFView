<template>
  <div>
    <div class="panel">
      <el-button type="primary" icon="el-icon-edit" size="medium">添加</el-button>&nbsp;&nbsp;
      <el-input placeholder="请输入关键词" v-model="keyword" style="width:300px" size="medium"></el-input>&nbsp;&nbsp;
      <el-button type="primary" icon="el-icon-search" size="medium">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="province" label="省份" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="city" label="市区" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" min-width="30%" align="center"></el-table-column>
      <el-table-column prop="zip" label="邮编" min-width="10%" align="center"></el-table-column>
      <el-table-column label="操作" min-width="15%" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small">编辑</el-button>
          <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>&nbsp;&nbsp;
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next, jumper, ->, total" :total="100"></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'article_index',
  data () {
    return {
      keyword: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    }
  }
}
</script>

<style scoped>
.panel {
  width: 100%;
  height: 40px;
  padding-bottom: 15px;
}
</style>
