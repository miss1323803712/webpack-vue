// 防抖函数
export function debounce(fn, delay) {
  let timer = null
  return function() {
    const context = this
    const arg = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(context, arg)
    }, delay)
  }
}

export function throttle(fn, delay) {
  let timer = null
  return function() {
    const context = this
    const args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        clearTimeout(timer)
        timer = null
      }, delay)
    }
  }
}
