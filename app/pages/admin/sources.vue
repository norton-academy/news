<script setup lang="ts">
import {
  CheckCircle2,
  Edit,
  ExternalLink,
  Globe2,
  Plus,
  Radio,
  RefreshCcw,
  ToggleLeft,
  Trash2,
} from "lucide-vue-next";

import type { NewsSource } from "~/types/news";
import type { NewsSourcePayload } from "~/composables/useAdminNewsSource";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "news_sources.view",
  title: "News Sources",
});

const sourceStore = useAdminNewsSourceStore();
const authStore = useAuthStore();
const toast = useToast();

const sourceRows = computed(() => {
  return Array.isArray(sourceStore.sources) ? sourceStore.sources : [];
});

const sourceCount = computed(() => sourceRows.value.length);

const currentPage = computed(() => sourceStore.pagination.current_page ?? 1);
const lastPage = computed(() => sourceStore.pagination.last_page ?? 1);
const totalItems = computed(() => sourceStore.pagination.total ?? 0);

const loading = computed(() => sourceStore.loading);
const refreshing = computed(() => sourceStore.refreshing);
const errorMessage = computed(() => sourceStore.errorMessage);

const search = ref("");
const page = ref(1);
const perPage = ref(10);

const modalOpen = ref(false);
const selectedSource = ref<NewsSource | null>(null);
const saving = computed(() => sourceStore.saving);

const confirmOpen = ref(false);
const confirmLoading = ref(false);
const confirmSource = ref<NewsSource | null>(null);

const form = reactive<NewsSourcePayload>({
  name: "",
  slug: "",
  logo: "",
  website_url: "",
  rss_url: "",
  is_active: true,
});

const formErrors = reactive<Record<string, string>>({
  name: "",
  slug: "",
  logo: "",
  website_url: "",
  rss_url: "",
  is_active: "",
});

const columns = [
  { key: "source", label: "Source" },
  { key: "slug", label: "Slug" },
  { key: "website_url", label: "Website" },
  { key: "rss_url", label: "RSS" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Created" },
  { key: "actions", label: "Actions", align: "right" as const },
];

const canCreateSource = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("news_sources.create")
    : false;
});

const canUpdateSource = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("news_sources.update")
    : false;
});

const canDeleteSource = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("news_sources.delete")
    : false;
});

const resetFormErrors = () => {
  Object.keys(formErrors).forEach((key) => {
    formErrors[key] = "";
  });
};

const resetForm = () => {
  form.name = "";
  form.slug = "";
  form.logo = "";
  form.website_url = "";
  form.rss_url = "";
  form.is_active = true;

  resetFormErrors();
};

const fetchSources = async () => {
  await sourceStore.fetchSources({
    search: search.value,
    page: page.value,
    per_page: perPage.value,
  });
};

const handleRefresh = async () => {
  try {
    await sourceStore.invalidateAndRefresh();
    toast.success("Sources refreshed", "Latest news source data was loaded.");
  } catch (error: any) {
    toast.error(
      "Refresh failed",
      error.response?.data?.message || error.message || "Failed to refresh sources"
    );
  }
};

const openCreate = () => {
  selectedSource.value = null;
  resetForm();
  modalOpen.value = true;
};

const openEdit = (source: NewsSource) => {
  selectedSource.value = source;

  form.name = source.name || "";
  form.slug = source.slug || "";
  form.logo = source.logo || "";
  form.website_url = source.website_url || "";
  form.rss_url = source.rss_url || "";
  form.is_active = Boolean(source.is_active);

  resetFormErrors();
  modalOpen.value = true;
};

const closeModal = () => {
  if (saving.value) return;

  modalOpen.value = false;
  selectedSource.value = null;
  resetForm();
};

const saveSource = async () => {
  resetFormErrors();

  try {
    const payload: NewsSourcePayload = {
      name: form.name,
      slug: form.slug || null,
      logo: form.logo || null,
      website_url: form.website_url || null,
      rss_url: form.rss_url || null,
      is_active: Boolean(form.is_active),
    };

    if (selectedSource.value) {
      await sourceStore.updateSource(selectedSource.value.id, payload);

      toast.success(
        "Source updated",
        "News source information was updated successfully."
      );
    } else {
      await sourceStore.createSource(payload);

      toast.success(
        "Source created",
        "New news source was created successfully."
      );
    }

    closeModal();
  } catch (error: any) {
    toast.error(
      "Save failed",
      error.response?.data?.message ||
        error.message ||
        "Failed to save source"
    );

    const errors = error.response?.data?.errors || error.errors;

    if (errors) {
      formErrors.name = errors.name?.[0] || "";
      formErrors.slug = errors.slug?.[0] || "";
      formErrors.logo = errors.logo?.[0] || "";
      formErrors.website_url = errors.website_url?.[0] || "";
      formErrors.rss_url = errors.rss_url?.[0] || "";
      formErrors.is_active = errors.is_active?.[0] || "";
    }
  }
};

