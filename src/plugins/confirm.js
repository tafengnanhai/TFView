import Vue from 'vue'

export default {
  show: (
    message,
    title = '提示',
    options = {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ) => {
    return new Promise(resolve => {
      Vue.prototype
        .$confirm(message, title, options)
        .then(() => {
          resolve()
        })
        .catch(() => {})
    })
  }
}
