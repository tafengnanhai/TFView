<template>
  <div>
    <el-popover placement="top-start" width="256" trigger="click">
      <div>
        <img src="@/assets/img/menu/logoBig.jpg">
      </div>
      <div class="f18 b white" slot="reference" id="sitename">TFView</div>
    </el-popover>
    <el-menu
      id="menu"
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
      background-color="#2f353f"
      text-color="#909399"
      active-text-color="white"
      :collapse="this.$store.state.isCollapse"
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
  </div>
</template>

<script>
export default {
  name: 'TFMenu',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen: function (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose: function (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.el-menu {
  border: 0;
  display: block;
  overflow: hidden;
}
.el-menu-item.is-active {
  background-color: #272c35 !important;
}
#sitename {
  margin: 0 auto;
  width: 120px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-bottom: 1px solid #2b313a;
  background: url(../assets/img/menu/logo.png) no-repeat left;
  cursor: pointer;
}
</style>
