<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string
    loading?: boolean
    type?: 'button' | 'submit'
    variant?: 'primary' | 'success'
  }>(),
  {
    loading: false,
    type: 'submit',
    variant: 'primary',
  }
)

const buttonClass = computed(() => {
  const variants = {
    primary: 'bg-slate-900 hover:bg-slate-800 focus:ring-slate-200',
    success: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-100',
  }

  return [
    'inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white transition duration-200',
    'disabled:cursor-not-allowed disabled:opacity-70',
    'focus:outline-none focus:ring-4',
    'hover:-translate-y-0.5',
    'active:translate-y-0',
    variants[props.variant],
  ]
})
</script>

<template>
  <button :type="type" :disabled="loading" :class="buttonClass">
    <span v-if="loading">Please wait...</span>
    <span v-else>{{ label }}</span>
  </button>
</template>