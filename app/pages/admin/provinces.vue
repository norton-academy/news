<script setup lang="ts">
import {
  CheckCircle2,
  Edit,
  MapPin,
  Plus,
  RefreshCcw,
  ToggleLeft,
  Trash2,
} from "lucide-vue-next";

import type { Province } from "~/types/news";
import type { ProvincePayload } from "~/composables/useAdminProvince";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "provinces.view",
  title: "Provinces",
});

const provinceStore = useAdminProvinceStore();
const authStore = useAuthStore();
const toast = useToast();

const provinceRows = computed(() => {
  return Array.isArray(provinceStore.provinces) ? provinceStore.provinces : [];
});

const provinceCount = computed(() => provinceRows.value.length);

const currentPage = computed(() => provinceStore.pagination.current_page ?? 1);
const lastPage = computed(() => provinceStore.pagination.last_page ?? 1);
const totalItems = computed(() => provinceStore.pagination.total ?? 0);

const loading = computed(() => provinceStore.loading);
const refreshing = computed(() => provinceStore.refreshing);
const errorMessage = computed(() => provinceStore.errorMessage);

const search = ref("");
const page = ref(1);
const perPage = ref(10);

const modalOpen = ref(false);
const selectedProvince = ref<Province | null>(null);
const saving = computed(() => provinceStore.saving);

const confirmOpen = ref(false);
const confirmLoading = ref(false);
const confirmProvince = ref<Province | null>(null);

const form = reactive<ProvincePayload>({
  name_km: "",
  name_en: "",
  slug: "",
  is_active: true,
});

const formErrors = reactive<Record<string, string>>({
  name_km: "",
  name_en: "",
  slug: "",
  is_active: "",
});

const columns = [
  { key: "province", label: "Province" },
  { key: "slug", label: "Slug" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Created" },
  { key: "actions", label: "Actions", align: "right" as const },
];

const canCreateProvince = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("provinces.create")
    : false;
});

const canUpdateProvince = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("provinces.update")
    : false;
});

