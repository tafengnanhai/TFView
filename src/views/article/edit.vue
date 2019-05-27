<template>
  <div>
    <el-dialog
      :title="dialogFormTitle"
      :fullscreen="fullscreen"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
    >
      <el-form :model="operForm" ref="operForm" :rules="rules" label-width="60px">
        <el-form-item label="标题" prop="art_title">
          <el-input v-model="operForm.art_title" maxlength="50" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="art_pubdate">
          <el-date-picker v-model="operForm.art_pubdate" type="datetime" align="right"></el-date-picker>
        </el-form-item>
        <el-form-item label="分类" prop="artsort_id">
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
        <el-form-item label="来源" prop="art_source">
          <el-input v-model="operForm.art_source" maxlength="100" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="跳转" prop="art_gourl">
          <el-input v-model="operForm.art_gourl" maxlength="200" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            ref="uploadSimg"
            action="/Upload/index"
            list-type="picture-card"
            :on-preview="imgPreview"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogImgVisible">
            <img width="100%" :src="dialogImgUrl">
          </el-dialog>
        </el-form-item>
        <el-form-item label="内容" prop="art_content">
          <vue-editor
            v-model="operForm.art_content"
            :editorToolbar="customToolbar"
            useCustomImageHandler
            @imageAdded="handleImageAdded"
          ></vue-editor>
          <el-input v-model="operForm.art_content" autocomplete="off" v-show="false"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleDialog(false)">关 闭</el-button>
        <el-button type="primary" @click="submitForm('operForm')">提交</el-button>
        <el-button type="text" @click="toggleFullscreen()">
          <i class="el-icon-full-screen dialogFullscreen"></i>
        </el-button>
        <el-button type="text" @click="toggleDialog(false)">
          <i class="el-icon-circle-close dialogClose"></i>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from '@/plugins/http'
