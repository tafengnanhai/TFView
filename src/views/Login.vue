<template>
  <div>
    <div class="panel gray">
      <div class="title f20">登录</div>
      <div class="margin">
        <el-input
          v-model="username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
          class="input"
          autocomplete="off"
        ></el-input>
      </div>
      <div class="margin">
        <el-input
          v-model="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          class="input"
          show-password
        ></el-input>
      </div>
      <div class="margin">
        <el-button type="primary" class="loginSubmit" size="medium" round>登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      username: null,
      password: null
    }
  }
}
</script>
<style scope>
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
  margin-top: 30px;
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
