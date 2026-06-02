<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next";

import ArticleHeader from "~/components/public/article/ArticleHeader.vue";
import AiSummaryBox from "~/components/public/article/AiSummaryBox.vue";
import ShareBar from "~/components/public/article/ShareBar.vue";
import RelatedArticles from "~/components/public/article/RelatedArticles.vue";

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
  <div class="mx-auto max-w-4xl px-4 py-6">
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

    <main v-else class="space-y-5">
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
        </div>
      </section>

      <ShareBar />

      <RelatedArticles :articles="relatedArticles" />
    </main>
  </div>
</template>