import '@/mock/Artsort'
import '@/mock/Upload'
import '@/mock/Site'
import Message from '@/plugins/message'
import { VueEditor } from 'vue2-editor'
let permitEditorLength = 500000 // for rules
export default {
  props: ['dialogFormTitle', 'dialogFormVisible', 'dialogId'],
  name: 'article_edit',
  components: {
    VueEditor
  },
  data () {
    return {
      fullscreen: false,
      dialogLastOperation: 'add',
      operForm: {
        artsort: [],
        art_id: 0,
        art_title: '',
        art_source: '本站',
        artsort_id: null,
        art_pubdate: '', // new Date(), get from server
        art_simg: [],
        art_content: ''
      },
      dialogImgUrl: '',
      dialogImgVisible: false,
      permitImgTotal: 4,
      permitImgSmallSize: 256, // KB
      permitImgBigSize: 512, // KB
      permitImgFormat: ['image/jpeg', 'image/gif', 'image/png'],
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike', 'clean'],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        [{ 'header': 1 }, { 'header': 2 }], [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
        [{ 'color': [] }, { 'background': [] }]
      ],
      rules: {
        art_title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        art_pubdate: [{ required: true, message: '请输入或者选择时间', trigger: 'blur' }],
        artsort_id: [{ required: true, message: '请选择分类', trigger: 'change' }],
        art_source: [{ required: true, message: '请输入来源，避免版权纠纷', trigger: 'blur' }],
        art_gourl: [{ type: 'url', message: '跳转地址不合法', trigger: 'blur' }],
        art_content: [{ min: 0, max: permitEditorLength, message: `内容超过最大允许长度${permitEditorLength}，（图片会转成字符）`, trigger: 'change' }]
      }
    }
  },
  methods: {
    submitForm: function (formName) {
      let self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          http.send({ sendType: 'post', url: '/Article/add', param: this.operForm, showSuccessTip: true }).then((data) => {
            if (data.code === 0) {
              self.$refs[formName].resetFields()
              self.toggleDialog(false)
              this.$parent.loadMine()
            }
          })
        } else {
          Message.error('请先查看并修正上面出现的错误')
          return false
        }
      })
    },
    toggleDialog: function (flag) {
      this.$parent.toggleDialog(flag)
    },
    toggleFullscreen: function () {
      this.fullscreen = !this.fullscreen
    },
    recursiveArtsort: function (item, level) {
      let artsort = JSON.parse(`{ "artsort_id" : ${item.artsort_id} , "artsort_name" : "${'　'.repeat(level)} |-- ${item.artsort_name}" }`)
      this.operForm.artsort.push(artsort)
      level++
      if (item.children) {
        item.children.forEach((itemChildren) => {
          this.recursiveArtsort(itemChildren, level)
        })
      }
    },
    loadArtsort: function () {
      this.operForm.artsort = []
      http.send({ url: '/Artsort/listAll' }).then((data) => {
        data.extra.forEach((item) => {
          this.recursiveArtsort(item, 0)
        })
      })
    },
    updateArtsort: function () {
      this.loadArtsort()
      Message.success('已更新')
    },
    beforeRemove: function (file, fileList) {
      this.operForm.art_simg = []
      fileList.forEach((f) => {
        if (file.uid !== f.raw.uid) {
          let reader = new FileReader()
          reader.readAsDataURL(f.raw)
          let self = this
          reader.onload = function (e) {
            self.operForm.art_simg.push(this.result)
            // 不使用内置的limit属性，自定义
            self.operForm.art_simg.length < self.permitImgTotal && (document.querySelector('.el-upload--picture-card').style.display = '')
          }
        }
      })
    },
    beforeUpload: function (file) {
      const isPermitImgFormat = this.permitImgFormat.some((item) => {
        return item === file.type
      })
      const ispermitImgSmallSize = file.size / 1024 < this.permitImgSmallSize

      !isPermitImgFormat && Message.error('上传图片只能是 jpg/gif/png 格式!')
      isPermitImgFormat && !ispermitImgSmallSize && Message.error(`上传图片大小不能超过${this.permitImgSmallSize}KB!`)
      if (isPermitImgFormat && ispermitImgSmallSize) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        let self = this
        reader.onload = function (e) {
          self.operForm.art_simg.push(this.result)
          self.operForm.art_simg.length === self.permitImgTotal && (document.querySelector('.el-upload--picture-card').style.display = 'none')
        }
      }
      return isPermitImgFormat && ispermitImgSmallSize
    },
    imgPreview: function (file) {
      this.dialogImgUrl = file.url
      this.dialogImgVisible = true
    },
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      const isPermitImgFormat = this.permitImgFormat.some((item) => {
        return item === file.type
      })
      const ispermitImgBigSize = file.size / 1024 < this.permitImgBigSize

      !isPermitImgFormat && Message.error('上传图片只能是 jpg/gif/png 格式!')
      isPermitImgFormat && !ispermitImgBigSize && Message.error(`上传图片大小不能超过${this.permitImgBigSize}KB!`)
      if (isPermitImgFormat && ispermitImgBigSize) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          Editor.insertEmbed(cursorLocation, 'image', this.result)
          resetUploader()
        }
      }
    },
    loadMine: function () {
      this.loadArtsort()
      http.send({ url: '/Site/getServerTime' }).then((data) => {
        this.operForm.art_pubdate = data.extra.time
      })
    }
  },
  mounted: function () {
    this.loadMine()
  },
  watch: {
    '$parent.dialogEditTime': function () {
      if (this.$parent.dialogId === 0) {
        if (this.dialogLastOperation === 'edit') {
          this.$nextTick(() => {
            this.$refs.operForm.resetFields()
            this.$refs.uploadSimg.clearFiles()
            this.operForm.art_simg = []
            document.querySelector('.el-upload--picture-card').style.display = ''
          })
          this.dialogLastOperation = 'add'
        }
      } else {
        this.dialogLastOperation = 'edit'
        http.send({ url: '/Article/detail', param: { params: { id: this.$parent.dialogId } } }).then((data) => {
          Object.assign(this.operForm, data)
        })
      }
    },
    'operForm.art_content': function (val) {
      if (val.length > permitEditorLength) {
        this.$alert(`内容超过最大允许长度（图片会转成字符）\r，允许：${permitEditorLength}，实际：${val.length}，超过${val.length - permitEditorLength}`, '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => { }
        })
      }
    }
  }
}
</script>

<style scoped >
.dialogFullscreen {
  position: absolute;
  right: 60px;
  top: 10px;
  font-size: 40px;
}
.dialogClose {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 40px;
}
</style>