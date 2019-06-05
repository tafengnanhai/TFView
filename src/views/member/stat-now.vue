<template>
  <div id="memberStatNow">
    <el-card class="chartCard">
      <map-province
        :jsonData="jsonData"
        :cityData="cityData"
        :effectScatterTotal="17"
        :permitResize="true"
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
  name: 'member-stat-city',
  components: {
    MapProvince
  },
  data () {
    return {
      jsonData: jsonData,
      cityData: [],
      timer: null,
      interval: 1000
    }
  },
  methods: {
    loadMine: function () {
      try { clearInterval(this.timer) } catch (error) { }
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
    try { clearInterval(this.timer) } catch (error) { }
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
  min-width: 600px;
}
.chartCard {
  margin-bottom: 20px;
}
</style>
