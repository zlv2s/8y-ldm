import axios from 'axios'

// export function baiduTj() {
//   axios({
//     method: 'post',
//     url: '/tj',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: {
//       access_token: '21.1c4f022f05c6c4248922f6ba2ee54eb2.2592000.1579534203.940600240-18081442',
//       site_id: '14261771',
//       method: 'overview/getCommonTrackRpt',
//       start_date: '20191220',
//       end_date: '20191221'
//     }
//   }).then(res => {
//     // console.log(res)
//     // todo
//   })
// }

// const url1 = 'https://www.flightradar24.com/v1/search/web/find?query=aav824&limit=10'

// const url2 = 'https://data-live.flightradar24.com/clickhandler/?version=1.5&flight=23591336'
// https://static.variflight.com/assets/js/airportlist.js

// export function getFltStatus({ anum, fnum }) {
//   return new Promise((resolve, reject) => {
//     axios({
//       url: 'https://adsbapi.variflight.com/adsb/index/flightdetail',
//       params: {
//         lang: 'zh_CN',
//         anum,
//         fnum
//       }
//     })
//       .then(res => {
//         resolve(res.data)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

export function getFltLabel({ fnum }) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/getId',
      params: {
        query: fnum,
        limit: 10
      }
    })
      .then(res => {
        resolve(res.data.results)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function getFltStatus({ id }) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/getFltDetail',
      params: {
        version: 1.5,
        flight: id
      }
    })
      .then(res => {
        // console.log(res.data)
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
