# npm发包仓库

- [@justwe7/stylelint-order-standard](./tree/main/stylelint-order-standard) - stylint-order规则
- [@justwe7/devtools-webpack-plugin](./tree/main/devtools-webpack-plugin) - H5页面调试工具集（webpack插件）
- [@justwe7/persistedstate](./tree/main/persistedstate) - 持久化全局变量

scss常用方法及样式留存

> 节省开发事件封装常用的scss样式库以便日常开发留存，后期调研是否可以npm方式使用的可行性

| 文件           | 平台           |
| -------------- | -------------- |
| pc-mixin.scss | PC(px)         |
| m-mixin.scss   | 移动端(rem/vw) |
| wx-mixin.scss  | 小程序(rpx)    |

> 简单的示例
```scss
div {
  @extend %centerblock;// 继承水平居中占位
  @include border-1px-b(#eee, 100%, 0, 0, after);//调用下边框方法 (传入全为可缺省值)
}
```

提供常用的工具方法 如font-size、margin样式的生成模板,只需维护对应作用域内的 $valArr 数组即可生成对应的 ***.f-x-number*** class