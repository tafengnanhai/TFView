<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="chartCard">
          <line-chart :chart-data="statDayDiffData" :options="lineChartOption"></line-chart>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card class="chartCard">
          <line-chart :chart-data="statWeekDiffData" :options="lineChartOption"></line-chart>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card class="chartCard">
          <line-chart :chart-data="statMonthDiffData" :options="lineChartOption"></line-chart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from '@/plugins/linechart.js'
import http from '@/plugins/http'
import '@/mock/Member'
import '@/mock/Site'
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
      lineChartOption: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            stacked: true
          }],
          xAxes: [{
            stacked: true
          }]
        }
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
  mounted: function () { // 数据资源占用较多的页面不放到activated中，可以选择手动刷新
    this.loadMine()
  },
  watch: {
    '$store.state.reloadPageTime': function () {
      this.loadMine()
    }
  }
}
</script>

<style>
.updateCard .el-card__body {
  margin: 0 !important;
  padding: 0 0 10px 10px !important;
}
</style>

<style scoped>
.statCard {
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  color: #797979;
  text-align: right;
}
.statNum {
  font-size: 20px;
}
.cardIcon {
  width: 26px;
  height: 26px;
  padding: 17px;
  border-radius: 30px;
}
.chartCard {
  min-height: 100px;
  margin-bottom: 20px;
}
@media screen and (max-width: 400px) {
  .statNum {
    font-size: 16px;
  }
}
</style>
