/**
 * 安卓版本在输入框获取焦点时页面定位让键盘不遮挡输入框
 */
if (/Android [4-6]/.test(navigator.appVersion)) {
  window.addEventListener('resize', e => {
    if (
      document.activeElement.tagName === 'INPUT' ||
      document.activeElement.tagName === 'TEXTAREA'
    ) {
      window.setTimeout(document.activeElement.scrollIntoViewIfNeeded)
    }
  })
}

/**
 * 页面点击时如果点击的不是输入框，同时有输入框正在获取焦点，让其失去焦点
 */
document.body.addEventListener('click', e => {
  if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    const focus = document.querySelector('input:focus')
    focus && focus.blur()
  }
})
