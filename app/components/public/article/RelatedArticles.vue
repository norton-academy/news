<script setup lang="ts">
import type { Article } from "~/types/news";

defineProps<{
  articles: Article[];
}>();

const imageFallback =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=900&auto=format&fit=crop";
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div class="mb-4">
      <h2 class="text-xl font-black text-slate-800">
        អត្ថបទពាក់ព័ន្ធ
      </h2>
      <p class="text-sm text-slate-500">
        Related articles from the same category
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <NuxtLink
        v-for="article in articles"
        :key="article.id"
        :to="`/news/${article.slug}`"
        class="group overflow-hidden rounded-2xl border border-slate-100 bg-[#fbfaf7] transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <div class="h-40 bg-[#efeee9]">
          <img
            :src="article.hero_image || imageFallback"
            :alt="article.title"
            class="h-full w-full object-cover"
          />
        </div>

        <div class="p-4">
          <p class="text-xs font-black text-blue-700">
            {{ article.category?.name_km || article.category?.name_en || "ព័ត៌មាន" }}
          </p>

          <h3 class="mt-2 line-clamp-2 font-black leading-7 text-slate-800 group-hover:text-blue-700">
            {{ article.title }}
          </h3>

          <p class="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {{ article.excerpt }}
          </p>
        </div>
      </NuxtLink>
    </div>

    <div
      v-if="!articles.length"
      class="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500"
    >
      មិនទាន់មានអត្ថបទពាក់ព័ន្ធ។
    </div>
  </section>
</template>