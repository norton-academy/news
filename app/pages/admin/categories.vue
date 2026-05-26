<script setup lang="ts">
import {
  CheckCircle2,
  Edit,
  FolderTree,
  Plus,
  RefreshCcw,
  ToggleLeft,
  Trash2,
} from "lucide-vue-next";

import type { NewsCategory } from "~/types/news";
import type { NewsCategoryPayload } from "~/composables/useAdminNewsCategory";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "news_categories.view",
  title: "News Categories",
});

const categoryStore = useAdminNewsCategoryStore();
const authStore = useAuthStore();
const toast = useToast();

const categoryRows = computed(() => {
  return Array.isArray(categoryStore.categories) ? categoryStore.categories : [];
});

const categoryCount = computed(() => categoryRows.value.length);

const currentPage = computed(() => categoryStore.pagination.current_page ?? 1);
const lastPage = computed(() => categoryStore.pagination.last_page ?? 1);
const totalItems = computed(() => categoryStore.pagination.total ?? 0);

const loading = computed(() => categoryStore.loading);
const refreshing = computed(() => categoryStore.refreshing);
const errorMessage = computed(() => categoryStore.errorMessage);

const search = ref("");
const page = ref(1);
const perPage = ref(10);

const modalOpen = ref(false);
const selectedCategory = ref<NewsCategory | null>(null);
const saving = computed(() => categoryStore.saving);

const confirmOpen = ref(false);
const confirmLoading = ref(false);
const confirmCategory = ref<NewsCategory | null>(null);

const form = reactive<NewsCategoryPayload>({
  name_km: "",
  name_en: "",
  slug: "",
  icon: "",
  sort_order: 0,
  is_active: true,
});

const formErrors = reactive<Record<string, string>>({
  name_km: "",
  name_en: "",
  slug: "",
  icon: "",
  sort_order: "",
  is_active: "",
});

const columns = [
  { key: "category", label: "Category" },
  { key: "slug", label: "Slug" },
  { key: "icon", label: "Icon" },
  { key: "sort_order", label: "Sort" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Created" },
  { key: "actions", label: "Actions", align: "right" as const },
];

const canCreateCategory = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("news_categories.create")
    : false;
});

const canUpdateCategory = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("news_categories.update")
    : false;
});

const canDeleteCategory = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("news_categories.delete")
    : false;
});

const resetFormErrors = () => {
  Object.keys(formErrors).forEach((key) => {
    formErrors[key] = "";
  });
};

const resetForm = () => {
  form.name_km = "";
  form.name_en = "";
  form.slug = "";
  form.icon = "";
  form.sort_order = 0;
  form.is_active = true;

  resetFormErrors();
};

const fetchCategories = async () => {
  await categoryStore.fetchCategories({
    search: search.value,
    page: page.value,
    per_page: perPage.value,
  });
};

const handleRefresh = async () => {
  await categoryStore.invalidateAndRefresh();
};

const openCreate = () => {
  selectedCategory.value = null;
  resetForm();
  modalOpen.value = true;
};

const openEdit = (category: NewsCategory) => {
  selectedCategory.value = category;

  form.name_km = category.name_km || "";
  form.name_en = category.name_en || "";
  form.slug = category.slug || "";
  form.icon = category.icon || "";
  form.sort_order = Number(category.sort_order || 0);
  form.is_active = Boolean(category.is_active);

  resetFormErrors();
  modalOpen.value = true;
};

const closeModal = () => {
  if (saving.value) return;

  modalOpen.value = false;
  selectedCategory.value = null;
  resetForm();
};

const saveCategory = async () => {
  resetFormErrors();

  try {
    const payload: NewsCategoryPayload = {
      name_km: form.name_km,
      name_en: form.name_en || null,
      slug: form.slug || null,
      icon: form.icon || null,
      sort_order: Number(form.sort_order || 0),
      is_active: Boolean(form.is_active),
    };

    if (selectedCategory.value) {
      await categoryStore.updateCategory(selectedCategory.value.id, payload);

      toast.success(
        "Category updated",
        "News category information was updated successfully."
      );
    } else {
      await categoryStore.createCategory(payload);

      toast.success(
        "Category created",
        "New news category was created successfully."
      );
    }

    closeModal();
  } catch (error: any) {
    toast.error(
      "Save failed",
      error.response?.data?.message ||
        error.message ||
        "Failed to save category"
    );

    const errors = error.response?.data?.errors || error.errors;

    if (errors) {
      formErrors.name_km = errors.name_km?.[0] || "";
      formErrors.name_en = errors.name_en?.[0] || "";
      formErrors.slug = errors.slug?.[0] || "";
      formErrors.icon = errors.icon?.[0] || "";
      formErrors.sort_order = errors.sort_order?.[0] || "";
      formErrors.is_active = errors.is_active?.[0] || "";
    }
  }
};

const openDeleteConfirm = (category: NewsCategory) => {
  confirmCategory.value = category;
  confirmOpen.value = true;
};

const closeDeleteConfirm = () => {
  if (confirmLoading.value) return;

  confirmOpen.value = false;
  confirmCategory.value = null;
};

const handleDelete = async () => {
  if (!confirmCategory.value) return;

  confirmLoading.value = true;

  try {
    await categoryStore.deleteCategory(confirmCategory.value.id);

    toast.success(
      "Category deleted",
      `${confirmCategory.value.name_en || confirmCategory.value.name_km} was deleted successfully.`
    );

    closeDeleteConfirm();
  } catch (error: any) {
    toast.error(
      "Delete failed",
      error.response?.data?.message ||
        error.message ||
        "Failed to delete category"
    );
  } finally {
    confirmLoading.value = false;
  }
};

