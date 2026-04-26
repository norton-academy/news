<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
    <div class="mb-8">
      <h2 class="text-2xl font-bold tracking-tight text-slate-900">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="mt-2 text-sm leading-6 text-slate-500">
        {{ subtitle }}
      </p>
    </div>

    <slot />
  </div>
</template>