<script setup lang="ts">
import ArticleListPage from "~/components/public/listing/ArticleListPage.vue";

definePageMeta({
  layout: "public",
  title: "Province News",
});

const route = useRoute();
const router = useRouter();
const articleListStore = usePublicArticleListStore();

const slug = computed(() => String(route.params.slug));
const page = computed(() => Number(route.query.page || 1));
const search = computed(() => String(route.query.search || ""));

const title = computed(() => `ព័ត៌មានខេត្ត: ${slug.value}`);

const fetchData = async () => {
  await articleListStore.fetchArticles({
    page: page.value,
    per_page: 12,
    province: slug.value,
    search: search.value || undefined,
  });
};

await useAsyncData(
  () => `province-${slug.value}-${page.value}-${search.value}`,
  fetchData,
  {
    watch: [slug, page, search],
  }
);

const handlePageChange = async (newPage: number) => {
  await router.push({
    query: {
      ...route.query,
      page: newPage,
    },
  });
};

const handleSearch = async (keyword: string) => {
  await router.push({
    query: {
      ...route.query,
      search: keyword || undefined,
      page: 1,
    },
  });
};
</script>

<template>
  <ArticleListPage
    :title="title"
    subtitle="News filtered by selected province."
    :articles="articleListStore.articles"
    :loading="articleListStore.loading"
    :error-message="articleListStore.errorMessage"
    :pagination="articleListStore.pagination"
    @page-change="handlePageChange"
    @search="handleSearch"
  />
</template>