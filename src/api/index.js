import axios from 'axios'

axios.defaults.baseURL = 'https://nodespider-api.herokuapp.com'
axios.defaults.timeout = 10000

export function getFltLabel({ fnum }) {
  return new Promise((resolve, reject) => {
    axios({
      url: `/api/flt/getFltId/${fnum}`
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function getFltStatus({ id }) {
  return new Promise((resolve, reject) => {
    axios({
      url: `/api/flt/getFltDetail/${id}`
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function sendEmail({ emailAdd, subject, content }) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'http://localhost:8081/email',
      method: 'post',
      data: {
        emailAdd,
        subject,
        content
      }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
