<script setup lang="ts">
import { Eye, Square } from "lucide-vue-next";
import type { Article } from "~/types/news";

defineProps<{
  article: Article;
}>();
</script>

<template>
  <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="p-5 md:p-7">
      <!-- Breadcrumb -->
      <nav class="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <NuxtLink to="/" class="font-bold text-blue-700 hover:underline">
          ទំព័រដើម
        </NuxtLink>

        <span>/</span>

        <NuxtLink
          v-if="article.category"
          :to="`/categories/${article.category.slug}`"
          class="font-bold text-blue-700 hover:underline"
        >
          {{ article.category.name_km || article.category.name_en }}
        </NuxtLink>

        <span v-else>ព័ត៌មាន</span>
      </nav>

      <!-- Badges -->
      <div class="mb-4 flex flex-wrap gap-2">
        <span
          class="rounded-lg bg-blue-50 px-3 py-1 text-xs font-black text-blue-700"
        >
          {{ article.category?.name_km || article.category?.name_en || "ព័ត៌មាន" }}
        </span>

        <span
          v-if="article.is_breaking"
          class="rounded-lg bg-red-50 px-3 py-1 text-xs font-black text-red-700"
        >
          ព័ត៌មានបន្ទាន់
        </span>

        <span
          v-if="article.province"
          class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-black text-slate-600"
        >
          {{ article.province.name_km || article.province.name_en }}
        </span>
      </div>

      <!-- Title -->
      <h1 class="text-3xl font-black leading-[1.55] text-slate-900 md:text-4xl">
        {{ article.title }}
      </h1>

      <!-- Byline -->
      <div class="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-700">
            {{ article.source?.name?.slice(0, 2) || "CN" }}
          </div>

          <div>
            <p class="font-black text-slate-700">
              {{ article.source?.name || "Cobo News" }}
            </p>

            <p class="text-sm text-slate-500">
              {{ article.published_date || "ថ្ងៃនេះ" }}
              ·
              {{ article.published_time || "ថ្មីៗ" }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 text-sm font-bold text-slate-500">
          <Eye class="h-4 w-4" />
          {{ article.views_count }} views
        </div>
      </div>
    </div>

    <!-- Hero Image -->
    <figure class="border-t border-slate-100">
      <div class="h-[260px] bg-[#efeee9] md:h-[430px]">
        <img
          :src="article.hero_image || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop'"
          :alt="article.title"
          class="h-full w-full object-cover"
        />
      </div>

      <figcaption class="flex items-center gap-2 px-5 py-3 text-sm text-slate-500">
        <Square class="h-3 w-3 text-slate-400" />
        Photo credit:
        {{ article.photo_credit || article.source?.name || "Cobo News" }}
      </figcaption>
    </figure>
  </article>
</template>