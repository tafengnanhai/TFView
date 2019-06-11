<template>
  <div>
    <i
      :class="{ 'el-icon-s-fold f20 showMenu' : !this.$store.state.isCollapse, 'el-icon-s-unfold f20 showMenu': this.$store.state.isCollapse}"
      @click="toggleMenu"
    />
    <i class="reloadPage el-icon-magic-stick f20 b" title="智能刷新页面" @click="reloadPage()"></i>
    <div class="wel">
      TFView欢迎你：
      <span class="red">{{this.$store.state.username}}</span>，不使用请及时注销，重载页面请使用右侧的魔法棒
    </div>
    <el-dropdown @command="handlePopMenu">
      <i class="el-icon-user-solid f20"/>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user" command="changePassword">&nbsp;修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-lock" command="logout">&nbsp;注销退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-tabs
      v-model="activeTabName"
      type="border-card"
      closable
      @tab-click="clickTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabs" :key="item.label"></el-tab-pane>
    </el-tabs>
    <admin-edit dialog-form-title="修改密码" ref="adminEdit"></admin-edit>
  </div>
</template>

<script>
import Loading from '@/plugins/loading'
import Message from '@/plugins/message'
import AdminEdit from '@/views/admin/edit.vue'

export default {
  name: 'tf-header',
  components: {
    AdminEdit
  },
  data () {
    return {
      dialogFormVisible: false,
      dialogId: this.$store.state.userid,
      dialogEditTime: 0,
      fullscreen: false,
      activeTabName: '/index/main',
      tabs: [
        {
          label: '首页面板',
          name: '/index/main'
        }
      ]
    }
  },
  methods: {
    toggleMenu: function () {
      this.$store.commit('toggleMenu')
    },
    toggleDialog: function (flag) {
      flag && (this.dialogEditTime = new Date().getTime())
      this.$refs.adminEdit.toggleDialog(flag)
    },
    logout: function () {
      this.$store.commit('logout')
      Message.success('注销成功')
      this.$router.replace('/login')
    },
    handlePopMenu: function (command) {
      switch (command) {
        case 'changePassword':
          this.toggleDialog(true)
          break
        case 'logout':
          this.logout()
          break
      }
    },
    addTab: function () {
      if (this.$route.path !== '/') {
        const newTab = {
          label: this.$route.meta.label,
          name: this.$route.path
        }
        const isExists = this.tabs.some((tab, index) => tab.label === newTab.label)
        !isExists && this.tabs.push(newTab)
        this.activeTabName = this.$route.path
      }
    },
    clickTab: function (tab, event) {
      this.activeTabName = tab.name
      this.$router.push({ path: tab.name })
    },
    removeTab: function (targetName) {
      const tempTabs = this.tabs
      if (this.activeTabName === targetName) {
        tempTabs.every((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tempTabs[index + 1] || tempTabs[index - 1]
            if (nextTab) {
              this.activeTabName = nextTab.name
            }
            return false
          }
          return true
        })
      }
      this.tabs = tempTabs.filter(tab => tab.name !== targetName)
      this.$router.push({ path: this.activeTabName })
    },
    reloadPage: function () {
      Loading.open()
      Message.success('智能刷新页面完成，请查看')
      this.$store.dispatch('updateReloadPageTime')
      Loading.close()
    },
    // 放到header中是为了避免没有权限的情况下仍然创建tab
    checkMenuFromUrl: function () {
      if (this.$store.state.userid !== 1 && !this.$store.state.rules.includes(`Menu${this.$route.path.split('/').join('-')}`)) {
        Message.error('没有权限')
        this.$router.replace('/index/main')
        return false
      }
      return true
    },
    loadMine () {
      // empty for change password call
    }
  },
  mounted: function () {
    this.checkMenuFromUrl() && this.addTab()
  },
  watch: {
    '$route': function (to, from) {
      this.checkMenuFromUrl() && this.addTab()
    }
  }
}
</script>

<style>
.el-tabs__nav .el-tabs__item span {
  display: inline;
}
.el-tabs__nav .el-tabs__item:nth-child(1) span {
  display: none;
}
.el-tabs__nav-scroll {
  border-top: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
}
</style>

<style scoped>
.wel {
  position: absolute;
  height: 20px;
  line-height: 20px;
  left: 60px;
  right: 90px;
  top: 10px;
  overflow: hidden;
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
.reloadPage {
  position: absolute;
  height: 20px;
  line-height: 20px;
  top: 10px;
  right: 60px;
  cursor: pointer;
}
.el-tabs {
  width: 97%;
  height: 39px;
  overflow: hidden;
  padding-top: 35px;
  padding: 35px 1.5% 0 1.5%;
  float: left;
}
</style>
