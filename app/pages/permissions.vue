<script setup lang="ts">
import type { PermissionItem, PermissionPagination } from "~/composables/usePermission";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "permission.view",
});

const {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} = usePermission();

const toast = useToast();
const authStore = useAuthStore();

const permissions = ref<PermissionItem[]>([]);
const search = ref("");
const page = ref(1);
const perPage = ref(10);
const loading = ref(false);
const saving = ref(false);
const deleting = ref(false);
const errorMessage = ref("");

const modalOpen = ref(false);
const deleteModalOpen = ref(false);
const selectedPermission = ref<PermissionItem | null>(null);

const form = reactive({
  name: "",
  guard_name: "web",
});

const formErrors = reactive<Record<string, string>>({
  name: "",
  guard_name: "",
});

const stats = ref({
  total_permissions: 0,
});

const pagination = ref<PermissionPagination>({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
});

const resetFormErrors = () => {
  formErrors.name = "";
  formErrors.guard_name = "";
};

const fetchPermissions = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await getPermissions({
      search: search.value || undefined,
      page: page.value,
      per_page: perPage.value,
    });

    permissions.value = response.data.permissions;
    pagination.value = response.data.pagination;
    stats.value = response.data.stats;
  } catch (error: any) {
    errorMessage.value = error.message || "Failed to load permissions";
  } finally {
    loading.value = false;
  }
};

const openCreate = () => {
  selectedPermission.value = null;
  form.name = "";
  form.guard_name = "web";
  resetFormErrors();
  modalOpen.value = true;
};

const openEdit = (permission: PermissionItem) => {
  selectedPermission.value = permission;
  form.name = permission.name;
  form.guard_name = permission.guard_name;
  resetFormErrors();
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
  selectedPermission.value = null;
  resetFormErrors();
};

const savePermission = async () => {
  saving.value = true;
  errorMessage.value = "";
  resetFormErrors();

  try {
    if (selectedPermission.value) {
      await updatePermission(selectedPermission.value.id, {
        name: form.name,
        guard_name: form.guard_name,
      });

      toast.success("Permission updated", "Permission was updated successfully.");
    } else {
      await createPermission({
        name: form.name,
        guard_name: form.guard_name,
      });

      toast.success("Permission created", "Permission was created successfully.");
    }

    closeModal();
    await fetchPermissions();
  } catch (error: any) {
    errorMessage.value = error.message || "Failed to save permission";
    toast.error("Save failed", errorMessage.value);

    if (error.errors) {
      formErrors.name = error.errors.name?.[0] || "";
      formErrors.guard_name = error.errors.guard_name?.[0] || "";
    }
  } finally {
    saving.value = false;
  }
};

const openDelete = (permission: PermissionItem) => {
  selectedPermission.value = permission;
  deleteModalOpen.value = true;
};

const closeDelete = () => {
  deleteModalOpen.value = false;
  selectedPermission.value = null;
};

const confirmDelete = async () => {
  if (!selectedPermission.value) return;

  deleting.value = true;
  errorMessage.value = "";

  try {
    await deletePermission(selectedPermission.value.id);
    toast.success("Permission deleted", "Permission was deleted successfully.");
    closeDelete();
    await fetchPermissions();
  } catch (error: any) {
    errorMessage.value = error.message || "Failed to delete permission";
    toast.error("Delete failed", errorMessage.value);
  } finally {
    deleting.value = false;
  }
};

const columns = [
  {
    key: "name",
    label: "Permission",
  },
  {
    key: "module",
    label: "Module",
  },
  {
    key: "action",
    label: "Action",
  },
  {
    key: "guard_name",
    label: "Guard",
  },
  {
    key: "created_at",
    label: "Created",
  },
  {
    key: "actions",
    label: "Actions",
    align: "right" as const,
  },
];

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, () => {
  page.value = 1;

  if (searchTimeout) clearTimeout(searchTimeout);

  searchTimeout = setTimeout(async () => {
    await fetchPermissions();
  }, 400);
});