const openDeleteConfirm = (source: NewsSource) => {
  confirmSource.value = source;
  confirmOpen.value = true;
};

const closeDeleteConfirm = () => {
  if (confirmLoading.value) return;

  confirmOpen.value = false;
  confirmSource.value = null;
};

const handleDelete = async () => {
  if (!confirmSource.value) return;

  confirmLoading.value = true;

  try {
    await sourceStore.deleteSource(confirmSource.value.id);

    toast.success(
      "Source deleted",
      `${confirmSource.value.name} was deleted successfully.`
    );

    closeDeleteConfirm();
  } catch (error: any) {
    toast.error(
      "Delete failed",
      error.response?.data?.message ||
        error.message ||
        "Failed to delete source"
    );
  } finally {
    confirmLoading.value = false;
  }
};

const handleSourceAction = (source: NewsSource, action: string) => {
  if (action === "edit") {
    openEdit(source);
    return;
  }

  if (action === "delete") {
    openDeleteConfirm(source);
  }
};

const resetFilters = async () => {
  search.value = "";
  page.value = 1;

  await fetchSources();
};

const goPrevious = async () => {
  if (page.value <= 1) return;

  page.value--;
  await fetchSources();
};

const goNext = async () => {
  if (page.value >= lastPage.value) return;

  page.value++;
  await fetchSources();
};

const goToPage = async (targetPage: number) => {
  if (targetPage < 1) return;
  if (targetPage > lastPage.value) return;

  page.value = targetPage;
  await fetchSources();
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, () => {
  page.value = 1;

  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(async () => {
    await fetchSources();
  }, 400);
});

