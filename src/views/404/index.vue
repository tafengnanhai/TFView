<template>
  <div id="content" @click="goHome()">
    <div style="
  font-size: 100px">404</div>
    <div style="font-size:60px">
      页面不存在，
      返回
    </div>
  </div>
</template>

<style scoped>
#content {
  width: 100%;
  padding-top: 100px;
  text-align: center;
  color: transparent;
  -webkit-text-stroke: 2px rgb(231, 226, 226);
  text-shadow: 3px 3x 2px rgb(231, 226, 226);
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
  cursor: pointer;
}
#content:hover {
  width: 80%;
}
</style>

<script>
export default {
  methods: {
    goHome: function () {
      // 用router需要处理菜单折叠的问题，暂不用，也可以自行适配
      location.href = '/'
    }
  }
}
</script>
