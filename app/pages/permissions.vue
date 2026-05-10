<script setup lang="ts">
import type { PermissionItem, PermissionPagination } from "~/composables/usePermission";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "permission.view",
  title: "Permissions",
});

import {
  KeyRound,
  Pencil,
  Plus,
  Shield,
  Trash2,
  Download,
  FileSpreadsheet,
  ShieldCheck,
} from "lucide-vue-next";

const {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
  exportPermissions,
  importPermissions,
} = usePermission();

const toast = useToast();
const authStore = useAuthStore();

const moduleFilter = ref("");
const guardName = ref("");
const exporting = ref(false);
const importModalOpen = ref(false);

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
      module: moduleFilter.value || undefined,
      guard_name: guardName.value || undefined,
      page: page.value,
      per_page: perPage.value,
    });

    permissions.value = response.data.permissions;
    pagination.value = response.data.pagination;
    stats.value = response.data.stats;
  } catch (error: any) {
    errorMessage.value = error.message || "Failed to load permissions";
    toast.error("Failed to load permissions", errorMessage.value);
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
  if (permission.is_protected) {
    toast.warning("Protected permission", "This system permission cannot be edited.");
    return;
  }

  selectedPermission.value = permission;
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

const resetFilters = async () => {
  search.value = "";
  moduleFilter.value = "";
  guardName.value = "";
  page.value = 1;
  await fetchPermissions();
};

const openDelete = (permission: PermissionItem) => {
  if (permission.is_protected) {
    toast.warning("Protected permission", "This system permission cannot be deleted.");
    return;
  }

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

const openImportModal = () => {
  importModalOpen.value = true;
};

const closeImportModal = () => {
  importModalOpen.value = false;
};

const handlePermissionAction = (permission: PermissionItem, action: string) => {
  if (action === "edit") {
    openEdit(permission);
    return;
  }

  if (action === "delete") {
    openDelete(permission);
  }
};

const handleExport = async () => {
  exporting.value = true;

  try {
    await exportPermissions({
      search: search.value || undefined,
      module: moduleFilter.value || undefined,
      guard_name: guardName.value || undefined,
    });

    toast.success("Export started", "Permissions CSV has been downloaded.");
  } catch (error: any) {
    toast.error("Export failed", error.message || "Failed to export permissions");
  } finally {
    exporting.value = false;
  }
};

const handleImported = async () => {
  await fetchPermissions();
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

watch([search, moduleFilter, guardName], async () => {
  page.value = 1;
  await fetchPermissions();
});

onMounted(fetchPermissions);
</script>

<template>
  <div class="space-y-6">
    <PageSkeleton v-if="loading" />

    <!-- Header -->
    <PageHeader
      title="Permissions Management"
      subtitle="Manage system permissions for your RBAC access control."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="exporting" @click="handleExport">
          <Download class="mr-2 h-4 w-4" />
          Export
        </AppButton>

        <AppButton
          v-if="authStore.hasPermission('permission.create')"
          variant="secondary"
          @click="openImportModal"
        >
          <FileSpreadsheet class="mr-2 h-4 w-4" />
          Import
        </AppButton>

        <AppButton
          v-if="authStore.hasPermission('permission.create')"
          @click="openCreate"
        >
          <Plus class="mr-2 h-4 w-4" />
          Add Permission
        </AppButton>
      </template>
    </PageHeader>

    <!-- Error -->
    <AlertMessage v-if="errorMessage" type="error" :message="errorMessage" />

    <!-- Stats card -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Permissions"
        :value="stats.total_permissions"
        subtitle="All registered permissions"
        tone="info"
      />

      <StatsCard
        title="Protected Permissions"
        :value="stats.protected_permissions || 0"
        subtitle="System critical access rules"
        tone="warning"
      />
    </div>

    <!-- Search -->
    <FilterBar
      title="Filters"
      subtitle="Search permissions by module, action, or guard."
      columns="3"
    >
      <AppInput
        v-model="search"
        label="Search"
        placeholder="Search permission, example: user.create..."
      />

      <AppSelect
        v-model="moduleFilter"
        label="Module"
        placeholder="All Modules"
        :options="moduleOptions"
      />

      <AppSelect
        v-model="guardName"
        label="Guard"
        placeholder="All Guards"
        :options="[
          { label: 'Web', value: 'web' },
          { label: 'API', value: 'api' },
        ]"
      />

      <template #actions>
        <AppButton variant="secondary" @click="resetFilters"> Reset </AppButton>
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
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300"
          >
            <KeyRound class="h-5 w-5" />
          </div>

          <div>
            <div class="flex items-center gap-2">
              <p class="text-sm font-semibold text-ui">
                {{ row.name }}
              </p>

              <AppBadge v-if="row.is_protected" variant="warning"> Protected </AppBadge>
            </div>

              <p class="text-xs text-muted">
              {{ row.module || "general" }} module
            </p>
          </div>
        </div>
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
        <ActionDropdown
          :items="[
            {
              label: 'Edit Permission',
              action: 'edit',
              icon: Pencil,
              visible: authStore.hasPermission('permission.update') && !row.is_protected,
            },
            {
              label: 'Delete Permission',
              action: 'delete',
              icon: Trash2,
              variant: 'danger',
              visible: authStore.hasPermission('permission.delete') && !row.is_protected,
            },
            {
              label: 'System Protected',
              action: 'protected',
              icon: ShieldCheck,
              disabled: true,
              visible: row.is_protected,
            },
          ]"
          @select="handlePermissionAction(row, $event)"
        />
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

        <AlertMessage type="info" title="Recommended format">
          Use <strong>module.action</strong>, for example <strong>user.create</strong>.
        </AlertMessage>

        <div
          class="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800"
        >
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
      <template #icon>
        <Trash2 class="h-5 w-5" />
      </template>
      <div class="space-y-5">
        <AlertMessage type="warning" title="Confirm delete">
          Are you sure you want to delete
          <strong>{{ selectedPermission?.name }}</strong
          >?
        </AlertMessage>

        <div
          class="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800"
        >
          <AppButton variant="secondary" @click="closeDelete"> Cancel </AppButton>

          <AppButton variant="danger" :loading="deleting" @click="confirmDelete">
            Delete Permission
          </AppButton>
        </div>
      </div>
    </AppModal>
  </div>

  <ImportPermissionModal
    :open="importModalOpen"
    @close="closeImportModal"
    @imported="handleImported"
  />
</template>
