// const fs = require('fs')
// const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pkg = require('../../package.json')

class JwDevtoolPlugin {
  apply (compiler) {
    // console.log(998, process.env.PLUGIN_ENV)
    // console.log(compiler.options.plugins)
    // 插件开发环境组件代码不进行复制
    const componentPath = process.env.PLUGIN_ENV === 'development' ? '../package/jw-devtool' : 'node_modules/' + pkg.name + '/package/jw-devtool'
    compiler.options.plugins.push(
      new CopyWebpackPlugin([
        {
          from: componentPath,
          to: 'wxcomponents/jw-devtool',
          ignore: ['*.vue', '*.md']
        }
      ])
    )

    if (compiler.hooks) {
      // webpack4.x
      compiler.hooks.entryOption.tap({ name: 'JW_DEVTOOL_PLUGIN' }, this.addDevtoolsSource.bind(this))
      /* compiler.hooks.afterPlugins.tap({ name: 'ABC' }, function (options) {
        console.log(options)
        // console.log(param)
      }) */
    } else {
      // ${webpack version} < 4
      compiler.plugin('entry-option', this.addDevtoolsSource.bind(this))
    }
  }

  addDevtoolsSource (context, entry) {
    let sourcePath = pkg.name + '/source/plugin/jw-proxy.js'
    if (process.env.PLUGIN_ENV === 'development') {
      sourcePath = '../source/plugin/jw-proxy.js'
    }
    const _entry = entry
    entry = function () {
      const configEntry = _entry()
      configEntry['common/main'] = [sourcePath, configEntry['common/main']]
      return configEntry
    }
    entry()
  }
}

module.exports = JwDevtoolPlugin
