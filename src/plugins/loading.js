import { Loading } from 'element-ui'

let count = 0
let loading = null

export const openLoading = (target = '.el-main', fullscreen = false, lock = false, text = '') => {
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
}

export const closeLoading = () => {
  if (count > 0) {
    count--
    count <= 0 && loading.close()
  }
}
