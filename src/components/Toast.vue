<template>
  <div v-if="visible" :class="['toast', type]" @click="hide">
    {{ message }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  message: String,
  type: { type: String, default: 'info' }, // 'success', 'error', 'info', 'warning'
  duration: { type: Number, default: 3000 }
})

const visible = ref(true)

function hide() {
  visible.value = false
}

// Auto-hide after duration
setTimeout(() => (visible.value = false), props.duration)
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 20px;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 9999;
  transition: opacity 0.3s ease;
}
.toast.info { background: #3b82f6; }
.toast.success { background: #16a34a; }
.toast.error { background: #ef4444; }
.toast.warning { background: #f59e0b; }
</style>
