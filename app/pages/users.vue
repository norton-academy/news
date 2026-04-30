<script setup lang="ts">
import type { UserItem, UserPagination, UserStats } from "~/composables/useUser";
import {
  Ban,
  CheckCircle2,
  Mail,
  Pencil,
  ShieldAlert,
  Timer,
  Trash2,
  UserPlus,
  Users,
} from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "user.view",
});

const { getUsers, resendUserVerification, updateUserStatus } = useUser();
const toast = useToast();

const search = ref("");
const status = ref("");
const page = ref(1);
const perPage = ref(10);
const emailVerified = ref("");

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
  verified_users: 0,
  unverified_users: 0,
});

const fetchUsers = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await getUsers({
      search: search.value || undefined,
      status: status.value || undefined,
      email_verified: emailVerified.value || undefined,
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

const handleResendVerification = async (user: UserItem) => {
  try {
    await resendUserVerification(user.id);
    toast.success("Verification sent", `Verification email was sent to ${user.email}.`);
  } catch (error: any) {
    toast.error("Resend failed", error.message || "Failed to resend verification email");
  }
};

const handleStatusChange = async (
  user: UserItem,
  status: "active" | "pending" | "suspended" | "blocked"
) => {
  try {
    await updateUserStatus(user.id, status);
    toast.success("Status updated", `${user.name} is now ${status}.`);
    await fetchUsers();
  } catch (error: any) {
    toast.error("Status update failed", error.message || "Failed to update status");
  }
};

const handleUserAction = async (user: UserItem, action: string) => {
  if (action === "resend-verification") {
    await handleResendVerification(user);
    return;
  }

  if (action === "activate") {
    await handleStatusChange(user, "active");
    return;
  }

  if (action === "pending") {
    await handleStatusChange(user, "pending");
    return;
  }

  if (action === "suspend") {
    await handleStatusChange(user, "suspended");
    return;
  }

  if (action === "block") {
    await handleStatusChange(user, "blocked");
    return;
  }

  if (action === "edit") {
    openEditModal(user);
    return;
  }

  if (action === "delete") {
    openDeleteModal(user);
  }
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
  { key: "email_verification", label: "Email" },
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

watch([status, emailVerified], async () => {
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
    <PageHeader
      title="Users Management"
      subtitle="Manage all users, roles, status, and account actions from this page."
    >
      <template #actions>
        <AppButton v-if="authStore.hasPermission('user.create')" @click="openCreateModal">
          <UserPlus class="mr-2 h-4 w-4" />
          Add New User
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage v-if="errorMessage" type="error" :message="errorMessage" />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Users"
        :value="stats.total_users"
        subtitle="All registered accounts"
        tone="info"
      >
        <template #badge>
          <div
            class="rounded-xl bg-blue-100 p-2 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
          >
            <Users class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>

      <StatsCard
        title="Active Users"
        :value="stats.active_users"
        subtitle="Currently active users"
        tone="success"
      >
        <template #badge>
          <div
            class="rounded-xl bg-green-100 p-2 text-green-700 dark:bg-green-950/50 dark:text-green-300"
          >
            <CheckCircle2 class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>

      <StatsCard
        title="Pending Users"
        :value="stats.pending_users"
        subtitle="Waiting for approval"
        tone="warning"
      >
        <template #badge>
          <div
            class="rounded-xl bg-amber-100 p-2 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
          >
            <Timer class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>

      <StatsCard
        title="Inactive Users"
        :value="stats.inactive_users"
        subtitle="Disabled or inactive"
        tone="default"
      >
        <template #badge>
          <div
            class="rounded-xl bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <Ban class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>

      <StatsCard
        title="Verified Users"
        :value="stats.verified_users || 0"
        subtitle="Emails verified"
        tone="success"
      >
        <template #badge>
          <div
            class="rounded-xl bg-green-100 p-2 text-green-700 dark:bg-green-950/50 dark:text-green-300"
          >
            <Mail class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>

      <StatsCard
        title="Unverified Users"
        :value="stats.unverified_users || 0"
        subtitle="Need email verification"
        tone="warning"
      >
        <template #badge>
          <div
            class="rounded-xl bg-amber-100 p-2 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
          >
            <ShieldAlert class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>
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
          { label: 'Pending', value: 'pending' },
          { label: 'Suspended', value: 'suspended' },
          { label: 'Blocked', value: 'blocked' },
        ]"
      />

      <AppSelect
        v-model="emailVerified"
        label="Email Verification"
        placeholder="All"
        :options="[
          { label: 'Verified', value: 'verified' },
          { label: 'Unverified', value: 'unverified' },
        ]"
      />

      <template #actions>
        <AppButton variant="secondary" @click="handleRefresh"> Refresh </AppButton>
      </template>
    </FilterBar>

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
            class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white shadow-sm dark:bg-white dark:text-slate-900"
          >
            {{ row.name.charAt(0).toUpperCase() }}
          </div>

          <div>
            <p class="text-sm font-semibold text-slate-900 dark:text-white">
              {{ row.name }}
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              {{ row.email }}
            </p>
          </div>
        </div>
      </template>
      <template #cell-role="{ row }">
        <span class="text-sm text-slate-700 dark:text-slate-300">
          {{ row.role || "No Role" }}
        </span>
      </template>

      <template #cell-status="{ row }">
        <AppBadge
          :variant="
            row.status === 'active'
              ? 'success'
              : row.status === 'pending'
              ? 'warning'
              : row.status === 'suspended'
              ? 'warning'
              : row.status === 'blocked'
              ? 'danger'
              : 'default'
          "
        >
          {{ row.status }}
        </AppBadge>
      </template>

      <template #cell-email_verification="{ row }">
        <AppBadge :variant="row.is_email_verified ? 'success' : 'warning'">
          {{ row.is_email_verified ? "Verified" : "Unverified" }}
        </AppBadge>
      </template>

      <template #cell-actions="{ row }">
        <ActionDropdown
          :items="[
            {
              label: 'Resend Verification',
              action: 'resend-verification',
              icon: Mail,
              visible: authStore.hasPermission('user.update') && !row.is_email_verified,
            },
            {
              label: 'Activate User',
              action: 'activate',
              icon: CheckCircle2,
              variant: 'success',
              visible: authStore.hasPermission('user.update') && row.status !== 'active',
            },
            {
              label: 'Set Pending',
              action: 'pending',
              icon: Timer,
              variant: 'warning',
              visible: authStore.hasPermission('user.update') && row.status !== 'pending',
            },
            {
              label: 'Suspend User',
              action: 'suspend',
              icon: ShieldAlert,
              variant: 'warning',
              visible:
                authStore.hasPermission('user.update') && row.status !== 'suspended',
            },
            {
              label: 'Block User',
              action: 'block',
              icon: Ban,
              variant: 'danger',
              visible: authStore.hasPermission('user.update') && row.status !== 'blocked',
            },
            {
              label: 'Edit User',
              action: 'edit',
              icon: Pencil,
              visible: authStore.hasPermission('user.update'),
            },
            {
              label: 'Delete User',
              action: 'delete',
              icon: Trash2,
              variant: 'danger',
              visible: authStore.hasPermission('user.delete'),
            },
          ]"
          @select="handleUserAction(row, $event)"
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
