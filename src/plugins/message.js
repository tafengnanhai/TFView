import Vue from 'vue'
import ElementUI from 'element-ui'

Vue.use(ElementUI)

export default {
  success: function (message, duration = 1000) {
    return Vue.prototype.$message({ message: message, type: 'success', duration: duration })
  },
  error: function (message, duration = 1000) {
    return Vue.prototype.$message({ message: message, type: 'error', duration: duration })
  }
}
