<script setup lang="ts">
import {
  Archive,
  CheckCircle2,
  Edit,
  Eye,
  Flame,
  Newspaper,
  Plus,
  RefreshCcw,
  Star,
  Trash2,
} from "lucide-vue-next";

import type { Article } from "~/types/news";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "articles.view",
  title: "Articles",
});

const articleStore = useAdminArticleStore();
const authStore = useAuthStore();
const toast = useToast();
const notificationStore = useNotificationStore();

const articleRows = computed<Article[]>(() => {
  return Array.isArray(articleStore.articles) ? articleStore.articles : [];
});

const articleCount = computed(() => articleRows.value.length);

const currentPage = computed(() => articleStore.pagination.current_page ?? 1);
const lastPage = computed(() => articleStore.pagination.last_page ?? 1);
const totalItems = computed(() => articleStore.pagination.total ?? 0);
const perPage = ref(10);

const totalArticles = computed(() => totalItems.value);
const publishedArticles = computed(() => {
  return articleRows.value.filter((item) => item.is_published).length;
});
const draftArticles = computed(() => {
  return articleRows.value.filter((item) => !item.is_published).length;
});
const breakingArticles = computed(() => {
  return articleRows.value.filter((item) => item.is_breaking).length;
});

const loading = computed(() => articleStore.loading);
const refreshing = ref(false);
const errorMessage = computed(() => articleStore.errorMessage);

const search = ref("");
const status = ref("");
const page = ref(1);

const confirmOpen = ref(false);
const confirmLoading = ref(false);
const confirmArticle = ref<Article | null>(null);

const canCreateArticle = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("articles.create")
    : false;
});

const canUpdateArticle = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("articles.update")
    : false;
});

const canDeleteArticle = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("articles.delete")
    : false;
});

const canPublishArticle = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("articles.publish") ||
        authStore.hasPermission("articles.unpublish")
    : false;
});

const canFeatureArticle = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("articles.feature")
    : false;
});

const canBreakingArticle = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("articles.breaking")
    : false;
});

const columns = [
  { key: "article", label: "Article" },
  { key: "category", label: "Category" },
  { key: "source", label: "Source" },
  { key: "status", label: "Status" },
  { key: "views", label: "Views" },
  { key: "flags", label: "Flags" },
  { key: "published_at", label: "Published" },
  { key: "actions", label: "Actions", align: "right" as const },
];

const fetchArticles = async (
  options: {
    force?: boolean;
    silent?: boolean;
  } = {}
) => {
  await articleStore.fetchArticles({
    search: search.value,
    status: status.value as any,
    page: page.value,
    per_page: perPage.value,
  });
};

const handleRefresh = async () => {
  refreshing.value = true;

  try {
    await fetchArticles({
      force: true,
      silent: true,
    });

    toast.success("Articles refreshed", "Latest article data was loaded.");
  } catch (error: any) {
    toast.error(
      "Refresh failed",
      error.response?.data?.message || error.message || "Failed to refresh articles"
    );
  } finally {
    refreshing.value = false;
  }
};

const resetFilters = async () => {
  search.value = "";
  status.value = "";
  page.value = 1;

  await fetchArticles();
};

const openDeleteConfirm = (article: Article) => {
  confirmArticle.value = article;
  confirmOpen.value = true;
};

const closeDeleteConfirm = () => {
  if (confirmLoading.value) return;

  confirmOpen.value = false;
  confirmArticle.value = null;
};

const handleDelete = async () => {
  if (!confirmArticle.value) return;

  confirmLoading.value = true;

  try {
    await articleStore.deleteArticle(confirmArticle.value.id);

    toast.success(
      "Article deleted",
      `"${confirmArticle.value.title}" was deleted successfully.`
    );

    closeDeleteConfirm();

    if (typeof notificationStore?.refreshNotifications === "function") {
      await notificationStore.refreshNotifications();
    }
  } catch (error: any) {
    toast.error(
      "Delete failed",
      error.response?.data?.message || error.message || "Failed to delete article"
    );
  } finally {
    confirmLoading.value = false;
  }
};

const handlePublishToggle = async (article: Article) => {
  try {
    if (article.is_published) {
      await articleStore.unpublishArticle(article.id);
      toast.success("Article unpublished", "Article was moved to draft.");
    } else {
      await articleStore.publishArticle(article.id);
      toast.success("Article published", "Article is now visible on the public site.");
    }

    if (typeof notificationStore?.refreshNotifications === "function") {
      await notificationStore.refreshNotifications();
    }
  } catch (error: any) {
    toast.error(
      "Action failed",
      error.response?.data?.message || error.message || "Failed to update article status"
    );
  }
};

