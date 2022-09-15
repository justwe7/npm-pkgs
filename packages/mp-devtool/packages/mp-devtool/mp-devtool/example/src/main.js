import Vue from 'vue'
import uView from 'uview-ui'
import App from './App'
import { initDataProxyStorage } from './lib/utils' // 定义全局的一些方法 挂载至this、uni
import * as GlobalUtils from './lib/global' // 定义全局的一些方法 挂载至this、uni

initDataProxyStorage('$globalState')
Vue.use(uView)

uni.$u.setConfig({
  // 修改$u.config对象的属性
  config: {
    // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
    unit: 'rpx'
  },
  // 修改$u.props对象的属性
  props: {
    // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
    radio: {
      // size: 15
    }
    // 其他组件属性配置
    // ......
  }
})

/*
  原型链方法:
  this.$toast(arg)
  uni.$toast(arg)
*/
Object.assign(uni, GlobalUtils)
Object.assign(Vue.prototype, GlobalUtils)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
