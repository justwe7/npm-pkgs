const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')
const { injectComponents } = require('./utils/template-inject')

module.exports = function (source) {
  const options = loaderUtils.getOptions(this) || {}
  const rootPath = options.context || this.rootContext || (this.options && this.options.context)
  const srcPath = path.join(rootPath, '/src')
  const uniPagesJSON = JSON.parse(fs.readFileSync(path.join(srcPath, 'pages.json'), 'utf-8'))
  const uniPagesList = uniPagesJSON.pages

  const resourcePath = this.resourcePath // 当前处理文件路径
  source = injectComponents({ source, resourcePath, uniPagesList, context: this })
  return source
}
