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
          <line-chart :chart-data="statWeekDiffData" :options="lineChartOption"></line-chart>
        </el-card>
      </el-col>
    </el-row>
    <el-timeline>
      <el-timeline-item
        :timestamp="data.timestamp"
        placement="top"
        v-for="(data, index) in siteUpdateData"
        :key="index"
      >
        <el-card class="updateCard">
          <h4>{{data.title}}</h4>
          <p>{{data.content}}&nbsp;&nbsp;&nbsp;&nbsp;{{data.detailTime}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import LineChart from '@/plugins/linechart.js'
import http from '@/plugins/http'
import '@/mock/users'
import '@/mock/site'
export default {
  components: {
    LineChart
  },
  data () {
    return {
      statTotal: {},
      statWeekDiffData: {},
      siteUpdateData: {},
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
      http.send({ url: '/v1/users/stat' }).then((data) => {
        this.statTotal = data.extra
      })
      http.send({ url: '/v1/users/weekdiff' }).then((data) => {
        this.statWeekDiffData = data.extra
      })
      http.send({ url: '/v1/site/update' }).then((data) => {
        this.siteUpdateData = data.extra
      })
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
