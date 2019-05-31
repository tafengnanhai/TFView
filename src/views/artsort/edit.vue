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
        <el-form-item label="名称" prop="artsort_name">
          <el-input v-model="operForm.artsort_name" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="artsort_type">
          <el-input
            v-model="operForm.artsort_type"
            maxlength="20"
            autocomplete="off"
            placeholder="可选，用于编程中的特殊处理"
          ></el-input>
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
export default {
  props: ['dialogFormTitle', 'dialogId'],
  name: 'artsort_edit',
  data () {
    return {
      fullscreen: false,
      dialogFormVisible: false,
      dialogLastOperation: 'add',
      operForm: {
        artsort_id: 0,
        artsort_parentid: 0,
        artsort_name: '',
        artsort_type: ''
      },
      rules: {
        artsort_name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm: function (formName) {
      const self = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          const url = self.$parent.dialogId === 0 ? '/Artsort/add' : '/Artsort/edit'
          http.send({ sendType: 'post', url: url, param: this.operForm, showSuccessTip: true }).then(data => {
            if (data.code === 0) {
              self.$refs[formName].resetFields()
              self.toggleDialog(false)
              self.$parent.loadMine()
            }
          })
        }
      })
    },
    toggleDialog: function (flag) {
      this.dialogFormVisible = flag
    },
    toggleFullscreen: function () {
      this.fullscreen = !this.fullscreen
    }
  },
  watch: {
    '$parent.dialogEditTime': function () {
      this.operForm.artsort_id = this.$parent.dialogId
      if (this.$parent.dialogId === 0) {
        if (this.dialogLastOperation === 'edit') {
          this.$nextTick(() => {
            this.$refs.operForm.resetFields()
          })
          this.dialogLastOperation = 'add'
        }
      } else {
        this.dialogLastOperation = 'edit'
        this.$nextTick(() => {
          this.$refs.operForm.resetFields()
        })
        http.send({ url: '/Artsort/detail', param: { params: { id: this.$parent.dialogId } } }).then(data => {
          this.operForm = data.extra
        })
      }
    }
  }
}
</script>
