<script setup lang="ts">
import type { RoleItem, RolePagination } from "~/composables/useRole";
import { useRoleManagementStore } from '~/stores/roleManagement'

import {
  KeyRound,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
  Download,
  FileSpreadsheet,
  Copy,
} from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "role.view",
  title: "Roles",
});

const {
  createRole,
  updateRole,
  deleteRole,
  exportRoles,
  importRoles,
  cloneRole,
} = useRole();
const roleStore = useRoleManagementStore();

const toast = useToast();
const authStore = useAuthStore();

const roles = ref<RoleItem[]>([]);
const search = ref("");
const page = ref(1);
const perPage = ref(10);
const loading = ref(false);
const errorMessage = ref("");
const guardName = ref("");
const importModalOpen = ref(false);
const cloneModalOpen = ref(false);
const selectedCloneRole = ref<RoleItem | null>(null);

const modalOpen = ref(false);
const selectedRole = ref<RoleItem | null>(null);

const permissionModalOpen = ref(false);
const selectedPermissionRole = ref<RoleItem | null>(null);

const form = reactive({
  name: "",
  guard_name: "web",
});

const pagination = ref<RolePagination>({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
});

type RoleConfirmAction = "delete" | null;

const confirmOpen = ref(false);
const confirmLoading = ref(false);
const confirmAction = ref<RoleConfirmAction>(null);
const confirmRole = ref<RoleItem | null>(null);

