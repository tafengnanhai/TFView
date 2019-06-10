<template>
  <div id="groupIndex">
    <div class="panel">
      <el-button type="primary" icon="el-icon-edit" size="medium" @click="add()">添 加</el-button>
      <el-input
        placeholder="请输入关键词"
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
      <el-table-column prop="group_id" label="编号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="group_title" label="名称" min-width="150" align="center"></el-table-column>
      <el-table-column label="状态" min-width="60" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.group_status === '1'">正常</span>
          <span class="red" v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="groupAccess(scope.row.group_id)">授权</el-button>
          <el-button type="text" @click="edit(scope.row.group_id)">编 辑</el-button>
          <el-button type="text" @click="changeStatus(scope.row)">
            <span v-if="scope.row.group_status === '1'">禁用</span>
            <span v-else>启用</span>
          </el-button>
          <el-button @click="del(scope.row.group_id)" type="text">删 除</el-button>
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
    <group-edit :dialog-form-title="dialogFormTitle" ref="edit"></group-edit>
    <group-access :dialog-form-title="dialogFormTitleAccess" ref="access"></group-access>
  </div>
</template>
<script>
import http from '@/plugins/http'
import '@/mock/Group'
import Confirm from '@/plugins/confirm'
import GroupEdit from '@/views/group/edit.vue'
import GroupAccess from '@/views/group/access.vue'
export default {
  name: 'group-index',
  components: {
    GroupEdit,
    GroupAccess
  },
  data () {
    return {
      dialogFormVisible: false,
      dialogFormTitle: '',
      dialogFormTitleAccess: '授权',
      dialogId: 0,
      dialogEditTime: 0,
      dialogAccessTime: 0,
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
      this.toggleEditDialog(true)
    },
    edit: function (id) {
      this.dialogFormTitle = '编辑'
      this.dialogId = id
      this.dialogEditTime = new Date().getTime()
      this.toggleEditDialog(true)
    },
    del: function (id) {
      Confirm.show('确定删除吗，不可恢复哦?').then(() => {
        http.send({ url: '/Group/del', sendType: 'post', param: { id: id }, showSuccessTip: true }).then(data => {
          if (data.code === 0) {
            this.total = data.total
            const computedCurrentPage = Math.ceil(this.total / this.pageSize)
            this.currentPage = (this.currentPage > 1 && this.currentPage > computedCurrentPage ? computedCurrentPage : this.currentPage)
            this.getData(this.currentPage)
          }
        })
      })
    },
    changeStatus: function (row) {
      const postData = {
        group_id: row.group_id,
        group_status: row.group_status === '1' ? '0' : '1'
      }
      http.send({ url: '/Group/changeStatus', sendType: 'post', param: postData, showSuccessTip: true }).then(data => {
        if (data.code === 0) {
          this.getData(this.currentPage)
        }
      })
    },
    groupAccess: function (id) {
      this.dialogId = id
      this.dialogAccessTime = new Date().getTime()
      this.toggleAccessDialog(true)
    },
    toggleAccessDialog: function (flag) {
      this.$refs.access.toggleDialog(flag)
    },
    toggleEditDialog: function (flag) {
      this.$refs.edit.toggleDialog(flag)
    },
    pageClick: function (p) {
      this.getData(p)
    },
    getData: function (p) {
      http.send({ url: '/Group/listAll', param: { params: { p: p, keyword: escape(this.keyword) } } }).then(data => {
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
#groupIndex {
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
