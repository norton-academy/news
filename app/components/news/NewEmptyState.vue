<script setup lang="ts">
defineProps<{
  topicLabel: string
}>()

const emit = defineEmits<{
  reset: []
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-8 shadow-sm"
  >
    <div class="text-5xl mb-4 animate-bounce duration-1000">🏛️</div>
    <p class="text-slate-800 dark:text-slate-200 font-bold text-xl tracking-tight">
      No stories in {{ topicLabel }} yet
    </p>
    <p class="text-slate-400 dark:text-slate-500 text-sm mt-1.5 mb-6 max-w-sm">
      Check back soon or browse all current Cambodian political coverage.
    </p>
    <button
      class="px-6 py-2.5 bg-red-700 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white rounded-full text-sm font-semibold shadow-md shadow-red-700/10 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200"
      @click="emit('reset')"
    >
      View all Politics
    </button>
  </div>
</template>
