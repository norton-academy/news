<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next";

import ArticleHeader from "~/components/public/article/ArticleHeader.vue";
import AiSummaryBox from "~/components/public/article/AiSummaryBox.vue";
import ShareBar from "~/components/public/article/ShareBar.vue";
import RelatedArticles from "~/components/public/article/RelatedArticles.vue";
import ArticleSidebar from "~/components/public/article/ArticleSidebar.vue";

definePageMeta({
  layout: "public",
  title: "Article Detail",
});

const route = useRoute();
const slug = computed(() => String(route.params.slug));

const articleStore = usePublicArticleStore();

const { data, pending, error } = await useAsyncData(
  () => `article-${slug.value}`,
  () => articleStore.fetchArticle(slug.value),
  {
    watch: [slug],
  }
);

const article = computed(() => data.value?.article || null);
const relatedArticles = computed(() => data.value?.related_articles || []);
const moreFromSource = computed(() => data.value?.more_from_source || []);
const popularArticles = computed(() => data.value?.popular_articles || []);

useHead(() => ({
  title: article.value
    ? `${article.value.title} - Cambodia News Hub`
    : "Cambodia News Hub",
  meta: [
    {
      name: "description",
      content: article.value?.excerpt || "Cambodia news article",
    },
  ],
}));
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div
      v-if="pending"
      class="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500"
    >
      Loading article...
    </div>

    <div
      v-else-if="error || !article"
      class="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-sm font-semibold text-red-700"
    >
      Article not found or failed to load.
    </div>

    <div v-else class="grid gap-6 lg:grid-cols-[1fr_360px]">
      <!-- Main Article -->
      <main class="space-y-5">
        <ArticleHeader :article="article" />

        <AiSummaryBox :summary="article.ai_summary" />

        <section class="rounded-2xl border border-slate-200 bg-white p-5 leading-8 text-slate-700 shadow-sm md:p-7">
          <p v-if="article.excerpt" class="text-lg leading-9">
            {{ article.excerpt }}
          </p>

          <div
            v-if="article.content"
            class="mt-5 whitespace-pre-line text-base leading-9"
          >
            {{ article.content }}
          </div>

          <div class="mt-6">
            <a
              v-if="article.original_url"
              :href="article.original_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white hover:bg-blue-800"
            >
              Read full article
              <ExternalLink class="h-4 w-4" />
            </a>

            <div
              v-else
              class="rounded-xl border border-dashed border-slate-200 bg-[#fbfaf7] p-4 text-sm text-slate-500"
            >
              Original source link is not available for this article.
            </div>
          </div>
        </section>

        <ShareBar />

        <RelatedArticles :articles="relatedArticles" />
      </main>

      <!-- Sidebar -->
      <ArticleSidebar
        :source-name="article.source?.name || 'Cobo News'"
        :more-from-source="moreFromSource"
        :popular-articles="popularArticles"
      />
    </div>
  </div>
</template>