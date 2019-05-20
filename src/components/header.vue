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
      >当前栏目：{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handlePopMenu">
      <i class="el-icon-user-solid f20"/>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user" command="changePassword">&nbsp;修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-lock" command="logout">&nbsp;注销退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-tabs
      v-model="activeTabName"
      type="card"
      closable
      @tab-click="clickTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabs" :key="item.label"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'TFHeader',
  data () {
    return {
      fullscreen: false,
      activeTabName: 'index/main',
      tabs: [
        {
          label: '首页面板',
          name: 'index/main'
        }
      ]
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
    clickTab: function (tab, event) {

    },
    addTab: function (targetName) {
      let newTabName = ++this.tabIndex + ''
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      })
      this.editableTabsValue = newTabName
    },
    removeTab: function (targetName) {
      let tabs = this.tabs
      if (this.activeTabName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              this.activeTabName = nextTab.name
            }
          }
        })
      }

      this.tabs = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>

<style>
.el-tabs__nav .el-tabs__item:nth-child(1) span {
  display: none;
}
</style>

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
.el-tabs {
  width: 98%;
  overflow: hidden;
  padding-top: 35px;
  padding: 35px 1% 0 1%;
  float: left;
}
</style>
