<template>
  <el-container>
    <transition name="bounce" enter-active-class="bounceInLeft" leave-active-class="bounceOutLeft">
      <el-aside width="240px" v-show="showMenu">
        <el-scrollbar>
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
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
      if (document.querySelector('.el-aside').style.left === '0px') {
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
.el-container {
  height: 100%;
  background: white;
}
.el-aside {
  background: #2f353f;
}
.el-scrollbar {
  height: 100%;
}
.is-horizontal {
  display: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
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
    left: -240px;
    top: 0;
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
