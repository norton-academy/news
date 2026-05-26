<script setup lang="ts">
import { Eye } from 'lucide-vue-next'
import type { Article } from '~/types/news'

defineProps<{
  articles: Article[]
}>()

const imageFallback = 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200&auto=format&fit=crop'
</script>

<template>
  <section class="grid gap-4 lg:grid-cols-2">
    <NuxtLink
      v-for="article in articles"
      :key="article.id"
      :to="`/news/${article.slug}`"
      class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="relative h-64 overflow-hidden">
        <img
          :src="article.hero_image || imageFallback"
          :alt="article.title"
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        >

        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div class="absolute left-4 top-4 flex gap-2">
          <span
            v-if="article.category"
            class="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white"
          >
            {{ article.category.name_en }}
          </span>

          <span
            v-if="article.is_breaking"
            class="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white"
          >
            Breaking
          </span>
        </div>

        <div class="absolute bottom-4 left-4 right-4">
          <h2 class="line-clamp-2 text-2xl font-black text-white">
            {{ article.title }}
          </h2>

          <div class="mt-3 flex items-center gap-4 text-sm text-white/80">
            <span>{{ article.source?.name || 'Cobo News' }}</span>
            <span>{{ article.published_time }}</span>
            <span class="flex items-center gap-1">
              <Eye class="h-4 w-4" />
              {{ article.views_count }}
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </section>
</template>