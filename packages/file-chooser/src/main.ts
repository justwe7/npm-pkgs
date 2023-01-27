import './style.css'
import FileChooser from '../lib/main'
// import ff from '../dist/counter.js'
new FileChooser({})
const FileChooserInstance = new FileChooser({ maxSize: 50000, compress: true,  })
document.querySelector('#btn')?.addEventListener('click', () => {
  FileChooserInstance.chooseFile().then(res => {
    console.log(res)
  })
})
document.querySelector('#btnDestory')?.addEventListener('click', () => {
  FileChooserInstance.destroy()
})

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
