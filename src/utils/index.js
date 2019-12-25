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

// *monthMap
export const dateMap = {
  '01': 'JAN',
  '02': 'FEB',
  '03': 'MAR',
  '04': 'APR',
  '05': 'MAY',
  '06': 'JUN',
  '07': 'JUL',
  '08': 'AUG',
  '09': 'SEP',
  '10': 'OCT',
  '11': 'NOV',
  '12': 'DEC'
}

export const icon = {
  flt: '<i class="iconfont icon-flight"></i>',
  pax: '<i class="iconfont icon-icon-lvke-mian"></i>',
  bag: '<i class="iconfont icon-hangli"></i>',
  cargo: '<i class="iconfont icon-huowu"></i>',
  timeline: '<i class="iconfont icon-time_line"></i>'
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
