import { createApp } from 'vue'
import App from './app.vue'
import './style.scss'
import { Button, Col, Row, Toast } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App) // 通过 createApp 初始化 app
app.use(Button).use(Col).use(Row).use(Toast)
app.mount('#app')
