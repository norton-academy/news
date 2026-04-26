<script setup lang="ts">
import type { UserItem, UserPagination, UserStats } from "~/composables/useUser";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const { getUsers } = useUser();

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
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

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
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900">Users Management</h1>
        <p class="mt-1 text-sm text-slate-500">
          Manage all users, roles, status, and account actions from this page.
        </p>
      </div>

      <button
        class="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        @click="openCreateModal"
      >
        Add New User
      </button>
    </div>

    <div
      v-if="errorMessage"
      class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {{ errorMessage }} 
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <UserStatsCard
        title="Total Users"
        :value="stats.total_users"
        subtitle="All registered accounts"
      />
      <UserStatsCard
        title="Active Users"
        :value="stats.active_users"
        subtitle="Currently active users"
      />
      <UserStatsCard
        title="Pending Users"
        :value="stats.pending_users"
        subtitle="Waiting for approval"
      />
      <UserStatsCard
        title="Inactive Users"
        :value="stats.inactive_users"
        subtitle="Disabled or inactive"
      />
    </div>

    <UserFilterBar
      v-model:search="search"
      v-model:status="status"
      @refresh="handleRefresh"
    />

    <UserTable
      :users="users"
      :loading="loading"
      @edit="openEditModal"
      @delete="openDeleteModal"
    />

    <div
      class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <p>
        Showing page {{ pagination.current_page }} of {{ pagination.last_page }} | Total
        users: {{ pagination.total }}
      </p>

      <div class="flex items-center gap-2">
        <button
          class="rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="pagination.current_page <= 1 || loading"
          @click="
            page--;
            fetchUsers();
          "
        >
          Previous
        </button>

        <button
          class="rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="pagination.current_page >= pagination.last_page || loading"
          @click="
            page++;
            fetchUsers();
          "
        >
          Next
        </button>
      </div>
    </div>

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
