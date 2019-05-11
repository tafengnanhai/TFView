<template>
  <el-container>
    <el-aside width="240px" id="menu">menu</el-aside>
    <el-container>
      <el-header>header</el-header>
      <el-main>main</el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
.el-container {
  height: 100%;
  background: white;
}
.el-aside {
  background: red;
}
.el-main {
  background: blue;
  padding: 0;
}
.el-header {
  background: green;
  padding: 0;
  position: relative;
}
</style>
