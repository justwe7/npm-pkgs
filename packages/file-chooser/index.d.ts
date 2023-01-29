export default class Main {
  constructor (con?: TypeInitOptions)
  chooseFile(): Promise<TypeChooseFileRet[]>
  getFileList: () => TypeChooseFileRet[]
  changeOptions(): () => Main
  clear(): void
  destory(): void
  on(ev: 'drag', cb: (e: TypeChooseFileRet[]) => void): void
}

export const compressFileToBase64: (file: File|Blob, compressQuality: any = 0.8, maxWidth: any = 1500) => Promise<string>

export const dataURLtoBlobAsFile: (dataurl: string, fileName: string, fileType: 'blob'|'file' = 'blob') => any

export const getVideoCover: (uri: string, { currentTime = 0.5, width, height }: any = {} as { currentTime: number, width?: number, height?: number }) => Promise<string> 

// export const getFileName: (file: File, ext = 'jpeg') => string

export declare interface TypeInitOptions {
  multiple?: boolean
  maxSize?: number
  maxLength?: number
  maxWidth?: number
  compress?: boolean | {maxWidth: number, compressQuality: number, rotate?: boolean, exifruri?: string}
  videoCover?: { currentTime: number, width?: string, height?: string }
  extReg?: string|null
  accept?: string|null
  el?: HTMLInputElement
  dragWrapEl?: HTMLElement
}

export declare interface TypeChooseFileRet {
  file: File|Blob
  base64: string
  cover?: TypeChooseFileRet
}

interface AnyObject {
  [key: string]: any;
}
