<script setup lang="ts">
import { Clock3, Eye } from "lucide-vue-next";
import type { Article, NewsCategory } from "~/types/news";

const props = defineProps<{
  category: NewsCategory;
  articles: Article[];
}>();

const languageStore = usePublicLanguageStore();

const imageFallback =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=900&auto=format&fit=crop";

const mainArticle = computed(() => props.articles[0] || null);
const sideArticles = computed(() => props.articles.slice(1, 5));

const categoryTitle = computed(() => {
  return languageStore.text(props.category.name_km, props.category.name_en);
});

const categoryRouteMap: Record<string, string> = {
  politics: "/politics",
  business: "/business",
  technology: "/technology",
  sports: "/sports",
  health: "/health",
  entertainment: "/entertainment",
};

const categoryUrl = computed(() => {
  return categoryRouteMap[props.category.slug] || "/";
});

const articleUrl = (article: Article) => {
  return `/news/${article.slug}`;
};
</script>

<template>
  <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
    <div class="mb-5 flex items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-black text-slate-900 md:text-2xl">
          {{ categoryTitle }}
        </h2>

        <p class="mt-1 text-sm text-slate-500">
          {{ languageStore.isKhmer ? "ព័ត៌មានថ្មីៗក្នុងប្រភេទនេះ" : "Latest stories in this category" }}
        </p>
      </div>

      <NuxtLink
        :to="categoryUrl"
        class="shrink-0 rounded-xl bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 transition hover:bg-blue-100"
      >
        {{ languageStore.isKhmer ? "មើលទាំងអស់" : "View all" }}
      </NuxtLink>
    </div>

    <div
      v-if="mainArticle"
      class="grid gap-5 lg:grid-cols-[1fr_1.1fr]"
    >
      <NuxtLink
        :to="articleUrl(mainArticle)"
        class="group overflow-hidden rounded-3xl bg-[#f7f6f2] transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <div class="h-56 overflow-hidden bg-[#efeee9]">
          <img
            :src="mainArticle.hero_image || imageFallback"
            :alt="mainArticle.title"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div class="p-5">
          <p class="text-xs font-black text-blue-700">
            {{ mainArticle.source?.name || "Cobo News" }}
          </p>

          <h3 class="mt-2 line-clamp-2 text-xl font-black leading-8 text-slate-900 group-hover:text-blue-700">
            {{ mainArticle.title }}
          </h3>

          <p
            v-if="mainArticle.excerpt"
            class="mt-2 line-clamp-2 text-sm leading-7 text-slate-500"
          >
            {{ mainArticle.excerpt }}
          </p>

          <div class="mt-4 flex items-center gap-4 text-xs font-semibold text-slate-400">
            <span class="flex items-center gap-1">
              <Clock3 class="h-3.5 w-3.5" />
              {{ mainArticle.published_time || (languageStore.isKhmer ? "ថ្មីៗ" : "Recent") }}
            </span>

            <span class="flex items-center gap-1">
              <Eye class="h-3.5 w-3.5" />
              {{ mainArticle.views_count }}
            </span>
          </div>
        </div>
      </NuxtLink>

      <div class="grid gap-3 sm:grid-cols-2">
        <NuxtLink
          v-for="article in sideArticles"
          :key="article.id"
          :to="articleUrl(article)"
          class="group rounded-2xl border border-slate-100 bg-white p-3 transition hover:bg-[#fbfaf7]"
        >
          <div class="mb-3 h-28 overflow-hidden rounded-2xl bg-[#efeee9]">
            <img
              :src="article.hero_image || imageFallback"
              :alt="article.title"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <p class="text-xs font-bold text-slate-400">
            {{ article.source?.name || "Cobo News" }}
          </p>

          <h4 class="mt-1 line-clamp-2 text-sm font-black leading-6 text-slate-800 group-hover:text-blue-700">
            {{ article.title }}
          </h4>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
