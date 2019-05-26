<template>
  <div>
    <el-dialog
      title="添加"
      :fullscreen="fullscreen"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
    >
      <el-form :model="operForm">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="operForm.art_title" maxlength="50" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="operForm.art_pubdate"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
          ></el-date-picker>
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
          <el-button icon="el-icon-refresh blue b" type="plain" @click="updateArtsort()"></el-button>
        </el-form-item>
        <el-form-item label="来源" :label-width="formLabelWidth">
          <el-input v-model="operForm.art_source" maxlength="100" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="跳转" :label-width="formLabelWidth">
          <el-input v-model="operForm.art_gourl" maxlength="200" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="/upload"
            list-type="picture-card"
            :on-preview="imgPreview"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogImgVisible">
            <img width="100%" :src="dialogImgUrl" alt>
          </el-dialog>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <vue-editor
            v-model="operForm.art_content"
            :editorToolbar="customToolbar"
            useCustomImageHandler
            @imageAdded="handleImageAdded"
          ></vue-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleDialog(false)">关 闭</el-button>
        <el-button type="primary" @click="toggleDialog(false)">提交</el-button>
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
import '@/mock/upload'
import Message from '@/plugins/message'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'article_add',
  components: {
    VueEditor
  },
  data () {
    return {
      dialogFormVisible: false,
      fullscreen: true,
      operForm: {
        artsort: [],
        art_id: 0,
        art_title: '',
        art_source: '本站',
        artsort_id: 0,
        art_pubdate: new Date(),
        art_simg: [],
        art_content: ''
      },
      formLabelWidth: '60px',
      dialogImgUrl: '',
      dialogImgVisible: false,
      permitTotal: 4,
      permitSmallSize: 256, // KB
      permitBigSize: 512, // KB
      permitFormat: ['image/jpeg', 'image/gif', 'image/png'],
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike', 'clean'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        [{ 'header': 1 }, { 'header': 2 }], [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
        [{ 'color': [] }, { 'background': [] }]
      ]
    }
  },
  methods: {
    toggleDialog: function (flag) {
      this.dialogFormVisible = flag
    },
    toggleFullscreen: function () {
      this.fullscreen = !this.fullscreen
    },
    loadArtsort: function () {
      http.send({ url: '/artsorts' }).then((data) => {
        this.operForm.artsort = data.extra
        this.operForm.artsort_id = data.extra[0].artsort_id
      })
    },
    updateArtsort: function () {
      this.loadArtsort()
      Message.success('已更新')
    },
    beforeRemove: function (file, fileList) {
      this.operForm.art_simg = []
      fileList.map((f) => {
        if (file.uid !== f.raw.uid) {
          let reader = new FileReader()
          reader.readAsDataURL(f.raw)
          let self = this
          reader.onload = function (e) {
            self.operForm.art_simg.push(this.result)
          }
        }
      })
      // 不使用内置的limit属性，自定义
      this.operForm.art_simg.length !== this.permitTotal && (document.querySelector('.el-upload--picture-card').style.display = '')
    },
    beforeUpload: function (file) {
      const isPermitFormat = this.permitFormat.some((item) => {
        return item === file.type
      })
      const ispermitSmallSize = file.size / 1024 < this.permitSmallSize

      !isPermitFormat && Message.error('上传图片只能是 jpg/gif/png 格式!')
      isPermitFormat && !ispermitSmallSize && Message.error(`上传图片大小不能超过${this.permitSmallSize}KB!`)
      if (isPermitFormat && ispermitSmallSize) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        let self = this
        reader.onload = function (e) {
          self.operForm.art_simg.push(this.result)
        }
      }
      this.operForm.art_simg.length === this.permitTotal && (document.querySelector('.el-upload--picture-card').style.display = 'none')

      return isPermitFormat && ispermitSmallSize
    },
    imgPreview: function (file) {
      this.dialogImgUrl = file.url
      this.dialogImgVisible = true
    },
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      const isPermitFormat = this.permitFormat.some((item) => {
        return item === file.type
      })
      const ispermitBigSize = file.size / 1024 < this.permitBigSize

      !isPermitFormat && Message.error('上传图片只能是 jpg/gif/png 格式!')
      isPermitFormat && !ispermitBigSize && Message.error(`上传图片大小不能超过${this.permitBigSize}KB!`)
      if (isPermitFormat && ispermitBigSize) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          Editor.insertEmbed(cursorLocation, 'image', this.result)
          resetUploader()
        }
      }
    }
  },
  mounted: function () {
    this.loadArtsort()
  }
}
</script>

<style scoped >
.dialogFullscreen {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 40px;
}
</style>
