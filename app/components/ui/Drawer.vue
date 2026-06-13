<script setup lang="ts">
import { X } from 'lucide-vue-next'

type DrawerSide = 'left' | 'right'

interface Props {
  modelValue: boolean
  title?: string
  description?: string
  side?: DrawerSide
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  side: 'right',
  closeOnBackdrop: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

function closeDrawer() {
  emit('update:modelValue', false)
  emit('close')
}

function handleBackdropClick() {
  if (props.closeOnBackdrop) {
    closeDrawer()
  }
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (import.meta.client) {
      document.body.style.overflow = isOpen ? 'hidden' : ''
    }
  },
)

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm"
        @click.self="handleBackdropClick"
      >
        <Transition
          enter-active-class="duration-200 ease-out"
          :enter-from-class="side === 'right' ? 'translate-x-full' : '-translate-x-full'"
          enter-to-class="translate-x-0"
          leave-active-class="duration-150 ease-in"
          leave-from-class="translate-x-0"
          :leave-to-class="side === 'right' ? 'translate-x-full' : '-translate-x-full'"
        >
          <aside
            class="fixed top-0 h-full w-full max-w-md border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950"
            :class="side === 'right' ? 'right-0 border-l' : 'left-0 border-r'"
          >
            <div class="flex h-full flex-col">
              <div class="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                <div>
                  <h3
                    v-if="title"
                    class="text-lg font-semibold text-slate-950 dark:text-white"
                  >
                    {{ title }}
                  </h3>

                  <p
                    v-if="description"
                    class="mt-1 text-sm text-slate-500 dark:text-slate-400"
                  >
                    {{ description }}
                  </p>
                </div>

                <button
                  type="button"
                  class="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  @click="closeDrawer"
                >
                  <X class="size-5" />
                  <span class="sr-only">Close drawer</span>
                </button>
              </div>

              <div class="flex-1 overflow-y-auto px-6 py-5">
                <slot />
              </div>

              <div
                v-if="$slots.footer"
                class="border-t border-slate-200 px-6 py-4 dark:border-slate-800"
              >
                <slot name="footer" />
              </div>
            </div>
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>