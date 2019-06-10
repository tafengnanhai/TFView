<template>
  <div>
    <el-dialog
      :title="dialogFormTitle"
      :fullscreen="fullscreen"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
    >
      <el-form :model="operForm" ref="operForm" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="admin_username">
          <el-input
            v-model.trim="operForm.admin_username"
            maxlength="20"
            autocomplete="off"
            :disabled="this.$parent.dialogId !== 0"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="admin_password">
          <el-input
            type="password"
            v-model="operForm.admin_password"
            maxlength="20"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="admin_password2">
          <el-input
            type="password"
            maxlength="20"
            autocomplete="off"
            v-model="operForm.admin_password2"
            @keydown.enter.native="submitForm('operForm')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
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
import '@/mock/Admin'
export default {
  props: {
    dialogFormTitle: String,
    dialogId: Number
  },
  name: 'admin-edit',
  data () {
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value && value.length < 6) {
        callback(new Error('密码长度不能低于6位'))
      } else {
        if (this.operForm.admin_password2 !== '') {
          this.$refs.operForm.validateField('admin_password2')
        }
        callback()
      }
    }
    let validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value && value.length < 6) {
        callback(new Error('确认密码长度不能低于6位'))
      } else if (value !== this.operForm.admin_password) {
        callback(new Error('确认密码和上面的密码不相同!'))
      } else {
        callback()
      }
    }
    return {
      fullscreen: false,
      dialogFormVisible: false,
      dialogLastOperation: 'add',
      operForm: {
        admin_id: 0,
        admin_username: '',
        admin_password: '',
        admin_password2: ''
      },
      rules: {
        admin_username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        admin_password: [{ validator: validatePassword, trigger: 'blur' }],
        admin_password2: [{ validator: validatePassword2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm: function (formName) {
      const self = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          const url = self.$parent.dialogId === 0 ? '/Admin/add' : '/Admin/edit'
          http.send({ url: url, sendType: 'post', param: this.operForm, showSuccessTip: true }).then(data => {
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
          Object.assign(this.operForm, data.extra)
          this.operForm.admin_password = ''
          this.operForm.admin_password2 = ''
        })
      }
    }
  }
}
</script>
