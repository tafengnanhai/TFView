<template>
  <div>
    <i
      :class="{ 'el-icon-s-fold f20 showMenu' : !this.$store.state.isCollapse, 'el-icon-s-unfold f20 showMenu': this.$store.state.isCollapse}"
      @click="toggleMenu"
    />
    <div class="wel">
      某某管理系统欢迎你：
      <span class="red">{{this.$store.state.username}}</span>，不使用请及时注销
    </div>
    <el-dropdown @command="handlePopMenu">
      <i class="el-icon-user-solid f20"/>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user" command="changePassword">&nbsp;修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-lock" command="logout">&nbsp;注销退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-tabs v-model="activeTabName" type="border-card" closable @tab-remove="removeTab">
      <el-tab-pane
        :label="item.label"
        :name="item.name"
        v-for="item in this.$store.state.tabs"
        :key="item.label"
      ></el-tab-pane>
    </el-tabs>
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
        this.$store.commit('addTab', newTab)
        this.$store.commit('changeActiveTabName', this.$route.path)
      }
    },
    removeTab: function (targetName) {
      this.$store.dispatch('removeTab', targetName)
    }
  },
  computed: {
    activeTabName: {
      get: function () {
        return this.$store.state.activeTabName
      },
      set: function (val) {
        this.$store.commit('changeActiveTabName', val)
      }
    },
    routePath: {
      get: function () {
        return this.$route.path
      }
    }
  },
  mounted: function () {
    this.addTab()
  },
  watch: {
    routePath: function (nVal, oVal) {
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
  width: 65%;
  height: 20px;
  line-height: 20px;
  left: 60px;
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
.el-tabs {
  width: 97%;
  height: 39px;
  overflow: hidden;
  padding-top: 35px;
  padding: 35px 1.5% 0 1.5%;
  float: left;
}
</style>
