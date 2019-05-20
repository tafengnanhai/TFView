<template>
  <el-container>
    <el-aside id="aside" width="160px">
      <TFMenu/>
    </el-aside>
    <el-container>
      <el-header height="76px">
        <TFHeader/>
      </el-header>
      <el-main>
        <keep-alive>
          <router-view name="main"/>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import TFMenu from '@/components/menu.vue'
import TFHeader from '@/components/header.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    TFMenu,
    TFHeader
  },
  created: function () {
    if (this.$route.path === '/') {
      this.$router.replace('/index/main')
    }
  }
}
</script>
<style scoped>
.el-container {
  height: 100%;
  background: white;
}
.el-aside {
  height: 100%;
  background: #2f353f;
}
.el-header {
  background: white;
  padding: 0;
  position: relative;
}
.el-main {
  background: #f5f5f5;
}
</style>
