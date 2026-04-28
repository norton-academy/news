<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    value: string | number
    subtitle?: string
    tone?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  }>(),
  {
    subtitle: '',
    tone: 'default',
  }
)

const toneClass = computed(() => {
  return {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  }[props.tone]
})
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-slate-500">
          {{ title }}
        </p>

        <h3 class="mt-3 text-3xl font-bold text-slate-900">
          {{ value }}
        </h3>

        <p v-if="subtitle" class="mt-2 text-sm text-slate-500">
          {{ subtitle }}
        </p>
      </div>

      <slot name="badge">
        <div :class="['rounded-xl px-3 py-2 text-xs font-semibold capitalize', toneClass]">
          {{ tone }}
        </div>
      </slot>
    </div>
  </div>
</template>