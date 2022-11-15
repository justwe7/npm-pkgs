// const fs = require('fs')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const RawSource = require('webpack-sources').RawSource;
const pkg = require('../../package.json')

class JwDevtoolPlugin {
  apply (compiler) {
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
      // entry新增js劫持
      compiler.hooks.entryOption.tap({ name: 'JW_DEVTOOL_PLUGIN' }, this.addDevtoolsSource.bind(this))
      // 通过loader修改json，不采用插件方式了
      /* compiler.hooks.emit.tapAsync({ name: 'JW_DEVTOOL_PLUGIN_GENPAGE' }, function (compilation, callback) {
        const outputPath = path.join(
          compilation.options.output.path,
          'new-pages.json'
        )
        const outputRelativePath = path.relative(
            compilation.options.output.path,
            outputPath
        );
        // 将内容挂载到assets上面去 使用 RawSource 将 buffer 转为 source
        compilation.assets[outputRelativePath] = new RawSource({ a: 1 });
        callback();
      }) */
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