const confirmConfig = computed(() => {
  const roleName = confirmRole.value?.name || "this role";

  if (confirmAction.value === "delete") {
    return {
      title: "Delete Role",
      message: `Are you sure you want to delete ${roleName}? This action cannot be undone.`,
      confirmLabel: "Delete Role",
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

const openConfirmDialog = (role: RoleItem, action: RoleConfirmAction) => {
  confirmRole.value = role;
  confirmAction.value = action;
  confirmOpen.value = true;
};

const closeConfirmDialog = () => {
  if (confirmLoading.value) return;

  confirmOpen.value = false;
  confirmRole.value = null;
  confirmAction.value = null;
};

const fetchRoles = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    await roleStore.fetchRoles(
      {
        search: search.value || undefined,
        guard_name: guardName.value || undefined,
        page: page.value,
        per_page: perPage.value,
      },
      { silent: true }
    );

    roles.value = roleStore.roles;
    pagination.value = roleStore.pagination;
  } catch (error: any) {
    errorMessage.value = roleStore.errorMessage || error.message || "Failed to load roles";
    toast.error("Failed to load roles", errorMessage.value);
  } finally {
    loading.value = false;
  }
};

const openCreate = () => {
  selectedRole.value = null;
  form.name = "";
  form.guard_name = "web";
  modalOpen.value = true;
};
const openEdit = (role: RoleItem) => {
  if (role.is_protected) {
    toast.warning("Protected role", "This system role cannot be edited.");
    return;
  }

  selectedRole.value = role;
  modalOpen.value = true;
};

const saveRole = async () => {
  try {
    if (selectedRole.value) {
      await updateRole(selectedRole.value.id, form);
      // update cached role entry
      roleStore.updateRoleInCache(selectedRole.value.id, {
        name: form.name,
        guard_name: form.guard_name,
      });
      toast.success("Role updated", "Role information was updated successfully.");
    } else {
      const response = await createRole(form);
      // try to add created role to cache if returned
      const createdRole = response?.data?.role || response?.role || response?.data || response
      if (createdRole && createdRole.id) {
        roleStore.addRoleToCache(createdRole as any)
      } else {
        // fallback to refresh
        await roleStore.invalidateAndRefresh()
      }

      toast.success("Role created", "New role was created successfully.");
    }

    modalOpen.value = false;
    // update local listing from store
    roles.value = roleStore.roles;
  } catch (error: any) {
    errorMessage.value =
      error.response?.data?.message || error.message || "Failed to save role";
    toast.error("Save failed", errorMessage.value);
  }
};
const confirmDelete = () => {
  if (!selectedRole.value) return;

  openConfirmDialog(selectedRole.value, "delete");
};
const openPermissionModal = (role: RoleItem) => {
  if (role.is_protected) {
    toast.warning(
      "Protected role",
      "This system role permissions cannot be changed manually."
    );
    return;
  }

  selectedPermissionRole.value = role;
  permissionModalOpen.value = true;
};

const closePermissionModal = () => {
  permissionModalOpen.value = false;
  selectedPermissionRole.value = null;
};

const openImportModal = () => {
  importModalOpen.value = true;
};

const closeImportModal = () => {
  importModalOpen.value = false;
};

const handlePermissionSaved = async () => {
  permissionModalOpen.value = false;
  selectedPermissionRole.value = null;
  // permission modal updates cache in-place; reflect store state locally
  roles.value = roleStore.roles;
};

const handleRoleAction = async (role: RoleItem, action: string) => {
  if (action === "edit") {
    openEdit(role);
    return;
  }

  if (action === "permissions") {
    openPermissionModal(role);
    return;
  }

  if (action === "clone") {
    openClone(role);
    return;
  }

  if (action === "delete") {
    openConfirmDialog(role, "delete");
  }
};

const handleImported = async () => {
  await roleStore.invalidateAndRefresh()
};

const handleConfirmAction = async () => {
  if (!confirmRole.value || !confirmAction.value) return;

  confirmLoading.value = true;

  try {
    if (confirmAction.value === "delete") {
      await deleteRole(confirmRole.value.id);

      toast.success(
        "Role deleted",
        `${confirmRole.value.name} was deleted successfully.`
      );

      roleStore.removeRoleFromCache(confirmRole.value.id)

      const notificationStore = useNotificationStore();
      await notificationStore.refreshNotifications();
    }

    closeConfirmDialog();
  } catch (error: any) {
    toast.error("Action failed", error.message || "Failed to complete action");
  } finally {
    confirmLoading.value = false;
  }
};

const exporting = ref(false);

const handleExport = async () => {
  exporting.value = true;

  try {
    await exportRoles({
      search: search.value || undefined,
      guard_name: guardName.value || undefined,
    });

    toast.success("Export started", "Roles CSV has been downloaded.");
  } catch (error: any) {
    toast.error("Export failed", error.message || "Failed to export roles");
  } finally {
    exporting.value = false;
  }
};

const columns = [
  {
    key: "name",
    label: "Role",
  },
  {
    key: "guard_name",
    label: "Guard",
  },
  {
    key: "permissions_count",
    label: "Permissions",
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

const openClone = (role: RoleItem) => {
  selectedCloneRole.value = role;
  cloneModalOpen.value = true;
};

const closeClone = () => {
  selectedCloneRole.value = null;
  cloneModalOpen.value = false;
};

const handleCloned = async () => {
  await roleStore.invalidateAndRefresh()
};

const resetFilters = async () => {
  search.value = "";
  guardName.value = "";
  page.value = 1;
  await fetchRoles();
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, () => {
  page.value = 1;

  if (searchTimeout) clearTimeout(searchTimeout);

  searchTimeout = setTimeout(async () => {
    await fetchRoles();
  }, 400);
});

watch([search, guardName], async () => {
  page.value = 1;
  await fetchRoles();
});

onMounted(fetchRoles);
</script>

<template>
  <PageSkeleton v-if="loading" />

  <div class="space-y-6">
    <PageHeader
      title="Roles Management"
      subtitle="Manage user roles for your RBAC system."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="exporting" @click="handleExport">
          <Download class="mr-2 h-4 w-4" />
          Export
        </AppButton>

        <AppButton
          v-if="authStore.hasPermission('role.create')"
          variant="secondary"
          @click="openImportModal"
        >
          <FileSpreadsheet class="mr-2 h-4 w-4" />
          Import
        </AppButton>

        <AppButton v-if="authStore.hasPermission('role.create')" @click="openCreate">
          <Plus class="mr-2 h-4 w-4" />
          Add Role
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage v-if="errorMessage" type="error" :message="errorMessage" />

    <FilterBar title="Filters" subtitle="Search and filter roles." columns="2">
      <AppInput v-model="search" label="Search" placeholder="Search role..." />

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
      :rows="roles"
      :loading="loading"
      empty-title="No roles found"
      empty-message="Create your first role to start managing access."
    >
      <template #cell-name="{ row }">
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
          >
            <ShieldCheck class="h-5 w-5" />
          </div>

          <div>
            <div class="flex items-center gap-2">
              <p class="text-sm font-semibold text-slate-900 dark:text-white">
                {{ row.name }}
              </p>

              <AppBadge v-if="row.is_protected" variant="warning"> Protected </AppBadge>
            </div>

            <p class="text-xs text-slate-500 dark:text-slate-400">Role access group</p>
          </div>
        </div>
      </template>

      <template #cell-guard_name="{ row }">
        <AppBadge variant="default">
          {{ row.guard_name }}
        </AppBadge>
      </template>

      <template #cell-permissions_count="{ row }">
        {{ row.permissions_count ?? 0 }}
      </template>

      <template #cell-actions="{ row }">
        <AppDropdown
          width="w-72"
          :items="[
            {
              label: 'Edit Role',
              value: 'edit',
              icon: Pencil,
              description: 'Update role information',
              visible: authStore.hasPermission('role.update') && !row.is_protected,
            },
            {
              label: 'Assign Permissions',
              value: 'permissions',
              icon: KeyRound,
              description: 'Manage role permissions',
              visible: authStore.hasPermission('role.update'),
            },
            {
              label: 'Clone Role',
              value: 'clone',
              icon: Copy,
              variant: 'success',
              description: 'Duplicate this role',
              visible: authStore.hasPermission('role.create'),
            },
            {
              label: 'Delete Role',
              value: 'delete',
              icon: Trash2,
              variant: 'danger',
              description: 'Remove this role',
              visible: authStore.hasPermission('role.delete') && !row.is_protected,
            },
          ]"
          @select="handleRoleAction(row, $event)"
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
        fetchRoles();
      "
      @next="
        page++;
        fetchRoles();
      "
    />

    <!-- Create/Edit Modal -->
    <AppModal
      :open="modalOpen"
      :title="selectedRole ? 'Edit Role' : 'Create Role'"
      :subtitle="selectedRole ? 'Update role information.' : 'Create a new access role.'"
      size="sm"
      @close="modalOpen = false"
    >
      <template #icon>
        <ShieldCheck class="h-5 w-5" />
      </template>

      <form class="space-y-5" @submit.prevent="saveRole">
        <AppInput v-model="form.name" label="Role Name" placeholder="Example: Admin" />

        <AppInput v-model="form.guard_name" label="Guard Name" placeholder="web" />

        <div class="flex justify-end gap-3 border-t border-slate-200 pt-5">
          <AppButton type="button" variant="secondary" @click="modalOpen = false">
            Cancel
          </AppButton>

          <AppButton type="submit" variant="primary">
            {{ selectedRole ? "Update Role" : "Create Role" }}
          </AppButton>
        </div>
      </form>
    </AppModal>

    <!-- Delete Modal -->
    <AppModal
      :open="deleteModalOpen"
      title="Delete Role"
      subtitle="This action cannot be undone."
      size="sm"
      @close="deleteModalOpen = false"
    >
      <template #icon>
        <Trash2 class="h-5 w-5" />
      </template>

      <div class="space-y-5">
        <AlertMessage type="warning" title="Confirm delete">
          Are you sure you want to delete
          <strong>{{ selectedRole?.name }}</strong
          >?
        </AlertMessage>
        <div
          class="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800"
        >
          <AppButton variant="secondary" @click="deleteModalOpen = false">
            Cancel
          </AppButton>

          <AppButton variant="danger" @click="confirmDelete"> Delete Role </AppButton>
        </div>
      </div>
    </AppModal>
  </div>

  <AssignRolePermissionsModal
    :open="permissionModalOpen"
    :role="selectedPermissionRole"
    @close="closePermissionModal"
    @saved="handlePermissionSaved"
  />

  <ImportRoleModal
    :open="importModalOpen"
    @close="closeImportModal"
    @imported="handleImported"
  />

  <CloneRoleModal
    :open="cloneModalOpen"
    :role="selectedCloneRole"
    @close="closeClone"
    @cloned="handleCloned"
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
</template>
