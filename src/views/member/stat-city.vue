<template>
  <div id="memberStatCity">
    <el-card class="chartCard">
      <map-province
        :jsonData="jsonData"
        :cityData="cityData"
        :effectScatterTotal="3"
        :permitResize="true"
        v-if="showMap"
      ></map-province>
    </el-card>
    <el-card class="chartCard">
      <ul>
        <li v-for="(item, index) in filterCityData" :key="item.name">
          <span v-if="index<9">[0{{index+1}}] {{item.name}}：{{item.value}}</span>
          <span v-if="index>=9">[{{index+1}}] {{item.name}}：{{item.value}}</span>
        </li>
      </ul>
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
      showMap: false
    }
  },
  methods: {
    loadMine: function () {
      http.send({ url: '/Member/getCityStat' }).then((data) => {
        this.cityData = data.extra
        this.showMap = true
      })
    }
  },
  mounted: function () {
    this.jsonData.scatter['省外'] = [121.5, 35.7]
    this.loadMine()
  },
  computed: {
    filterCityData: function () {
      return this.cityData.length > 0 && this.cityData.filter(item => {
        return item.name !== '省外'
      })
    }
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
  min-width: 600px;
}
.chartCard {
  margin-bottom: 20px;
}
.chartCard li {
  width: 150px;
  height: 20px;
  line-height: 20px;
  float: left;
}
</style>
