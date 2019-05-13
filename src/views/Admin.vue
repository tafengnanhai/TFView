<template>
  <el-container>
    <el-aside width="240px" v-show="showMenu">
      <div class="site white f18 b white">TFView</div>
      <el-menu
        default-active="2"
        @open="handleOpen"
        @close="handleClose"
        background-color="#2f353f"
        text-color="#909399"
        active-text-color="white"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div class="showMenu">
          <i
            :class="{ 'el-icon-s-fold f20' : showMenu, 'el-icon-s-unfold f20': !showMenu}"
            @click="toggleMenu()"
          />
        </div>
      </el-header>
      <el-main></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      showMenu: true,
      isCollapse: true
    }
  },
  methods: {
    toggleMenu: function () {
      this.showMenu = !this.showMenu
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
.site {
  margin: 0 auto;
  width: 150px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-bottom: 1px solid #2b313a;
  background: url(../assets/img/menu/logo.png) no-repeat left;
}
.el-container {
  height: 100%;
  background: white;
}
.el-aside {
  background: #2f353f;
}
.el-menu {
  width: 100%;
  border: 0;
  display: block;
  overflow: hidden;
}
.el-menu-item.is-active {
  background-color: #272c35 !important;
}
.el-header {
  background: white;
  padding: 0;
  position: relative;
}
.el-main {
  background: #f5f5f5;
  padding: 0;
}
.showMenu {
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>