onMounted(async () => {
  await fetchSources();
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
      title="News Sources"
      subtitle="Manage publishers, original websites, RSS links, and source visibility."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="refreshing" @click="handleRefresh">
          <RefreshCcw class="h-4 w-4" />
          Refresh
        </AppButton>

        <AppButton v-if="canCreateSource" @click="openCreate">
          <Plus class="h-4 w-4" />
          Add Source
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage
      v-if="errorMessage"
      type="error"
      title="Unable to load sources"
      :message="errorMessage"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Sources"
        :value="totalItems"
        subtitle="All news publishers"
        tone="info"
      >
        <template #badge>
          <AppBadge variant="info" shape="square" size="md">
            <Globe2 class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Active"
        :value="sourceStore.activeSources"
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
        title="Inactive"
        :value="sourceStore.inactiveSources"
        subtitle="Hidden sources"
        tone="warning"
      >
        <template #badge>
          <AppBadge variant="warning" shape="square" size="md">
            <ToggleLeft class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Current Page"
        :value="sourceCount"
        subtitle="Loaded records"
        tone="default"
      >
        <template #badge>
          <AppBadge variant="default" shape="square" size="md">
            <Radio class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>
    </div>

    <FilterBar
      title="Filters"
      subtitle="Search by source name."
      columns="1"
    >
      <AppInput
        v-model="search"
        label="Search"
        placeholder="Search source name..."
      />

      <template #actions>
        <AppButton variant="secondary" @click="resetFilters">
          Reset
        </AppButton>
      </template>
    </FilterBar>

    <DataTable
      :columns="columns"
      :rows="sourceRows"
      :loading="loading && sourceCount === 0"
      empty-title="No sources found"
      empty-message="Create your first news source."
    >
      <template #cell-source="{ row }">
        <div class="flex items-center gap-3">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted"
          >
            <img
              v-if="row.logo"
              :src="row.logo"
              :alt="row.name"
              class="h-full w-full object-cover"
            />

            <Globe2 v-else class="h-5 w-5 text-muted-foreground" />
          </div>

          <div class="min-w-0">
            <p class="truncate text-sm font-bold text-card-foreground">
              {{ row.name }}
            </p>

            <p class="mt-1 text-xs text-muted-foreground">
              {{ row.website_url || "No website" }}
            </p>
          </div>
        </div>
      </template>

      <template #cell-slug="{ row }">
        <code class="rounded-lg border border-border bg-muted px-2 py-1 text-xs font-semibold">
          {{ row.slug }}
        </code>
      </template>

      <template #cell-website_url="{ row }">
        <a
          v-if="row.website_url"
          :href="row.website_url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
        >
          Open
          <ExternalLink class="h-3.5 w-3.5" />
        </a>

        <span v-else class="text-sm text-muted-foreground">—</span>
      </template>

      <template #cell-rss_url="{ row }">
        <a
          v-if="row.rss_url"
          :href="row.rss_url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
        >
          RSS
          <ExternalLink class="h-3.5 w-3.5" />
        </a>

        <span v-else class="text-sm text-muted-foreground">—</span>
      </template>

      <template #cell-status="{ row }">
        <AppBadge :variant="row.is_active ? 'success' : 'warning'">
          {{ row.is_active ? "Active" : "Inactive" }}
        </AppBadge>
      </template>

      <template #cell-created_at="{ row }">
        <span class="text-sm text-muted-foreground">
          {{ row.created_at || "—" }}
        </span>
      </template>

      <template #cell-actions="{ row }">
        <AppDropdown
          width="w-64"
          :items="[
            {
              label: 'Edit Source',
              value: 'edit',
              icon: Edit,
              visible: canUpdateSource,
              description: 'Update source information',
            },
            {
              label: 'Delete Source',
              value: 'delete',
              icon: Trash2,
              variant: 'danger',
              visible: canDeleteSource,
              description: 'Remove this source',
            },
          ]"
          @select="handleSourceAction(row, $event)"
        />
      </template>
    </DataTable>

    <TablePagination
      :current-page="currentPage"
      :last-page="lastPage"
      :total="totalItems"
      :per-page="perPage"
      :loading="loading && sourceCount === 0"
      label="sources"
      @previous="goPrevious"
      @next="goNext"
      @page="goToPage"
    />

    <AppModal
      :open="modalOpen"
      :title="selectedSource ? 'Edit Source' : 'Create Source'"
      :subtitle="
        selectedSource
          ? 'Update source information.'
          : 'Create a new public news source.'
      "
      size="lg"
      @close="closeModal"
    >
      <template #icon>
        <Globe2 class="h-5 w-5" />
      </template>

      <form class="space-y-5" @submit.prevent="saveSource">
        <div class="grid gap-5 md:grid-cols-2">
          <AppInput
            v-model="form.name"
            label="Source Name"
            placeholder="Fresh News"
            :error="formErrors.name"
          />

          <AppInput
            v-model="form.slug"
            label="Slug"
            placeholder="fresh-news"
            :error="formErrors.slug"
          />

          <AppInput
            v-model="form.logo"
            label="Logo URL"
            placeholder="https://example.com/logo.png"
            :error="formErrors.logo"
          />

          <AppInput
            v-model="form.website_url"
            label="Website URL"
            placeholder="https://example.com"
            :error="formErrors.website_url"
          />

          <AppInput
            v-model="form.rss_url"
            label="RSS URL"
            placeholder="https://example.com/rss.xml"
            :error="formErrors.rss_url"
          />

          <AppSelect
            v-model="form.is_active"
            label="Status"
            placeholder="Select status"
            :options="[
              { label: 'Active', value: true },
              { label: 'Inactive', value: false },
            ]"
            :error="formErrors.is_active"
          />
        </div>

        <div
          v-if="form.logo"
          class="rounded-3xl border border-border bg-muted/40 p-5"
        >
          <p class="mb-3 text-sm font-semibold text-card-foreground">
            Logo Preview
          </p>

          <div class="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-border bg-card">
            <img
              :src="form.logo"
              alt="Source logo preview"
              class="h-full w-full object-cover"
            />
          </div>
        </div>

        <div class="flex justify-end gap-3 border-t border-border pt-5">
          <AppButton
            type="button"
            variant="secondary"
            :disabled="saving"
            @click="closeModal"
          >
            Cancel
          </AppButton>

          <AppButton type="submit" variant="primary" :loading="saving">
            {{ selectedSource ? "Update Source" : "Create Source" }}
          </AppButton>
        </div>
      </form>
    </AppModal>

    <ConfirmDialog
      :open="confirmOpen"
      title="Delete Source"
      :message="`Are you sure you want to delete ${
        confirmSource?.name || 'this source'
      }? This action cannot be undone.`"
      confirm-label="Delete Source"
      variant="danger"
      :loading="confirmLoading"
      @close="closeDeleteConfirm"
      @confirm="handleDelete"
    />

    <AppRefreshingIndicator :show="refreshing" />
  </div>
</template>