<script setup lang="ts">
import { Zap } from 'lucide-vue-next'
import type { PoliticsArticle } from '~/types/news'

defineProps<{
  articles: PoliticsArticle[]
}>()
</script>

<template>
  <div
    v-if="articles.length"
    class="bg-red-700 dark:bg-red-900 text-white text-xs font-semibold px-4 py-2.5 flex items-center gap-4 overflow-hidden border-b border-red-800/40 relative z-10"
  >
    <span
      class="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full shrink-0 uppercase tracking-wider text-[11px] shadow-sm animate-pulse"
    >
      <Zap class="size-3 fill-white" /> Breaking
    </span>

    <div class="w-full overflow-hidden relative flex items-center">
      <div
        class="marquee-content whitespace-nowrap opacity-95 hover:[animation-play-state:paused] cursor-pointer"
      >
        <span v-for="n in 3" :key="n" class="inline-block pr-16">
          {{ articles[0].title }}
          <span class="mx-3 opacity-40">|</span>
          {{ articles[0].titleKm }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-content {
  display: inline-block;
  animation: marquee 25s linear infinite;
}
@keyframes marquee {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-33.333%, 0, 0); }
}
</style>
