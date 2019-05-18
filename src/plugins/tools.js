export default {
  getParam: (name, url) => {
    let paramUrl = url.substr(url.indexOf('?') + 1)
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let result = paramUrl.match(reg)
    return result === null ? null : decodeURI(result[2])
  }
}