const handleCategoryAction = (category: NewsCategory, action: string) => {
  if (action === "edit") {
    openEdit(category);
    return;
  }

  if (action === "delete") {
    openDeleteConfirm(category);
  }
};

const resetFilters = async () => {
  search.value = "";
  page.value = 1;

  await fetchCategories();
};

const goPrevious = async () => {
  if (page.value <= 1) return;

  page.value--;
  await fetchCategories();
};

const goNext = async () => {
  if (page.value >= lastPage.value) return;

  page.value++;
  await fetchCategories();
};

const goToPage = async (targetPage: number) => {
  if (targetPage < 1) return;
  if (targetPage > lastPage.value) return;

  page.value = targetPage;
  await fetchCategories();
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, () => {
  page.value = 1;

  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(async () => {
    await fetchCategories();
  }, 400);
});

onMounted(async () => {
  await fetchCategories();
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
      title="News Categories"
      subtitle="Manage public news categories for navbar tabs, article badges, and filtering."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="refreshing" @click="handleRefresh">
          <RefreshCcw class="h-4 w-4" />
          Refresh
        </AppButton>

        <AppButton v-if="canCreateCategory" @click="openCreate">
          <Plus class="h-4 w-4" />
          Add Category
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage
      v-if="errorMessage"
      type="error"
      title="Unable to load categories"
      :message="errorMessage"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Categories"
        :value="totalItems"
        subtitle="All news categories"
        tone="info"
      >
        <template #badge>
          <AppBadge variant="info" shape="square" size="md">
            <FolderTree class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Active"
        :value="categoryStore.activeCategories"
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
        :value="categoryStore.inactiveCategories"
        subtitle="Hidden categories"
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
        :value="categoryCount"
        subtitle="Loaded records"
        tone="default"
      >
        <template #badge>
          <AppBadge variant="default" shape="square" size="md">
            <FolderTree class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>
    </div>

    <FilterBar
      title="Filters"
      subtitle="Search Khmer or English category names."
      columns="1"
    >
      <AppInput
        v-model="search"
        label="Search"
        placeholder="Search category name..."
      />

      <template #actions>
        <AppButton variant="secondary" @click="resetFilters">
          Reset
        </AppButton>
      </template>
    </FilterBar>

    <DataTable
      :columns="columns"
      :rows="categoryRows"
      :loading="loading && categoryCount === 0"
      empty-title="No categories found"
      empty-message="Create your first news category."
    >
      <template #cell-category="{ row }">
        <div>
          <p class="font-bold text-card-foreground">
            {{ row.name_km }}
          </p>

          <p class="mt-1 text-xs text-muted-foreground">
            {{ row.name_en || "No English name" }}
          </p>
        </div>
      </template>

      <template #cell-slug="{ row }">
        <code class="rounded-lg border border-border bg-muted px-2 py-1 text-xs font-semibold">
          {{ row.slug }}
        </code>
      </template>

      <template #cell-icon="{ row }">
        <span class="text-sm text-muted-foreground">
          {{ row.icon || "—" }}
        </span>
      </template>

      <template #cell-sort_order="{ row }">
        <AppBadge variant="default">
          {{ row.sort_order }}
        </AppBadge>
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
              label: 'Edit Category',
              value: 'edit',
              icon: Edit,
              visible: canUpdateCategory,
              description: 'Update category information',
            },
            {
              label: 'Delete Category',
              value: 'delete',
              icon: Trash2,
              variant: 'danger',
              visible: canDeleteCategory,
              description: 'Remove this category',
            },
          ]"
          @select="handleCategoryAction(row, $event)"
        />
      </template>
    </DataTable>

    <TablePagination
      :current-page="currentPage"
      :last-page="lastPage"
      :total="totalItems"
      :per-page="perPage"
      :loading="loading && categoryCount === 0"
      label="categories"
      @previous="goPrevious"
      @next="goNext"
      @page="goToPage"
    />

    <AppModal
      :open="modalOpen"
      :title="selectedCategory ? 'Edit Category' : 'Create Category'"
      :subtitle="
        selectedCategory
          ? 'Update news category information.'
          : 'Create a new public news category.'
      "
      size="lg"
      @close="closeModal"
    >
      <template #icon>
        <FolderTree class="h-5 w-5" />
      </template>

      <form class="space-y-5" @submit.prevent="saveCategory">
        <div class="grid gap-5 md:grid-cols-2">
          <AppInput
            v-model="form.name_km"
            label="Khmer Name"
            placeholder="នយោបាយ"
            :error="formErrors.name_km"
          />

          <AppInput
            v-model="form.name_en"
            label="English Name"
            placeholder="Politics"
            :error="formErrors.name_en"
          />

          <AppInput
            v-model="form.slug"
            label="Slug"
            placeholder="politics"
            :error="formErrors.slug"
          />

          <AppInput
            v-model="form.icon"
            label="Icon"
            placeholder="landmark"
            :error="formErrors.icon"
          />

          <AppInput
            v-model.number="form.sort_order"
            label="Sort Order"
            type="number"
            placeholder="1"
            :error="formErrors.sort_order"
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
            {{ selectedCategory ? "Update Category" : "Create Category" }}
          </AppButton>
        </div>
      </form>
    </AppModal>

    <ConfirmDialog
      :open="confirmOpen"
      title="Delete Category"
      :message="`Are you sure you want to delete ${
        confirmCategory?.name_en || confirmCategory?.name_km || 'this category'
      }? This action cannot be undone.`"
      confirm-label="Delete Category"
      variant="danger"
      :loading="confirmLoading"
      @close="closeDeleteConfirm"
      @confirm="handleDelete"
    />

    <AppRefreshingIndicator :show="refreshing" />
  </div>
</template>