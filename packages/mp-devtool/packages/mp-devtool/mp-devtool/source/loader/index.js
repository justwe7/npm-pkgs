const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')
const { injectComponents } = require('./utils/template-inject')

module.exports = function (source) {
  //console.log(process.env)
  const options = loaderUtils.getOptions(this) || {}
  const resourcePath = this.resourcePath // 当前处理文件路径
  source = injectComponents({ source, resourcePath, uniPagesList, context: this })
  return source
}
