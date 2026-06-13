<script setup lang="ts">
import { Eye, Clock, Zap } from 'lucide-vue-next'
import type { PoliticsArticle } from '~/types/news'

const props = defineProps<{
  article: PoliticsArticle
  topicIcon: unknown
  topicLabel: string
}>()
</script>

<template>
  <NuxtLink
    :to="`/article/${article.id}`"
    class="group block mb-8 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 hover:border-red-300 dark:hover:border-red-900/60 shadow-xs hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none active:scale-[0.99] transition-all duration-500 relative isolate"
  >
    <div class="relative h-72 md:h-96 overflow-hidden bg-slate-100 dark:bg-slate-900">
      <img
        :src="article.image"
        :alt="article.title"
        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 via-40% to-transparent"
      ></div>

      <!-- Badges -->
      <div
        class="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none"
      >
        <span
          v-if="article.isBreaking"
          class="flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg"
        >
          <Zap class="size-3 fill-white" /> Live
        </span>
        <span
          class="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1.5 rounded-full border border-white/10 shadow-lg ml-auto"
        >
          <component :is="topicIcon" class="size-3" />
          {{ topicLabel }}
        </span>
      </div>

      <!-- Content overlay -->
      <div class="absolute bottom-0 inset-x-0 p-6 md:p-8 flex flex-col justify-end">
        <p class="text-red-400 text-xs font-bold uppercase tracking-widest mb-2.5">
          {{ article.source }}
        </p>
        <h1
          class="text-white text-2xl md:text-3xl font-black leading-tight tracking-tight mb-3 group-hover:text-red-100 transition-colors duration-300 max-w-3xl"
        >
          {{ article.title }}
        </h1>
        <p
          class="text-slate-300 text-sm leading-relaxed line-clamp-2 max-w-2xl hidden md:block opacity-90 group-hover:opacity-100 transition-opacity"
        >
          {{ article.excerpt }}
        </p>
        <div
          class="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 text-xs text-slate-300/90 font-medium"
        >
          <span class="flex items-center gap-1.5">
            <Eye class="size-4 opacity-70" /> {{ article.views }}
          </span>
          <span class="flex items-center gap-1.5">
            <Clock class="size-4 opacity-70" /> {{ article.readTime }} read
          </span>
          <span class="ml-auto opacity-70">{{ article.date }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
