<template>
  <el-container>
    <el-aside width="240px" v-show="showMenu">
      <div class="site white f18 b white">TFView</div>
      <Menu/>
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
import Menu from '@/components/menu.vue'
export default {
  data () {
    return {
      showMenu: true,
    }
  },
  components: {
    Menu
  },
  methods: {
    toggleMenu: function () {
      this.showMenu = !this.showMenu
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
