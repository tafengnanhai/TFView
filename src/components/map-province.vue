<template>
  <div>
    <div id="main"></div>
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
export default {
  props: {
    jsonData: Object,
    geoCoordMap: Object,
    cityData: Array,
    effectScatterTotal: Number,
    permitResize: Boolean
  },
  name: 'map-province',
  mounted: function () {
    document.getElementById('main').style.height = `${document.body.clientHeight - 200}px`
    const myChart = echarts.init(document.getElementById('main'))
    myChart.showLoading()
    echarts.registerMap('province', this.jsonData)
    myChart.hideLoading()

    const cityData = this.cityData
    const geoCoordMap = this.jsonData.scatter
    const maxPinSize = 20
    const minPinSize = 2
    const effectScatterTotal = this.effectScatterTotal
    const permitResize = this.permitResize

    // 为了避免传过来的数据本身没有排序，这里重新计算一次
    let maxValue = 1
    let minValue = 1
    cityData.forEach((item) => {
      if (item.value > maxValue) {
        maxValue = item.value
      } else if (item.value < minValue) {
        minValue = item.value
      }
    })

    const convertData = data => {
      const res = []
      data.forEach(item => {
        const geoCoord = geoCoordMap[item.name]
        if (geoCoord) {
          res.push({
            name: item.name,
            value: geoCoord.concat(item.value)
          })
        }
      })
      return res
    }

    const option = {
      backgroundColor: 'transparent',
      title: {
        show: false,
        top: 0,
        text: '',
        subtext: '',
        x: 'center',
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          if (typeof params.value[2] === 'undefined') {
            return params.name + ' : ' + params.value
          } else {
            return params.name + ' : ' + params.value[2]
          }
        }
      },
      geo: {
        show: true,
        map: 'province',
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        roam: permitResize,
        itemStyle: {
          normal: {
            areaColor: '#5bb7d9',
            borderColor: '#eee',
            borderWidth: 2,
            shadowColor: 'rgba(63, 218, 255, 0.5)',
            shadowBlur: 30
          },
          emphasis: {
            areaColor: '#2b91b7'
          }
        }
      },
      series: [
        {
          name: 'light',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(cityData),
          symbolSize: function (val) {
            var a = (maxPinSize - minPinSize) / (maxValue - minValue)
            var b = minPinSize - a * minValue
            b = maxPinSize - a * minValue
            return a * val[2] + b
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: 'yellow'
            }
          }
        },
        {
          type: 'map',
          map: 'province',
          geoIndex: 0,
          aspectScale: 0.5,
          showLegendSymbol: false,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
              textStyle: {
                color: 'white'
              }
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: 'white'
            },
            emphasis: {
              areaColor: '#2b91b7'
            }
          },
          animation: false,
          data: cityData
        },
        {
          name: 'Top',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(
            cityData
              .sort(function (a, b) {
                return b.value - a.value
              })
              .slice(0, effectScatterTotal)
          ),
          symbolSize: function (val) {
            let a = (maxPinSize - minPinSize) / (maxValue - minValue)
            let b = minPinSize - a * minValue
            b = maxPinSize - a * minValue
            return a * val[2] + b
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#ffd079',
              shadowBlur: 10,
              shadowColor: '#ccc'
            }
          },
          zlevel: 1
        }
      ]
    }
    myChart.setOption(option)
  }
}
</script>

<style scoped>
#main {
  width: 100%;
  min-width: 600px;
  height: 300px;
  float: left;
}
</style>
