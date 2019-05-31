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
      <el-form :model="operForm" ref="operForm" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="admin_username">
          <el-input v-model="operForm.admin_username" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="admin_password">
          <el-input
            v-model="operForm.admin_password"
            maxlength="20"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="admin_password2">
          <el-input maxlength="20" autocomplete="off" show-password></el-input>
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
  name: 'admin_edit',
  data () {
    return {
      fullscreen: false,
      dialogFormVisible: false,
      dialogLastOperation: 'add',
      operForm: {
        admin_id: 0,
        admin_username: '',
        admin_password: ''
      },
      rules: {
        admin_username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        admin_password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        admin_password2: [{ required: true, message: '请输入确认密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm: function (formName) {
      const self = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          const url = self.$parent.dialogId === 0 ? '/Admin/add' : '/Admin/edit'
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
        http.send({ url: '/Admin/detail', param: { params: { id: this.$parent.dialogId } } }).then(data => {
          this.operForm = data.extra
        })
      }
    }
  }
}
</script>
