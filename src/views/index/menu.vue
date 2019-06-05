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
      :collapse-transition="false"
      :unique-opened="true"
      :collapse="this.$store.state.isCollapse"
      @select="selectMenu"
    >
      <el-menu-item index="/index/main" id="/index/main">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页面板</span>
      </el-menu-item>
      <el-submenu index="/article">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/article/index" id="/article/index">文章管理</el-menu-item>
        <el-menu-item index="/artsort/index" id="/artsort/index">分类管理</el-menu-item>
      </el-submenu>
      <el-submenu index="/member/stat">
        <template slot="title">
          <i class="el-icon-pie-chart"></i>
          <span>监控统计</span>
        </template>
        <el-menu-item index="/member/stat-diff" id="/member/stat-diff">注册统计</el-menu-item>
        <el-menu-item index="/member/stat-city" id="/member/stat-city">城市统计</el-menu-item>
        <el-menu-item index="/member/stat-now" id="/member/stat-now">实时活跃</el-menu-item>
      </el-submenu>
      <el-submenu index="/member">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>会员管理</span>
        </template>
        <el-menu-item index="/member/index" id="/member/index">会员信息</el-menu-item>
        <el-menu-item index="/member/online" id="/member/online">今日活跃</el-menu-item>
      </el-submenu>
      <el-submenu index="/system">
        <template slot="title">
          <i class="el-icon-set-up"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/admin/index" id="/admin/index">系统用户</el-menu-item>
        <el-menu-item index="/auth/index" id="/auth/index">权限管理</el-menu-item>
        <el-menu-item index="/menu/index" id="/menu/index">菜单管理</el-menu-item>
      </el-submenu>
      <el-submenu index="/log">
        <template slot="title">
          <i class="el-icon-postcard"></i>
          <span>日志管理</span>
        </template>
        <el-menu-item index="/log/sys" id="/log/sys">系统日志</el-menu-item>
        <el-menu-item index="/log/member" id="/log/member">用户日志</el-menu-item>
      </el-submenu>
      <el-menu-item index="/message/edit" id="/message/edit">
        <i class="el-icon-chat-line-round"></i>
        <span slot="title">消息提醒</span>
      </el-menu-item>
      <el-submenu index="/admin">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户设置</span>
        </template>
        <el-menu-item @click="changePassword()">修改密码</el-menu-item>
        <el-menu-item @click="logout()">注销退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Message from '@/plugins/message'
export default {
  name: 'tf-menu',
  data () {
    return {

    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      Message.success('注销成功')
      this.$router.replace('/login')
    },
    changePassword: function () {
      this.$parent.$parent.$parent.$refs.tfHeader.$refs.adminEdit.toggleDialog(true)
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
  background: url(../../assets/img/menu/logo.png) no-repeat left;
  cursor: pointer;
}
</style>
