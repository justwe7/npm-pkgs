import { TypeInitOptions, TypeChooseFileRet } from '..';
import { fileDataHandler, compressFileToBase64, getVideoCover, dataURLtoBlobAsFile } from './utils/file-utils';

export {
  compressFileToBase64,
  getVideoCover,
  dataURLtoBlobAsFile,
}
export default class FileChooser /* implements TypeInitOptions */ {
  el!: HTMLInputElement
  private maxSize!: number // 文件大小
  private compress!: TypeInitOptions["compress"] // 【图片】默认不压缩 true 默认压缩率0.8 最长边长1500px
  private videoCover!: TypeInitOptions["videoCover"] // 【视频】默认不截取
  private extReg!: RegExp // 格式校验

  constructor (options: Partial<TypeInitOptions> = {}) {
    if (options.el) {
      this.el = options.el
    } else {
      const elInputfile = document.createElement('input')
      elInputfile.setAttribute('style', 'display:none;opacty:0;width:0;height:0;')
      elInputfile.setAttribute('hidden', 'hidden')
      elInputfile.setAttribute('type', 'file')
      this.el = elInputfile
      const oBody = document.body
      oBody.appendChild(this.el)
    }
    // this.multiple = options.multiple || false
    this.changeOptions(options)
  }
  changeOptions (options: Partial<TypeInitOptions>) {
    // this.multiple = options.multiple || false
    this.maxSize = (options.maxSize || 500) // 500kb
    this.compress = options.compress || false
    this.videoCover = options.videoCover
    this.extReg = new RegExp(`\\/(${options.extReg || "png|jpe?g|webp"})$`, 'i')

    if (options.multiple) {
      this.el.setAttribute('multiple', '')
    }
    this.el.setAttribute('accept', options.accept || "image/jpg,image/jpeg,image/png,image/gif")
    return this
  }
  clear () {
    this.el.value = ''
  }
  destroy () {
    this.el.remove()
  }
  chooseFile (accept?: TypeInitOptions["accept"]): Promise<TypeChooseFileRet[]>{
    if (accept) {
      this.el.setAttribute('accept', accept)
    }
    return new Promise((resolve, reject) => {
      this.el.click()
      /* this.el.addEventListener('onchange', function() {
      }, { once: true }) */
      const _this = this
      this.el.onchange = function () {
        const promises = []
        const files = (this as HTMLInputElement).files!
        for (let index = 0, len = files.length; index < len; index++) {
          const file = files[index]
          if (!_this.extReg.test(file.type)) return reject('请选择正确的文件类型')
          if (file.size >= _this.maxSize * 1024) return reject('请选择小于' + _this.maxSize + 'kb的文件')
          
          promises.push(fileDataHandler(file, _this.compress, _this.videoCover as any))
        }
        if (files.length) { // 弹出选择器选择图片未确认为空
          Promise.all(promises).then(resolve).catch(reject)
        }
      }
    })
  }
}
