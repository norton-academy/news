<script setup lang="ts">
import type { PermissionItem, PermissionPagination } from "~/composables/usePermission";
import {
  Download,
  FileSpreadsheet,
  KeyRound,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
  Shield,
} from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "permission.view",
  title: "Permissions",
});

const {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
  exportPermissions,
} = usePermission();

const toast = useToast();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const permissions = ref<PermissionItem[]>([]);

const search = ref("");
const moduleFilter = ref("");
const guardName = ref("");
const page = ref(1);
const perPage = ref(10);

const loading = ref(false);
const saving = ref(false);
const exporting = ref(false);
const errorMessage = ref("");

const modalOpen = ref(false);
const importModalOpen = ref(false);
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
  protected_permissions: 0,
});

const pagination = ref<PermissionPagination>({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
});

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

const moduleOptions = computed(() => {
  const modules = permissions.value
    .map((permission) => {
      return permission.module || permission.name?.split(".")[0] || "";
    })
    .filter(Boolean);

  return [...new Set(modules)].sort().map((module) => ({
    label: module.charAt(0).toUpperCase() + module.slice(1),
    value: module,
  }));
});

type PermissionConfirmAction = "delete" | null;

const confirmOpen = ref(false);
const confirmLoading = ref(false);
const confirmAction = ref<PermissionConfirmAction>(null);
const confirmPermission = ref<PermissionItem | null>(null);

const confirmConfig = computed(() => {
  const permissionName = confirmPermission.value?.name || "this permission";

  if (confirmAction.value === "delete") {
    return {
      title: "Delete Permission",
      message: `Are you sure you want to delete ${permissionName}? This action cannot be undone.`,
      confirmLabel: "Delete Permission",
      variant: "danger" as const,
    };
  }

  return {
    title: "Confirm Action",
    message: "Are you sure you want to continue?",
    confirmLabel: "Confirm",
    variant: "default" as const,
  };
});

const resetFormErrors = () => {
  formErrors.name = "";
  formErrors.guard_name = "";
};

const resetForm = () => {
  form.name = "";
  form.guard_name = "web";
  resetFormErrors();
};

const permissionModule = (permission: PermissionItem) => {
  return permission.module || permission.name?.split(".")[0] || "general";
};

const permissionAction = (permission: PermissionItem) => {
  return permission.action || permission.name?.split(".")[1] || "-";
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
  resetForm();
  modalOpen.value = true;
};

const openEdit = (permission: PermissionItem) => {
  if (permission.is_protected) {
    toast.warning("Protected permission", "This system permission cannot be edited.");
    return;
  }

  selectedPermission.value = permission;
  form.name = permission.name;
  form.guard_name = permission.guard_name || "web";
  resetFormErrors();
  modalOpen.value = true;
};

const closeModal = () => {
  if (saving.value) return;

  modalOpen.value = false;
  selectedPermission.value = null;
  resetForm();
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
    await notificationStore.refreshNotifications();
  } catch (error: any) {
    errorMessage.value =
      error.response?.data?.message || error.message || "Failed to save permission";

    toast.error("Save failed", errorMessage.value);

    const errors = error.response?.data?.errors || error.errors;

    if (errors) {
      formErrors.name = errors.name?.[0] || "";
      formErrors.guard_name = errors.guard_name?.[0] || "";
    }
  } finally {
    saving.value = false;
  }
};

const openConfirmDialog = (
  permission: PermissionItem,
  action: PermissionConfirmAction
) => {
  if (permission.is_protected) {
    toast.warning("Protected permission", "This system permission cannot be deleted.");
    return;
  }

  confirmPermission.value = permission;
  confirmAction.value = action;
  confirmOpen.value = true;
};

const closeConfirmDialog = () => {
  if (confirmLoading.value) return;

  confirmOpen.value = false;
  confirmPermission.value = null;
  confirmAction.value = null;
};

const handleConfirmAction = async () => {
  if (!confirmPermission.value || !confirmAction.value) return;

  confirmLoading.value = true;
  errorMessage.value = "";

  try {
    if (confirmAction.value === "delete") {
      await deletePermission(confirmPermission.value.id);

      toast.success(
        "Permission deleted",
        `${confirmPermission.value.name} was deleted successfully.`
      );

      await fetchPermissions();
      await notificationStore.refreshNotifications();
    }

    closeConfirmDialog();
  } catch (error: any) {
    errorMessage.value =
      error.response?.data?.message || error.message || "Failed to complete action";

    toast.error("Action failed", errorMessage.value);
  } finally {
    confirmLoading.value = false;
  }
};

const handlePermissionAction = (permission: PermissionItem, action: string) => {
  if (action === "edit") {
    openEdit(permission);
    return;
  }

  if (action === "delete") {
    openConfirmDialog(permission, "delete");
  }
};

const openImportModal = () => {
  importModalOpen.value = true;
};

