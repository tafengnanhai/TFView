<template>
  <div id="articleIndex">
    <div class="panel">
      <el-button type="primary" icon="el-icon-edit" size="medium" @click="add()">添 加</el-button>
      <el-select
        v-model="artsortId"
        placeholder="请选择分类"
        class="artsort"
        size="medium"
        @change="changeArtsort"
      >
        <el-option label="所有分类" :value="0"></el-option>
        <el-option
          :label="item.artsort_name"
          :value="item.artsort_id"
          :key="item.artsort_id"
          v-for="item in artsorts"
        ></el-option>
      </el-select>
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
    <el-table :data="listData" border style="width: 100%">
      <el-table-column prop="art_id" label="编号" min-width="15%" align="center"></el-table-column>
      <el-table-column label="标题" min-width="30%" align="center">
        <template slot-scope="scope">
          <div v-html="formatter(scope.row.art_title)"></div>
        </template>
      </el-table-column>
      <el-table-column prop="artsort_name" label="分类" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="art_pubdate" label="日期" min-width="25%" align="center"></el-table-column>
      <el-table-column label="操作" min-width="20%" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row.art_id)">编 辑</el-button>
          <el-button @click="del(scope.row.art_id)" type="text">删 除</el-button>
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
    <ArticleEdit :dialogFormTitle="dialogFormTitle" ref="articleEdit"/>
  </div>
</template>
<script>
import http from '@/plugins/http'
import '@/mock/Article'
import Message from '@/plugins/message'
import ArticleEdit from '@/views/article/edit.vue'
export default {
  name: 'article_index',
  components: {
    ArticleEdit
  },
  data () {
    return {
      dialogFormVisible: false,
      dialogFormTitle: '',
      dialogId: 0,
      dialogEditTime: 0,
      inputKeyword: '',
      keyword: '',
      artsorts: [],
      artsortId: 0,
      listData: null,
      total: 1,
      pageSize: 10,
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
    edit: function (artId) {
      this.dialogFormTitle = '编辑'
      this.dialogId = artId
      this.dialogEditTime = new Date().getTime()
      this.toggleDialog(true)
    },
    del: function (artId) {
      this.$confirm('确定删除吗，不可恢复哦?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.send({ sendType: 'post', url: `/Article/del`, param: { id: artId } }).then((data) => {
          if (data.code === 0) {
            let computedCurrentPage = Math.ceil((this.total - 1) / this.pageSize)
            this.currentPage = (this.currentPage > computedCurrentPage ? computedCurrentPage : this.currentPage)
            this.getData(this.currentPage)
            Message.success(data.msg)
          } else {
            Message.error(data.msg)
          }
        })
      }).catch(() => { })
    },
    toggleDialog: function (flag) {
      this.$refs.articleEdit.toggleDialog(flag)
    },
    pageClick: function (p) {
      this.getData(p)
    },
    getData: function (p) {
      http.send({ url: '/Article/listAll', param: { params: { p: p, keyword: escape(this.keyword), artsort_id: this.artsortId } } }).then((data) => {
        this.listData = data.extra
        this.total = data.total
        this.pageSize = data.pageSize
        this.currentPage = p
      })
    },
    search: function () {
      this.keyword = this.inputKeyword // 不要直接修改keyword，防止输入但未搜索变更了关键词
      this.getData(1)
    },
    formatter: function (val) {
      return this.keyword === '' ? val : val.replace(this.keyword, `<span class="red f16">${this.keyword}</span>`)
    },
    changeArtsort: function (val) {
      this.getData(1)
    },
    recursiveArtsort: function (item, level) {
      let artsort = JSON.parse(`{ "artsort_id" : ${item.artsort_id} , "artsort_name" : "${'　'.repeat(level)} |-- ${item.artsort_name}" }`)
      this.artsorts.push(artsort)
      level++
      if (item.children) {
        item.children.forEach((itemChildren) => {
          this.recursiveArtsort(itemChildren, level)
        })
      }
    },
    loadArtsort: function () {
      this.artsorts = []
      http.send({ url: '/Artsort/listAll' }).then((data) => {
        data.extra.forEach((item) => {
          this.recursiveArtsort(item, 0)
        })
      })
    },
    loadMine: function () {
      this.loadArtsort()
      this.artsortId = 0
      this.getData(this.currentPage)
    }
  },
  activated: function () {
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
#articleIndex {
  min-width: 600px;
}
.panel {
  width: 100%;
  min-height: 40px;
  padding-bottom: 15px;
}
.keyword {
  width: 160px;
  padding: 0 10px;
}
.artsort {
  padding-left: 10px;
}
</style>
