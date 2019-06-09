<template>
  <div id="logSysIndex">
    <div class="panel">
      <el-input
        placeholder="请输入系统用户编号"
        class="keyword"
        size="medium"
        v-model.number="inputKeyword"
        type="number"
        oninput="value.length>10 &&  (value=value.slice(0,10))"
        @keydown.enter.native="search()"
        @clear="search()"
        clearable
      ></el-input>
      <el-button type="primary" icon="el-icon-search" size="medium" @click="search()">搜 索</el-button>
    </div>
    <el-table :data="listData" border style="width: 100%" stripe>
      <el-table-column prop="log_id" label="日志编号" width="80" align="center"></el-table-column>
      <el-table-column prop="log_userid" label="用户编号" width="80" align="center"></el-table-column>
      <el-table-column prop="log_content" label="操作内容" min-width="200" align="center"></el-table-column>
      <el-table-column prop="log_ip" label="操作IP" width="120" align="center"></el-table-column>
      <el-table-column prop="log_time" label="操作时间" width="180" align="center"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper, -> , total"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="pageClick"
    ></el-pagination>
  </div>
</template>
<script>
import http from '@/plugins/http'
import '@/mock/LogSys'
export default {
  name: 'logsys-index',
  data () {
    return {
      inputKeyword: '',
      keyword: '',
      listData: null,
      total: 1,
      pageSize: 0,
      currentPage: 1
    }
  },
  methods: {
    toggleDialog: function (flag) {
      this.$refs.articleEdit.toggleDialog(flag)
    },
    pageClick: function (p) {
      this.getData(p)
    },
    getData: function (p) {
      http.send({ url: '/LogSys/listAll', param: { params: { p: p, keyword: this.keyword } } }).then(data => {
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

<style>
#logSysIndex .el-dialog {
  margin-top: 0 !important;
}
</style>

<style scoped>
#logSysIndex {
  min-width: 700px;
}
.panel {
  width: 100%;
  min-height: 40px;
  padding-bottom: 15px;
}
.keyword {
  width: 200px;
  margin-right: 10px;
}
</style>
