export default {
  getParam: (name, url) => {
    const paramUrl = url.substr(url.indexOf('?') + 1)
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const result = paramUrl.match(reg)
    return result === null ? null : unescape(decodeURI(result[2]))
  },
  getSection: (loc, url) => {
    const result = url.split('/')
    return result.length > loc ? result[loc] : null
  }
}