onMounted(fetchPermissions);
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <PageHeader
      title="Permissions Management"
      subtitle="Manage system permissions for your RBAC access control."
    >
      <template #actions>
        <AppButton
          v-if="authStore.hasPermission('permission.create')"
          @click="openCreate"
        >
          Add Permission
        </AppButton>
      </template>
    </PageHeader>

    <!-- Error -->
    <div
      v-if="errorMessage"
      class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {{ errorMessage }}
    </div>

    <!-- Stats card -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Permissions"
        :value="stats.total_permissions"
        subtitle="All registered permissions"
        tone="info"
      />
    </div>
    
    <!-- Search -->
    <FilterBar title="Filters" subtitle="Search permissions by module or action.">
      <AppInput
        v-model="search"
        label="Search"
        placeholder="Search permission, example: user.create..."
      />

      <template #actions>
        <AppButton variant="secondary" @click="fetchPermissions"> Refresh </AppButton>
      </template>
    </FilterBar>

    <DataTable
      :columns="columns"
      :rows="permissions"
      :loading="loading"
      empty-title="No permissions found"
      empty-message="Create permissions like user.create or role.view."
    >
      <template #cell-name="{ row }">
        <p class="text-sm font-semibold text-slate-900">
          {{ row.name }}
        </p>
      </template>

      <template #cell-module="{ row }">
        {{ row.name.split(".")[0] || "-" }}
      </template>

      <template #cell-action="{ row }">
        <AppBadge variant="info">
          {{ row.name.split(".")[1] || "-" }}
        </AppBadge>
      </template>

      <template #cell-guard_name="{ row }">
        <AppBadge variant="default">
          {{ row.guard_name }}
        </AppBadge>
      </template>

      <template #cell-actions="{ row }">
        <div class="flex justify-end gap-2">
          <AppButton
            v-if="authStore.hasPermission('permission.update')"
            size="sm"
            variant="secondary"
            @click="openEdit(row)"
          >
            Edit
          </AppButton>

          <AppButton
            v-if="authStore.hasPermission('permission.delete')"
            size="sm"
            variant="danger"
            @click="openDelete(row)"
          >
            Delete
          </AppButton>
        </div>
      </template>
    </DataTable>

    <TablePagination
      :current-page="pagination.current_page"
      :last-page="pagination.last_page"
      :total="pagination.total"
      :loading="loading"
      @previous="
        page--;
        fetchPermissions();
      "
      @next="
        page++;
        fetchPermissions();
      "
    />
    <AppModal
      :open="modalOpen"
      :title="selectedPermission ? 'Edit Permission' : 'Create Permission'"
      :subtitle="
        selectedPermission
          ? 'Update permission information.'
          : 'Create a new system permission.'
      "
      size="sm"
      @close="closeModal"
    >
      <form class="space-y-5" @submit.prevent="savePermission">
        <AppInput
          v-model="form.name"
          label="Permission Name"
          placeholder="Example: user.create"
          :error="formErrors.name"
        />

        <AppInput
          v-model="form.guard_name"
          label="Guard Name"
          placeholder="web"
          :error="formErrors.guard_name"
        />

        <div
          class="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700"
        >
          Recommended format:
          <strong>module.action</strong>, for example <strong>user.create</strong>.
        </div>

        <div class="flex justify-end gap-3 border-t border-slate-200 pt-5">
          <AppButton type="button" variant="secondary" @click="closeModal">
            Cancel
          </AppButton>

          <AppButton type="submit" variant="primary" :loading="saving">
            {{ selectedPermission ? "Update Permission" : "Create Permission" }}
          </AppButton>
        </div>
      </form>
    </AppModal>

    <!-- Delete Modal -->
    <AppModal
      :open="deleteModalOpen"
      title="Delete Permission"
      subtitle="This action cannot be undone."
      size="sm"
      @close="closeDelete"
    >
      <div class="space-y-5">
        <p class="text-sm text-slate-700">
          Are you sure you want to delete
          <strong>{{ selectedPermission?.name }}</strong
          >?
        </p>

        <div class="flex justify-end gap-3 border-t border-slate-200 pt-5">
          <AppButton variant="secondary" @click="closeDelete"> Cancel </AppButton>

          <AppButton variant="danger" :loading="deleting" @click="confirmDelete">
            Delete Permission
          </AppButton>
        </div>
      </div>
    </AppModal>
  </div>
</template>
