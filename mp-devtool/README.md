# 小程序devtool增强工具
解决小程序自带vconsole无法查看网络请求，storage等痛点。避免测试过程需要使用抓包工具或者在开发者工具进行。
![20220915_113250.gif](https://s2.loli.net/2022/09/15/JX9pO6ZotFbSs3k.gif)

## 安装
```bash
npm i @justwe7/mp-devtool-plugin -D
```

## 使用
### uniapp
1. 修改`src/pages.json`，新增全局自定义组件: `"jw-tool": "/wxcomponents/jw-devtool/index"`
```json
{
  "pages": [],
  "globalStyle": {
    "usingComponents": {
      "jw-tool": "/wxcomponents/jw-devtool/index"
    }
  }
}
```

2. vue.config.js:
```js
const { JwDevtoolPlugin } = require('@justwe7/mp-devtool-plugin');
module.exports = {
  chainWebpack: config => {
    // 禁止在生产环境注入!
    // if (process.env.NODE_ENV !== 'production') { // TODO 增加环境变量标识作为判断条件
    config.module
        .rule('mp-devtool-loader')
        .test(/\.vue$/)
        .use('@justwe7/mp-devtool-plugin')
        .loader('@justwe7/mp-devtool-plugin')
        .options({})

    config.plugin('mp-devtool-plugin').use(JwDevtoolPlugin)
    // }
  }
};
```

## 实现思路
1. 通过plugin注入新的entry，劫持network，与后续引入的组件进行数据通信
2. 通过loader，将每个页面template下插入自定义组件名称
3. 通过loader，将自定义组件定义到全局：pages.json->globalStyle->usingComponents （区分uniapp）
4. 上一步的组件定义需要复制组件源码（考虑平台，看是否需要插件处理。使用者自行处理是否更灵活或者需要接收参数进行配置）

## TODO
- [x] network查看
- [x] uniapp兼容
- [ ] 页面path支持小程序分包
- [ ] storage查看
- [ ] 支持小程序path携带指定参数跳转
- [ ] 原生小程序兼容

## 已知问题
- 开发过程中插件偶尔会实例化失败，原因暂未排查-重启项目即可