<template>
  <div id="artsortIndex">
    <div class="panel">
      <el-button type="primary" icon="el-icon-edit" size="medium" @click="add()">添 加</el-button>
      <el-input placeholder="请输入关键词" class="keyword" size="medium" v-model="keyword" clearable></el-input>
    </div>
    <el-tree
      ref="artsortTree"
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      default-expand-all
      draggable
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <el-button type="text" size="meidum" @click="() => append(data)">编辑</el-button>
          <el-button type="text" size="meidum" @click="() => remove(node, data)">删除</el-button>
        </span>
      </span>
    </el-tree>
    <div class="tip">
      <span class="red">说明</span>：请不要多人同时编辑，尤其是拖拽调整分类功能建议获取最新信息后由一人进行管理
    </div>
  </div>
</template>
<script>
export default {
  name: 'artsort_index',
  data () {
    return {
      keyword: '',
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleDragStart: function (node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter: function (draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave: function (draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver: function (draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd: function (draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop: function (draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop: function (draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag (draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    },
    filterNode (value, data) {
      return !value || data.label.indexOf(value) !== -1
    },
    loadMine: function () {

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
