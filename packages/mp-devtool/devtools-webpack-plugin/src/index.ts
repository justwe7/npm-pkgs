import { createApp } from 'vue'
import App from './app.vue'
import './style.scss'
import { Button, Col, Row, Toast } from 'vant'
import 'vant/lib/index.css'

// const app = createApp(App) // 通过 createApp 初始化 app
// console.log(app)
// app.mount('#app')

class CreatePanel {
  app: any
  constructor (options: {}) {
    this.app = createApp(App)
    this.app.provide('$opt', options)
    this.app.use(Button).use(Col).use(Row).use(Toast)
    this.init()
  }

  init (): void {
    const vNodeDom = document.createElement('div')
    document.body.appendChild(vNodeDom)
    this.app.mount(vNodeDom)
  }
}

// 单例
const DevtoolModal = (function () {
  let ToolInstance: CreatePanel | null = null
  return function (options = {}) {
    if (ToolInstance == null) {
      ToolInstance = new CreatePanel(options)
    }
    return ToolInstance
  }
})()

if (process.env.NODE_ENV !== 'production') {
  DevtoolModal({
    vconsole: 1
  })
}

export default DevtoolModal
