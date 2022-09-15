/* eslint-disable */
const path = require("path");
const StyleLintPlugin = require('stylelint-webpack-plugin')
// const { loader } = require('./source');
// const { JwDevtoolPlugin } = require('@justwe7/mp-devtool-plugin');
const isProd = process.env.NODE_ENV === 'production'
// console.log(aaa)
// 获取绝对路径
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 生产环境禁用eslint
  lintOnSave: !isProd,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  transpileDependencies: ['uview-ui'],
  configureWebpack: config => {
    if (!isProd) {
      config.plugins = [
        ...config.plugins,
        new StyleLintPlugin({
          cache: true,
          fix: true,
          files: ['src/**/*.s?(c)ss', 'src/**/*.vue']
        })
      ]
    }
  },

  chainWebpack: config => {
    // config.resolve.alias
    //   .set('@api', resolve('src/api'))
    //   .set('@tpl',resolve('src/components'))
    //   .set('@static',resolve('src/static'))
    //   .set('@utils',resolve('src/common/js/utils.js'))

    config.module
        .rule('mp-devtool')
        .test(/\.(vue)|(js)$/)
        .pre()
        .exclude.add(/node_modules/)
        .end()
        .use('@justwe7/mp-devtool-plugin')
        .loader(resolve('../source/loader'))
        .options({
          abc: 999
        })
    config.plugin('@justwe7/mp-devtool-plugin').use(resolve('../source/plugin'), [{ version: '1.0.0' }]);

    /* config.module
        .rule('mp-devtool')
        .test(/.vue$/)
        .use('@justwe7/mp-devtool-plugin')
        .loader('@justwe7/mp-devtool-plugin')
        .options({})
    config.plugin('@justwe7/mp-devtool-plugin').use(JwDevtoolPlugin, [{ version: '1.0.0' }]); */

    if (!isProd) { // 生产环境打包禁用fix
      config.module
      .rule('eslint')
      .use('eslint-loader')
        .loader('eslint-loader')
        .tap(options => {
          options.fix = true // 保存自动修复
          return options
        })
    }
  },
  css: {
    // loaderOptions: {
    //   less: {
    //     globalVars: {
    //       hack: 'true; @import "~@/styles/variables.less";@import "~@/styles/functions.less";'
    //     }
    //   }
    // }
  },


  // pluginOptions: { // 第三方插件配置
  //   'style-resources-loader': {
  //     preProcessor: 'less',
  //     patterns: [resolve('./src/styles/variables.less'), resolve('./src/styles/functions.less')]
  //   }
  // }
};
