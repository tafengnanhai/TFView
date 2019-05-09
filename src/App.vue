<template>
  <div id="app">
    <div id="nav" class="f16">
      <router-link to="/Admin" class="el-icon-s-grid">&nbsp;TFView管理面板</router-link>
      <router-link to="/Login" class="el-icon-s-custom">&nbsp;登录</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
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
