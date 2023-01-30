import './style.css'
import FileChooser from '../lib/main'
// import ff from '../dist/counter.js'
document.addEventListener('DOMContentLoaded', function () {
  const ele = document.querySelector<HTMLElement>('#drag')!
  ele.addEventListener('chooseFile', (e) => {
    console.log(e)
  })
    
  const FileChooserInstance = new FileChooser({ maxLength: 2,dragWrapEl: ele, maxSize: 50000, extReg: null, accept: null })
  FileChooserInstance.on('drag', function (err, e) {
    if (err) return alert(err)
    alert('成功，打开控制台查看')
    console.log(e)
  })
  document.querySelector('#btn')?.addEventListener('click', () => {
    FileChooserInstance.chooseFile().then(res => {
      console.log(res)
    }).catch(alert)
  })
  document.querySelector('#btnDestory')?.addEventListener('click', () => {
    console.log(FileChooserInstance.getFileList())
    console.log(FileChooserInstance.clear())
    // FileChooserInstance.changeOptions({ extReg: 'mp4', accept: '.mp4', videoCover: { currentTime: 1, width: '320', height: '240' } }).chooseFile().then(res => {
      //   console.log(res)
      // })
  })
  document.querySelector('#btnGetList')?.addEventListener('click', () => {
    alert('成功，打开控制台查看')
    console.log(FileChooserInstance.getFileList())
    // FileChooserInstance.changeOptions({ extReg: 'mp4', accept: '.mp4', videoCover: { currentTime: 1, width: '320', height: '240' } }).chooseFile().then(res => {
      //   console.log(res)
      // })
  })
})

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
