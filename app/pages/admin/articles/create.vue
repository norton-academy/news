<script setup lang="ts">
import ArticleForm from "~/components/admin/articles/ArticleForm.vue";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "articles.create",
  title: "Create Article",
});

const router = useRouter();
const toast = useToast();
const articleStore = useAdminArticleStore();

const handleSubmit = async (payload: any) => {
  try {
    const article = await articleStore.createArticle(payload);

    toast.success("Article created", "New article was created successfully.");

    await router.push(`/admin/articles/${article.id}/edit`);
  } catch (error: any) {
    toast.error(
      "Create failed",
      error.response?.data?.message || error.message || "Failed to create article"
    );
  }
};

const handleCancel = async () => {
  await router.push("/admin/articles");
};
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Create Article"
      subtitle="Create a new Cambodia news article for the public website."
    />

    <AlertMessage
      v-if="articleStore.errorMessage"
      type="error"
      title="Unable to save article"
      :message="articleStore.errorMessage"
    />

    <ArticleForm
      :saving="articleStore.saving"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>