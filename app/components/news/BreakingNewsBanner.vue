<script setup lang="ts">
import { Zap } from "lucide-vue-next"
import type { Article } from "~/types/news"

defineProps<{
  articles: Article[]
}>()
</script>

<template>
  <div
    v-if="articles.length"
    class="bg-red-600 text-white text-xs font-semibold h-10 flex items-center relative overflow-hidden z-30 shadow-md"
  >
    <div
      class="absolute left-0 top-0 bottom-0 px-4 bg-red-700 flex items-center gap-1.5 z-10 shadow-[4px_0_12px_rgba(0,0,0,0.15)] select-none"
    >
      <Zap class="size-3.5 fill-white animate-pulse" />
      <span class="tracking-wider uppercase text-[11px] font-black">Breaking</span>
    </div>

    <div class="marquee-track flex items-center pl-32 hover:[animation-play-state:paused]">
      <div class="flex items-center gap-16 whitespace-nowrap animate-marquee">
        <NuxtLink
          v-for="a in [...articles, ...articles]"
          :key="a.id"
          :to="`/article/${a.id}`"
          class="flex items-center gap-2 hover:text-slate-200 transition-colors font-medium text-sm group"
        >
          <span
            class="w-1.5 h-1.5 rounded-full bg-white opacity-60 group-hover:scale-125 transition-transform"
          ></span>
          {{ a.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-track {
  width: 100%;
  display: flex;
}
@keyframes marqueeAnimation {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}
.animate-marquee {
  animation: marqueeAnimation 35s linear infinite;
}
</style>
