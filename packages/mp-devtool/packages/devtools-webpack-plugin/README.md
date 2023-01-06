# @justwe7/devtools-webpack-plugin

## Installation
```bash
npm i @justwe7/devtools-webpack-plugin
```

## Usage
Set your webpack config to:
```javascript
// webpack.config.js
const JwDevtoolsPlugin = require('@justwe7/devtools-webpack-plugin')
module.exports = {
  plugins: [
    new JwDevtoolsPlugin({
      vconsole: true // 是否默认开启vconsole(可选)
    })
  ]
}
```
