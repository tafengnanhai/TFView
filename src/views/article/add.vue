<template>
  <div>
    <el-dialog
      title="文章"
      :visible.sync="dialogFormVisible"
      :show-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-fullscreen="true"
    >
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择分类">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleDialog(false)">取 消</el-button>
        <el-button type="primary" @click="toggleDialog(false)">确 定</el-button>
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
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    toggleDialog: function (flag) {
      this.dialogFormVisible = flag
    }
  }
}
</script>

<style scoped>
</style>
