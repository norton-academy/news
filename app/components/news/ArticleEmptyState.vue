<script setup lang="ts">
import type { FeedFilter } from "~/types/news"

const props = defineProps<{
  activeFilter: FeedFilter
}>()

const emit = defineEmits<{
  reset: []
}>()

const emptyEmoji = computed(() => {
  if (props.activeFilter === "breaking") return "⚡"
  if (props.activeFilter === "editors_pick") return "⭐"
  return "📰"
})

const emptyTitle = computed(() =>
  props.activeFilter === "breaking"
    ? "No breaking news right now"
    : "No entries available"
)

const emptyMessage = computed(() =>
  props.activeFilter === "breaking"
    ? "All quiet at this moment. Live feeds populate instantly when dispatches arrive."
    : "Try shifting filters or review updates shortly."
)
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-28 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8 shadow-xs"
  >
    <div
      class="size-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-3xl mb-4 shadow-xs animate-pulse"
    >
      {{ emptyEmoji }}
    </div>
    <h4 class="text-slate-800 dark:text-slate-200 font-bold text-lg">
      {{ emptyTitle }}
    </h4>
    <p
      class="text-slate-400 dark:text-slate-500 text-sm mt-1.5 max-w-sm leading-relaxed"
    >
      {{ emptyMessage }}
    </p>
    <button
      @click="emit('reset')"
      class="mt-6 px-6 py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs hover:opacity-90 active:scale-95 transition-all"
    >
      Return to Latest News
    </button>
  </div>
</template>
