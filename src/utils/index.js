export function emptyObj(...obj) {
  obj.forEach(item => {
    Object.keys(item).forEach(key => {
      item[key] = ''
    })
  })
}