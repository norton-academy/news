<script setup lang="ts">
import ArticleForm from "~/components/admin/articles/ArticleForm.vue";
import type { ArticlePayload } from "~/composables/useAdminArticle";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "articles.update",
  title: "Edit Article",
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

const articleStore = useAdminArticleStore();
const optionsApi = useAdminNewsOptions();

const formRef = ref<InstanceType<typeof ArticleForm> | null>(null);

const id = computed(() => String(route.params.id));

const categories = ref([]);
const sources = ref([]);
const provinces = ref([]);

const loadingPage = ref(true);

const article = computed(() => articleStore.selectedArticle);

const loadPage = async () => {
  loadingPage.value = true;

  try {
    const [categoryResponse, sourceResponse, provinceResponse] =
      await Promise.all([
        optionsApi.getCategories(),
        optionsApi.getSources(),
        optionsApi.getProvinces(),
        articleStore.fetchArticle(id.value),
      ]);

    categories.value = categoryResponse.data.categories;
    sources.value = sourceResponse.data.sources;
    provinces.value = provinceResponse.data.provinces;
  } finally {
    loadingPage.value = false;
  }
};

const handleSubmit = async (payload: ArticlePayload) => {
  try {
    await articleStore.updateArticle(id.value, payload);

    toast.success(
      "Article updated",
      "Article information was updated successfully."
    );

    await articleStore.fetchArticle(id.value);
  } catch (error: any) {
    toast.error(
      "Update failed",
      error.response?.data?.message ||
        error.message ||
        "Failed to update article"
    );

    const errors = error.response?.data?.errors || error.errors;

    if (errors && formRef.value) {
      formRef.value.setErrors(errors);
    }
  }
};

const handleCancel = async () => {
  await router.push("/admin/articles");
};

onMounted(async () => {
  await loadPage();
});
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Edit Article"
      subtitle="Update article content, publishing status, source, and homepage flags."
    />

    <AlertMessage
      v-if="articleStore.errorMessage"
      type="error"
      title="Unable to load article"
      :message="articleStore.errorMessage"
    />

    <div
      v-if="loadingPage"
      class="rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground"
    >
      Loading article...
    </div>

    <ArticleForm
      v-else-if="article"
      ref="formRef"
      :article="article"
      :saving="articleStore.saving"
      :categories="categories"
      :sources="sources"
      :provinces="provinces"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />

    <AlertMessage
      v-else
      type="error"
      title="Article not found"
      message="The selected article does not exist or you do not have permission to view it."
    />
  </div>
</template>