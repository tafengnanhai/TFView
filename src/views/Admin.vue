<template>
  <el-container>
    <transition name="bounce" enter-active-class="bounceInLeft" leave-active-class="bounceOutLeft">
      <el-aside width="240px" v-show="showMenu">menu</el-aside>
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
      showMenu: true
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
