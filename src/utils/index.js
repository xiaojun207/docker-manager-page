import i18n from '@/i18n'

export function WsHost() {
  return (location.protocol === 'http:' ? 'ws:' : 'wss:') + location.host
}

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (time === 0) {
    return '-'
  }
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return i18n.t('刚刚')
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + i18n.t('分钟前')
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + i18n.t('小时前')
  } else if (diff < 3600 * 24 * 2) {
    return i18n.t('1天前')
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function formatDate(d) {
  if (!d) {
    return ''
  }
  d = d > 1022367529238 ? d : d * 1000

  const date = new Date(d)
  const YY = date.getFullYear() + '-'
  const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  const hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  const mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  const ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) + '.'
  let sss = ''
  if (date.getMilliseconds() < 10) {
    sss = '00' + date.getMilliseconds()
  } else if (date.getMilliseconds() < 100) {
    sss = '0' + date.getMilliseconds()
  } else {
    sss = date.getMilliseconds()
  }
  return YY + MM + DD + ' ' + hh + mm + ss + sss
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

export function VersionCompare(ver1, ver2) {
  const arr1 = ver1.split('.')
  const arr2 = ver2.split('.')
  for (let i = 0; i < arr1.length; i++) {
    const v1 = parseInt(arr1[i])
    const v2 = parseInt(arr2[i])
    if (v1 > v2) {
      return 1
    } else if (v1 < v2) {
      return -1
    } else {
      //
    }
  }
  return 0
}
