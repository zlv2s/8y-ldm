import axios from 'axios'
import authHeader from '@/service/authHeader'
import fetchJsonp from 'fetch-jsonp'
import { queryStringify } from '@/utils'

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
      url: 'https://end-8y.herokuapp.com/email/auth',
      method: 'post',
      headers: authHeader(),
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

export function jsonp(query) {
  const queryObj = {
    lang: 'zh',
    q: query,
    sa: 'true',
    ver: 1,
    _: Date.now()
  }

  // www.qunar.com/suggest/livesearch2.jsp?lang=zh&q=maa&sa=true&ver=1&callback=jQuery17206294614150106819_1579099716851&_=1579100163849

  const url = `https://www.qunar.com/suggest/livesearch2.jsp?${queryStringify(
    queryObj
  )}`
  return new Promise((resolve, reject) => {
    fetchJsonp(url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
