<template>
  <div>
    <el-dialog
      title="添加"
      :fullscreen="fullscreen"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="operForm">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="operForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-select v-model="operForm.region" placeholder="请选择分类">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleDialog(false)">关 闭</el-button>
        <el-button type="primary" @click="toggleDialog(false)">确 定</el-button>
        <el-button type="text" @click="toggleFullscreen()">
          <i class="el-icon-full-screen dialogFullscreen"></i>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'article_add',
  data () {
    return {
      dialogFormVisible: false,
      fullscreen: false,
      operForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    toggleDialog: function (flag) {
      this.dialogFormVisible = flag
    },
    toggleFullscreen: function () {
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>

<style scoped>
.dialogFullscreen {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 40px;
}
</style>
