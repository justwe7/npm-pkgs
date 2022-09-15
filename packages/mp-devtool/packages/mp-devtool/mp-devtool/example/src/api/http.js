const SUCCESS_CODE = 0
// const ERROR_CODE = -1
const REDO_CODE = -2
const baseUrl = 'https://api-puce-rho.vercel.app'

function request (url, data, httpConfig) {
  const domain = httpConfig.baseUrl || baseUrl
  const { method = 'POST', header = {}, toast = true } = httpConfig

  return new Promise((resolve, reject) => {
    uni.request({
      url: `${domain}${url}`,
      method,
      header: {
        'content-type': 'application/json',
        authentication: uni.$globalState?.token || '',
        ...header
      },
      data,
      success (res) {
        if (res.statusCode !== 200) {
          return reject(res)
        }
        if (1 || res.data.code === SUCCESS_CODE) {
          resolve(res.data)
        } else {
          toast && uni.$toast(res.data.message || '请求出错~')
          reject(res.data)
        }
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

/**
 * @param {*} url string
 * @param {*} data object
 * @param {*} config object
 * @returns config 配置接口的参数，包含 header, method, 或者自定义的一些属性(如异常toast)
 * @returns data 为接口请求的参数请求体 data
 */
export default async (url, data = {}, config = {}) => {
  try {
    return await request(url, data, config)
  } catch (err) {
    if (err.code === REDO_CODE) {
      return request(url, data, config)
    }
    /* if (err.code === 'login') {
      uni.navigateTo('/pages/login/index')
    } */
    return await Promise.reject(err)
  }
}
