<script setup lang="ts">
defineProps<{
  title: string
  message?: string
}>()
</script>

<template>
  <div class="px-6 py-12 text-center">
    <p class="text-base font-semibold text-slate-900">
      {{ title }}
    </p>

    <p v-if="message" class="mt-2 text-sm text-slate-500">
      {{ message }}
    </p>

    <div v-if="$slots.actions" class="mt-5 flex justify-center">
      <slot name="actions" />
    </div>
  </div>
</template>
