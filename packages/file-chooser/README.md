# `@justwe7/file-chooser`

> 无UI的文件选择器，通过方法唤起文件上传，输出base64与File。并提供拖拽上传、图片压缩、视频封面截取、文件上传、进度监听等功能

## Usage
```bash
npm install @justwe7/file-chooser -S
```

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
| compress | 压缩图片(仅对图片生效)传入true以默认值进行压缩 | false | `boolean | {maxWidth: 1500, compressQuality: 0.8,roate: false, exifruri?: string}` |
| videoCover | 截取视频封面(仅对视频生效)，默认宽高为视频原始文件的宽高 | - | `{ currentTime: 0.5, width?: string, height?: string }` |
| extReg   | 文件格式(正则)                 | `png|jpe?g|webp` | `string`           |
| accept   | input传入的选择文件类型  | `image/jpg,image/jpeg,image/png,image/gif` | `string`           |
| el       | 挂载的input标签          | 动态创建 | `HTMLInputElement` |

> compress.roate 会使用`exifr`将图片旋转: https://mutiny.cz/exifr/examples/orientation.html。因该依赖过大将其外置化通过script引入，可传入`exifruri`指定资源地址

### 实例方法
| 方法     | 说明                     | 返回值               |
| -------- | ------------------------  | ------------------ |
| chooseFile(accept?) | 唤起文件选择器                 | `Promise<{base64: string,file: File,cover?: {base64: string,file: File}}[]>`         |
| changeOption | 修改选择器属性，返回实例支持链式调用                 | `FileChooserInstance`         |
| clear | 清空已选择文件                 | `void`         |
| destory | 移除上传表单                 | `void`         |


### 工具函数
| 方法     | 说明                     | 入参               |返回值|
| -------- | ------------------------  | ------------------ |---|
|`compressFileToBase64`|将File对象转为base64，提供压缩功能|(file: File|Blob, compressQuality: any = 0.8, maxWidth: any = 1500)|Promise<string>|
|`dataURLtoBlobAsFile`|将base64数据转换为`Blob`对象|(dataurl: string, fileName: string, fileType: 'blob'|'file' = 'blob')|Promise<string>|
|`getVideoCover`|截取视频封面，默认截取第0.5秒，视频原文件宽高的图像，支持`url/base64`|(uri: string, { currentTime = 0.5, width, height })|Promise<string>|

## DEMO
### 选择图片并压缩
```js
new FileChooser({ accept: '.jpg,.jpeg,.png,.gif', compress: true })
new FileChooser({ extReg: 'png|webp', maxSize: Infinity, compress: { maxWidth: 2048, compressQuality: 0.9 } }).chooseFile('.png').then(res => {
  console.log(res)
})
```
### 选择视频
```js
new FileChooser({ extReg: 'mp4', accept: '.mp4', videoCover: { currentTime: 1, width: '320', height: '240' } }).chooseFile().then(res => {
  console.log(res)
})
```
### 支持选择文件时修改accept
```js
FileChooserInstance.chooseFile('.png').then(res => {
  console.log(res)
})
```
### 复用实例并修改参数
```js
FileChooserInstance.changeOptions({ accept: '.mp4', videoCover: { currentTime: 1, width: '320', height: '240' } }).chooseFile().then(res => {
  console.log(res)
})
```

### 提取视频封面
```js
import { getVideoCover } from '@justwe7/file-chooser'

getVideoCover('url/base64', { currentTime: 1 }).then(base64 => {
  console.log(base64)
})
```