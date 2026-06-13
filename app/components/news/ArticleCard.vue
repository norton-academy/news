<script setup lang="ts">
import { Calendar, Eye, Clock, Bookmark, Share2 } from "lucide-vue-next"
import type { Article } from "~/types/news"
import { useCategoryStyles } from "~/composables/useCategoryStyles"

defineProps<{
  article: Article
}>()

const { categoryDot, categoryTextClass } = useCategoryStyles()
</script>

<template>
  <article
    class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/70 hover:border-slate-200 dark:hover:border-slate-700 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between"
  >
    <div>
      <!-- Image -->
      <div
        class="relative overflow-hidden h-48 bg-slate-100 dark:bg-slate-800 shrink-0"
      >
        <img
          :src="article.image"
          :alt="article.title"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
        />
        <NuxtLink
          :to="`/${article.category.toLowerCase()}`"
          class="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-md backdrop-blur-md shadow-xs transform transition-transform duration-200 hover:scale-105"
          :class="categoryTextClass(article.category)"
        >
          {{ article.category }}
        </NuxtLink>
      </div>

      <!-- Content -->
      <div class="p-5 pb-0">
        <div class="flex items-center gap-2 mb-2.5 text-xs">
          <span
            class="size-1.5 rounded-full shrink-0"
            :style="{ background: categoryDot(article.category) }"
          ></span>
          <span class="font-bold text-slate-800 dark:text-slate-300 text-[11px]">
            {{ article.source }}
          </span>
          <span class="text-slate-300 dark:text-slate-700 font-light">·</span>
          <span
            class="text-slate-400 dark:text-slate-500 flex items-center gap-1 text-[11px]"
          >
            <Calendar class="size-3" /> {{ article.date }}
          </span>
        </div>

        <NuxtLink :to="`/article/${article.id}`">
          <h3
            class="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors duration-200 tracking-tight"
          >
            {{ article.title }}
          </h3>
        </NuxtLink>

        <p
          class="text-[13px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal opacity-90"
        >
          {{ article.excerpt }}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="p-5 pt-4 mt-4 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between"
    >
      <div
        class="flex items-center gap-3 text-[11px] font-medium text-slate-400 dark:text-slate-500"
      >
        <span class="flex items-center gap-1">
          <Eye class="size-3.5" /> {{ article.views }}
        </span>
        <span class="flex items-center gap-1">
          <Clock class="size-3.5" /> {{ article.readTime }}
        </span>
      </div>
      <div class="flex items-center gap-1.5 text-slate-400 dark:text-slate-600">
        <button
          class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 active:scale-90 transition-all"
          aria-label="Bookmark"
        >
          <Bookmark class="size-3.5" />
        </button>
        <button
          class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 active:scale-90 transition-all"
          aria-label="Share"
        >
          <Share2 class="size-3.5" />
        </button>
      </div>
    </div>
  </article>
</template>
