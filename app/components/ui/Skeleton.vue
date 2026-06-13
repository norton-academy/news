<script setup lang="ts">
interface Props {
  class?: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"
    :class="$props.class"
  />
</template>