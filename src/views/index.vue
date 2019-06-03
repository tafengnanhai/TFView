<template>
  <el-container>
    <el-aside id="aside" width="160px">
      <TFMenu/>
    </el-aside>
    <el-container>
      <el-header height="76px">
        <TFHeader ref="tfHeader"/>
      </el-header>
      <el-main>
        <keep-alive>
          <router-view v-if="this.$route.meta.keepAlive" name="main"/>
        </keep-alive>
        <router-view v-if="!this.$route.meta.keepAlive" name="main"/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import TFMenu from '@/views/index/menu.vue'
import TFHeader from '@/views/index/header.vue'
import http from '@/plugins/http'
import '@/mock/Message'
import '@/mock/Member'
import { Notification } from 'element-ui'
const notice = {
  0: null,
  1: null,
  2: null,
  next: 0,
  length: 3
}
export default {
  data () {
    return {
      msg: {
        interval: 1000,
        timer: null,
        lastId: new Date().getTime() - 88
      }
    }
  },
  components: {
    TFMenu,
    TFHeader
  },
  methods: {
    checkMsg: function () {
      try { clearInterval(this.msg.timer) } catch (error) { }
      this.msg.timer = setInterval(() => {
        http.send({ url: '/Member/checkMsg/backend' }).then(data => {
          if (data.code === 0 && data.extra.max_id - this.msg.lastId >= this.$store.state.regTotal) {
            this.showMsg(data.extra.max_id - this.msg.lastId)
            this.msg.lastId = data.extra.max_id
          }
        })
      }, this.msg.interval)
    },
    showMsg: function (diff) {
      notice[notice.next] && notice[notice.next].close()
      notice[notice.next] = Notification.success({
        title: '消息提醒',
        message: `相比上次约增加了${diff}名注册会员`,
        duration: 0,
        showClose: false,
        position: 'bottom-right',
        onClick: () => {
          Notification.closeAll()
          // TODO:打开会员信息界面
          this.$router.push('/index/main')
          this.$store.dispatch('updateReloadPageTime')
        }
      })
      notice.next = ++notice.next % notice.length
    }
  },
  mounted: function () {
    http.send({ url: '/Message/detail' }).then((data) => {
      this.$store.dispatch('updateRegNewMsg', data.extra)
    })
  },
  watch: {
    '$store.state.regNew': function (val) {
      if (val) {
        this.checkMsg()
      } else {
        try { clearInterval(this.msg.timer) } catch (error) { }
      }
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
  overflow: hidden;
}
.el-main {
  background: #f5f5f5;
}
</style>
