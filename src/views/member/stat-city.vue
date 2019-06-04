<template>
  <div id="memberStatCity">
    <el-card class="chartCard">
      <map-province
        :jsonData="jsonData"
        :cityData="cityData"
        :effectScatterTotal="3"
        v-if="cityData.length > 0"
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
      cityData: []
    }
  },
  methods: {
    loadMine: function () {
      http.send({ url: '/Member/getCityStat' }).then((data) => {
        this.cityData = data.extra
      })
    }
  },
  mounted: function () {
    this.jsonData.scatter['省外'] = [121.5, 35.7]
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
#memberStatCity {
  min-width: 900px;
}
.chartCard {
  margin-bottom: 20px;
}
</style>
