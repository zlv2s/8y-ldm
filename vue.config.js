module.exports = {
  devServer: {
    proxy: {
      '/getId': {
        target: 'https://www.flightradar24.com/v1/search/web/find',
        changOrigin: true,
        pathRewrite: {
          '^/getId': ''
        }
      },
      '/getFltDetail': {
        target: 'https://data-live.flightradar24.com/clickhandler/',
        changOrigin: true,
        pathRewrite: {
          '^/getFltDetail': ''
        }
      }
    }
  }
}
