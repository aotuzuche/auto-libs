const dateFormat: (date: Date, fmt: string) => string = (date, fmt) => {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  let format = fmt
  if (/(y+)/.test(fmt)) {
    format = fmt.replace(
      RegExp.$1,
      String(date.getFullYear()).substr(4 - RegExp.$1.length)
    )
  }
  if (/(wk)/.test(fmt)) {
    const wks = '日一二三四五六'.split('')
    format = fmt.replace(RegExp.$1, wks[date.getDay()])
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? (o as any)[k]
          : `00${(o as any)[k]}`.substr(String((o as any)[k]).length)
      )
    }
  }
  return format
}

// 时间差，单位为小时
const offsetHours = (date1: Date, date2: Date): number => {
  const NUM = 3600000
  return Math.ceil((date2.valueOf() - date1.valueOf()) / NUM)
}

// 将时间差转为文字方式
const offsetDays = (date1: Date, date2: Date): string => {
  const DAYHOURS = 24
  const offset = Math.abs(offsetHours(date1, date2))
  if (offset === 0) {
    return ''
  }
  if (offset < DAYHOURS) {
    return `${offset}小时`
  }
  if (offset % DAYHOURS === 0) {
    return `${offset / DAYHOURS}天`
  }
  return `${Math.floor(offset / DAYHOURS)}天 ${offset % DAYHOURS}小时`
}

// 将字符串20190101093000 转换为时间格式
const stringToDate = (val: string): Date => {
  const LEN = 12
  if (/^\d+$/.test(val) && val.length >= LEN) {
    let v: any[] = val
      .replace(/(^\d{4}|\d{2})/gi, res => res + ',')
      .split(',', 6)
    v[1] = Number(v[1]) - 1
    return new Date(v[0], v[1], v[2], v[3], v[4], v[5])
  }
  return new Date()
}

export { offsetHours, offsetDays, stringToDate, dateFormat }
