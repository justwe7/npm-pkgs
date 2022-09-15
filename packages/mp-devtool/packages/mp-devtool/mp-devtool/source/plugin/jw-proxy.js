// console.log('jw-devtool')
// console.log(wx.request)
// proxyRequest()

class Evbus {
  constructor () {
    this.callbacks = {}
  }

  $on (name, fn) {
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(fn)
  }

  $emit (name, ...args) {
    if (this.callbacks[name]) {
      // eslint-disable-next-line standard/no-callback-literal
      this.callbacks[name].forEach(cb => cb(...args))
    }
  }

  $off (name, cb) {
    const targetListen = this.callbacks[name]
    if (!targetListen) {
      return false
    }
    if (!cb) {
      targetListen && (targetListen.length = 0)
    } else {
      targetListen.forEach((el, idx) => {
        if (el === cb) { // 两个方法应该是同一个引用地址
          targetListen.splice(idx, 1) // 删除订阅者的回调函数
        }
      })
    }
  }
}

class RequestProxy {
  constructor () {
    this.records = []
    wx.jwBus = new Evbus()
    wx.jwBus.$on('clearRecord', () => {
      this.records = []
        wx.jwBus.$emit('request')
    })
    this.initProxy()
  }

  hookfun (fn, options) {
    const _this = this
    return function (xhrInfo) {
      // console.log('急急急', xhrInfo, options)
      const requestItem = _this.transData(xhrInfo, options)
      _this.records.push(requestItem)
      // console.log('reqItem:', requestItem)
      wx.jwBus.$emit('request', requestItem)
      fn(xhrInfo)
    }
  }

  transData (xhrInfo, options) {
    const result = {}
    result.general = {
      statusCode: xhrInfo.statusCode,
      method: options.method,
      url: options.url
    }
    result.headers = xhrInfo.header
    result.parameters = options.data
    result.response = xhrInfo.data
    return result
  }

  initProxy () {
    wx._request = wx.request
    const _this = this
    console.log('---wx.request已劫持---')
    Object.defineProperty(wx, 'jwRequestRecords', {
      enumerable: true,
      configurable: false,
      get: () => {
        return this.records
      }
      // set (val) {
      //   return dealLoginInfo({
      //     [key]: val
      //   })
      // }
    })
    // 劫持原始request方法
    Object.defineProperty(wx, 'request', {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function (...args) {
        const options = args[0]
        const actOptions = {}
        for (const key in options) {
          if (Object.hasOwnProperty.call(options, key)) {
            const value = options[key]
            if (typeof value === 'function') {
              // eslint-disable-next-line no-useless-call
              actOptions[key] = _this.hookfun.call(_this, value, options)
            } else {
              actOptions[key] = value
            }
          }
        }
        return wx._request.call(this, actOptions)
      }
    })
  }
}
// eslint-disable-next-line no-new
new RequestProxy()

// function hookfun (fn, options) {
//   return function (params) {
//     console.log('急急急', params, options)
//     // const msg = {
//     //   MsgType: 'xhr',
//     //   ...options,
//     //   ['_' + fn.name]: params
//     // }
//     // worker.postMessage(msg)
//     fn(params)
//   }
// }

// export async function proxyRequest (options) {
//   // let proxyFlag = false
//   // if (options.query.debug) {
//   //   proxyFlag = true
//   // } else {
//   //   try {
//   //     const res = await wx.startWifi()
//   //     if (res.errCode === 0 || res.errMsg === 'startWifi:ok') {
//   //       const wifiInfo = await wx.getConnectedWifi()
//   //       if (wifiInfo.errCode === 0 || wifiInfo.errMsg === 'getConnectedWifi:ok') {
//   //         if (process.env.VUE_APP_DEBUGSSID.includes(wifiInfo.wifi.SSID)) {
//   //           proxyFlag = true
//   //         }
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.log(error)
//   //   }
//   // }
//   // if (!proxyFlag) return

//   wx._request = wx.request
//   console.log('---开始打印xhr信息---')
//   // 劫持原始request方法
//   Object.defineProperty(wx, 'request', {
//     writable: true,
//     enumerable: true,
//     configurable: true,
//     value: function (...args) {
//       const options = args[0]
//       const actOptions = {}
//       for (const key in options) {
//         if (Object.hasOwnProperty.call(options, key)) {
//           const value = options[key]
//           if (typeof value === 'function') {
//             actOptions[key] = hookfun.call(this, value, options)
//           } else {
//             actOptions[key] = value
//           }
//         }
//       }
//       return wx._request.call(this, actOptions)
//     }
//   })
// }
