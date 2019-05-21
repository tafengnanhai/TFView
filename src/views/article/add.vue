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
          <el-input v-model="operForm.art_title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-select v-model="operForm.artsort_id" placeholder="请选择分类">
            <el-option
              :label="item.artsort_name"
              :value="item.artsort_id"
              :key="item.artsort_id"
              v-for="item in operForm.artsort"
            ></el-option>
          </el-select>&nbsp;&nbsp;
          <el-button icon="el-icon-refresh" type="primary" circle></el-button>
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
import http from '@/plugins/http'
import '@/mock/artsorts'
export default {
  name: 'article_add',
  data () {
    return {
      dialogFormVisible: false,
      fullscreen: false,
      operForm: {
        artsort: [],
        art_id: 0,
        art_title: '',
        art_source: '',
        artsort_id: 0,
        art_pubdate: '',
        art_simg: '',
        art_simg2: '',
        art_simg3: '',
        art_content: ''
      },
      formLabelWidth: '60px'
    }
  },
  methods: {
    toggleDialog: function (flag) {
      this.dialogFormVisible = flag
    },
    toggleFullscreen: function () {
      this.fullscreen = !this.fullscreen
    }
  },
  mounted: function () {
    http.send({ url: '/v1/artsorts' }).then((data) => {
      this.operForm.artsort = data.extra
      this.operForm.artsort_id = data.extra[0].artsort_id
    })
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
