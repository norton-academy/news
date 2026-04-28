<script setup lang="ts">
import type { UserItem, UserPagination, UserStats } from "~/composables/useUser";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "user.view",
});

const { getUsers } = useUser();
const toast = useToast();

const search = ref("");
const status = ref("");
const page = ref(1);
const perPage = ref(10);

const loading = ref(false);
const errorMessage = ref("");
const createModalOpen = ref(false);

const users = ref<UserItem[]>([]);

const pagination = ref<UserPagination>({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
});

const stats = ref<UserStats>({
  total_users: 0,
  active_users: 0,
  pending_users: 0,
  inactive_users: 0,
});

const fetchUsers = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await getUsers({
      search: search.value || undefined,
      status: status.value || undefined,
      page: page.value,
      per_page: perPage.value,
    });

    users.value = response.data.users;
    pagination.value = response.data.pagination;
    stats.value = response.data.stats;
  } catch (error: any) {
    errorMessage.value = error.message || "Failed to load users";
    toast.error("Failed to load users", errorMessage.value);
  } finally {
    loading.value = false;
  }
};

const editModalOpen = ref(false);
const selectedUser = ref<UserItem | null>(null);

const deleteModalOpen = ref(false);
const selectedDeleteUser = ref<UserItem | null>(null);

const handleRefresh = async () => {
  await fetchUsers();
};

const openCreateModal = () => {
  createModalOpen.value = true;
};

const closeCreateModal = () => {
  createModalOpen.value = false;
};

const handleCreated = async () => {
  createModalOpen.value = false;
  await fetchUsers();
  toast.success("User created", "The new user account was created successfully.");
};

const openEditModal = (user: UserItem) => {
  selectedUser.value = user;
  editModalOpen.value = true;
};

const closeEditModal = () => {
  editModalOpen.value = false;
  selectedUser.value = null;
};

const handleUpdated = async () => {
  editModalOpen.value = false;
  selectedUser.value = null;
  await fetchUsers();
  toast.success("User updated", "User information was updated successfully.");
};

const openDeleteModal = (user: UserItem) => {
  selectedDeleteUser.value = user;
  deleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  deleteModalOpen.value = false;
  selectedDeleteUser.value = null;
};

const handleDeleted = async () => {
  deleteModalOpen.value = false;
  selectedDeleteUser.value = null;
  await fetchUsers();
  toast.success("User deleted", "The user account was deleted successfully.");
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const columns = [
  {
    key: "user",
    label: "User",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "created_at",
    label: "Created At",
  },
  {
    key: "actions",
    label: "Actions",
    align: "right" as const,
  },
];

watch(search, () => {
  page.value = 1;

  if (searchTimeout) clearTimeout(searchTimeout);

  searchTimeout = setTimeout(async () => {
    await fetchUsers();
  }, 400);
});

watch(status, async () => {
  page.value = 1;
  await fetchUsers();
});

onMounted(async () => {
  await fetchUsers();
});
const authStore = useAuthStore();
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <PageHeader
        title="Users Management"
        subtitle="Manage all users, roles, status, and account actions from this page."
      >
        <template #actions> </template>
      </PageHeader>
      <AppButton v-if="authStore.hasPermission('user.create')" @click="openCreateModal">
        Add New User
      </AppButton>
    </div>

    <div
      v-if="errorMessage"
      class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {{ errorMessage }}
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Users"
        :value="stats.total_users"
        subtitle="All registered accounts"
        tone="info"
      />

      <StatsCard
        title="Active Users"
        :value="stats.active_users"
        subtitle="Currently active users"
        tone="success"
      />

      <StatsCard
        title="Pending Users"
        :value="stats.pending_users"
        subtitle="Waiting for approval"
        tone="warning"
      />

      <StatsCard
        title="Inactive Users"
        :value="stats.inactive_users"
        subtitle="Disabled or inactive"
        tone="default"
      />
    </div>

    <FilterBar title="Filters" subtitle="Search and filter user accounts.">
      <AppInput
        v-model="search"
        label="Search"
        placeholder="Search by name or email..."
      />

      <AppSelect
        v-model="status"
        label="Status"
        placeholder="All Status"
        :options="[
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'Pending', value: 'pending' },
        ]"
      />

      <template #actions>
        <AppButton variant="secondary" @click="handleRefresh"> Refresh </AppButton>
      </template>
    </FilterBar>

    <UserTable
      :users="users"
      :loading="loading"
      :can-edit="authStore.hasPermission('user.update')"
      :can-delete="authStore.hasPermission('user.delete')"
      @edit="openEditModal"
      @delete="openDeleteModal"
    />

    <DataTable
      :columns="columns"
      :rows="users"
      :loading="loading"
      empty-title="No users found"
      empty-message="Try changing your search or filter settings."
    >
      <template #cell-user="{ row }">
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white"
          >
            {{ row.name.charAt(0).toUpperCase() }}
          </div>

          <div>
            <p class="text-sm font-semibold text-slate-900">
              {{ row.name }}
            </p>
            <p class="text-sm text-slate-500">
              {{ row.email }}
            </p>
          </div>
        </div>
      </template>

      <template #cell-role="{ row }">
        {{ row.role || "No Role" }}
      </template>

      <template #cell-status="{ row }">
        <AppBadge
          :variant="
            row.status === 'active'
              ? 'success'
              : row.status === 'pending'
              ? 'warning'
              : 'default'
          "
        >
          {{ row.status }}
        </AppBadge>
      </template>

      <template #cell-actions="{ row }">
        <div class="flex justify-end gap-2">
          <AppButton
            v-if="authStore.hasPermission('user.update')"
            size="sm"
            variant="secondary"
            @click="openEditModal(row)"
          >
            Edit
          </AppButton>

          <AppButton
            v-if="authStore.hasPermission('user.delete')"
            size="sm"
            variant="danger"
            @click="openDeleteModal(row)"
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
        fetchUsers();
      "
      @next="
        page++;
        fetchUsers();
      "
    />

    <CreateUserModal
      :open="createModalOpen"
      :user="null"
      @close="closeCreateModal"
      @created="handleCreated"
    />

    <EditUserModal
      :open="editModalOpen"
      :user="selectedUser"
      @close="closeEditModal"
      @updated="handleUpdated"
    />

    <DeleteUserModal
      :open="deleteModalOpen"
      :user="selectedDeleteUser"
      @close="closeDeleteModal"
      @deleted="handleDeleted"
    />
  </div>
</template>
