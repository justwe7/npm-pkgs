import './style.css'
import FileChooser from '../lib/main'
// import ff from '../dist/counter.js'
const FileChooserInstance = new FileChooser({ maxSize: 50000, compress: true, accept: '.jpg,.jpeg,.png,.gif' })
document.querySelector('#btn')?.addEventListener('click', () => {
  FileChooserInstance.chooseFile('.png').then(res => {
    console.log(res)
  })
})
document.querySelector('#btnDestory')?.addEventListener('click', () => {
  FileChooserInstance.changeOptions({ extReg: 'mp4', accept: '.mp4', videoCover: { currentTime: 1, width: '320', height: '240' } }).chooseFile().then(res => {
    console.log(res)
  })
})

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
