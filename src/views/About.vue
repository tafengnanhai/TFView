<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <el-button type="primary" @click="testGet()">Get</el-button>
      <el-button type="primary" @click="testPost()">Post</el-button>
      <el-button type="success" round>测试3</el-button>
      <el-button type="success" round>测试4</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    testGet () {
      this.$http.get('/get.php').then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    testPost () {
      this.$http.post('/post.php', { name: 'willson', id: 100 }).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
