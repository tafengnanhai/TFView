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
    >
      <el-menu-item
        index="/index/main"
        v-if="checkMenu('/index/main')/*为了统一入口，这里应该都能访问，可以在页面内使用Element-XXX的规则限制权限细节*/"
      >
        <i class="el-icon-s-home"></i>
        <span slot="title">首页面板</span>
      </el-menu-item>
      <el-submenu index="article" v-if="checkMenu('/article/index') || checkMenu('/artsort/index')">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/article/index" v-if="checkMenu('/article/index')">文章管理</el-menu-item>
        <el-menu-item index="/artsort/index" v-if="checkMenu('/artsort/index') ">分类管理</el-menu-item>
      </el-submenu>
      <el-submenu
        index="member-stat"
        v-if="checkMenu('/member/stat-diff') || checkMenu('/member/stat-city')  || checkMenu('/member/stat-now')"
      >
        <template slot="title">
          <i class="el-icon-pie-chart"></i>
          <span>监控统计</span>
        </template>
        <el-menu-item index="/member/stat-diff" v-if="checkMenu('/member/stat-diff')">注册对比</el-menu-item>
        <el-menu-item index="/member/stat-city" v-if="checkMenu('/member/stat-city')">城市统计</el-menu-item>
        <el-menu-item index="/member/stat-now" v-if="checkMenu('/member/stat-now')">实时活跃</el-menu-item>
      </el-submenu>
      <el-submenu
        index="system"
        v-if="checkMenu('/admin/index') || checkMenu('/group/index')  || checkMenu('/rule/index')"
      >
        <template slot="title">
          <i class="el-icon-set-up"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/admin/index" v-if="checkMenu('/admin/index')">系统用户</el-menu-item>
        <el-menu-item index="/group/index" v-if="checkMenu('/group/index')">分组管理</el-menu-item>
        <el-menu-item index="/rule/index" v-if="checkMenu('/rule/index')">规则管理</el-menu-item>
      </el-submenu>
      <el-submenu index="log" v-if="checkMenu('/logsys/index') || checkMenu('/logmember/index')">
        <template slot="title">
          <i class="el-icon-postcard"></i>
          <span>日志管理</span>
        </template>
        <el-menu-item index="/logsys/index" v-if="checkMenu('/logsys/index')">系统日志</el-menu-item>
        <el-menu-item index="/logmember/index" v-if="checkMenu('/logmember/index')">用户日志</el-menu-item>
      </el-submenu>
      <el-menu-item index="/message/edit" v-if="checkMenu('/message/edit')">
        <i class="el-icon-chat-line-round"></i>
        <span slot="title">消息提醒</span>
      </el-menu-item>
      <el-submenu index="admin">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户设置</span>
        </template>
        <el-menu-item @click="changePassword()">修改密码</el-menu-item>
        <el-menu-item @click="logout()">注销退出</el-menu-item>
      </el-submenu>
    </el-menu>
    <admin-edit dialog-form-title="修改密码" ref="adminEdit"></admin-edit>
  </div>
</template>

<script>
import Message from '@/plugins/message'
import AdminEdit from '@/views/admin/edit.vue'
export default {
  name: 'tf-menu',
  components: {
    AdminEdit
  },
  data () {
    return {
      dialogFormVisible: false,
      dialogId: this.$store.state.userid,
      dialogEditTime: 0
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      Message.success('注销成功')
      this.$router.replace('/login')
    },
    changePassword: function () {
      this.toggleDialog(true)
    },
    toggleDialog: function (flag) {
      flag && (this.dialogEditTime = new Date().getTime())
      this.$refs.adminEdit.toggleDialog(flag)
    },
    checkMenu: function (index) {
      return this.$store.state.userid === 1 || this.$store.state.rules.includes(`Menu${index.replace(/\//g, '-')}`)
    },
    loadMine () {
      // empty for change password call
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
