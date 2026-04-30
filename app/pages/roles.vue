<script setup lang="ts">
import type { RoleItem, RolePagination } from "~/composables/useRole";

import { KeyRound, Pencil, Plus, ShieldCheck, Trash2 } from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "role.view",
});

const { getRoles, createRole, updateRole, deleteRole } = useRole();
const toast = useToast();
const authStore = useAuthStore();

const roles = ref<RoleItem[]>([]);
const search = ref("");
const page = ref(1);
const perPage = ref(10);
const loading = ref(false);
const errorMessage = ref("");

const modalOpen = ref(false);
const deleteModalOpen = ref(false);
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

const fetchRoles = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await getRoles({
      search: search.value || undefined,
      page: page.value,
      per_page: perPage.value,
    });

    roles.value = response.data.roles;
    pagination.value = response.data.pagination;
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || "Failed to load roles";
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
  selectedRole.value = role;
  form.name = role.name;
  form.guard_name = role.guard_name;
  modalOpen.value = true;
};

const saveRole = async () => {
  try {
    if (selectedRole.value) {
      await updateRole(selectedRole.value.id, form);
      toast.success("Role updated", "Role information was updated successfully.");
    } else {
      await createRole(form);
      toast.success("Role created", "New role was created successfully.");
    }

    modalOpen.value = false;
    await fetchRoles();
  } catch (error: any) {
    errorMessage.value =
      error.response?.data?.message || error.message || "Failed to save role";
    toast.error("Save failed", errorMessage.value);
  }
};

const openDelete = (role: RoleItem) => {
  selectedRole.value = role;
  deleteModalOpen.value = true;
};

const confirmDelete = async () => {
  if (!selectedRole.value) return;

  try {
    await deleteRole(selectedRole.value.id);
    toast.success("Role deleted", "Role was deleted successfully.");
    deleteModalOpen.value = false;
    selectedRole.value = null;
    await fetchRoles();
  } catch (error: any) {
    errorMessage.value =
      error.response?.data?.message || error.message || "Failed to delete role";
    toast.error("Delete failed", errorMessage.value);
  }
};

const openPermissionModal = (role: RoleItem) => {
  selectedPermissionRole.value = role;
  permissionModalOpen.value = true;
};

const closePermissionModal = () => {
  permissionModalOpen.value = false;
  selectedPermissionRole.value = null;
};

const handlePermissionSaved = async () => {
  permissionModalOpen.value = false;
  selectedPermissionRole.value = null;
  await fetchRoles();
};

const handleRoleAction = (role: RoleItem, action: string) => {
  if (action === "permissions") {
    openPermissionModal(role);
    return;
  }

  if (action === "edit") {
    openEdit(role);
    return;
  }

  if (action === "delete") {
    openDelete(role);
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

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, () => {
  page.value = 1;

  if (searchTimeout) clearTimeout(searchTimeout);

  searchTimeout = setTimeout(async () => {
    await fetchRoles();
  }, 400);
});

onMounted(fetchRoles);
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Roles Management"
      subtitle="Manage user roles for your RBAC system."
    >
      <template #actions>
        <AppButton v-if="authStore.hasPermission('role.create')" @click="openCreate">
          <Plus class="mr-2 h-4 w-4" />
          Add Role
        </AppButton>
      </template>
    </PageHeader>

    <div
      v-if="errorMessage"
      class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
    >
      {{ errorMessage }}
    </div>

    <FilterBar title="Filters" subtitle="Search roles by name.">
      <AppInput v-model="search" label="Search" placeholder="Search role..." />

      <template #actions>
        <AppButton variant="secondary" @click="fetchRoles"> Refresh </AppButton>
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
            <p class="text-sm font-semibold text-slate-900 dark:text-white">
              {{ row.name }}
            </p>
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
        <ActionDropdown
          :items="[
            {
              label: 'Manage Permissions',
              action: 'permissions',
              icon: KeyRound,
              visible: authStore.hasPermission('role.update'),
            },
            {
              label: 'Edit Role',
              action: 'edit',
              icon: Pencil,
              visible: authStore.hasPermission('role.update'),
            },
            {
              label: 'Delete Role',
              action: 'delete',
              icon: Trash2,
              variant: 'danger',
              visible: authStore.hasPermission('role.delete'),
            },
          ]"
          @select="handleRoleAction(row, $event)"
        /> </template
    ></DataTable>

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
        <p class="text-sm text-slate-700 dark:text-slate-300">
          Are you sure you want to delete
          <strong class="text-slate-900 dark:text-white">{{ selectedRole?.name }}</strong
          >?
        </p>

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
</template>
