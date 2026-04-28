<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'success' | 'danger' | 'warning' | 'info'
  }>(),
  {
    variant: 'default',
  }
)

const badgeClass = computed(() => {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-green-100 text-green-700',
    danger: 'bg-red-100 text-red-700',
    warning: 'bg-amber-100 text-amber-700',
    info: 'bg-blue-100 text-blue-700',
  }

  return [
    'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
    variants[props.variant],
  ]
})
</script>

<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>