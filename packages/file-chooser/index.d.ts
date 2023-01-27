export declare interface TypeInitOptions {
  multiple: boolean,
  maxSize: number,
  compress: boolean | {maxWidth: number, compressQuality: number},
  extReg: string,
  accept: string,
  el?: HTMLInputElement
}
export declare interface TypeChooseFileRet {
  file: File|Blob
  base64: string
}

interface AnyObject {
  [key: string]: any;
}