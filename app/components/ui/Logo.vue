<script setup lang="ts">
import { computed } from 'vue'

type LogoSize = 'sm' | 'md' | 'lg'

interface Props {
  name?: string
  subtitle?: string
  to?: string
  compact?: boolean
  size?: LogoSize
  mark?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'Cobo Core',
  subtitle: 'Admin System',
  to: '/',
  compact: false,
  size: 'md',
  mark: '',
})

const initials = computed(() => {
  if (props.mark) return props.mark

  return props.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('')
})

const markClass = computed(() => {
  const sizes: Record<LogoSize, string> = {
    sm: 'size-9 rounded-xl text-xs',
    md: 'size-10 rounded-2xl text-sm',
    lg: 'size-12 rounded-2xl text-base',
  }

  return [
    'flex shrink-0 items-center justify-center bg-slate-950 font-bold text-white shadow-sm ring-1 ring-slate-900/10 transition dark:bg-white dark:text-slate-950 dark:ring-white/10',
    sizes[props.size],
  ]
})

const titleClass = computed(() => {
  const sizes: Record<LogoSize, string> = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
  }

  return [
    'truncate font-bold leading-5 text-slate-950 dark:text-white',
    sizes[props.size],
  ]
})

const subtitleClass = computed(() => {
  const sizes: Record<LogoSize, string> = {
    sm: 'text-[11px]',
    md: 'text-xs',
    lg: 'text-sm',
  }

  return [
    'truncate text-slate-500 dark:text-slate-400',
    sizes[props.size],
  ]
})
</script>

<template>
  <NuxtLink
    :to="to"
    class="group inline-flex items-center gap-3 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-slate-950/10 dark:focus:ring-white/10"
  >
    <div :class="markClass">
      <slot name="mark">
        {{ initials }}
      </slot>
    </div>

    <div
      v-if="!compact"
      class="min-w-0"
    >
      <p :class="titleClass">
        {{ name }}
      </p>

      <p
        v-if="subtitle"
        :class="subtitleClass"
      >
        {{ subtitle }}
      </p>
    </div>
  </NuxtLink>
</template>