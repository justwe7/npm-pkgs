export default class Main {
  constructor (con?: TypeInitOptions)
  chooseFile(): () => Promise<{base64: string,file: File}[]>
  changeOptions(): () => Main
  clear(): void
  destory(): void
}

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
  cover?: string
}

interface AnyObject {
  [key: string]: any;
}
