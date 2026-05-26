<script setup lang="ts">
import ArticleListPage from "~/components/public/listing/ArticleListPage.vue";

definePageMeta({
  layout: "public",
  title: "All News",
});

const route = useRoute();
const router = useRouter();
const articleListStore = usePublicArticleListStore();

const page = computed(() => Number(route.query.page || 1));
const search = computed(() => String(route.query.search || ""));

const fetchData = async () => {
  await articleListStore.fetchArticles({
    page: page.value,
    per_page: 12,
    search: search.value || undefined,
  });
};

await useAsyncData(
  () => `news-list-${page.value}-${search.value}`,
  fetchData,
  {
    watch: [page, search],
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
    title="ព័ត៌មានទាំងអស់"
    subtitle="All latest Cambodia news in one place."
    :articles="articleListStore.articles"
    :loading="articleListStore.loading"
    :error-message="articleListStore.errorMessage"
    :pagination="articleListStore.pagination"
    @page-change="handlePageChange"
    @search="handleSearch"
  />
</template>