const handleFeaturedToggle = async (article: Article) => {
  try {
    await articleStore.toggleFeatured(article.id);

    toast.success(
      "Featured updated",
      article.is_featured
        ? "Article removed from featured section."
        : "Article added to featured section."
    );
  } catch (error: any) {
    toast.error(
      "Action failed",
      error.response?.data?.message || error.message || "Failed to update featured status"
    );
  }
};

const handleBreakingToggle = async (article: Article) => {
  try {
    await articleStore.toggleBreaking(article.id);

    toast.success(
      "Breaking updated",
      article.is_breaking
        ? "Article removed from breaking ticker."
        : "Article added to breaking ticker."
    );
  } catch (error: any) {
    toast.error(
      "Action failed",
      error.response?.data?.message || error.message || "Failed to update breaking status"
    );
  }
};

const handleArticleAction = async (article: Article, action: string) => {
  if (action === "view") {
    await navigateTo(`/news/${article.slug}`, {
      open: {
        target: "_blank",
      },
    });
    return;
  }

  if (action === "edit") {
    await navigateTo(`/admin/articles/${article.id}/edit`);
    return;
  }

  if (action === "publish") {
    await handlePublishToggle(article);
    return;
  }

  if (action === "featured") {
    await handleFeaturedToggle(article);
    return;
  }

  if (action === "breaking") {
    await handleBreakingToggle(article);
    return;
  }

  if (action === "delete") {
    openDeleteConfirm(article);
  }
};

const goPrevious = async () => {
  if (page.value <= 1) return;

  page.value--;
  await fetchArticles();
};

const goNext = async () => {
  if (page.value >= lastPage.value) return;

  page.value++;
  await fetchArticles();
};

const goToPage = async (targetPage: number) => {
  if (targetPage < 1) return;
  if (targetPage > lastPage.value) return;

  page.value = targetPage;
  await fetchArticles();
};

const statusVariant = (article: Article) => {
  return article.is_published ? "success" : "warning";
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, () => {
  page.value = 1;

  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(async () => {
    await fetchArticles();
  }, 400);
});

watch(status, async () => {
  page.value = 1;
  await fetchArticles();
});

onMounted(async () => {
  await fetchArticles();
});

