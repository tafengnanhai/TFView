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
        <el-form-item label="名称" prop="rule_name">
          <el-input v-model.trim="operForm.rule_name" maxlength="80" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规则" prop="rule_title">
          <el-input v-model="operForm.rule_title" maxlength="50" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="条件" prop="rule_condition">
          <el-input
            maxlength="100"
            autocomplete="off"
            v-model="operForm.rule_condition"
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
import '@/mock/Rule'
export default {
  props: {
    dialogFormTitle: String,
    dialogId: Number
  },
  name: 'rule-edit',
  data () {
    return {
      fullscreen: false,
      dialogFormVisible: false,
      dialogLastOperation: 'add',
      operForm: {
        rule_id: 0,
        rule_name: '',
        rule_title: '',
        rule_condition: ''
      },
      rules: {
        rule_name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        rule_title: [{ required: true, message: '请输入规则', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm: function (formName) {
      const self = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          const url = self.$parent.dialogId === 0 ? '/Rule/add' : '/Rule/edit'
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
        http.send({ url: '/Rule/detail', param: { params: { id: this.$parent.dialogId } } }).then(data => {
          Object.assign(this.operForm, data.extra)
          this.operForm.admin_password = ''
          this.operForm.admin_password2 = ''
        })
      }
    }
  }
}
</script>
