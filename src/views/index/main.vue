<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="statCard"></el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="statCard"></el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="statCard"></el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="statCard"></el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
        <el-card class="chartCard"></el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <el-card class="chartCard"></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index_main',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.statCard {
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
}
.chartCard {
  height: 500px;
  margin-bottom: 20px;
}
</style>