onBeforeUnmount(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
});
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Articles Management"
      subtitle="Manage Cambodia news articles, publishing status, featured stories, and breaking ticker."
    >
      <template #actions>
        <AppButton
          variant="secondary"
          :loading="refreshing"
          @click="handleRefresh"
        >
          <RefreshCcw class="h-4 w-4" />
          Refresh
        </AppButton>

        <NuxtLink v-if="canCreateArticle" to="/admin/articles/create">
          <AppButton>
            <Plus class="h-4 w-4" />
            Add Article
          </AppButton>
        </NuxtLink>
      </template>
    </PageHeader>

    <AlertMessage
      v-if="errorMessage"
      type="error"
      title="Unable to load articles"
      :message="errorMessage"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Articles"
        :value="totalArticles"
        subtitle="All news articles"
        tone="info"
      >
        <template #badge>
          <AppBadge variant="info" shape="square" size="md">
            <Newspaper class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Published"
        :value="publishedArticles"
        subtitle="Visible on public site"
        tone="success"
      >
        <template #badge>
          <AppBadge variant="success" shape="square" size="md">
            <CheckCircle2 class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Draft"
        :value="draftArticles"
        subtitle="Not published yet"
        tone="warning"
      >
        <template #badge>
          <AppBadge variant="warning" shape="square" size="md">
            <Archive class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Breaking"
        :value="breakingArticles"
        subtitle="Shown in ticker"
        tone="danger"
      >
        <template #badge>
          <AppBadge variant="danger" shape="square" size="md">
            <Flame class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>
    </div>

    <FilterBar
      title="Filters"
      subtitle="Search and filter news articles."
      columns="2"
    >
      <AppInput
        v-model="search"
        label="Search"
        placeholder="Search title or excerpt..."
      />

      <AppSelect
        v-model="status"
        label="Status"
        placeholder="All Status"
        :options="[
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ]"
      />

      <template #actions>
        <AppButton variant="secondary" @click="resetFilters">
          Reset
        </AppButton>
      </template>
    </FilterBar>

    <DataTable
      :columns="columns"
      :rows="articleRows"
      :loading="loading && articleCount === 0"
      empty-title="No articles found"
      empty-message="Create your first article to start publishing Cambodia news."
    >
      <template #cell-article="{ row }">
        <div class="flex items-center gap-3">
          <div
            class="flex h-14 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted"
          >
            <img
              v-if="row.hero_image"
              :src="row.hero_image"
              :alt="row.title"
              class="h-full w-full object-cover"
            />

            <Newspaper v-else class="h-5 w-5 text-muted-foreground" />
          </div>

          <div class="min-w-0">
            <p class="truncate text-sm font-bold text-card-foreground">
              {{ row.title }}
            </p>

            <p class="mt-1 line-clamp-1 text-xs text-muted-foreground">
              {{ row.excerpt || "No excerpt" }}
            </p>
          </div>
        </div>
      </template>

      <template #cell-category="{ row }">
        <AppBadge variant="info">
          {{ row.category?.name_en || row.category?.name_km || "None" }}
        </AppBadge>
      </template>

      <template #cell-source="{ row }">
        <span class="text-sm text-muted-foreground">
          {{ row.source?.name || "None" }}
        </span>
      </template>

      <template #cell-status="{ row }">
        <AppBadge :variant="statusVariant(row)">
          {{ row.is_published ? "Published" : "Draft" }}
        </AppBadge>
      </template>

      <template #cell-views="{ row }">
        <span class="text-sm font-bold text-card-foreground">
          {{ row.views_count }}
        </span>
      </template>

      <template #cell-flags="{ row }">
        <div class="flex flex-wrap gap-2">
          <AppBadge :variant="row.is_featured ? 'warning' : 'default'">
            <Star class="h-3.5 w-3.5" />
            Featured
          </AppBadge>

          <AppBadge :variant="row.is_breaking ? 'danger' : 'default'">
            <Flame class="h-3.5 w-3.5" />
            Breaking
          </AppBadge>
        </div>
      </template>

      <template #cell-published_at="{ row }">
        <span class="text-sm text-muted-foreground">
          {{ row.published_date || "—" }}
        </span>
      </template>

      <template #cell-actions="{ row }">
        <AppDropdown
          width="w-72"
          :items="[
            {
              label: 'View Public Page',
              value: 'view',
              icon: Eye,
              visible: true,
              description: 'Open article on public website',
            },
            {
              label: 'Edit Article',
              value: 'edit',
              icon: Edit,
              visible: canUpdateArticle,
              description: 'Update article information',
            },
            {
              label: row.is_published ? 'Unpublish Article' : 'Publish Article',
              value: 'publish',
              icon: CheckCircle2,
              visible: canPublishArticle,
              description: row.is_published
                ? 'Move article back to draft'
                : 'Show article on public website',
            },
            {
              label: row.is_featured ? 'Remove Featured' : 'Mark Featured',
              value: 'featured',
              icon: Star,
              visible: canFeatureArticle,
              description: 'Control homepage featured section',
            },
            {
              label: row.is_breaking ? 'Remove Breaking' : 'Mark Breaking',
              value: 'breaking',
              icon: Flame,
              visible: canBreakingArticle,
              description: 'Control breaking news ticker',
            },
            {
              label: 'Delete Article',
              value: 'delete',
              icon: Trash2,
              variant: 'danger',
              visible: canDeleteArticle,
              description: 'Remove this article',
            },
          ]"
          @select="handleArticleAction(row, $event)"
        />
      </template>
    </DataTable>

    <TablePagination
      :current-page="currentPage"
      :last-page="lastPage"
      :total="totalItems"
      :per-page="perPage"
      :loading="loading && articleCount === 0"
      label="articles"
      @previous="goPrevious"
      @next="goNext"
      @page="goToPage"
    />

    <ConfirmDialog
      :open="confirmOpen"
      title="Delete Article"
      :message="`Are you sure you want to delete ${
        confirmArticle?.title || 'this article'
      }? This action cannot be undone.`"
      confirm-label="Delete Article"
      variant="danger"
      :loading="confirmLoading"
      @close="closeDeleteConfirm"
      @confirm="handleDelete"
    />

    <AppRefreshingIndicator :show="refreshing" />
  </div>
</template>