<template>
  <div id="articleIndex">
    <div class="panel">
      <el-button type="primary" icon="el-icon-edit" size="medium" @click="showDialog(true)">添 加</el-button>

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
          <el-button type="primary" size="small">编 辑</el-button>
          <el-button @click="del(scope.row)" type="danger" size="small">删 除</el-button>
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
    <ArticleAdd ref="article_add"/>
  </div>
</template>
<script>
import http from '@/plugins/http'
import '@/mock/articles'
import Message from '@/plugins/message'
import ArticleAdd from '@/views/article/add.vue'
export default {
  name: 'article_index',
  components: {
    ArticleAdd
  },
  data () {
    return {
      inputKeyword: '',
      keyword: '',
      listData: null,
      total: 1,
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    del: function (row) {
      this.$confirm('确定删除吗，不可恢复哦?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.send({ sendType: 'delete', url: `/v1/articles/${row.art_id}` }).then((data) => {
          let computedCurrentPage = Math.ceil((this.total - 1) / this.pageSize)
          this.currentPage = (this.currentPage > computedCurrentPage ? computedCurrentPage : this.currentPage)
          this.getData(this.currentPage)
          Message.success('删除成功!')
        })
      }).catch(() => { })
    },
    showDialog: function (flag) {
      this.$refs.article_add.toggleDialog(flag)
    },
    pageClick: function (p) {
      this.getData(p)
    },
    getData: function (p) {
      http.send({ url: '/v1/articles', param: { params: { p: p, keyword: escape(this.keyword) } } }).then((data) => {
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
    loadMine: function () {
      this.getData(1)
    }
  },
  mounted: function () {
    this.loadMine()
  },
  computed: {
    reloadPageTime: function () {
      return this.$store.state.reloadPageTime
    }
  },
  watch: {
    reloadPageTime: function () {
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
  width: 200px;
  padding: 0 10px;
}
</style>
