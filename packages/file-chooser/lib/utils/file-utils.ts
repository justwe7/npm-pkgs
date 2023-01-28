import exifr from 'exifr'
import { TypeInitOptions, TypeChooseFileRet } from '../..'


/**
 * @param {*} file File
 * @param {*} compress 是否压缩图片
 * @returns {Promise<{file: File|Blob, base64: string}>}
 */
export function fileDataHandler (file: File, compress: TypeInitOptions["compress"], videoCover: TypeInitOptions["compress"]): Promise<TypeChooseFileRet> {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function () {
      if (compress) { // 图片压缩
        if (typeof compress === 'boolean') {
          compressFileToBase64(file).then(base64 => {
            resolve({ file: dataURLtoBlobAsFile(base64, file.name || getFileName(file)), base64: base64 })
          })
        } else {
          compressFileToBase64(file, compress.compressQuality, compress.maxWidth).then(base64 => {
            resolve({ file: dataURLtoBlobAsFile(base64, file.name || getFileName(file)), base64: base64 })
          })
        }
      } else if (videoCover) {
        const base64 = this.result as string
        getVideoCover(base64).then(cover => {
          resolve({ file, base64, cover })
        })
      } else {
        resolve({ file, base64: this.result as string })
      }
    }
    reader.readAsDataURL(file)
  })
}

/**
 * 压缩File为base64字符串
 * @param {*} file File|Blob
 * @param {*} compressQuality
 * @param {*} maxWidth
 * @returns {Promise<base64>}
 */
export function compressFileToBase64 (file: File|Blob, compressQuality: any = 0.8, maxWidth: any = 1500): Promise<string> {
  // 图片压缩
  return new Promise(resolve => {
    // 通过fileReader对象，读取浏览器中存储的文件
    const fd = new FileReader()
    // 读取指定的Blob中的内容，最后得到一个data: URL格式的字符串以表示所读取文件的内容
    fd.readAsDataURL(file)
    fd.onloadend = e => {
      const image = new Image()
      image.onload = () => {
        let width = image.width
        let height = image.height
        let rate = 1 // 像素比例
        if (Math.max(width, height) > maxWidth) {
          rate = maxWidth / Math.max(width, height)
        }
        if (rate < 1 || file.size >= 2 * 1024 * 1024) {
          // 超出最大边长等比例缩放
          width = width * rate
          height = height * rate
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')!
          canvas.width = width
          canvas.height = height
          // ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
          // resolve(canvas.toDataURL('image/jpeg', compressQuality))
          exifr.orientation(file).then(orientation => { // https://github.com/MikeKovarik/exifr
            if (orientation !== 1 && orientation !== undefined && orientation !== 0) {
              switch (orientation) {
                case 6:// 需要顺时针（向左）90度旋转
                  canvas.width = height
                  canvas.height = width
                  ctx.rotate(Math.PI / 2)
                  ctx.drawImage(image, 0, -height, width, height)
                  break
                case 8:// 需要逆时针（向右）90度旋转
                  canvas.width = height
                  canvas.height = width
                  ctx.rotate(-90 * Math.PI / 180)
                  ctx.drawImage(image, -width, 0, width, height)
                  break
                case 3:// 需要180度旋转
                  ctx.rotate(Math.PI)
                  ctx.drawImage(image, -width, -height, width, height)
                  break
                default: ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
              }
            } else {
              ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
            }
            resolve(canvas.toDataURL('image/jpeg', compressQuality))
          }).catch(() => {
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
            resolve(canvas.toDataURL('image/jpeg', compressQuality))
          })
        } else {
          resolve((e.target as any).result as string)
        }
      }
      image.src = e.target!.result as string
    }
  })
}

/**
 *
 * 截取视频第一帧
 * @param {*} base64Content
 * @param {*} [{ currentTime = 0.5, width, height }={}]
 * @return {*}
 */
function getVideoCover (base64Content: string, { currentTime = 0.5, width, height }: any = {} as { currentTime: number, width?: number, height?: number }): Promise<string> {
  return new Promise(async (resolve) => {
    const videoEl = document.createElement('video')
    videoEl.currentTime = currentTime
    videoEl.setAttribute('crossOrigin', 'anonymous')
    videoEl.setAttribute('src', base64Content)
    // 指定封面宽高
    if (width && height) {
      videoEl.setAttribute('width', width)
      videoEl.setAttribute('height', height)
    } else {
      // 视频原始宽高
      await new Promise<void>(resolve => {
        videoEl.onloadedmetadata = () => {
          window.URL.revokeObjectURL(videoEl.src)
          height = videoEl.videoHeight
          width = videoEl.videoWidth
          resolve()
        }
      })
    }
    videoEl.addEventListener('loadeddata', function () {
        const canvas = document.createElement<any>('canvas')
        canvas.width = width!
        canvas.height = height!
        canvas.getContext('2d').drawImage(videoEl, 0, 0, width!, height!)
        resolve(canvas.toDataURL('image/jpeg'))
    });
  })
}

/**
 * @param {*} dataurl base64
 * @param {*} fileName blob属性的文件名
 * @param {'blob'|'file'} fileType blob属性的文件名
 * @return {*}
 */
export function dataURLtoBlobAsFile (dataurl: string, fileName: string, fileType: 'blob'|'file' = 'blob'): any {
  const arr: any[] = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  const file = fileType === 'blob' ? new Blob([u8arr], { type: mime }) : new File([u8arr], fileName, { type: mime }) as any // 生成blob数据
  file.lastModifiedDate = new Date()
  file.name = fileName
  return file
}

function genUuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getFileName (file: File, ext = 'jpeg') {
  let fileExt
  if (fileExt = /(?=\/(\S+))/.exec(file.type)?.[1]) {
    ext = fileExt
  }
  return genUuid() + '.' + ext
}
