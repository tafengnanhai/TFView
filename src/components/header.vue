<template>
  <div>
    <i
      :class="{ 'el-icon-s-fold f20 showMenu' : this.$store.state.showMenu, 'el-icon-s-unfold f20 showMenu': !this.$store.state.showMenu}"
      @click="toggleMenu()"
    />
    <i class="el-icon-user-solid f20 userSet"/>
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
    }
  }
}
</script>

<style scoped>
.showMenu {
  position: absolute;
  top: 10px;
  left: 20px;
}
.userSet {
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>
