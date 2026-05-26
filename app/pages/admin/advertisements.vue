<script setup lang="ts">
import {
  BadgeDollarSign,
  CheckCircle2,
  Edit,
  ImageIcon,
  Plus,
  RefreshCcw,
  ToggleLeft,
  Trash2,
} from "lucide-vue-next";

import type { Advertisement } from "~/types/news";
import type { AdvertisementPayload } from "~/composables/useAdminAdvertisement";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "advertisements.view",
  title: "Advertisements",
});

const advertisementStore = useAdminAdvertisementStore();
const authStore = useAuthStore();
const toast = useToast();

const advertisementRows = computed(() => {
  return Array.isArray(advertisementStore.advertisements)
    ? advertisementStore.advertisements
    : [];
});

const advertisementCount = computed(() => advertisementRows.value.length);

const currentPage = computed(() => advertisementStore.pagination.current_page ?? 1);
const lastPage = computed(() => advertisementStore.pagination.last_page ?? 1);
const totalItems = computed(() => advertisementStore.pagination.total ?? 0);

const loading = computed(() => advertisementStore.loading);
const refreshing = computed(() => advertisementStore.refreshing);
const errorMessage = computed(() => advertisementStore.errorMessage);

const search = ref("");
const placement = ref("");
const page = ref(1);
const perPage = ref(10);

const modalOpen = ref(false);
const selectedAdvertisement = ref<Advertisement | null>(null);
const saving = computed(() => advertisementStore.saving);

const confirmOpen = ref(false);
const confirmLoading = ref(false);
const confirmAdvertisement = ref<Advertisement | null>(null);

const form = reactive<AdvertisementPayload>({
  title: "",
  placement: "homepage_sidebar",
  image: "",
  link_url: "",
  is_active: true,
  start_date: null,
  end_date: null,
});

const formErrors = reactive<Record<string, string>>({
  title: "",
  placement: "",
  image: "",
  link_url: "",
  is_active: "",
  start_date: "",
  end_date: "",
});

const placementOptions = [
  { label: "Homepage Sidebar", value: "homepage_sidebar" },
  { label: "Homepage Top", value: "homepage_top" },
  { label: "Article Sidebar", value: "article_sidebar" },
  { label: "Article Middle", value: "article_middle" },
];

const columns = [
  { key: "advertisement", label: "Advertisement" },
  { key: "placement", label: "Placement" },
  { key: "date_range", label: "Date Range" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Created" },
  { key: "actions", label: "Actions", align: "right" as const },
];

const canCreateAdvertisement = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("advertisements.create")
    : false;
});

const canUpdateAdvertisement = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("advertisements.update")
    : false;
});

const canDeleteAdvertisement = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("advertisements.delete")
    : false;
});

const resetFormErrors = () => {
  Object.keys(formErrors).forEach((key) => {
    formErrors[key] = "";
  });
};

const resetForm = () => {
  form.title = "";
  form.placement = "homepage_sidebar";
  form.image = "";
  form.link_url = "";
  form.is_active = true;
  form.start_date = null;
  form.end_date = null;

  resetFormErrors();
};

const fetchAdvertisements = async () => {
  await advertisementStore.fetchAdvertisements({
    search: search.value,
    placement: placement.value,
    page: page.value,
    per_page: perPage.value,
  });
};

const handleRefresh = async () => {
  try {
    await advertisementStore.invalidateAndRefresh();

    toast.success("Advertisements refreshed", "Latest advertisement data was loaded.");
  } catch (error: any) {
    toast.error(
      "Refresh failed",
      error.response?.data?.message ||
        error.message ||
        "Failed to refresh advertisements"
    );
  }
};

const openCreate = () => {
  selectedAdvertisement.value = null;
  resetForm();
  modalOpen.value = true;
};

const openEdit = (advertisement: Advertisement) => {
  selectedAdvertisement.value = advertisement;

  form.title = advertisement.title || "";
  form.placement = advertisement.placement || "homepage_sidebar";
  form.image = advertisement.image || "";
  form.link_url = advertisement.link_url || "";
  form.is_active = Boolean(advertisement.is_active);
  form.start_date = advertisement.start_date || null;
  form.end_date = advertisement.end_date || null;

  resetFormErrors();
  modalOpen.value = true;
};

const closeModal = () => {
  if (saving.value) return;

  modalOpen.value = false;
  selectedAdvertisement.value = null;
  resetForm();
};

