<template>
  <div id="content" onclick="location.href='/'">
    <div style="
  font-size: 100px">404</div>
    <div style="font-size:60px">
      页面不存在，
      返回首页
    </div>
  </div>
</template>

<style scoped>
#content {
  width: 100%;
  padding-top: 100px;
  text-align: center;
  color: transparent;
  -webkit-text-stroke: 2px gray;
  text-shadow: 3px 3x 2px gray;
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
