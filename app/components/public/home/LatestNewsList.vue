<script setup lang="ts">
import { Clock3, Eye, Square } from "lucide-vue-next";
import type { Article } from "~/types/news";

defineProps<{
  articles: Article[];
}>();

const languageStore = usePublicLanguageStore();

const imageFallback =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=900&auto=format&fit=crop";
</script>

<template>
  <section class="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
    <div class="flex items-center justify-between border-b border-slate-100 px-5 py-4">
      <div>
        <h2 class="flex items-center gap-2 text-xl font-black text-slate-800">
          <Square class="h-3 w-3 text-blue-700" />
          {{ languageStore.isKhmer ? "ព័ត៌មានថ្មីៗ" : "Latest News" }}
        </h2>

        <p class="mt-1 text-sm text-slate-500">
          {{ languageStore.isKhmer ? "អត្ថបទថ្មីៗដែលទើបបានផ្សាយ" : "Freshly published articles" }}
        </p>
      </div>

      <NuxtLink
        to="/news"
        class="rounded-xl bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 transition hover:bg-blue-100"
      >
        {{ languageStore.isKhmer ? "មើលទាំងអស់" : "View all" }}
      </NuxtLink>
    </div>

    <div>
      <NuxtLink
        v-for="(article, index) in articles"
        :key="article.id"
        :to="`/news/${article.slug}`"
        class="grid gap-4 border-b border-slate-100 px-5 py-5 transition last:border-b-0 hover:bg-[#fbfaf7] md:grid-cols-[42px_1fr_150px]"
      >
        <div class="hidden pt-1 md:block">
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-500">
            {{ index + 1 }}
          </div>
        </div>

        <div class="min-w-0">
          <div class="mb-2 flex flex-wrap items-center gap-2">
            <span class="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-700">
              {{ languageStore.text(article.category?.name_km || "ព័ត៌មាន", article.category?.name_en || "News") }}
            </span>

            <span class="text-xs font-semibold text-slate-400">
              {{ article.source?.name || "Cobo News" }}
            </span>
          </div>

          <h3 class="line-clamp-2 text-lg font-black leading-8 text-slate-800 hover:text-blue-700">
            {{ article.title }}
          </h3>

          <p
            v-if="article.excerpt"
            class="mt-2 line-clamp-2 text-sm leading-7 text-slate-500"
          >
            {{ article.excerpt }}
          </p>

          <div class="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
            <span class="flex items-center gap-1">
              <Clock3 class="h-3.5 w-3.5" />
              {{ article.published_time || (languageStore.isKhmer ? "ថ្មីៗ" : "Recent") }}
            </span>

            <span class="flex items-center gap-1">
              <Eye class="h-3.5 w-3.5" />
              {{ article.views_count }}
            </span>

            <span>
              {{ languageStore.text(article.province?.name_km || "កម្ពុជា", article.province?.name_en || "Cambodia") }}
            </span>
          </div>
        </div>

        <div class="h-28 overflow-hidden rounded-2xl bg-[#efeee9] md:h-24">
          <img
            :src="article.hero_image || imageFallback"
            :alt="article.title"
            class="h-full w-full object-cover"
          />
        </div>
      </NuxtLink>

      <div
        v-if="!articles.length"
        class="p-10 text-center"
      >
        <p class="font-black text-slate-800">
          {{ languageStore.isKhmer ? "មិនទាន់មានព័ត៌មាន" : "No articles found" }}
        </p>

        <p class="mt-2 text-sm text-slate-500">
          {{ languageStore.isKhmer ? "សូមពិនិត្យមើលម្តងទៀតនៅពេលក្រោយ។" : "Please check again later." }}
        </p>
      </div>
    </div>
  </section>
</template>