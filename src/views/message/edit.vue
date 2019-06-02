<template>
  <div>
    <el-card class="statCard">
      <el-form :model="operForm" ref="operForm" :rules="rules" label-width="80px">
        <el-form-item label="新注册" prop="reg_new">
          <el-switch v-model="operForm.reg_new"></el-switch>
        </el-form-item>
        <el-form-item label="注册数" prop="reg_total">
          <el-input v-model.number="operForm.reg_total" maxlength="4" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="说明">消息提醒时用户级别的，不同的系统用户独立设置</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('operForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import http from '@/plugins/http'
import '@/mock/Message'
export default {
  props: ['dialogFormTitle', 'dialogId'],
  name: 'admin_edit',
  data () {
    return {
      fullscreen: false,
      dialogFormVisible: false,
      operForm: {
        reg_new: false,
        reg_total: 1
      },
      rules: {
        reg_total: [{ required: true, type: 'integer', min: 1, max: 9999, message: '请输入注册数1-9999', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm: function (formName) {
      const self = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          http.send({ sendType: 'post', url: '/Message/edit', param: this.operForm, showSuccessTip: true }).then(data => {
            if (data.code === 0) {
              self.loadMine()
            }
          })
        }
      })
    },
    loadMine: function () {
      http.send({ url: '/Message/detail' }).then((data) => {
        this.operForm = data.extra
      })
    }
  },
  activated: function () {
    this.loadMine()
  },
  watch: {
    '$store.state.reloadPageTime': function () {
      this.loadMine()
    }
  }
}
</script>
