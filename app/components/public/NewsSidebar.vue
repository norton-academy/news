<script setup lang="ts">
import { CloudSun, Flame, Radio } from 'lucide-vue-next'
import type { Advertisement, Article, NewsCategory } from '~/types/news'

defineProps<{
  weather: {
    city: string
    temperature: string
    condition: string
  } | null
  trendingTopics: NewsCategory[]
  popularArticles: Article[]
  advertisements: Advertisement[]
}>()
</script>

<template>
  <aside class="space-y-4">
    <section class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="mb-4 flex items-center gap-2">
        <CloudSun class="h-5 w-5 text-blue-600" />
        <h3 class="font-black">Live Weather</h3>
      </div>

      <div v-if="weather">
        <p class="text-sm text-slate-500">{{ weather.city }}</p>
        <p class="mt-2 text-4xl font-black">{{ weather.temperature }}</p>
        <p class="text-sm text-slate-500">{{ weather.condition }}</p>
      </div>
    </section>

    <section class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="mb-4 flex items-center gap-2">
        <Flame class="h-5 w-5 text-orange-500" />
        <h3 class="font-black">Trending Topics</h3>
      </div>

      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="topic in trendingTopics"
          :key="topic.id"
          :to="`/categories/${topic.slug}`"
          class="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold hover:bg-blue-600 hover:text-white dark:bg-slate-800"
        >
          #{{ topic.name_en }}
        </NuxtLink>
      </div>
    </section>

    <section class="rounded-3xl border border-dashed border-slate-300 bg-slate-100 p-5 text-center dark:border-slate-700 dark:bg-slate-900">
      <p class="text-xs font-bold uppercase text-slate-400">Advertisement</p>

      <div v-if="advertisements.length" class="mt-3">
        <p class="font-bold">{{ advertisements[0].title }}</p>
      </div>

      <div v-else class="mt-3 text-sm text-slate-500">
        Ad placement slot
      </div>
    </section>

    <section class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="mb-4 flex items-center gap-2">
        <Radio class="h-5 w-5 text-red-500" />
        <h3 class="font-black">Most Popular</h3>
      </div>

      <div class="space-y-3">
        <NuxtLink
          v-for="article in popularArticles"
          :key="article.id"
          :to="`/news/${article.slug}`"
          class="block rounded-2xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <h4 class="line-clamp-2 text-sm font-bold">
            {{ article.title }}
          </h4>
          <p class="mt-1 text-xs text-slate-500">
            {{ article.views_count }} views
          </p>
        </NuxtLink>
      </div>
    </section>
  </aside>
</template>