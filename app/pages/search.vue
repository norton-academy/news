<script setup lang="ts">
import ArticleListPage from "~/components/public/listing/ArticleListPage.vue";

definePageMeta({
  layout: "public",
  title: "Search News",
});

const route = useRoute();
const router = useRouter();
const articleListStore = usePublicArticleListStore();

const page = computed(() => Number(route.query.page || 1));
const keyword = computed(() => String(route.query.q || ""));

const fetchData = async () => {
  await articleListStore.fetchArticles({
    page: page.value,
    per_page: 12,
    search: keyword.value || undefined,
  });
};

await useAsyncData(
  () => `search-${keyword.value}-${page.value}`,
  fetchData,
  {
    watch: [keyword, page],
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

const handleSearch = async (search: string) => {
  await router.push({
    query: {
      q: search || undefined,
      page: 1,
    },
  });
};
</script>

<template>
  <ArticleListPage
    :title="keyword ? `ស្វែងរក: ${keyword}` : 'ស្វែងរកព័ត៌មាន'"
    subtitle="Search Cambodia news by keyword."
    :articles="articleListStore.articles"
    :loading="articleListStore.loading"
    :error-message="articleListStore.errorMessage"
    :pagination="articleListStore.pagination"
    @page-change="handlePageChange"
    @search="handleSearch"
  />
</template>