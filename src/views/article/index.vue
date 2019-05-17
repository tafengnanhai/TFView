<template>
  <div>
    <div class="panel">
      <el-button type="primary" icon="el-icon-edit" size="medium" @click="showDialog(true)">添加</el-button>&nbsp;&nbsp;
      <el-input placeholder="请输入关键词" v-model="keyword" class="keyword" size="medium"></el-input>&nbsp;&nbsp;
      <el-button type="primary" icon="el-icon-search" size="medium">搜索</el-button>
    </div>
    <el-table :data="listData" border style="width: 100%">
      <el-table-column prop="date" label="日期" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="province" label="省份" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="city" label="市区" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" min-width="25%" align="center"></el-table-column>
      <el-table-column prop="zip" label="邮编" min-width="10%" align="center"></el-table-column>
      <el-table-column label="操作" min-width="20%" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small">编辑</el-button>&nbsp;&nbsp;
          <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next, jumper, ->, total" :total="100"></el-pagination>
    <ArticleAdd ref="article_add"/>
  </div>
</template>
<script>
import { operData } from '@/plugin/http'
import '@/mock/articles'
import ArticleAdd from '@/views/article/add.vue'
export default {
  name: 'article_index',
  components: {
    ArticleAdd
  },
  data () {
    return {
      keyword: '',
      listData: null
    }
  },
  methods: {
    handleClick: function (row) {
      console.log(row)
    },
    showDialog: function (flag) {
      this.$refs.article_add.toggleDialog(flag)
    }
  },
  created: function () {
    operData({ sendType: 'get', url: '/v1/articles' }).then((data) => {
      this.listData = data.extra
    })
  }
}
</script>

<style scoped>
.panel {
  width: 100%;
  min-height: 40px;
  padding-bottom: 15px;
}
.keyword {
  width: 300px;
}
@media screen and (max-width: 700px) {
  .keyword {
    width: 200px;
  }
}
@media screen and (max-width: 600px) {
  .keyword {
    width: 100px;
  }
}
</style>
