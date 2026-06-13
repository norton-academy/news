<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'

type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  block: false,
})

const buttonClass = computed(() => {
  // Base styles focusing on clean typography, smooth hardware-accelerated transitions, and subtle click scaling
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight ' +
    'transition-all duration-200 transform-gpu active:scale-[0.98] ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
    'disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-offset-zinc-950'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-zinc-900 text-zinc-50 shadow-sm hover:bg-zinc-800/90 active:bg-zinc-900 ' +
      'focus-visible:ring-zinc-950 dark:bg-zinc-50 dark:text-zinc-900 ' +
      'dark:hover:bg-zinc-200/90 dark:active:bg-zinc-50 dark:focus-visible:ring-zinc-300',
      
    secondary:
      'bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 active:bg-zinc-100 ' +
      'focus-visible:ring-zinc-400 dark:bg-zinc-800 dark:text-zinc-100 ' +
      'dark:hover:bg-zinc-700/80 dark:active:bg-zinc-800 dark:focus-visible:ring-zinc-700',
      
    outline:
      'border border-zinc-200 bg-white text-zinc-900 shadow-sm hover:bg-zinc-50 ' +
      'focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 ' +
      'dark:text-zinc-100 dark:hover:bg-zinc-900 dark:focus-visible:ring-zinc-800',
      
    ghost:
      'bg-transparent text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-900 ' +
      'focus-visible:ring-zinc-400 dark:text-zinc-300 dark:hover:bg-zinc-800/80 ' +
      'dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-800',
      
    danger:
      'bg-red-600 text-white shadow-sm hover:bg-red-500 active:bg-red-600 ' +
      'focus-visible:ring-red-500 dark:bg-red-700 dark:hover:bg-red-600 dark:active:bg-red-700',
  }

  const sizes: Record<ButtonSize, string> = {
    sm: 'h-9 px-3.5 text-sm gap-1.5 rounded-lg',
    md: 'h-10 px-4.5 text-sm',
    lg: 'h-11 px-6 text-base gap-2.5',
  }

  return [
    base,
    variants[props.variant],
    sizes[props.size],
    props.block ? 'w-full' : '',
  ]
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClass"
  >
    <Transition name="spinner">
      <span
        v-if="loading"
        class="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        aria-hidden="true"
      />
    </Transition>

    <slot />
  </button>
</template>

<style scoped>
/* Smooth slide-in and fade transition for the loading spinner */
.spinner-enter-active,
.spinner-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.spinner-enter-from,
.spinner-leave-to {
  opacity: 0;
  transform: translateX(-4px);
  width: 0;
  margin-right: -6px; /* Collapses gap width dynamically */
}
</style>