// import "@babel/runtime-corejs3/core-js-stable/promise" /* --- iife corejs 内联解决方案 (3/3)--- */
import { TypeInitOptions, TypeChooseFileRet } from '..';
import { fileDataHandler, compressFileToBase64, getVideoCover, dataURLtoBlobAsFile } from './utils/file-utils';

export {
  compressFileToBase64,
  getVideoCover,
  dataURLtoBlobAsFile,
}
export default class FileChooser /* implements TypeInitOptions */ {
  el!: HTMLInputElement
  dragWrapEl?: HTMLInputElement
  private fileList: TypeChooseFileRet[]
  private maxLength!: number // 限制选择文件数量
  private maxSize!: number // 文件大小
  private compress!: TypeInitOptions["compress"] // 【图片】默认不压缩 true 默认图片质量0.8 最长边长1500px超出等比缩放
  private videoCover!: TypeInitOptions["videoCover"] // 【视频】默认不截取
  private extReg!: RegExp|null // 格式校验
  private dragCb!: (errMsg: null|string, res: TypeChooseFileRet[]) => void

  constructor (options: Partial<TypeInitOptions> = {}) {
    this.fileList = []
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
    this.initDrag(options.dragWrapEl) // 拖拽上传
    this.changeOptions(options)
  }
  changeOptions (options: Partial<TypeInitOptions>) {
    this.maxSize = (options.maxSize || 500) // 500kb
    this.compress = options.compress || false
    this.videoCover = options.videoCover
    this.maxLength = options.maxLength || 99999
    this.extReg = options.extReg === null ? null : new RegExp(`\\/(${options.extReg || "png|jpe?g|webp"})$`, 'i')

    if (options.multiple) {
      this.el.setAttribute('multiple', '')
    } else {
      this.el.removeAttribute('multiple')
    }

    this.el.setAttribute('accept', options.accept || "image/jpg,image/jpeg,image/png,image/gif")
    ;(options.accept === null) && this.el.removeAttribute('accept')
    return this
  }
  clear () {
    this.el.value = ''
    this.fileList = []
  }
  destroy () {
    this.el.remove()
  }
  on (ev: 'drag', cb: (err: null|string, res: TypeChooseFileRet[]) => void) {
    switch (ev) {
      case 'drag':
        this.dragCb = cb
        break;
    
      default:
        break;
    }
  }
  getFileList () {
    return this.fileList
  }
  async fileDataTransHandler (files: FileList) {
    if (this.getFileList().length >= this.maxLength) {
      this.el.value = ''
      return Promise.reject('限制上传' + this.maxLength + '个文件')
    }
    const promises = []
    for (let index = 0, len = files.length; index < len; index++) {
      const file = files[index]
      if (this.extReg !== null && !this.extReg.test(file.type)) return Promise.reject('请选择正确的文件类型')
      if (file.size >= this.maxSize * 1024) return Promise.reject('请选择小于' + this.maxSize + 'kb的文件')
      
      promises.push(fileDataHandler(file, this.compress, this.videoCover as any))
    }
    // 弹出选择器选择图片未确认为空
    const retList = await Promise.all(promises).catch(() => ([]))
    this.fileList.push(...retList)
    return retList
  }
  // 初始化拖拽
  initDrag (dragWrapEl?: HTMLElement) {
    if (dragWrapEl) {
      dragWrapEl.setAttribute('title', '拖拽文件到此上传')
      dragWrapEl.style.cursor = 'pointer'
      // 拖进
      dragWrapEl.addEventListener('dragenter', function(e) {
        e.preventDefault()
      }, false)
      dragWrapEl.addEventListener('dragover', function(e) {
        e.preventDefault()
      }, false)
      dragWrapEl.addEventListener('drop', async (e) => {
        //将本地图片拖拽到页面中后要进行的处理都在这
        e.preventDefault()
        if (!e.dataTransfer?.files?.length) return

        this.fileDataTransHandler(e.dataTransfer.files).then(retList => {
          this.dragCb && this.dragCb(null, retList)
          dragWrapEl.dispatchEvent(new CustomEvent("chooseFile", {
            detail: retList
          }))
        }).catch(err => {
          this.dragCb && this.dragCb(err, [])
        })
      }, false)
    }
  }
  // 初始化表单选择
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
        // const promises = []
        const files = (this as HTMLInputElement)?.files
        if (!files?.length) return

        _this.fileDataTransHandler(files).then(resolve).catch(reject)
      }
    })
  }
}
