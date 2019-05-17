<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card class="statCard">
          <el-row>
            <el-col :span="8">
              <div class="cardIcon" style="background: #fbc677">
                <i class="el-icon-document-checked f26 white"/>
              </div>
            </el-col>
            <el-col :span="16" class="cardNum">
              <span class="f20 b">{{statTotal.today}}</span>
              <br>
              <br>今日注册
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card class="statCard">
          <el-row>
            <el-col :span="8">
              <div class="cardIcon" style="background:#ea6967">
                <i class="el-icon-document-remove f26 white"/>
              </div>
            </el-col>
            <el-col :span="16" class="cardNum">
              <span class="f20 b">{{statTotal.week}}</span>
              <br>
              <br>本周注册
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card class="statCard">
          <el-row>
            <el-col :span="8">
              <div class="cardIcon" style="background:#966ae2">
                <i class="el-icon-document f26 white"/>
              </div>
            </el-col>
            <el-col :span="16" class="cardNum">
              <span class="f20 b">{{statTotal.month}}</span>
              <br>
              <br>本月注册
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card class="statCard">
          <el-row>
            <el-col :span="8">
              <div class="cardIcon" style="background:#67a7fb">
                <i class="el-icon-document-copy f26 white"/>
              </div>
            </el-col>
            <el-col :span="16" class="cardNum">
              <span class="f20 b">{{statTotal.all}}</span>
              <br>
              <br>累计注册
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="chartCard">
          <line-chart :chart-data="datacollection" :options="lineChartOption"></line-chart>
        </el-card>
      </el-col>
    </el-row>
    <el-timeline>
      <el-timeline-item timestamp="2019/5/15" placement="top">
        <el-card class="updateCard">
          <h4>功能更新3</h4>
          <p>更新了某某功能&nbsp;&nbsp;&nbsp;&nbsp;2019/5/15 21:17</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2019/5/12" placement="top">
        <el-card class="updateCard">
          <h4>功能更新2</h4>
          <p>更新了某某功能&nbsp;&nbsp;&nbsp;&nbsp;2019/5/12 21:17</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2019/5/11" placement="top">
        <el-card class="updateCard">
          <h4>功能更新1</h4>
          <p>更新了某某功能&nbsp;&nbsp;&nbsp;&nbsp;2019/5/11 21:17</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import LineChart from '@/plugin/LineChart.js'
import { operData } from '@/plugin/http'
import '@/mock/users'
export default {
  components: {
    LineChart
  },
  data () {
    return {
      statTotal: {},
      statDayDiffData: {},
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
      },
      datacollection: null
    }
  },
  mounted: function () {
    operData({ url: '/v1/users/stat' }).then((data) => {
      this.statTotal = data.extra
    })
    this.datacollection = {
      labels: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
      datasets: [
        {
          label: '今日注册',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: '#F56C6C',
          data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
        }, {
          label: '昨日注册',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: '#409EFF',
          data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
        }
      ]
    }
  },
  methods: {
    getRandomInt: function () {
      return Math.floor(Math.random() * (20 - 5 + 1)) + 5
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
</style>
