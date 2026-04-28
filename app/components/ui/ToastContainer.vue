<script setup lang="ts">
import type { ToastItem } from '~/stores/toast'

const toast = useToast()

const typeClass = (type: ToastItem['type']) => {
  const classes = {
    success: 'border-green-200 bg-green-50 text-green-800',
    error: 'border-red-200 bg-red-50 text-red-800',
    info: 'border-blue-200 bg-blue-50 text-blue-800',
    warning: 'border-amber-200 bg-amber-50 text-amber-800',
  }

  return classes[type]
}

const dotClass = (type: ToastItem['type']) => {
  const classes = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-amber-500',
  }

  return classes[type]
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed right-4 top-4 z-[9999] w-full max-w-sm space-y-3">
      <TransitionGroup name="toast" tag="div" class="space-y-3">
        <div
          v-for="item in toast.items.value"
          :key="item.id"
          :class="[
            'rounded-2xl border p-4 shadow-lg backdrop-blur',
            typeClass(item.type),
          ]"
        >
          <div class="flex items-start gap-3">
            <span
              :class="[
                'mt-1 h-2.5 w-2.5 rounded-full',
                dotClass(item.type),
              ]"
            />

            <div class="flex-1">
              <p class="text-sm font-bold">
                {{ item.title }}
              </p>

              <p v-if="item.message" class="mt-1 text-sm opacity-80">
                {{ item.message }}
              </p>
            </div>

            <button
              class="rounded-lg px-2 py-1 text-sm opacity-70 hover:opacity-100"
              @click="toast.remove(item.id)"
            >
              ✕
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>