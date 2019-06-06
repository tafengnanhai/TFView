<template>
  <div id="memberStatNow">
    <el-card :class="chartCardClass" id="chartCard">
      <div class="fullscreenButton">
        <el-button type="text" @click="toggleFullscreen()">
          <i class="el-icon-full-screen" style="font-size:40px"></i>
        </el-button>
      </div>
      <map-province
        :jsonData="jsonData"
        :cityData="cityData"
        :effectScatterTotal="17"
        :permitResize="false"
      ></map-province>
    </el-card>
  </div>
</template>

<script>
import jsonData from '@/assets/data/shandong.map.json'
import MapProvince from '@/components/map-province.vue'
import '@/mock/Member'
import http from '@/plugins/http'
export default {
  name: 'member-stat-now',
  components: {
    MapProvince
  },
  data () {
    return {
      chartCardClass: 'normal',
      jsonData: jsonData,
      cityData: [],
      timer: null,
      interval: 5000
    }
  },
  methods: {
    toggleFullscreen: function () {
      if (this.chartCardClass === 'normal') {
        this.chartCardClass = 'fullscreen'
        document.getElementById('chartCard').style.paddingTop = `${(document.body.clientHeight - document.getElementById('memberStatNow').clientHeight) / 2}px`
        document.getElementById('chartCard').style.paddingLeft = `${(document.body.clientWidth - document.getElementById('memberStatNow').clientWidth) / 2}px`
      } else {
        document.getElementById('chartCard').style.paddingTop = 0
        document.getElementById('chartCard').style.paddingLeft = 0
        this.chartCardClass = 'normal'
      }
    },
    loadMine: function () {
      try { this.timer && clearInterval(this.timer) } catch (error) { }
      this.timer = setInterval(() => {
        http.send({ url: '/Member/getCityNow/backend' }).then((data) => {
          data.extra.length > 0 && (this.cityData = data.extra)
        })
      }, this.interval)
    }
  },
  activated: function () {
    this.jsonData.scatter['省外'] = [121.5, 35.7]
    this.loadMine()
  },
  deactivated: function () {
    try { this.timer && clearInterval(this.timer) } catch (error) { }
  },
  watch: {
    '$store.state.reloadPageTime': function () {
      this.loadMine()
    }
  }
}
</script>

<style scoped>
#memberStatNow {
  min-width: 660px;
}
.fullscreenButton {
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 888;
}
.normal {
  position: relative;
}
.fullscreen {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
</style>
