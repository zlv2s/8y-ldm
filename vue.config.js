module.exports = {
  devServer: {
    proxy: {
        '/tj': {
            target: 'https://openapi.baidu.com/rest/2.0/tongji/report/getData',
            changOrigin: true,
            pathRewrite: {
              '^/tj': '/'
            }
        }
    }
  }
}

// https://openapi.baidu.com/rest/2.0/tongji/report/getData?access_token=21.1c4f022f05c6c4248922f6ba2ee54eb2.2592000.1579534203.940600240-18081442&site_id=14261771&method=overview/getCommonTrackRpt&start_date=20191220&end_date=20191221