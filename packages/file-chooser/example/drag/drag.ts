import '../../src/style.css'
import FileChooser from '../../lib/main'
// import ff from '../dist/counter.js'
document.addEventListener('DOMContentLoaded', function () {
  const ele = document.querySelector<HTMLElement>('#drag')!
  ele.addEventListener('chooseFile', (e) => {
    console.log(e)
  })
    
  const FileChooserInstance = new FileChooser({ maxLength: 2, dragWrapEl: ele, maxSize: 50000, extReg: null, accept: null })
  FileChooserInstance.on('drag', function (e) {
    alert('拖拽选择成功，打开控制台查看')
    console.log(e)
  })
  document.querySelector('#btn')?.addEventListener('click', () => {
    FileChooserInstance.chooseFile().then(res => {
      console.log(res)
    }).catch(e => alert(e))
  })
  document.querySelector('#btnDestory')?.addEventListener('click', () => {
    FileChooserInstance.destroy()
    console.log(FileChooserInstance.getFileList())
    console.log(FileChooserInstance.clear())
    // FileChooserInstance.changeOptions({ extReg: 'mp4', accept: '.mp4', videoCover: { currentTime: 1, width: '320', height: '240' } }).chooseFile().then(res => {
      //   console.log(res)
      // })
  })
})