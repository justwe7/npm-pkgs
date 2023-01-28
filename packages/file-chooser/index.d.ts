export default class Main {
  constructor (con?: TypeInitOptions)
  chooseFile(): () => Promise<{base64: string,file: File}[]>
  changeOptions(): () => Main
  clear(): void
  destory(): void
}

export const compressFileToBase64: (file: File|Blob, compressQuality: any = 0.8, maxWidth: any = 1500) => Promise<string>

export const getVideoCover: (base64Content: string, { currentTime = 0.5, width, height }: any = {} as { currentTime: number, width?: number, height?: number }) => Promise<string> 

export const dataURLtoBlobAsFile: (dataurl: string, fileName: string, fileType: 'blob'|'file' = 'blob') => any

// export const getFileName: (file: File, ext = 'jpeg') => string

export declare interface TypeInitOptions {
  multiple?: boolean
  maxSize?: number
  maxWidth?: number
  compress?: boolean | {maxWidth: number, compressQuality: number}
  videoCover?: { currentTime: number, width?: string, height?: string }
  extReg?: string
  accept?: string
  el?: HTMLInputElement
}

export declare interface TypeChooseFileRet {
  file: File|Blob
  base64: string
  cover?: TypeChooseFileRet
}

interface AnyObject {
  [key: string]: any;
}
