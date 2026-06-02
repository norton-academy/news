<script setup lang="ts">
import { Eye } from "lucide-vue-next";
import type { Article } from "~/types/news";

defineProps<{
  articles: Article[];
}>();

const languageStore = usePublicLanguageStore();

const imageFallback =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop";
</script>

<template>
  <section class="grid gap-5 md:grid-cols-2">
    <NuxtLink
      v-for="article in articles"
      :key="article.id"
      :to="`/news/${article.slug}`"
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div class="relative h-56 bg-[#efeee9]">
        <img
          :src="article.hero_image || imageFallback"
          :alt="article.title"
          class="h-full w-full object-cover opacity-90"
        />

        <div class="absolute left-4 top-4 rounded-lg bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
          {{ languageStore.text(article.category?.name_km || "ព័ត៌មាន", article.category?.name_en || "News") }}
        </div>
      </div>

      <div class="p-5">
        <div class="mb-3 flex items-center justify-between text-sm">
          <span class="font-bold text-slate-500">
            ● {{ article.source?.name || "Cobo News" }}
          </span>

          <span class="text-slate-400">
            {{ article.published_time || "ថ្មីៗ" }}
          </span>
        </div>

        <h2 class="line-clamp-2 text-xl font-black leading-8 text-slate-800">
          {{ article.title }}
        </h2>

        <div class="mt-4 flex items-center gap-4 text-sm text-slate-400">
          <span class="flex items-center gap-1">
            <Eye class="h-4 w-4" />
            {{ article.views_count }}
          </span>

          <span>
            {{ languageStore.text(article.province?.name_km || "កម្ពុជា", article.province?.name_en || "Cambodia") }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </section>
</template>
