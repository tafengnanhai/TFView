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
          <el-input v-model="operForm.art_title" maxlength="50" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="operForm.art_pubdate"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
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
          <el-button icon="el-icon-refresh blue b" type="plain" @click="loadArtsort()"></el-button>
        </el-form-item>
        <el-form-item label="来源" :label-width="formLabelWidth">
          <el-input v-model="operForm.art_source" maxlength="100" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="跳转" :label-width="formLabelWidth">
          <el-input v-model="operForm.art_gourl" maxlength="200" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="/v1/upload"
            list-type="picture-card"
            :on-preview="imgPreview"
            :before-upload="beforeUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogImgVisible">
            <img width="100%" :src="dialogImgUrl" alt>
          </el-dialog>
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
import '@/mock/upload'
import Message from '@/plugins/message'
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
        art_source: '本站',
        artsort_id: 0,
        art_pubdate: new Date(),
        art_simg: [],
        art_content: ''
      },
      formLabelWidth: '60px',
      dialogImgUrl: '',
      dialogImgVisible: false,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
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
      http.send({ url: '/v1/artsorts' }).then((data) => {
        this.operForm.artsort = data.extra
        this.operForm.artsort_id = data.extra[0].artsort_id
      })
    },
    beforeUpload (file) {
      const isPermitFormat = ['image/jpeg', 'image/gif', 'image/png'].some((item) => {
        return item === file.type
      })
      const permitSize = 1
      const isPermitSize = file.size / 1024 / 1024 < permitSize

      !isPermitFormat && Message.error('上传图片只能是 jpg/gif/png 格式!')
      isPermitFormat && !isPermitSize && Message.error(`上传图片大小不能超过${permitSize}MB!`)

      return isPermitFormat && isPermitSize
    },
    imgPreview (file) {
      this.dialogImgUrl = file.url
      this.dialogImgVisible = true
    }
  },
  mounted: function () {
    this.loadArtsort()
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
