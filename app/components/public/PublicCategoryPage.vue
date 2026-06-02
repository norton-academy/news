<script setup lang="ts">
import ArticleListPage from "~/components/public/listing/ArticleListPage.vue";

const props = defineProps<{
  titleKm: string;
  titleEn: string;
  subtitleKm?: string;
  subtitleEn?: string;
  categorySlug: string;
}>();

const languageStore = usePublicLanguageStore();
const route = useRoute();
const router = useRouter();
const articleListStore = usePublicArticleListStore();

const page = computed(() => Number(route.query.page || 1));
const search = computed(() => String(route.query.search || ""));

const title = computed(() => {
  return languageStore.isKhmer ? props.titleKm : props.titleEn;
});

const subtitle = computed(() => {
  return languageStore.isKhmer
    ? props.subtitleKm || "ព័ត៌មានថ្មីៗតាមប្រភេទនេះ។"
    : props.subtitleEn || "Latest stories in this category.";
});

const fetchData = async () => {
  await articleListStore.fetchArticles({
    page: page.value,
    per_page: 12,
    category: props.categorySlug,
    search: search.value || undefined,
  });
};

await useAsyncData(
  () => `category-page-${props.categorySlug}-${page.value}-${search.value}`,
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
    :title="title"
    :subtitle="subtitle"
    :articles="articleListStore.articles"
    :loading="articleListStore.loading"
    :error-message="articleListStore.errorMessage"
    :pagination="articleListStore.pagination"
    @page-change="handlePageChange"
    @search="handleSearch"
  />
</template>