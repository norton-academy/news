<script setup lang="ts">
import { Clock3, Eye } from "lucide-vue-next";
import type { Article } from "~/types/news";

const props = defineProps<{
  articles: Article[];
}>();

const languageStore = usePublicLanguageStore();

const imageFallback =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop";

const mainArticle = computed(() => props.articles[0] || null);
const sideArticles = computed(() => props.articles.slice(1, 4));

const articleUrl = (article: Article) => {
  return `/news/${article.slug}`;
};
</script>

<template>
  <section>
    <div class="mb-5">
      <p class="text-sm font-black uppercase tracking-wide text-blue-700">
        {{ languageStore.isKhmer ? "ព័ត៌មានសំខាន់" : "Top Stories" }}
      </p>

      <h1 class="mt-1 text-2xl font-black text-slate-900 md:text-4xl">
        {{ languageStore.isKhmer ? "ព័ត៌មានថ្មីៗពីកម្ពុជា" : "Latest Cambodia News" }}
      </h1>
    </div>

    <div
      v-if="mainArticle"
      class="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]"
    >
      <NuxtLink
        :to="articleUrl(mainArticle)"
        class="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        <div class="relative h-[360px] bg-[#efeee9] md:h-[500px]">
          <img
            :src="mainArticle.hero_image || imageFallback"
            :alt="mainArticle.title"
            class="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          <div class="absolute left-5 top-5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-black text-white">
            {{ languageStore.text(mainArticle.category?.name_km || "ព័ត៌មាន", mainArticle.category?.name_en || "News") }}
          </div>

          <div class="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            <h2 class="line-clamp-3 text-2xl font-black leading-[1.5] text-white md:text-4xl">
              {{ mainArticle.title }}
            </h2>

            <p
              v-if="mainArticle.excerpt"
              class="mt-3 line-clamp-2 max-w-3xl text-sm leading-7 text-white/80 md:text-base"
            >
              {{ mainArticle.excerpt }}
            </p>

            <div class="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold text-white/80">
              <span>{{ mainArticle.source?.name || "Cobo News" }}</span>

              <span class="flex items-center gap-1">
                <Clock3 class="h-4 w-4" />
                {{ mainArticle.published_time || (languageStore.isKhmer ? "ថ្មីៗ" : "Recent") }}
              </span>

              <span class="flex items-center gap-1">
                <Eye class="h-4 w-4" />
                {{ mainArticle.views_count }}
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>

      <div class="grid gap-5">
        <NuxtLink
          v-for="article in sideArticles"
          :key="article.id"
          :to="articleUrl(article)"
          class="group grid grid-cols-[120px_1fr] gap-4 rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div class="h-28 overflow-hidden rounded-2xl bg-[#efeee9]">
            <img
              :src="article.hero_image || imageFallback"
              :alt="article.title"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <div class="min-w-0 py-1">
            <p class="text-xs font-black text-blue-700">
              {{ languageStore.text(article.category?.name_km || "ព័ត៌មាន", article.category?.name_en || "News") }}
            </p>

            <h3 class="mt-1 line-clamp-2 text-base font-black leading-7 text-slate-800 group-hover:text-blue-700">
              {{ article.title }}
            </h3>

            <p class="mt-2 text-xs font-semibold text-slate-400">
              {{ article.source?.name || "Cobo News" }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
