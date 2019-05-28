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
        <span>{{ node.label }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <el-button type="text" size="meidum" @click="append(data)">编辑</el-button>
          <el-button type="text" size="meidum" @click="remove(node, data)">删除</el-button>
        </span>
      </span>
    </el-tree>
    <div class="tip">
      <span class="red">说明</span>：请不要多人同时编辑，尤其是
      <span class="red">[拖拽调整分类]</span>功能建议获取最新信息后由一人进行管理
    </div>
  </div>
</template>
<script>
import http from '@/plugins/http'
import '@/mock/Artsort'
import Message from '@/plugins/message'
export default {
  name: 'artsort_index',
  data () {
    return {
      keyword: '',
      artsorts: [],
      defaultProps: {
        children: 'children',
        label: 'artsort_name'
      }
    }
  },
  methods: {
    filterNode (value, data) {
      return !value || data.artsort_name.indexOf(value) !== -1
    },
    handleDragEnd: function (draggingNode, dropNode, dropType, ev) {
      this.updateAllArtsort()
    },
    remove: function (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.artsort_id === data.artsort_id)
      children.splice(index, 1)
      this.updateAllArtsort()
    },
    updateAllArtsort: function () {
      let order = 1
      this.artsorts = this.artsorts.map((item) => {
        item.artsort_order = order++
        return item
      })
      http.send({ url: '/Artsort/editAll', sendType: 'post', param: this.artsorts }).then((data) => {
        if (data.code === 0) {
          Message.success(data.msg)
        } else {
          Message.error(data.msg)
        }
      })
    },
    loadArtsort: function () {
      this.artsorts = []
      http.send({ url: '/Artsort/listAll' }).then((data) => {
        this.artsorts = data.extra
      })
    },
    loadMine: function () {
      this.loadArtsort()
    }
  },
  mounted: function () {
    this.loadMine()
  },
  watch: {
    '$store.state.reloadPageTime': function () {
      this.loadMine()
    },
    'keyword': function (val) {
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
