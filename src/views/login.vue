<template>
  <div id="login">
    <div class="panel gray">
      <div class="title f20">TFView 登陆</div>
      <el-form :model="operForm" :rules="rules" ref="operForm">
        <el-form-item prop="username">
          <el-input
            v-model="operForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            class="input margin"
            autocomplete="off"
            @keydown.enter.native="submitForm('operForm')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="operForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            class="input margin"
            autocomplete="off"
            show-password
            @keydown.enter.native="submitForm('operForm')"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="loginSubmit margin"
          size="medium"
          round
          @click="submitForm('operForm')"
        >登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import http from '@/plugins/http'
import Message from '@/plugins/message'
import '@/mock/Admin'
import '@/mock/Access'
import '@/mock/Group'
import '@/mock/Rule'
export default {
  name: 'login',
  data () {
    return {
      operForm: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 实际开发时可以合并为一个请求
          http.send({ url: '/Admin/check', sendType: 'post', param: this.operForm }).then(checkData => {
            if (checkData.code === 0) {
              if (checkData.extra.userid !== 1) {
                http.send({ url: '/Access/getAccess', param: { params: { userid: checkData.extra.userid } } }).then(accessData => {
                  if (accessData.extra.length === 0) {
                    Message.error('没有权限')
                  } else {
                    http.send({ url: '/Group/getGroup', param: { params: { groupIds: accessData.extra.join() } } }).then(groupData => {
                      if (groupData.extra.length === 0) {
                        Message.error('没有权限')
                      } else {
                        http.send({ url: '/Rule/getRule', param: { params: { ruleIds: groupData.extra.join() } } }).then(ruleData => {
                          this.$store.commit('initAccount', { userid: checkData.extra.userid, username: this.operForm.username, token: checkData.extra.token, rules: ruleData.extra })
                          this.$router.push('/')
                        })
                      }
                    })
                  }
                })
              } else {
                Message.success(checkData.msg)
                this.$store.commit('initAccount', { userid: checkData.extra.userid, username: this.operForm.username, token: checkData.extra.token, rules: [] })
                this.$router.push('/')
              }
            }
          })
        } else {
          return false
        }
      })
    }
  },
  mounted: function () {
    this.$store.dispatch('logout') // for electron version
    if (this.$route.query.from === 'timeout') {
      Message.error('未登陆或超时，请重新登陆')
    }
  }
}
</script>
<style scoped>
#login {
  padding-top: 20vh;
}
.panel {
  width: 320px;
  height: 300px;
  border-radius: 8px;
  background: white;
  margin: 0 auto;
  text-align: center;
}
.title {
  padding-top: 30px;
}
.input {
  width: 280px;
}
.loginSubmit {
  width: 280px;
}
.margin {
  margin-top: 15px;
}
.el-form-item >>> .el-form-item__error {
  padding: 10px 0 0 20px !important;
}
@media screen and (max-width: 320px) {
  .panel {
    width: 280px;
  }
  .input {
    width: 240px;
  }
  .loginSubmit {
    width: 240px;
  }
}
</style>
