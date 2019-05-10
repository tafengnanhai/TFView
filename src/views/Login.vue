<template>
  <div>
    <div class="panel gray">
      <div class="title f20">登录</div>
      <el-form :model="operForm" :rules="rules" ref="operForm">
        <el-form-item prop="username">
          <el-input
            v-model="operForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            class="input margin"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="operForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            class="input margin"
            show-password
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="loginSubmit margin"
          size="medium"
          round
          @click="submitForm('operForm')"
        >登录</el-button>
        <div :class="tip">{{tipText}}</div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tip: 'tip',
      tipText: '',
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.get('/check/').then((res) => {
            if (res.data.username === this.operForm.username && res.data.password === this.operForm.password) {
              this.tipText = '登录成功'
              this.tip = 'tip green'
              this.$store.commit('initAccount', { username: res.data.username, token: res.data.token })
            } else {
              this.tipText = '用户名或者密码错误'
              this.tip = 'tip red'
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.panel {
  width: 320px;
  height: 300px;
  border-radius: 8px;
  background: white;
  margin: 0 auto;
  margin-top: 100px;
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
.el-form-item__error {
  margin-left: 20px;
  margin-top: 5px;
}
.tip {
  width: 100%;
  height: 20px;
  margin-top: 10px;
  text-align: center;
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
