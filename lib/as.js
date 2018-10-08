import qs from 'qs'

async function AS(data = {}) {
  if (typeof data.eventContent === 'object') {
    let params = []
    Object.entries(data.eventContent).forEach(([key, value]) => {
      params.push(`${key}=${value}`)
    })
    data.eventContent = `{${params.join(',')}}`
  }

  // 防止 GC 掉用变量存储
  const random = 'img_' + Math.random()
  const img = new Image()
  window[random] = img
  img.onload = img.onerror = () => {
    window[random] = null
  }

  const currentOrigin = window.location.origin
  // 可以利用 qs 来格式化参数
  img.src = currentOrigin + '/log.gif?' + qs.stringify(data)
}

export default AS