const saveAdvertisement = async () => {
  resetFormErrors();

  try {
    const payload: AdvertisementPayload = {
      title: form.title,
      placement: form.placement,
      image: form.image || null,
      link_url: form.link_url || null,
      is_active: Boolean(form.is_active),
      start_date: form.start_date || null,
      end_date: form.end_date || null,
    };

    if (selectedAdvertisement.value) {
      await advertisementStore.updateAdvertisement(
        selectedAdvertisement.value.id,
        payload
      );

      toast.success(
        "Advertisement updated",
        "Advertisement information was updated successfully."
      );
    } else {
      await advertisementStore.createAdvertisement(payload);

      toast.success(
        "Advertisement created",
        "New advertisement was created successfully."
      );
    }

    closeModal();
  } catch (error: any) {
    toast.error(
      "Save failed",
      error.response?.data?.message ||
        error.message ||
        "Failed to save advertisement"
    );

    const errors = error.response?.data?.errors || error.errors;

    if (errors) {
      formErrors.title = errors.title?.[0] || "";
      formErrors.placement = errors.placement?.[0] || "";
      formErrors.image = errors.image?.[0] || "";
      formErrors.link_url = errors.link_url?.[0] || "";
      formErrors.is_active = errors.is_active?.[0] || "";
      formErrors.start_date = errors.start_date?.[0] || "";
      formErrors.end_date = errors.end_date?.[0] || "";
    }
  }
};

const openDeleteConfirm = (advertisement: Advertisement) => {
  confirmAdvertisement.value = advertisement;
  confirmOpen.value = true;
};

const closeDeleteConfirm = () => {
  if (confirmLoading.value) return;

  confirmOpen.value = false;
  confirmAdvertisement.value = null;
};

const handleDelete = async () => {
  if (!confirmAdvertisement.value) return;

  confirmLoading.value = true;

  try {
    await advertisementStore.deleteAdvertisement(confirmAdvertisement.value.id);

    toast.success(
      "Advertisement deleted",
      `${confirmAdvertisement.value.title} was deleted successfully.`
    );

    closeDeleteConfirm();
  } catch (error: any) {
    toast.error(
      "Delete failed",
      error.response?.data?.message ||
        error.message ||
        "Failed to delete advertisement"
    );
  } finally {
    confirmLoading.value = false;
  }
};

const handleAdvertisementAction = (
  advertisement: Advertisement,
  action: string
) => {
  if (action === "edit") {
    openEdit(advertisement);
    return;
  }

  if (action === "delete") {
    openDeleteConfirm(advertisement);
  }
};

const resetFilters = async () => {
  search.value = "";
  placement.value = "";
  page.value = 1;

  await fetchAdvertisements();
};

const goPrevious = async () => {
  if (page.value <= 1) return;

  page.value--;
  await fetchAdvertisements();
};

const goNext = async () => {
  if (page.value >= lastPage.value) return;

  page.value++;
  await fetchAdvertisements();
};

const goToPage = async (targetPage: number) => {
  if (targetPage < 1) return;
  if (targetPage > lastPage.value) return;

  page.value = targetPage;
  await fetchAdvertisements();
};

const placementLabel = (value: string) => {
  return placementOptions.find((item) => item.value === value)?.label || value;
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, () => {
  page.value = 1;

  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(async () => {
    await fetchAdvertisements();
  }, 400);
});

watch(placement, async () => {
  page.value = 1;
  await fetchAdvertisements();
});

