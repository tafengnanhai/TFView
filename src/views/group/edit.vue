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
        <el-form-item label="说明">如果修改了规则，被授权用户需要重新登陆后生效</el-form-item>
        <el-form-item label="名称" prop="group_title">
          <el-input v-model.trim="operForm.group_title" maxlength="80" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="规则" prop="group_rules">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedGroupRules" @change="handleCheckedChange">
            <el-checkbox
              v-for="rule in groupRules"
              :label="rule.rule_id"
              :key="rule.rule_id"
            >{{rule.rule_name}}</el-checkbox>
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
import '@/mock/Rule'
import '@/mock/Group'
export default {
  props: {
    dialogFormTitle: String,
    dialogId: Number
  },
  name: 'group-edit',
  data () {
    return {
      fullscreen: false,
      dialogFormVisible: false,
      dialogLastOperation: 'add',
      checkAll: false,
      checkedGroupRules: [],
      groupRules: [],
      isIndeterminate: false,
      operForm: {
        group_id: 0,
        group_title: '',
        group_rules: ''
      },
      rules: {
        group_title: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm: function (formName) {
      const self = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          const url = self.$parent.dialogId === 0 ? '/Group/add' : '/Group/edit'
          http.send({ url: url, sendType: 'post', param: this.operForm, showSuccessTip: true }).then(data => {
            if (data.code === 0) {
              self.$refs[formName].resetFields()
              self.checkedGroupRules = []
              self.updateChecked([])
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
    },
    handleCheckAllChange: function (val) {
      this.checkedGroupRules = val ? this.groupRules.map(item => {
        return item.rule_id
      }) : []
      this.isIndeterminate = false
      this.updateGroupRules(this.checkedGroupRules)
    },
    handleCheckedChange: function (val) {
      this.updateChecked(val)
      this.updateGroupRules(val)
    },
    updateChecked: function (val) {
      let checkedCount = val.length
      this.checkAll = checkedCount === this.groupRules.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.groupRules.length
    },
    updateGroupRules: function (val) {
      let tempGroupRules = []
      val.forEach(item => {
        tempGroupRules.push(item)
      })
      this.operForm.group_rules = tempGroupRules.sort().join()
    }
  },
  watch: {
    '$parent.dialogEditTime': function () {
      if (this.$parent.dialogId === 0) {
        http.send({ url: '/Rule/listForGroup' }).then(data => {
          this.groupRules = data.extra
        })
        if (this.dialogLastOperation === 'edit') {
          this.$nextTick(() => {
            this.$refs.operForm.resetFields()
          })
          this.checkedGroupRules = []
          this.updateChecked([])
          this.dialogLastOperation = 'add'
        }
      } else {
        this.dialogLastOperation = 'edit'
        this.$nextTick(() => {
          this.$refs.operForm.resetFields()
        })
        http.send({ url: '/Group/detail', param: { params: { id: this.$parent.dialogId } } }).then(data => {
          this.operForm = data.extra
          http.send({ url: '/Rule/listForGroup' }).then(data => {
            this.groupRules = data.extra
            this.checkedGroupRules = this.operForm.group_rules.length > 0 ? this.operForm.group_rules.split(',').map(item => parseInt(item)) : []
            this.updateChecked(this.checkedGroupRules)
          })
        })
      }
    }
  }
}
</script>
