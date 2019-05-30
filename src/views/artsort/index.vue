<template>
  <div id="artsortIndex">
    <div class="panel">
      <el-button type="primary" icon="el-icon-edit" size="medium" @click="add()">添 加</el-button>
      <el-input placeholder="请输入关键词" class="keyword" size="medium" v-model="keyword" clearable></el-input>
    </div>
    <el-tree
      ref="artsortTree"
      class="filter-tree"
      :data="artsorts"
      :props="defaultProps"
      :filter-node-method="filterNode"
      @node-drag-end="handleDragEnd"
      default-expand-all
      draggable
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>（{{ data.artsort_id }}）、{{ data.artsort_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <el-button type="text" @click.stop="edit(data.artsort_id)">编辑</el-button>
          <el-button type="text" @click.stop="remove(node, data)">删除</el-button>
        </span>
      </span>
    </el-tree>
    <div class="tip">
      <span class="red">说明</span>：请不要多人同时编辑，尤其是
      <span class="red">[拖拽调整分类]</span>功能建议获取最新信息后由一人进行管理，通过拖拽调整层级和顺序
    </div>
    <ArtsortEdit :dialogFormTitle="dialogFormTitle" ref="artsortEdit"/>
  </div>
</template>
<script>
import http from '@/plugins/http'
import '@/mock/Article'
import '@/mock/Artsort'
import Message from '@/plugins/message'
import Confirm from '@/plugins/confirm'
import ArtsortEdit from '@/views/artsort/edit.vue'
export default {
  name: 'artsort_index',
  components: {
    ArtsortEdit
  },
  data () {
    return {
      dialogFormVisible: false,
      dialogFormTitle: '',
      dialogId: 0,
      dialogEditTime: 0,
      keyword: '',
      artsorts: [],
      defaultProps: {
        children: 'children',
        label: 'artsort_name'
      }
    }
  },
  methods: {
    add: function () {
      this.dialogFormTitle = '添加'
      this.dialogId = 0
      this.dialogEditTime = new Date().getTime()
      this.toggleDialog(true)
    },
    edit: function (artsortId) {
      this.dialogFormTitle = '编辑'
      this.dialogId = artsortId
      this.dialogEditTime = new Date().getTime()
      this.toggleDialog(true)
    },
    toggleDialog: function (flag) {
      this.$refs.artsortEdit.toggleDialog(flag)
    },
    filterNode (value, data) {
      return !value || data.artsort_name.indexOf(value) !== -1
    },
    handleDragEnd: function (draggingNode, dropNode, dropType, ev) {
      this.updateAllArtsort()
    },
    remove: function (node, data) {
      Confirm.show('确定删除吗，不可恢复哦?').then(() => {
        if (node.data.children && node.data.children.length > 0) {
          Message.error('请先删除子类')
          return
        }
        http.send({ url: '/Article/checkArtsort', param: { params: { id: data.artsort_id } } }).then(result => {
          if (result.code === 0) {
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.artsort_id === data.artsort_id)
            children.splice(index, 1)
            this.updateAllArtsort()
          } else {
            Message.error(result.msg)
          }
        })
      })
    },
    updateAllArtsort: function () {
      http.send({ url: '/Artsort/editAll', sendType: 'post', param: this.artsorts, showSuccessTip: true })
    },
    loadArtsort: function () {
      this.artsorts = []
      http.send({ url: '/Artsort/listAll' }).then(data => {
        this.artsorts = data.extra
      })
    },
    loadMine: function () {
      this.loadArtsort()
      this.keyword = ''
    }
  },
  activated: function () {
    this.loadMine()
  },
  watch: {
    '$store.state.reloadPageTime': function () {
      this.loadMine()
    },
    keyword: function (val) {
      this.$refs.artsortTree.filter(val)
    }
  }
}
</script>

<style scoped>
#artsortIndex {
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
.tip {
  height: 20px;
  padding-top: 10px;
}
</style>
