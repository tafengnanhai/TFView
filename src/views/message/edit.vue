<template>
  <div>
    <el-card class="statCard">
      <el-form :model="operForm" ref="operForm" :rules="rules" label-width="100px">
        <el-form-item label="是否提醒" prop="reg_new">
          <el-switch v-model="operForm.reg_new"></el-switch>
        </el-form-item>
        <el-form-item label="至少新增数" prop="reg_total">
          <el-input-number
            v-model.number="operForm.reg_total"
            :min="1"
            :max="9999"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="说明">不同的系统用户独立设置，最多保留新的三次提醒（测试的单独计数，不与真实的合并）</el-form-item>
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
const notice = {
  0: null,
  1: null,
  2: null,
  next: 0,
  length: 3
}
export default {
  props: ['dialogFormTitle', 'dialogId'],
  name: 'admin-edit',
  data () {
    return {
      fullscreen: false,
      dialogFormVisible: false,
      operForm: {
        reg_new: false,
        reg_total: 1
      },
      rules: {
        reg_total: [{ required: true, type: 'integer', min: 1, max: 9999, message: '请输入至少新增数（1-9999）', trigger: 'blur' }]
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
              this.$store.dispatch('updateRegNewMsg', this.operForm)
              self.loadMine()
            }
          })
        }
      })
    },
    demo: function () {
      notice[notice.next] && notice[notice.next].close()
      notice[notice.next] = Notification.success({
        title: '消息提醒[测试]',
        message: '相比上次约增加了256名注册会员',
        duration: 0,
        showClose: false,
        position: 'bottom-right',
        onClick: () => {
          Notification.closeAll()
          // TODO:打开会员信息界面
          this.$router.push('/index/main')
          this.$store.dispatch('updateReloadPageTime')
        }
      })
      notice.next = ++notice.next % notice.length
    },
    close: function () {
      Notification.closeAll()
    },
    loadMine: function () {
      http.send({ url: '/Message/detail' }).then((data) => {
        this.operForm = data.extra
        this.$store.dispatch('updateRegNewMsg', this.operForm)
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
