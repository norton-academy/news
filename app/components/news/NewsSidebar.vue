<script setup lang="ts">
import { TrendingUp, Trophy, ChevronRight, Eye } from "lucide-vue-next"
import type { Article } from "~/types/news"
import { useCategoryStyles } from "~/composables/useCategoryStyles"

defineProps<{
  trendingArticles: Article[]
}>()

const { categoryDot } = useCategoryStyles()
</script>

<template>
  <aside class="xl:col-span-1 space-y-6">

    <!-- ── Trending Today ───────────────────────────────────────────── -->
    <div
      class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden shadow-xs"
    >
      <div
        class="flex items-center gap-2 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40"
      >
        <TrendingUp class="size-4 text-red-500" />
        <span
          class="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white"
        >
          Trending Today
        </span>
      </div>
      <div class="divide-y divide-slate-100 dark:divide-slate-800/50">
        <NuxtLink
          v-for="(article, i) in trendingArticles"
          :key="article.id"
          :to="`/article/${article.id}`"
          class="flex items-start gap-3.5 px-4 py-3.5 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group"
        >
          <span
            class="text-lg font-black leading-none shrink-0 w-5 text-center mt-0.5"
            :class="i === 0 ? 'text-red-500' : 'text-slate-300 dark:text-slate-700'"
          >
            {{ i + 1 }}
          </span>
          <div class="flex-1 min-w-0">
            <p
              class="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors tracking-tight"
            >
              {{ article.title }}
            </p>
            <div
              class="flex items-center gap-2 mt-2 text-[10px] text-slate-400 dark:text-slate-500 font-medium"
            >
              <span
                class="size-1.5 rounded-full"
                :style="{ background: categoryDot(article.category) }"
              ></span>
              <span>{{ article.source }}</span>
              <span class="text-slate-300 dark:text-slate-700">·</span>
              <span class="flex items-center gap-0.5">
                <Eye class="size-3" /> {{ article.views }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- ── Feature Spotlight ───────────────────────────────────────── -->
    <div
      class="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800/80 shadow-md"
    >
      <div class="relative h-36 overflow-hidden bg-slate-800">
        <img
          src="https://static.ips-cambodia.com/wp-content/uploads/2023/05/Cambodia-Sea-Games-32-Opening-Ceremony.jpg"
          alt="Editorial Legacy Spot"
          class="w-full h-full object-cover opacity-60 transition-transform duration-700 ease-out hover:scale-104"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"
        ></div>
        <span
          class="absolute bottom-3 left-4 flex items-center gap-1 text-red-400 text-[10px] font-extrabold uppercase tracking-widest"
        >
          <Trophy class="size-3" /> Feature Analysis
        </span>
      </div>

      <div class="p-5">
        <h3
          class="text-sm font-black text-white leading-snug mb-2 tracking-tight"
        >
          Cambodia SEA Games Legacy: How Sports Infrastructure Transforms Communities
        </h3>
        <p
          class="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4 font-light opacity-90"
        >
          From structural regional stadiums to digital youth programs, an analytical
          study on local updates across structural developments.
        </p>

        <div
          class="flex items-center justify-between pt-3.5 border-t border-slate-800/80"
        >
          <div class="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              class="size-7 rounded-full ring-2 ring-slate-800 shadow-xs"
              alt="Sokha profile"
            />
            <div>
              <p class="text-[10px] font-bold text-slate-200">Sokha Chea</p>
              <p class="text-[9px] text-slate-500 font-medium">5 min read</p>
            </div>
          </div>
          <button
            class="flex items-center gap-0.5 text-xs text-red-400 font-bold hover:text-red-300 transition-colors group/btn"
          >
            Explore
            <ChevronRight
              class="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- ── Daily Dispatch Newsletter ───────────────────────────────── -->
    <div
      class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 p-5 shadow-xs relative overflow-hidden"
    >
      <div class="flex items-center gap-2 mb-2">
        <span class="text-md">📬</span>
        <span
          class="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white"
        >
          Daily Dispatch
        </span>
      </div>
      <p
        class="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-normal"
      >
        Get the top 5 localized insights from Cambodia compressed elegantly directly
        into your mailbox daily.
      </p>
      <div class="space-y-2">
        <input
          type="email"
          placeholder="your@email.com"
          class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
        />
        <button
          class="w-full text-xs font-bold py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs transition-colors duration-200 active:scale-98"
        >
          Subscribe Free
        </button>
      </div>
    </div>

  </aside>
</template>
