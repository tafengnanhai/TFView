<template>
  <div>
    <i
      :class="{ 'el-icon-s-fold f20 showMenu' : !this.$store.state.isCollapse, 'el-icon-s-unfold f20 showMenu': this.$store.state.isCollapse}"
      @click="toggleMenu"
    />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, itemIndex) in this.$store.state.currentBreadCrumb"
        v-bind:key="itemIndex"
      >{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand">
      <i class="el-icon-user-solid f20"/>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user" command="changePassword">&nbsp;修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-lock" command="logout">&nbsp;注销退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'TFHeader',
  data () {
    return {
      fullscreen: false
    }
  },
  methods: {
    toggleMenu: function () {
      this.$store.commit('toggleMenu')
    },
    changePassword: function () {
      this.$message.success('TODO:即将推出')
    },
    logout: function () {
      this.$store.commit('logout')
      this.$message.success('注销成功')
      this.$router.replace('/login')
    },
    handleCommand: function (command) {
      this.$message('click on item ' + command)
      switch (command) {
        case 'changePassword':
          this.changePassword()
          break
        case 'logout':
          this.logout()
          break
      }
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  position: absolute;
  height: 20px;
  line-height: 20px;
  left: 60px;
  top: 10px;
}
.el-dropdown {
  position: absolute;
  height: 20px;
  line-height: 20px;
  top: 10px;
  right: 20px;
  cursor: pointer;
}
.showMenu {
  position: absolute;
  height: 20px;
  line-height: 20px;
  top: 10px;
  left: 20px;
  cursor: pointer;
}
</style>
