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
      <el-form :model="operForm" ref="operForm" label-width="80px">
        <el-form-item label="名称" prop="group_title">{{otherForm.group_title}}</el-form-item>
        <el-form-item label="用户" prop="admin_id">
          <el-checkbox-group v-model="checkedGroupAccess" @change="handleCheckedChange">
            <el-checkbox
              v-for="access in groupAccess"
              :label="access.admin_id"
              :key="access.admin_id"
            >{{access.admin_username}}</el-checkbox>
          </el-checkbox-group>
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
import '@/mock/Access'
import '@/mock/Group'
import '@/mock/Admin'
export default {
  props: {
    dialogFormTitle: String,
    dialogId: Number
  },
  name: 'group-access',
  data () {
    return {
      fullscreen: false,
      dialogFormVisible: false,
      checkAll: false,
      checkedGroupAccess: [],
      groupAccess: [],
      otherForm: {
        group_title: ''
      },
      operForm: {
        group_id: 0,
        admin_id: []
      }
    }
  },
  methods: {
    submitForm: function (formName) {
      http.send({ url: '/Access/edit', sendType: 'post', param: this.operForm, showSuccessTip: true }).then(data => {
        if (data.code === 0) {
          this.checkedGroupAccess = []
          this.toggleDialog(false)
        }
      })
    },
    toggleDialog: function (flag) {
      this.dialogFormVisible = flag
    },
    toggleFullscreen: function () {
      this.fullscreen = !this.fullscreen
    },
    handleCheckedChange: function (val) {
      let tempGroupAccess = []
      val.forEach(item => {
        tempGroupAccess.push(item)
      })
      this.operForm.admin_id = tempGroupAccess.sort()
    }
  },
  watch: {
    '$parent.dialogAccessTime': function () {
      http.send({ url: '/Group/detail', param: { params: { id: this.$parent.dialogId } } }).then(data => {
        this.operForm.group_id = this.$parent.dialogId
        this.otherForm.group_title = data.extra.group_title
        http.send({ url: '/Admin/listForGroup' }).then(data => {
          this.groupAccess = data.extra
          http.send({ url: '/Access/listForGroup', param: { params: { id: this.$parent.dialogId } } }).then(data => {
            this.operForm.admin_id = data.extra.map(item => item.admin_id)
            this.checkedGroupAccess = this.operForm.admin_id
          })
        })
      })
    }
  }
}
</script>
