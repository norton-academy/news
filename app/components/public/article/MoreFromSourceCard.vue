<script setup lang="ts">
import { Square } from "lucide-vue-next";
import type { Article } from "~/types/news";

defineProps<{
  sourceName: string;
  articles: Article[];
}>();
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <h3 class="flex items-center gap-2 font-black text-slate-700">
        <Square class="h-3 w-3 text-blue-500" />
        More from {{ sourceName }}
      </h3>
    </div>

    <div>
      <NuxtLink
        v-for="article in articles"
        :key="article.id"
        :to="`/news/${article.slug}`"
        class="block border-b border-slate-100 px-5 py-3 last:border-b-0 hover:bg-slate-50"
      >
        <h4 class="line-clamp-2 text-sm font-bold leading-6 text-slate-700">
          {{ article.title }}
        </h4>

        <p class="mt-1 text-xs text-slate-400">
          {{ article.published_time || "ថ្មីៗ" }}
        </p>
      </NuxtLink>

      <div
        v-if="!articles.length"
        class="p-5 text-sm text-slate-500"
      >
        No more articles from this source.
      </div>
    </div>
  </section>
</template>