const canDeleteProvince = computed(() => {
  return typeof authStore.hasPermission === "function"
    ? authStore.hasPermission("provinces.delete")
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
  form.is_active = true;

  resetFormErrors();
};

const fetchProvinces = async () => {
  await provinceStore.fetchProvinces({
    search: search.value,
    page: page.value,
    per_page: perPage.value,
  });
};

const handleRefresh = async () => {
  try {
    await provinceStore.invalidateAndRefresh();

    toast.success("Provinces refreshed", "Latest province data was loaded.");
  } catch (error: any) {
    toast.error(
      "Refresh failed",
      error.response?.data?.message ||
        error.message ||
        "Failed to refresh provinces"
    );
  }
};

const openCreate = () => {
  selectedProvince.value = null;
  resetForm();
  modalOpen.value = true;
};

const openEdit = (province: Province) => {
  selectedProvince.value = province;

  form.name_km = province.name_km || "";
  form.name_en = province.name_en || "";
  form.slug = province.slug || "";
  form.is_active = Boolean(province.is_active);

  resetFormErrors();
  modalOpen.value = true;
};

const closeModal = () => {
  if (saving.value) return;

  modalOpen.value = false;
  selectedProvince.value = null;
  resetForm();
};

const saveProvince = async () => {
  resetFormErrors();

  try {
    const payload: ProvincePayload = {
      name_km: form.name_km,
      name_en: form.name_en,
      slug: form.slug || null,
      is_active: Boolean(form.is_active),
    };

    if (selectedProvince.value) {
      await provinceStore.updateProvince(selectedProvince.value.id, payload);

      toast.success(
        "Province updated",
        "Province information was updated successfully."
      );
    } else {
      await provinceStore.createProvince(payload);

      toast.success(
        "Province created",
        "New province was created successfully."
      );
    }

    closeModal();
  } catch (error: any) {
    toast.error(
      "Save failed",
      error.response?.data?.message ||
        error.message ||
        "Failed to save province"
    );

    const errors = error.response?.data?.errors || error.errors;

    if (errors) {
      formErrors.name_km = errors.name_km?.[0] || "";
      formErrors.name_en = errors.name_en?.[0] || "";
      formErrors.slug = errors.slug?.[0] || "";
      formErrors.is_active = errors.is_active?.[0] || "";
    }
  }
};

const openDeleteConfirm = (province: Province) => {
  confirmProvince.value = province;
  confirmOpen.value = true;
};

const closeDeleteConfirm = () => {
  if (confirmLoading.value) return;

  confirmOpen.value = false;
  confirmProvince.value = null;
};

const handleDelete = async () => {
  if (!confirmProvince.value) return;

  confirmLoading.value = true;

  try {
    await provinceStore.deleteProvince(confirmProvince.value.id);

    toast.success(
      "Province deleted",
      `${confirmProvince.value.name_en || confirmProvince.value.name_km} was deleted successfully.`
    );

    closeDeleteConfirm();
  } catch (error: any) {
    toast.error(
      "Delete failed",
      error.response?.data?.message ||
        error.message ||
        "Failed to delete province"
    );
  } finally {
    confirmLoading.value = false;
  }
};

const handleProvinceAction = (province: Province, action: string) => {
  if (action === "edit") {
    openEdit(province);
    return;
  }

  if (action === "delete") {
    openDeleteConfirm(province);
  }
};

const resetFilters = async () => {
  search.value = "";
  page.value = 1;

  await fetchProvinces();
};

const goPrevious = async () => {
  if (page.value <= 1) return;

  page.value--;
  await fetchProvinces();
};

const goNext = async () => {
  if (page.value >= lastPage.value) return;

  page.value++;
  await fetchProvinces();
};

const goToPage = async (targetPage: number) => {
  if (targetPage < 1) return;
  if (targetPage > lastPage.value) return;

  page.value = targetPage;
  await fetchProvinces();
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, () => {
  page.value = 1;

  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(async () => {
    await fetchProvinces();
  }, 400);
});

onMounted(async () => {
  await fetchProvinces();
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
      title="Provinces"
      subtitle="Manage Cambodia province filters for public news browsing."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="refreshing" @click="handleRefresh">
          <RefreshCcw class="h-4 w-4" />
          Refresh
        </AppButton>

        <AppButton v-if="canCreateProvince" @click="openCreate">
          <Plus class="h-4 w-4" />
          Add Province
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage
      v-if="errorMessage"
      type="error"
      title="Unable to load provinces"
      :message="errorMessage"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Provinces"
        :value="totalItems"
        subtitle="All Cambodia provinces"
        tone="info"
      >
        <template #badge>
          <AppBadge variant="info" shape="square" size="md">
            <MapPin class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Active"
        :value="provinceStore.activeProvinces"
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
        :value="provinceStore.inactiveProvinces"
        subtitle="Hidden provinces"
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
        :value="provinceCount"
        subtitle="Loaded records"
        tone="default"
      >
        <template #badge>
          <AppBadge variant="default" shape="square" size="md">
            <MapPin class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>
    </div>

    <FilterBar
      title="Filters"
      subtitle="Search Khmer or English province names."
      columns="1"
    >
      <AppInput
        v-model="search"
        label="Search"
        placeholder="Search province name..."
      />

      <template #actions>
        <AppButton variant="secondary" @click="resetFilters">
          Reset
        </AppButton>
      </template>
    </FilterBar>

    <DataTable
      :columns="columns"
      :rows="provinceRows"
      :loading="loading && provinceCount === 0"
      empty-title="No provinces found"
      empty-message="Create your first province filter."
    >
      <template #cell-province="{ row }">
        <div class="flex items-center gap-3">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted"
          >
            <MapPin class="h-5 w-5 text-muted-foreground" />
          </div>

          <div>
            <p class="font-bold text-card-foreground">
              {{ row.name_km }}
            </p>

            <p class="mt-1 text-xs text-muted-foreground">
              {{ row.name_en }}
            </p>
          </div>
        </div>
      </template>

      <template #cell-slug="{ row }">
        <code class="rounded-lg border border-border bg-muted px-2 py-1 text-xs font-semibold">
          {{ row.slug }}
        </code>
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
              label: 'Edit Province',
              value: 'edit',
              icon: Edit,
              visible: canUpdateProvince,
              description: 'Update province information',
            },
            {
              label: 'Delete Province',
              value: 'delete',
              icon: Trash2,
              variant: 'danger',
              visible: canDeleteProvince,
              description: 'Remove this province',
            },
          ]"
          @select="handleProvinceAction(row, $event)"
        />
      </template>
    </DataTable>

    <TablePagination
      :current-page="currentPage"
      :last-page="lastPage"
      :total="totalItems"
      :per-page="perPage"
      :loading="loading && provinceCount === 0"
      label="provinces"
      @previous="goPrevious"
      @next="goNext"
      @page="goToPage"
    />

    <AppModal
      :open="modalOpen"
      :title="selectedProvince ? 'Edit Province' : 'Create Province'"
      :subtitle="
        selectedProvince
          ? 'Update province information.'
          : 'Create a new public province filter.'
      "
      size="lg"
      @close="closeModal"
    >
      <template #icon>
        <MapPin class="h-5 w-5" />
      </template>

      <form class="space-y-5" @submit.prevent="saveProvince">
        <div class="grid gap-5 md:grid-cols-2">
          <AppInput
            v-model="form.name_km"
            label="Khmer Name"
            placeholder="ភ្នំពេញ"
            :error="formErrors.name_km"
          />

          <AppInput
            v-model="form.name_en"
            label="English Name"
            placeholder="Phnom Penh"
            :error="formErrors.name_en"
          />

          <AppInput
            v-model="form.slug"
            label="Slug"
            placeholder="phnom-penh"
            :error="formErrors.slug"
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
            {{ selectedProvince ? "Update Province" : "Create Province" }}
          </AppButton>
        </div>
      </form>
    </AppModal>

    <ConfirmDialog
      :open="confirmOpen"
      title="Delete Province"
      :message="`Are you sure you want to delete ${
        confirmProvince?.name_en || confirmProvince?.name_km || 'this province'
      }? This action cannot be undone.`"
      confirm-label="Delete Province"
      variant="danger"
      :loading="confirmLoading"
      @close="closeDeleteConfirm"
      @confirm="handleDelete"
    />

    <AppRefreshingIndicator :show="refreshing" />
  </div>
</template>