onMounted(async () => {
  await fetchAdvertisements();
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
      title="Advertisements"
      subtitle="Manage public ad placements for homepage, article pages, and sidebar slots."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="refreshing" @click="handleRefresh">
          <RefreshCcw class="h-4 w-4" />
          Refresh
        </AppButton>

        <AppButton v-if="canCreateAdvertisement" @click="openCreate">
          <Plus class="h-4 w-4" />
          Add Advertisement
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage
      v-if="errorMessage"
      type="error"
      title="Unable to load advertisements"
      :message="errorMessage"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Ads"
        :value="totalItems"
        subtitle="All advertisements"
        tone="info"
      >
        <template #badge>
          <AppBadge variant="info" shape="square" size="md">
            <BadgeDollarSign class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Active"
        :value="advertisementStore.activeAdvertisements"
        subtitle="Visible ad slots"
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
        :value="advertisementStore.inactiveAdvertisements"
        subtitle="Hidden ads"
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
        :value="advertisementCount"
        subtitle="Loaded records"
        tone="default"
      >
        <template #badge>
          <AppBadge variant="default" shape="square" size="md">
            <ImageIcon class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>
    </div>

    <FilterBar
      title="Filters"
      subtitle="Search advertisements and filter by placement."
      columns="2"
    >
      <AppInput
        v-model="search"
        label="Search"
        placeholder="Search advertisement title..."
      />

      <AppSelect
        v-model="placement"
        label="Placement"
        placeholder="All Placements"
        :options="placementOptions"
      />

      <template #actions>
        <AppButton variant="secondary" @click="resetFilters">
          Reset
        </AppButton>
      </template>
    </FilterBar>

    <DataTable
      :columns="columns"
      :rows="advertisementRows"
      :loading="loading && advertisementCount === 0"
      empty-title="No advertisements found"
      empty-message="Create your first advertisement slot."
    >
      <template #cell-advertisement="{ row }">
        <div class="flex items-center gap-3">
          <div
            class="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted"
          >
            <img
              v-if="row.image"
              :src="row.image"
              :alt="row.title"
              class="h-full w-full object-cover"
            />

            <ImageIcon v-else class="h-5 w-5 text-muted-foreground" />
          </div>

          <div class="min-w-0">
            <p class="truncate text-sm font-bold text-card-foreground">
              {{ row.title }}
            </p>

            <p class="mt-1 text-xs text-muted-foreground">
              {{ row.link_url || "No target link" }}
            </p>
          </div>
        </div>
      </template>

      <template #cell-placement="{ row }">
        <AppBadge variant="info">
          {{ placementLabel(row.placement) }}
        </AppBadge>
      </template>

      <template #cell-date_range="{ row }">
        <div class="text-sm text-muted-foreground">
          <p>{{ row.start_date || "No start" }}</p>
          <p>{{ row.end_date || "No end" }}</p>
        </div>
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
              label: 'Edit Advertisement',
              value: 'edit',
              icon: Edit,
              visible: canUpdateAdvertisement,
              description: 'Update advertisement information',
            },
            {
              label: 'Delete Advertisement',
              value: 'delete',
              icon: Trash2,
              variant: 'danger',
              visible: canDeleteAdvertisement,
              description: 'Remove this advertisement',
            },
          ]"
          @select="handleAdvertisementAction(row, $event)"
        />
      </template>
    </DataTable>

    <TablePagination
      :current-page="currentPage"
      :last-page="lastPage"
      :total="totalItems"
      :per-page="perPage"
      :loading="loading && advertisementCount === 0"
      label="advertisements"
      @previous="goPrevious"
      @next="goNext"
      @page="goToPage"
    />

    <AppModal
      :open="modalOpen"
      :title="selectedAdvertisement ? 'Edit Advertisement' : 'Create Advertisement'"
      :subtitle="
        selectedAdvertisement
          ? 'Update advertisement information.'
          : 'Create a new public advertisement slot.'
      "
      size="lg"
      @close="closeModal"
    >
      <template #icon>
        <BadgeDollarSign class="h-5 w-5" />
      </template>

      <form class="space-y-5" @submit.prevent="saveAdvertisement">
        <div class="grid gap-5 md:grid-cols-2">
          <AppInput
            v-model="form.title"
            label="Advertisement Title"
            placeholder="Homepage Sidebar Advertisement"
            :error="formErrors.title"
          />

          <AppSelect
            v-model="form.placement"
            label="Placement"
            placeholder="Select placement"
            :options="placementOptions"
            :error="formErrors.placement"
          />

          <AppInput
            v-model="form.image"
            label="Image URL"
            placeholder="https://example.com/ad-banner.jpg"
            :error="formErrors.image"
          />

          <AppInput
            v-model="form.link_url"
            label="Link URL"
            placeholder="https://example.com"
            :error="formErrors.link_url"
          />

          <AppInput
            v-model="form.start_date"
            label="Start Date"
            type="date"
            :error="formErrors.start_date"
          />

          <AppInput
            v-model="form.end_date"
            label="End Date"
            type="date"
            :error="formErrors.end_date"
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
          v-if="form.image"
          class="rounded-3xl border border-border bg-muted/40 p-5"
        >
          <p class="mb-3 text-sm font-semibold text-card-foreground">
            Advertisement Preview
          </p>

          <div class="overflow-hidden rounded-3xl border border-border bg-card">
            <img
              :src="form.image"
              alt="Advertisement preview"
              class="h-48 w-full object-cover"
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
            {{ selectedAdvertisement ? "Update Advertisement" : "Create Advertisement" }}
          </AppButton>
        </div>
      </form>
    </AppModal>

    <ConfirmDialog
      :open="confirmOpen"
      title="Delete Advertisement"
      :message="`Are you sure you want to delete ${
        confirmAdvertisement?.title || 'this advertisement'
      }? This action cannot be undone.`"
      confirm-label="Delete Advertisement"
      variant="danger"
      :loading="confirmLoading"
      @close="closeDeleteConfirm"
      @confirm="handleDelete"
    />

    <AppRefreshingIndicator :show="refreshing" />
  </div>
</template>