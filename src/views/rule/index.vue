<template>
  <div id="ruleIndex">
    <div class="panel">
      <el-button type="primary" icon="el-icon-edit" size="medium" @click="add()">添 加</el-button>
      <el-input
        placeholder="按名称或规则关键字搜索"
        class="keyword"
        size="medium"
        v-model="inputKeyword"
        @keydown.enter.native="search()"
        @clear="search()"
        clearable
      ></el-input>
      <el-button type="primary" icon="el-icon-search" size="medium" @click="search()">搜 索</el-button>
    </div>
    <el-table :data="listData" border style="width: 100%" stripe>
      <el-table-column prop="rule_id" label="编号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="rule_name" label="名称" min-width="150" header-align="center"></el-table-column>
      <el-table-column prop="rule_title" label="规则" min-width="150" header-align="center"></el-table-column>
      <el-table-column label="操作" min-width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row.rule_id)">编 辑</el-button>
          <el-button @click="del(scope.row.rule_id)" type="text">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper, -> , total"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="pageClick"
    ></el-pagination>
    <rule-edit :dialog-form-title="dialogFormTitle" ref="edit"></rule-edit>
  </div>
</template>
<script>
import http from '@/plugins/http'
import '@/mock/Rule'
import Confirm from '@/plugins/confirm'
import RuleEdit from '@/views/rule/edit.vue'
export default {
  name: 'rule-index',
  components: {
    RuleEdit
  },
  data () {
    return {
      dialogFormVisible: false,
      dialogFormTitle: '',
      dialogId: 0,
      dialogEditTime: 0,
      inputKeyword: '',
      keyword: '',
      listData: null,
      total: 1,
      pageSize: 0,
      currentPage: 1
    }
  },
  methods: {
    add: function () {
      this.dialogFormTitle = '添加'
      this.dialogId = 0
      this.dialogEditTime = new Date().getTime()
      this.toggleDialog(true)
    },
    edit: function (id) {
      this.dialogFormTitle = '编辑'
      this.dialogId = id
      this.dialogEditTime = new Date().getTime()
      this.toggleDialog(true)
    },
    del: function (id) {
      Confirm.show('确定删除吗，不可恢复哦?').then(() => {
        http.send({ url: '/Rule/del', sendType: 'post', param: { id: id }, showSuccessTip: true }).then(data => {
          if (data.code === 0) {
            this.total = data.total
            const computedCurrentPage = Math.ceil(this.total / this.pageSize)
            this.currentPage = (this.currentPage > 1 && this.currentPage > computedCurrentPage ? computedCurrentPage : this.currentPage)
            this.getData(this.currentPage)
          }
        })
      })
    },
    toggleDialog: function (flag) {
      this.$refs.edit.toggleDialog(flag)
    },
    pageClick: function (p) {
      this.getData(p)
    },
    getData: function (p) {
      http.send({ url: '/Rule/listAll', param: { params: { p: p, keyword: escape(this.keyword) } } }).then(data => {
        this.listData = data.extra
        this.total = data.total
        this.pageSize = data.pageSize
        this.currentPage = p
      })
    },
    search: function () {
      this.keyword = this.inputKeyword
      this.getData(1)
    },
    loadMine: function () {
      this.getData(1)
    }
  },
  mounted: function () {
    this.loadMine()
  },
  watch: {
    '$store.state.reloadPageTime': function () {
      this.loadMine()
    }
  }
}
</script>

<style scoped>
#ruleIndex {
  min-width: 600px;
}
.panel {
  width: 100%;
  min-height: 40px;
  padding-bottom: 15px;
}
.keyword {
  width: 200px;
  padding: 0 10px;
}
.headerCell {
  text-align: center;
}
</style>
