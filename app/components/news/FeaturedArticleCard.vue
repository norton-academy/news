<script setup lang="ts">
import { ChevronRight, Clock, Eye, Zap } from "lucide-vue-next"
import type { Article } from "~/types/news"
import { useCategoryStyles } from "~/composables/useCategoryStyles"

defineProps<{
  article: Article
}>()

const { categoryDot, categoryTextClass } = useCategoryStyles()
</script>

<template>
  <NuxtLink
    :to="`/article/${article.id}`"
    class="group block rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xs hover:shadow-xl hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300"
  >
    <div class="grid md:grid-cols-5 min-h-[260px]">
      <!-- Image -->
      <div
        class="relative md:col-span-3 overflow-hidden bg-slate-100 dark:bg-slate-800 h-56 md:h-auto"
      >
        <img
          :src="article.image"
          :alt="article.title"
          class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
        />
        <span
          v-if="article.isBreaking"
          class="absolute top-3 left-3 flex items-center gap-1 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md"
        >
          <Zap class="size-3 fill-white" /> Live
        </span>
      </div>

      <!-- Content -->
      <div
        class="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50/30 dark:from-slate-900 dark:to-slate-900/60"
      >
        <div>
          <div class="flex items-center gap-2 mb-3.5">
            <span
              class="text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-0.5 rounded-md"
              :class="categoryTextClass(article.category)"
            >
              {{ article.category }}
            </span>
            <span
              class="text-[11px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1.5"
            >
              <span
                class="size-1.5 rounded-full"
                :style="{ background: categoryDot(article.category) }"
              ></span>
              {{ article.source }}
            </span>
          </div>

          <h2
            class="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors duration-200 line-clamp-3 tracking-tight"
          >
            {{ article.title }}
          </h2>
          <p
            class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal opacity-90"
          >
            {{ article.excerpt }}
          </p>
        </div>

        <div
          class="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80"
        >
          <div
            class="flex items-center gap-3.5 text-xs font-medium text-slate-400 dark:text-slate-500"
          >
            <span class="flex items-center gap-1">
              <Clock class="size-3.5" /> {{ article.readTime }}
            </span>
            <span class="flex items-center gap-1">
              <Eye class="size-3.5" /> {{ article.views }}
            </span>
          </div>
          <span
            class="flex items-center gap-1 text-red-600 dark:text-red-500 text-xs font-bold transition-all duration-200 group-hover:gap-2"
          >
            Read Story <ChevronRight class="size-4" />
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
