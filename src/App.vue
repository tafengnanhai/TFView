<template>
  <div id="app">
    <div id="nav" class="f16" v-show="$store.state.showRouterLink">
      <router-link to="/" class="el-icon-s-grid">&nbsp;TFView管理面板</router-link>
      <router-link to="/login" class="el-icon-s-custom">&nbsp;登录</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  background: #c2cff0 url(/static/img/login/loginBg.gif) no-repeat;
  background-size: cover;
}
#nav {
  width: 280px;
  margin: 0 auto;
  padding: 30px;
}

#nav a {
  display: block;
  width: 140px;
  text-align: center;
  color: white;
  float: left;
}
</style>
