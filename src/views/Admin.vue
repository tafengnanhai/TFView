<template>
  <el-container>
    <transition name="bounce" enter-active-class="bounceInLeft" leave-active-class="bounceOutLeft">
      <el-aside width="240px" v-show="showMenu">
        <div class="site white f16 b white">TFView</div>
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
    </transition>

    <el-container>
      <el-header>
        <div class="smallControl">
          <el-button type="primary" @click="toggleMenu()">toggle menu</el-button>
        </div>
      </el-header>
      <el-main>main</el-main>
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
      if (document.querySelector('.el-aside').style.left === '0px' || document.querySelector('.el-aside').style.left === '') {
        this.showMenu = false
        setTimeout(function () {
          document.querySelector('.el-aside').style.left = '-240px'
        }, 500)
      } else {
        document.querySelector('.el-aside').style.left = '0px'
        this.showMenu = true
      }
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted () {
    window.onresize = () => {
      if (document.body.clientWidth > 800) {
        document.querySelector('.el-aside').style.left = '0px'
        this.showMenu = true
      }
    }
  }
}
</script>
<style scoped>
.site {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-bottom: 1px solid #2b313a;
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
  overflow: hidden;
}
.el-menu-item.is-active {
  background-color: #272c35 !important;
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
.smallControl {
  display: none;
}
@media screen and (max-width: 800px) {
  .el-aside {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 100;
  }
  .smallControl {
    display: block;
    position: absolute;
    top: 10px;
    right: 20px;
  }
}
@media screen and (min-width: 800px) {
  .el-aside {
    position: relative;
    height: 100%;
    left: 0;
  }
}
</style>
