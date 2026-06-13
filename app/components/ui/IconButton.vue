<script setup lang="ts">
import { computed } from 'vue'

type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'

type IconButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: IconButtonVariant
  size?: IconButtonSize
  type?: 'button' | 'submit' | 'reset'
  label?: string
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
  size: 'md',
  type: 'button',
  label: 'Button',
  disabled: false,
  loading: false,
})

const buttonClass = computed(() => {
  // Base styling featuring hardware acceleration, elastic scaling, and refined focus rings
  const base =
    'relative inline-flex shrink-0 items-center justify-center font-medium ' +
    'transition-all duration-200 ease-out transform-gpu active:scale-95 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
    'disabled:pointer-events-none disabled:opacity-40 dark:focus-visible:ring-offset-zinc-950'

  const variants: Record<IconButtonVariant, string> = {
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
      'bg-transparent text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900 ' +
      'focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:bg-zinc-800/80 ' +
      'dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-800',
      
    danger:
      'bg-red-600 text-white shadow-sm hover:bg-red-500 active:bg-red-600 ' +
      'focus-visible:ring-red-500 dark:bg-red-700 dark:hover:bg-red-600 dark:active:bg-red-700',
  }

  // Adjusted rounding per size to look contextually clean
  const sizes: Record<IconButtonSize, string> = {
    sm: 'size-8 text-sm rounded-lg',
    md: 'size-10 text-sm rounded-xl',
    lg: 'size-11 text-base rounded-xl',
  }

  return [base, variants[props.variant], sizes[props.size]]
})

// Spinner sizing matches the button scale perfectly
const spinnerSizeClass = computed(() => {
  return props.size === 'sm' ? 'size-3.5 border-[1.5px]' : 'size-4 border-2'
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-label="label"
    :title="label"
    :class="buttonClass"
  >
    <Transition name="fade-scale" mode="out-in">
      <div 
        v-if="loading" 
        class="absolute inset-0 flex items-center justify-center"
        key="loading"
      >
        <span
          :class="[
            'animate-spin rounded-full border-current border-t-transparent shrink-0',
            spinnerSizeClass
          ]"
          aria-hidden="true"
        />
      </div>
      
      <div v-else class="flex items-center justify-center" key="content">
        <slot />
      </div>
    </Transition>
  </button>
</template>

<style scoped>
/* Crisp and fluid transition for icon-swapping states */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), 
              transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.82);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.82);
}
</style>