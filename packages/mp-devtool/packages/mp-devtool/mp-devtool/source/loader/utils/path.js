const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')
let uniPagesList

function initPagesMap (srcPath) {
  if (uniPagesList) return

  const uniPagesJSON = JSON.parse(fs.readFileSync(path.join(srcPath, 'pages.json'), 'utf-8'))
  uniPagesList = uniPagesJSON.pages
  uniPagesList = uniPagesJSON.subPackages.reduce((subPages, item)=>{
    const root = item.root
    const subList = item.pages.map(item => {
      const { path, ...restConfig } = item
      return {
        path: `${root}/${path}`,
        ...restConfig
      }
    })
    
    return subPages.concat(subList)
  }, uniPagesList)
}

function pagePathTest (context, resourcePath) {
  const options = loaderUtils.getOptions(context) || {}
  const rootPath = options.context || context.rootContext || (context.options && context.options.context)
  const srcPath = path.join(rootPath, '/src')

  initPagesMap(rootPath, srcPath)

  const absoluteResourcePath = loaderUtils.stringifyRequest('', resourcePath).replace(/"/g, '') // 将文件路径分隔符转义(兼容win)
  const absoluteSrcPath = loaderUtils.stringifyRequest('', srcPath).replace(/"/g, '') // 将文件路径分隔符转义(兼容win)

  const uniPagePath = absoluteResourcePath.replace(absoluteSrcPath, '').replace(/.vue$/, '')

  let isPage = false // 当前文件并非定义使用的页面path
  uniPagesList.some(item => {
    if (uniPagePath.includes(item.path)) {
      // eslint-disable-next-line no-return-assign
      return isPage = true
    }
    return false
  })
  return isPage
}

module.exports = {
  pagePathTest
}
