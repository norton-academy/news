<script setup lang="ts">
import type { Article } from '~/types/news'

defineProps<{
  articles: Article[]
  exchangeRate?: {
    usd_khr: string
    label: string
  } | null
}>()
</script>

<template>
  <section class="bg-blue-700 text-white">
    <div class="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden px-4 py-2">
      <div class="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-blue-700">
        Breaking
      </div>

      <div class="flex min-w-0 flex-1 gap-8 overflow-hidden">
        <div class="flex animate-[ticker_30s_linear_infinite] gap-8 whitespace-nowrap">
          <NuxtLink
            v-for="article in articles"
            :key="article.id"
            :to="`/news/${article.slug}`"
            class="text-sm font-medium hover:underline"
          >
            {{ article.title }}
          </NuxtLink>
        </div>
      </div>

      <div v-if="exchangeRate" class="hidden shrink-0 text-sm font-semibold md:block">
        {{ exchangeRate.label }}: {{ exchangeRate.usd_khr }}៛
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes ticker {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>