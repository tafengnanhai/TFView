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
export default {
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
          http.send({ sendType: 'post', url: '/Admin/check', param: this.operForm, showSuccessTip: true }).then(data => {
            if (data.code === 0) {
              this.$store.commit('initAccount', { username: this.operForm.username, token: data.extra.token })
              this.$router.push('/')
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
