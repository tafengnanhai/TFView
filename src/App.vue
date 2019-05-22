<template>
  <div id="app">
    <div id="nav" class="f16 white" v-show="$store.state.showRouterLink">
      <router-link to="/" class="el-icon-s-grid">&nbsp;TFView管理面板，请先登录</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  background: #c2cff0 url(./assets/img/login/loginBg.gif) no-repeat;
  background-size: cover;
}
#nav a {
  display: block;
  margin: 0 auto;
  padding-top: 50px;
  width: 280px;
  text-align: center;
}
</style>
