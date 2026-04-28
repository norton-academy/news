<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean
    title?: string
    subtitle?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  {
    title: '',
    subtitle: '',
    size: 'md',
  }
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const sizeClass = computed(() => {
  return {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  }[props.size]
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/50" @click="emit('close')" />

      <div
        :class="[
          'relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl',
          sizeClass[size],
        ]"
      >
        <div
          v-if="title || subtitle || $slots.header"
          class="flex items-start justify-between border-b border-slate-200 px-6 py-4"
        >
          <slot name="header">
            <div>
              <h2 v-if="title" class="text-xl font-bold text-slate-900">
                {{ title }}
              </h2>
              <p v-if="subtitle" class="mt-1 text-sm text-slate-500">
                {{ subtitle }}
              </p>
            </div>
          </slot>

          <button
            class="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
            @click="emit('close')"
          >
            Close
          </button>
        </div>

        <div class="px-6 py-6">
          <slot />
        </div>

        <div v-if="$slots.footer" class="border-t border-slate-200 px-6 py-4">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
