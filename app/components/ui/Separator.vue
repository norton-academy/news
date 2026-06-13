<script setup lang="ts">
interface Props {
  orientation?: 'horizontal' | 'vertical'
}

withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
})
</script>

<template>
  <div
    role="separator"
    :aria-orientation="orientation"
    :class="[
      'shrink-0 bg-slate-200 dark:bg-slate-800',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
    ]"
  />
</template>