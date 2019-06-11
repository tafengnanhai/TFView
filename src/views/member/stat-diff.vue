<template>
  <div id="memberStatDiff">
    <el-card class="chartCard">
      <line-chart :chart-data="statDayDiffData" :options="lineChartOption" v-if="isShow"></line-chart>
    </el-card>
    <el-card class="chartCard">
      <line-chart :chart-data="statWeekDiffData" :options="lineChartOption" v-if="isShow"></line-chart>
    </el-card>
    <el-card class="chartCard">
      <line-chart :chart-data="statMonthDiffData" :options="lineChartOption" v-if="isShow"></line-chart>
    </el-card>
  </div>
</template>

<script>
import LineChart from '@/plugins/linechart.js'
import http from '@/plugins/http'
import '@/mock/Member'
export default {
  name: 'member-stat-diff',
  components: {
    LineChart
  },
  data () {
    return {
      statDayDiffData: {},
      statWeekDiffData: {},
      statMonthDiffData: {},
      isShow: true,
      lineChartOption: {
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    loadMine: function () {
      http.send({ url: '/Member/getDayDiffStat' }).then(data => {
        this.statDayDiffData = data.extra
      })
      http.send({ url: '/Member/getWeekDiffStat' }).then(data => {
        this.statWeekDiffData = data.extra
      })
      http.send({ url: '/Member/getMonthDiffStat' }).then(data => {
        this.statMonthDiffData = data.extra
      })
    }
  },
  mounted: function () {
    this.loadMine()
  },
  watch: {
    '$store.state.reloadPageTime': function () {
      this.loadMine()
    }
  }
}
</script>

<style scoped>
#memberStatDiff {
  min-width: 250px;
  position: relative;
}
.chartCard {
  margin-bottom: 20px;
}
</style>
