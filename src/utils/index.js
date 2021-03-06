import cityList from '@/const/citylist.json'
import cnCityList from '@/const/citylist_CN.json'

// *empty Object KeyValue
export function emptyObj(...obj) {
  obj.forEach(item => {
    Object.keys(item).forEach(key => {
      item[key] = ''
    })
  })
}

// *select text
export function selectText(element) {
  let text = document.getElementById(element)
  if (document.body.createTextRange) {
    let range = document.body.createTextRange()
    range.moveToElementText(text)
    range.select()
  } else if (window.getSelection) {
    let selection = window.getSelection()
    let range = document.createRange()
    range.selectNodeContents(text)
    selection.removeAllRanges()
    selection.addRange(range)
    /* if(selection.setBaseAndExtent){
          selection.setBaseAndExtent(text, 0, text, 1);
      } */
  } else {
    alert('none')
  }
}

// *cookie
let caution = false
export function setCookie(name, value, expires, path, domain, secure) {
  let curCookie =
    name +
    '=' +
    escape(value) +
    (expires ? ';expires=' + expires.toGMTString() : '') +
    (path ? '; path=' + path : '') +
    (domain ? '; domain=' + domain : '') +
    (secure ? ';secure' : '')
  if (!caution || (name + '=' + escape(value)).length <= 4000) {
    document.cookie = curCookie
  } else if (confirm('Cookie exceeds 4KB and will be cut!')) {
    document.cookie = curCookie
  }
}

export function getCookie(name) {
  let prefix = name + '='
  let cookieStartIndex = document.cookie.indexOf(prefix)
  if (cookieStartIndex === -1) {
    return null
  }
  let cookieEndIndex = document.cookie.indexOf(
    ';',
    cookieStartIndex + prefix.length
  )
  if (cookieEndIndex === -1) {
    cookieEndIndex = document.cookie.length
  }
  return unescape(
    document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex)
  )
}

export function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie =
      name +
      '=' +
      (path ? '; path=' + path : '') +
      (domain ? '; domain=' + domain : '') +
      '; expires=Thu, 01-Jan-70 00:00:01 GMT'
  }
}

export function fixDate(date) {
  let base = new Date(0)
  let skew = base.getTime()
  if (skew > 0) {
    date.setTime(date.getTime() - skew)
  }
}

export function secToTime(timeStr) {
  const time = new Date(timeStr * 1000)
  let hr = '' + time.getHours()
  let mins = '' + time.getMinutes()
  return `${hr.padStart(2, '0')}:${mins.padStart(2, '0')}`
}

export function time2UTC(timeStamp) {
  return new Date(timeStamp).toUTCString().replace('GMT', '(UTC)')
}

export function time2UTC2(timeStamp) {
  let dateObj = new Date(timeStamp)
  let utcHr = dateObj.getUTCHours()
  let utcMin = dateObj.getUTCMinutes()
  let utcSec = dateObj.getUTCSeconds()
  return `${(utcHr + '').padStart(2, '0')}:${(utcMin + '').padStart(2, '0')}:${(
    utcSec + ''
  ).padStart(2, '0')} (UTC)`
}

export function queryStringify(obj) {
  const keys = Object.keys(obj)
  let str = ''
  keys.forEach(k => {
    if (obj[k]) {
      str += `&${k}=${obj[k]}`
    }
  })
  return str.slice(1)
}

export function citySearch(code) {
  const allCities = cityList.filter(
    collection => collection['k'] !== '热门城市'
  )
  const cnAllCities = cnCityList.filter(
    collection => collection['k'] !== '热门城市'
  )

  let intArr = []
  let cnArr = []
  for (let item of allCities) {
    intArr = [...intArr, ...item['n']]
  }

  for (let item of cnAllCities) {
    cnArr = [...cnArr, ...item['n']]
  }

  return [...intArr, ...cnArr].filter(
    cityObj => code.toUpperCase() === cityObj['c']
  )
}
