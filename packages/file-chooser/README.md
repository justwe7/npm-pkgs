# `@justwe7/file-chooser`

> 无UI的文件选择器，通过方法唤起文件上传，输出base64与File。并提供拖拽上传、图片压缩、文件上传、进度监听等功能

## Usage

```js
import FileChooser from '@justwe7/file-chooser'

const FileChooserInstance = new FileChooser()
document.querySelector('#btn')?.addEventListener('click', () => {
  FileChooserInstance.chooseFile().then(res => {
    console.log(res)
  })
})
```

## API
### 实例化参数
| 参数     | 说明                     | 初始值 | 类型               |
| -------- | ------------------------ | ---- | ------------------ |
| multiple | 支持多选                 | `false` | `boolean`          |
| maxSize  | 限制文件大小(kb)             | `500` | `number`           |
| compress | 压缩图片(仅对图片生效)传入true以默认值进行压缩 | false | `boolean | {maxWidth: 1500, compressQuality: 0.8}` |
| extReg   | 文件格式(正则)                 | `png|jpe?g|webp` | `string`           |
| accept   | input传入的选择文件类型  | `image/jpg,image/jpeg,image/png,image/gif` | `string`           |
| el       | 挂载的input标签          | 动态创建 | `HTMLInputElement` |

### 实例方法
| 方法     | 说明                     | 返回值               |
| -------- | ------------------------  | ------------------ |
| chooseFile | 唤起文件选择器                 | `Promise<{base64: string,file: File}[]>`         |
| clear | 清空已选择文件                 | `void`         |
| destory | 移除上传表单                 | `void`         |
