import { Loading } from 'element-ui'
let count = 0
let loading = null
export default {
  open: (target = '#app', fullscreen = true, lock = true, text = '') => {
    console.log('open+++++++')
    if (count === 0) {
      loading = Loading.service({
        lock: lock,
        text: text,
        background: 'transparent', // 'rgba(0, 0, 0, 0.5)',
        target: target,
        fullscreen: fullscreen
      })
    }
    count++
  },
  close: () => {
    console.log('close--------')
    if (count > 0) {
      count--
      count <= 0 && loading.close()
    }
  }
}
