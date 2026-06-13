<script setup lang="ts">
import { Building2, Flame, Eye } from 'lucide-vue-next'
import type { PoliticsArticle, SubTopic } from '~/types/news'

const props = defineProps<{
  subTopics: SubTopic[]
  trendingArticles: PoliticsArticle[]
  activeTopic: string
}>()

const emit = defineEmits<{
  'update:activeTopic': [value: string]
}>()
</script>

<template>
  <aside class="xl:col-span-1 space-y-6 w-full">

    <!-- ── Topics Filter ──────────────────────────────────────────── -->
    <div
      class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden shadow-xs"
    >
      <div
        class="flex items-center gap-2 px-4 py-4 border-b border-slate-100 dark:border-slate-800"
      >
        <Building2 class="size-4 text-red-700 dark:text-red-500" />
        <span class="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
          Topics
        </span>
      </div>
      <div class="p-2.5 flex flex-col gap-1.5">
        <button
          v-for="topic in subTopics"
          :key="topic.key"
          class="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-left active:scale-[0.98] cursor-pointer"
          :class="
            activeTopic === topic.key
              ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
          "
          @click="emit('update:activeTopic', topic.key)"
        >
          <span class="flex items-center gap-2.5">
            <component :is="topic.icon" class="size-4 opacity-80" />
            <span>{{ topic.label }}</span>
          </span>
          <span
            class="text-[10px] font-extrabold px-2 py-0.5 rounded-full min-w-6 text-center transition-colors duration-300"
            :class="
              activeTopic === topic.key
                ? 'bg-red-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            "
          >
            {{ topic.count }}
          </span>
        </button>
      </div>
    </div>

    <!-- ── Trending Insights ──────────────────────────────────────── -->
    <div
      class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden shadow-xs"
    >
      <div
        class="flex items-center gap-2 px-4 py-4 border-b border-slate-100 dark:border-slate-800"
      >
        <Flame class="size-4 text-red-500 fill-red-500/10" />
        <span class="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
          Trending Insights
        </span>
      </div>
      <div class="divide-y divide-slate-100 dark:divide-slate-800">
        <NuxtLink
          v-for="(article, i) in trendingArticles"
          :key="article.id"
          :to="`/article/${article.id}`"
          class="flex items-start gap-4 px-4 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 active:scale-[0.99] transition-all duration-300 group"
        >
          <span
            class="text-xl font-black leading-none shrink-0 w-6 text-center"
            :class="
              i === 0
                ? 'text-red-600 dark:text-red-500'
                : 'text-slate-200 dark:text-slate-700'
            "
          >
            {{ i + 1 }}
          </span>
          <div class="flex-1 min-w-0">
            <p
              class="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors duration-300"
            >
              {{ article.title }}
            </p>
            <div class="flex items-center gap-1.5 mt-2 text-[10px] font-medium text-slate-400">
              <span class="text-red-600 dark:text-red-500 font-bold">{{ article.source }}</span>
              <span>·</span>
              <span class="flex items-center gap-1">
                <Eye class="size-3" /> {{ article.views }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- ── Related Sections ───────────────────────────────────────── -->
    <div
      class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-5 shadow-xs"
    >
      <p
        class="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3.5"
      >
        Related sections
      </p>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="cat in ['Business', 'Education', 'Law & Justice']"
          :key="cat"
          :to="`/${cat.toLowerCase().replace(/ & /g, '-')}`"
          class="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-red-200 dark:hover:border-red-900 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 active:scale-95 transition-all duration-200"
        >
          {{ cat }}
        </NuxtLink>
      </div>
    </div>

    <!-- ── Telegram CTA ───────────────────────────────────────────── -->
    <div
      class="bg-gradient-to-br from-slate-900 via-red-950 to-red-900 dark:from-slate-900 dark:to-slate-950 rounded-2xl p-6 text-white border border-red-900/30 dark:border-slate-800 relative overflow-hidden shadow-md"
    >
      <div
        class="absolute -right-6 -bottom-6 size-24 bg-red-600/10 rounded-full blur-xl"
      ></div>
      <p class="text-base font-black tracking-tight mb-1.5">Stay Updated Directly</p>
      <p class="text-xs text-slate-300 mb-4 leading-relaxed opacity-90">
        Get verified Cambodian politics news delivered straight to your Telegram feed.
      </p>
      <a
        href="https://t.me/khmerfeed"
        target="_blank"
        class="flex items-center justify-center gap-2 w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-xl text-xs font-bold active:scale-98 transition-all duration-300 backdrop-blur-xs text-center"
      >
        Join @KhmerFeed
      </a>
    </div>

  </aside>
</template>
