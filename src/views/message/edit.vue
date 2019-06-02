<template>
  <div>
    <el-card class="statCard">
      <el-form :model="operForm" ref="operForm" :rules="rules" label-width="80px">
        <el-form-item label="是否提醒" prop="reg_new">
          <el-switch v-model="operForm.reg_new"></el-switch>
        </el-form-item>
        <el-form-item label="新增数" prop="reg_total">
          <el-input v-model.number="operForm.reg_total" maxlength="4" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="说明">不同的系统用户独立设置</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('operForm')">提交</el-button>
          <el-button @click="demo()">测试消息</el-button>
          <el-button @click="close()">全部关闭</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import http from '@/plugins/http'
import '@/mock/Message'
import { Notification } from 'element-ui'
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
        reg_total: [{ required: true, type: 'integer', min: 1, max: 9999, message: '请输入新增数（1-9999）', trigger: 'blur' }]
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
    demo: function () {
      Notification.success({
        title: '消息提醒',
        message: '相比上次增加了256名注册会员',
        duration: 10000,
        showClose: false,
        position: 'bottom-right',
        onClick: () => {
          this.close()
          // TODO:打开会员信息界面
        }
      })
    },
    close: function () {
      Notification.closeAll()
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
