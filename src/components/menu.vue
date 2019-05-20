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
      router
      :default-active="this.$route.path"
      background-color="#2f353f"
      text-color="#d9d9d9"
      active-text-color="white"
      :collapse="this.$store.state.isCollapse"
      @select="selectMenu"
    >
      <el-menu-item index="/index/main" id="/index/main">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页面板</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/article/index" id="/article/index">文章管理</el-menu-item>
        <el-menu-item index="/sort/index" id="/sort/index">分类管理</el-menu-item>
        <el-menu-item index="/virtual/index" id="/virtual/index">独立接口</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-pie-chart"></i>
          <span>图表管理</span>
        </template>
        <el-menu-item index="2-1">注册图表</el-menu-item>
        <el-menu-item index="2-2">城市图表</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-set-up"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="3-1">系统用户</el-menu-item>
        <el-menu-item index="3-2">权限管理</el-menu-item>
        <el-menu-item index="3-3">菜单管理</el-menu-item>
        <el-menu-item index="3-4">城市管理</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-postcard"></i>
          <span>日志管理</span>
        </template>
        <el-menu-item index="4-1">系统日志</el-menu-item>
        <el-menu-item index="4-2">用户日志</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户设置</span>
        </template>
        <el-menu-item>修改密码</el-menu-item>
        <el-menu-item @click="logout" index="/login" id="/login">注销退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'TFMenu',
  data () {
    return {

    }
  },
  methods: {
    logout: function () {
      this.$store.commit('logout')
      this.$message.success('注销成功')
      this.$router.replace('/login')
    },
    selectMenu: function (index, indexPath) {

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
