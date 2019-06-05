<template>
  <div id="memberStatDiff">
    <div class="panel">
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-orange"
        @click="toggleStacked(true)"
      >形状对比</el-button>
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-grape"
        @click="toggleStacked(false)"
      >数值对比</el-button>
    </div>
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
import Message from '@/plugins/message'
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
      stacked: true,
      lineChartOption: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            stacked: false
          }],
          xAxes: [{
            stacked: false
          }]
        }
      }
    }
  },
  methods: {
    toggleStacked (flag) {
      this.lineChartOption.scales.yAxes[0].stacked = flag
      this.isShow = false
      this.$nextTick(() => (this.isShow = true))
      Message.success(flag ? '一条曲线向上平移，忽略Y轴数值，对比曲线形状' : '真实的数值对比', 3000)
    },
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
  min-width: 260px;
  position: relative;
}
.panel {
  width: 100%;
  min-height: 40px;
  padding-bottom: 15px;
}
.chartCard {
  margin-bottom: 20px;
}
</style>
