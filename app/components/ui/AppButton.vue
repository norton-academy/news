<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    disabled?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
  }
)

const buttonClass = computed(() => {
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-200',
    secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-100',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-100',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-100',
  }

  const sizes = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-3 text-sm',
    lg: 'px-5 py-3.5 text-base',
  }

  return [
    'inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-4',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variants[props.variant],
    sizes[props.size],
  ]
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClass"
  >
    <span v-if="loading">Loading...</span>
    <slot v-else />
  </button>
</template>