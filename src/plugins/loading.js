import { Loading } from 'element-ui'

let loadingCount = 0
let loading

const startLoading = (target, fullscreen, lock, text) => {
  loading = Loading.service({
    lock: lock,
    text: text,
    background: 'transparent'/* 'rgba(0, 0, 0, 0.5)' */,
    target: target,
    fullscreen: fullscreen
  })
}

const endLoading = () => {
  loading.close()
}

export const showLoading = (target = '#app', fullscreen = false, lock = true, text = '') => {
  if (loadingCount === 0) {
    startLoading(target, fullscreen)
  }
  loadingCount += 1
}

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    endLoading()
  }
}
