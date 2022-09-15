const compiler = require('@vue/compiler-sfc')
const path = require('path')
const { pagePathTest } = require('./path')

function inject (source, injectTagName) {
  const injectTag = `<${injectTagName}></${injectTagName}>`

  const { descriptor } = compiler.parse(source)
  if (descriptor.template) {
    // 匹配闭合标签 '<template>', '<view class="content">', '<div>', '<div class="f-fz-36 f-blod f-text-center" @click="$toast(title)">', '<u-button type="primary"\n      class="f-mt-40"\n      @click="foo"\n      text="确定">'
    const matchTags = source.match(/<[^\\/>]+>/g)
    const matchTagsLen = matchTags.length
    // 找到第二外层的闭合标签进行替换 '<view class="content">' => '<view class="content"><jwtool></jwtool>'
    // 将自定义的组件标签插入
    if (matchTagsLen > 1) {
      const closeTagStr = matchTags[1]
      source = source.replace(closeTagStr, `${closeTagStr}${injectTag}`)
    } else if (matchTagsLen === 1) { // 该情况不应存在
      const closeTagStr = matchTags[0]
      source = source.replace(closeTagStr, `${closeTagStr}${injectTag}`)
    }
  }
  return source
}

function injectComponents ({ source, resourcePath, injectTagName = 'jw-tool', uniPagesList, context }) {
  // 插入组件调用
  const isSFC = path.extname(resourcePath).includes('vue')
  const pathMath = pagePathTest(context, resourcePath, uniPagesList)
  if (isSFC && pathMath) {
    source = inject(source, injectTagName)
  }
  return source
}

module.exports = {
  injectComponents
}
