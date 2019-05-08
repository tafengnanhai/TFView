module.exports = {
  productionSourceMap: true, // production false
  devServer: {
    proxy: 'http://192.168.64.88' // 开发环境中解决跨域问题
    /* {
      "/get.php": {
      target: "http://192.168.64.88",
      changeOrigin: true,
      pathRewrite: {
        "^/get.php": "/get.php"
      }
    } */
  }
}
