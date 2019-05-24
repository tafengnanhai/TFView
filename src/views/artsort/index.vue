<template>
  <div>
    sort/index
    <el-input v-model="testVal"></el-input>
    <el-button type="success" @click="test()">重新载入</el-button>
  </div>
</template>
<script>
export default {
  name: 'artsort_index',
  data () {
    return {
      testVal: ''
    }
  },
  methods: {
    test: function () {
      this.$store.dispatch('updateReloadPageTime')
    },
    loadMine: function () {
      this.testVal = new Date().getTime()
    }
  },
  mounted: function () {
    this.loadMine()
  },
  computed: {
    reloadPageTime: function () {
      return this.$store.state.reloadPageTime
    }
  },
  watch: {
    reloadPageTime: function () {
      this.loadMine()
    }
  }
}
</script>

<style scoped>
</style>
