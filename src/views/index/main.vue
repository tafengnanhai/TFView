<template>
  <div>
    <el-row :gutter="20" v-if="this.$store.getters.checkRuleElement('/index/main')">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-card class="statCard">
          <el-row>
            <el-col :span="8">
              <div class="cardIcon" style="background: #fbc677">
                <i class="el-icon-document-checked f26 white"/>
              </div>
            </el-col>
            <el-col :span="16" class="cardNum">
              <span class="statNum b">{{statTotal.today}}</span>
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
              <span class="statNum b">{{statTotal.week}}</span>
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
              <span class="statNum b">{{statTotal.month}}</span>
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
              <span class="statNum b">{{statTotal.all}}</span>
              <br>
              <br>累计注册
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="chartCard" v-if="this.$store.getters.checkRuleElement('/index/main')">
      <line-chart :chart-data="statWeekDiffData" :options="lineChartOption"></line-chart>
    </el-card>
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
import '@/mock/Member'
import '@/mock/Site'
export default {
  name: 'index-main',
  components: {
    LineChart
  },
  data () {
    return {
      statTotal: {},
      statWeekDiffData: {},
      siteUpdateData: {},
      lineChartOption: {
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    loadMine: function () {
      this.$store.getters.checkRuleElement('/index/main') && http.send({ url: '/Member/getGeneralStat' }).then(data => {
        this.statTotal = data.extra
      })
      this.$store.getters.checkRuleElement('/index/main') && http.send({ url: '/Member/getWeekDiffStat' }).then(data => {
        this.statWeekDiffData = data.extra
      })
      http.send({ url: '/Site/getUpdateRecords' }).then(data => {
        this.siteUpdateData = data.extra
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
