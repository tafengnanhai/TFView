import Vue from 'vue'

export default {
  success: function (message, duration = 1000) {
    return Vue.prototype.$message({
      message: message,
      type: 'success',
      duration: duration
    })
  },
  error: function (message, duration = 1500) {
    return Vue.prototype.$message({
      message: message,
      type: 'error',
      duration: duration
    })
  }
}
