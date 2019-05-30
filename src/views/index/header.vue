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
  </div>
</template>

<script>
import Loading from '@/plugins/loading'
import Message from '@/plugins/message'
export default {
  name: 'TFHeader',
  data () {
    return {
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
    changePassword: function () {
      Message.success('TODO:即将推出')
    },
    logout: function () {
      this.$store.commit('logout')
      Message.success('注销成功')
      this.$router.replace('/login')
    },
    handlePopMenu: function (command) {
      switch (command) {
        case 'changePassword':
          this.changePassword()
          break
        case 'logout':
          this.logout()
          break
      }
    },
    addTab: function () {
      if (this.$route.path !== '/') {
        let newTab = {
          label: this.$route.meta.label,
          name: this.$route.path
        }
        let isExists = this.tabs.some((tab, index) => tab.label === newTab.label)
        !isExists && this.tabs.push(newTab)
        this.activeTabName = this.$route.path
      }
    },
    clickTab: function (tab, event) {
      // this.$store.commit('updateActiveTabName', this.activeTabName)
      this.activeTabName = tab.name
      this.$router.push({ path: tab.name })
    },
    removeTab: function (targetName) {
      let tempTabs = this.tabs
      if (this.activeTabName === targetName) {
        tempTabs.every((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tempTabs[index + 1] || tempTabs[index - 1]
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
    }
  },
  mounted: function () {
    this.addTab()
  },
  watch: {
    '$route': function (to, from) {
      this.addTab()
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
