import { createApp, h } from 'vue'
import Toast from '../components/Toast.vue'

export function showToast({ message, type = 'info', duration = 3000 }) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const app = createApp({
    render() {
      return h(Toast, { message, type, duration })
    }
  })
  app.mount(container)
}