const closeImportModal = () => {
  importModalOpen.value = false;
};

const handleImported = async () => {
  closeImportModal();
  await fetchPermissions();
  await notificationStore.refreshNotifications();
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

const resetFilters = async () => {
  search.value = "";
  moduleFilter.value = "";
  guardName.value = "";
  page.value = 1;

  await fetchPermissions();
};

const goPrevious = async () => {
  if (page.value <= 1) return;

  page.value--;
  await fetchPermissions();
};

const goNext = async () => {
  if (page.value >= pagination.value.last_page) return;

  page.value++;
  await fetchPermissions();
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, () => {
  page.value = 1;

  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(async () => {
    await fetchPermissions();
  }, 400);
});

watch([moduleFilter, guardName], async () => {
  page.value = 1;
  await fetchPermissions();
});

onMounted(async () => {
  await fetchPermissions();
});
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Permissions Management"
      subtitle="Manage system permissions, modules, actions, guards, and protected access rules."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="exporting" @click="handleExport">
          <Download class="h-4 w-4" />
          Export
        </AppButton>

        <AppButton
          v-if="authStore.hasPermission('permission.create')"
          variant="secondary"
          @click="openImportModal"
        >
          <FileSpreadsheet class="h-4 w-4" />
          Import
        </AppButton>

        <AppButton
          v-if="authStore.hasPermission('permission.create')"
          @click="openCreate"
        >
          <Plus class="h-4 w-4" />
          Add Permission
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage
      v-if="errorMessage"
      type="error"
      title="Unable to load permissions"
      :message="errorMessage"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Permissions"
        :value="stats.total_permissions"
        subtitle="All registered permissions"
        tone="info"
      >
        <template #badge>
          <AppBadge variant="info" shape="square" size="md">
            <KeyRound class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>

      <StatsCard
        title="Protected"
        :value="stats.protected_permissions || 0"
        subtitle="System critical access rules"
        tone="warning"
      >
        <template #badge>
          <AppBadge variant="warning" shape="square" size="md">
            <Shield class="h-5 w-5" />
          </AppBadge>
        </template>
      </StatsCard>
    </div>

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
          <AppBadge variant="info" shape="square" size="md">
            <KeyRound class="h-5 w-5" />
          </AppBadge>

          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <p class="truncate text-sm font-bold text-card-foreground">
                {{ row.name }}
              </p>

              <AppBadge v-if="row.is_protected" variant="warning"> Protected </AppBadge>
            </div>

            <p class="mt-1 text-xs text-muted-foreground">
              {{ permissionModule(row) }} module
            </p>
          </div>
        </div>
      </template>

      <template #cell-module="{ row }">
        <AppBadge variant="default">
          {{ permissionModule(row) }}
        </AppBadge>
      </template>

      <template #cell-action="{ row }">
        <AppBadge variant="info">
          {{ permissionAction(row) }}
        </AppBadge>
      </template>

      <template #cell-guard_name="{ row }">
        <AppBadge variant="default">
          {{ row.guard_name }}
        </AppBadge>
      </template>

      <template #cell-created_at="{ row }">
        <span class="text-sm text-muted-foreground">
          {{ row.created_at || "—" }}
        </span>
      </template>

      <template #cell-actions="{ row }">
        <AppDropdown
          width="w-72"
          :items="[
            {
              label: 'Edit Permission',
              value: 'edit',
              icon: Pencil,
              description: row.is_protected
                ? 'Protected permissions cannot be edited'
                : 'Update permission information',
              disabled: row.is_protected,
              visible: authStore.hasPermission('permission.update'),
            },
            {
              label: 'Delete Permission',
              value: 'delete',
              icon: Trash2,
              variant: 'danger',
              description: row.is_protected
                ? 'Protected permissions cannot be deleted'
                : 'Remove this permission',
              disabled: row.is_protected,
              visible: authStore.hasPermission('permission.delete'),
            },
            {
              label: 'System Protected',
              value: 'protected',
              icon: ShieldCheck,
              disabled: true,
              visible: row.is_protected,
              description: 'Protected system permission',
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
      @previous="goPrevious"
      @next="goNext"
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
      <template #icon>
        <KeyRound class="h-5 w-5" />
      </template>

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
            {{ selectedPermission ? "Update Permission" : "Create Permission" }}
          </AppButton>
        </div>
      </form>
    </AppModal>

    <ImportPermissionModal
      :open="importModalOpen"
      @close="closeImportModal"
      @imported="handleImported"
    />

    <ConfirmDialog
      :open="confirmOpen"
      :title="confirmConfig.title"
      :message="confirmConfig.message"
      :confirm-label="confirmConfig.confirmLabel"
      :variant="confirmConfig.variant"
      :loading="confirmLoading"
      @close="closeConfirmDialog"
      @confirm="handleConfirmAction"
    />
  </div>
</template>
