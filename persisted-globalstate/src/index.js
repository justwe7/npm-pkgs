import a from './lib/utils.js'
console.log(12)
console.log(a)
if (process.env.NODE_ENV !== 'production') {
  require('../example/index.html')
}
class GlobalState {
  constructor () {
    return 112
  }
  get a() {
    console.log(111)
  }
}

window.a = new GlobalState()
console.log(window.a)

function foo (globalKey) {
  if (uni[globalKey] === undefined) {
    uni[globalKey] = {}
  }
  const baseData = {
    // 方法未 object 类型下的key，修改时需要使用赋值的方式: uni.$globalState.loginInfo = Object.assign(uni.$globalState.loginInfo, { name: 'Messi' })
    loginInfo: {
      name: 'justwe7',
      age: 18
    },
    token: 12345
  }

  const GOLBAL_STATE = uni[globalKey]

  const defObj = {}
  for (const [key, defVal] of Object.entries(baseData)) {
    defObj[key] = (GOLBAL_STATE && GOLBAL_STATE[key]) || uni.getStorageSync(`__stay_state__${key}`) || defVal
  }

  try {
    uni[globalKey] = new Proxy(defObj, {
      // https://github.com/GoogleChrome/proxy-polyfill/blob/master/proxy.min.js
      get: function (target, propKey, receiver) {
        const rtVal = Reflect.get(target, propKey, receiver)
        return isEmpty(rtVal) ? uni.getStorageSync(`__stay_state__${propKey}`) : rtVal
      },
      set: function (target, propKey, value, receiver) {
        uni.setStorage({
          key: `__stay_state__${propKey}`,
          data: value
        })
        return Reflect.set(target, propKey, value, receiver)
      }
    })
  } catch (error) {
    console.warn('当前设备不支持proxy')
    const valueReal = (() => {
      const o = Object.assign({}, baseData, defObj)
      console.log(o, defObj)
      return (key, value, type = 'get') => {
        if (type === 'get') {
          const rtVal = o[key]
          return isEmpty(rtVal) ? uni.getStorageSync(`__stay_state__${key}`) : rtVal
        } else {
          o[key] = value
          uni.setStorage({
            key: `__stay_state__${key}`,
            data: value
          })
        }
      }
    })()

    const proxyKeys = Object.assign({}, uni[globalKey], baseData)

    Object.keys(proxyKeys).forEach((key) => {
      console.log(key)
      Object.defineProperty(uni[globalKey], key, {
        enumerable: true,
        configurable: false,
        get () {
          return valueReal(key)
        },
        set (val) {
          valueReal(key, val, 'set')
        }
      })
    })
  }
}
foo()
export default 1234