<script setup lang="ts">
import { Square } from "lucide-vue-next";
import type { Article } from "~/types/news";

defineProps<{
  articles: Article[];
}>();

const imageFallback =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop";
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <h2 class="flex items-center gap-2 text-lg font-black text-slate-700">
        <Square class="h-3 w-3 text-slate-400" />
        ព័ត៌មានថ្មីៗ
      </h2>
    </div>

    <div>
      <NuxtLink
        v-for="(article, index) in articles"
        :key="article.id"
        :to="`/news/${article.slug}`"
        class="grid grid-cols-[36px_1fr_112px] gap-4 border-b border-slate-100 px-5 py-4 transition last:border-b-0 hover:bg-slate-50"
      >
        <div class="pt-1 text-sm text-slate-500">
          {{ index + 1 }}
        </div>

        <div class="min-w-0">
          <h3 class="line-clamp-2 text-lg font-bold leading-8 text-slate-800">
            {{ article.title }}
          </h3>

          <p class="mt-1 text-sm text-slate-500">
            {{ article.source?.name || "Cobo News" }}
            · {{ article.published_time || "ថ្មីៗ" }}
            ·
            <span class="font-bold text-blue-600">
              {{ article.category?.name_km || article.category?.name_en || "ព័ត៌មាន" }}
            </span>
          </p>
        </div>

        <div class="h-20 rounded-xl bg-[#efeee9]">
          <img
            :src="article.hero_image || imageFallback"
            :alt="article.title"
            class="h-full w-full rounded-xl object-cover"
          />
        </div>
      </NuxtLink>

      <div
        v-if="!articles.length"
        class="p-8 text-center text-sm text-slate-500"
      >
        No articles found. Please check your Laravel API.
      </div>
    </div>
  </section>
</template>