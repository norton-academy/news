<script setup lang="ts">
import { computed } from 'vue'

type DropdownItemVariant = 'default' | 'danger'

interface Props {
  as?: string
  href?: string
  variant?: DropdownItemVariant
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'default',
  disabled: false,
})

const itemClass = computed(() => {
  const base =
    'flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors disabled:pointer-events-none disabled:opacity-60'

  const variants: Record<DropdownItemVariant, string> = {
    default:
      'text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
    danger:
      'text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300',
  }

  return [base, variants[props.variant]]
})
</script>

<template>
  <NuxtLink
    v-if="href"
    :to="href"
    :class="itemClass"
  >
    <slot />
  </NuxtLink>

  <button
    v-else
    type="button"
    :disabled="disabled"
    :class="itemClass"
  >
    <slot />
  </button>
</template>