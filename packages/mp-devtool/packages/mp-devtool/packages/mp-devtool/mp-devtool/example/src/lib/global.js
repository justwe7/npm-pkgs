import http from '@/api/http'
import { promisify, isObj } from './utils'

// 给url添加查询字符串
export function $addQuery (url, params) {
  let separator = url.indexOf('?') !== -1 ? '&' : '?'
  const queryStringParameter = Object.entries(params).reduce((result, target, index) => {
    result += separator + target[0] + '=' + target[1]
    separator = '&'
    return result
  }, '')
  return url + queryStringParameter
}

export const $location = {
  async to (url, queryData) { // 页面跳转
    if (isObj(queryData)) {
      url = $addQuery(url, queryData)
    }
    try {
      return await promisify('navigateTo', { url })
    } catch (err) {
      console.log('页面栈溢出', err)
      promisify('redirectTo', { url })
    }
  },
  replace (url, queryData) { // 重定向
    if (isObj(queryData)) {
      url = $addQuery(url, queryData)
    }
    return promisify('navigateTo', { url })
  },
  back (options = 1) { // 页面回退
    if (isObj(options)) {
      return uni.navigateBack({ delta: options })
    }
    return uni.navigateBack(options)
  }
}

export function $toast (title, args) {
  uni.showToast({
    title,
    icon: 'none',
    ...args
  })
}

export const $loading = {
  show (title, ...args) {
    uni.showLoading({
      title,
      ...args
    })
  },
  hide: wx.hideLoading
}

export function $getCurrentPage () {
  try {
    const pages = getCurrentPages()
    return pages[pages.length - 1]
  } catch (error) {
    return {}
  }
}

export function $get (url, data = {}, config = {}) {
  config.method = 'GET'
  return http(url, data, config)
}

export function $post (url, data = {}, config = {}) {
  config.method = 'POST'
  return http(url, data, config)
}
