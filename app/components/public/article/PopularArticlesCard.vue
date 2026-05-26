<script setup lang="ts">
import { Square } from "lucide-vue-next";
import type { Article } from "~/types/news";

defineProps<{
  articles: Article[];
}>();
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <h3 class="flex items-center gap-2 font-black text-slate-700">
        <Square class="h-3 w-3 text-red-400" />
        អត្ថបទពេញនិយម
      </h3>
    </div>

    <div>
      <NuxtLink
        v-for="(article, index) in articles"
        :key="article.id"
        :to="`/news/${article.slug}`"
        class="grid grid-cols-[28px_1fr] gap-3 border-b border-slate-100 px-5 py-3 last:border-b-0 hover:bg-slate-50"
      >
        <span class="text-sm text-slate-500">
          {{ index + 1 }}
        </span>

        <div>
          <h4 class="line-clamp-2 text-sm font-bold leading-6 text-slate-700">
            {{ article.title }}
          </h4>

          <p class="mt-1 text-xs text-slate-400">
            {{ article.views_count }} views
          </p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>