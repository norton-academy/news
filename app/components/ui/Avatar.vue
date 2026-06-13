<script setup lang="ts">
import { computed, ref } from 'vue'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Avatar',
  name: '',
  size: 'md',
})

const hasImageError = ref(false)

const avatarClass = computed(() => {
  const sizes: Record<AvatarSize, string> = {
    sm: 'size-8 text-xs',
    md: 'size-10 text-sm',
    lg: 'size-12 text-base',
    xl: 'size-16 text-lg',
  }

  return [
    'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700',
    sizes[props.size],
  ]
})

const initials = computed(() => {
  if (!props.name) return '?'

  return props.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
})

const showImage = computed(() => props.src && !hasImageError.value)
</script>

<template>
  <span :class="avatarClass">
    <img
      v-if="showImage"
      :src="src"
      :alt="alt || name"
      class="size-full object-cover"
      @error="hasImageError = true"
    >

    <span v-else>
      {{ initials }}
    </span>
  </span>
</template>