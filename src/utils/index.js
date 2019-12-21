export function emptyObj(...obj) {
  obj.forEach(item => {
    Object.keys(item).forEach(key => {
      item[key] = ''
    })
  })
}

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