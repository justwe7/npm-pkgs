import JwDevTools from './dist/main.min.js'
let config = {}
try {
  config = require('./config.json')
} catch (error) {

}

!window.JwDevTools && (window.JwDevTools = new JwDevTools(config))
