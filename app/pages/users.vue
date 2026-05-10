<script setup lang="ts">
import type { UserItem, UserPagination, UserStats } from "~/composables/useUser";
import {
  Ban,
  CheckCircle2,
  Download,
  Mail,
  Pencil,
  RefreshCcw,
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
  title: "Users",
});

const { getUsers, resendUserVerification, updateUserStatus, exportUsers } = useUser();

const toast = useToast();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const search = ref("");
const status = ref("");
const emailVerified = ref("");
const page = ref(1);
const perPage = ref(10);

const loading = ref(false);
const exporting = ref(false);
const errorMessage = ref("");

const createModalOpen = ref(false);
const editModalOpen = ref(false);
const deleteModalOpen = ref(false);

const selectedUser = ref<UserItem | null>(null);
const selectedDeleteUser = ref<UserItem | null>(null);

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
    key: "email_verification",
    label: "Email",
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

const refreshNotifications = async () => {
  await notificationStore.refreshNotifications();
};

const handleRefresh = async () => {
  page.value = 1;
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
  await refreshNotifications();

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
  await refreshNotifications();

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
  await refreshNotifications();

  toast.success("User deleted", "The user account was deleted successfully.");
};

const handleResendVerification = async (user: UserItem) => {
  try {
    await resendUserVerification(user.id);
    await refreshNotifications();

    toast.success("Verification sent", `Verification email was sent to ${user.email}.`);
  } catch (error: any) {
    toast.error("Resend failed", error.message || "Failed to resend verification email");
  }
};

const handleStatusChange = async (
  user: UserItem,
  newStatus: "active" | "pending" | "suspended" | "blocked"
) => {
  try {
    await updateUserStatus(user.id, newStatus);

    toast.success("Status updated", `${user.name} is now ${newStatus}.`);

    await fetchUsers();
    await refreshNotifications();
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

const handleExport = async () => {
  exporting.value = true;

  try {
    await exportUsers({
      search: search.value || undefined,
      status: status.value || undefined,
      email_verified: emailVerified.value || undefined,
    });

    toast.success("Export started", "Users CSV has been downloaded.");
  } catch (error: any) {
    toast.error("Export failed", error.message || "Failed to export users");
  } finally {
    exporting.value = false;
  }
};

const goPrevious = async () => {
  if (page.value <= 1) return;

  page.value--;
  await fetchUsers();
};

const goNext = async () => {
  if (page.value >= pagination.value.last_page) return;

  page.value++;
  await fetchUsers();
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, () => {
  page.value = 1;

  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

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
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Users Management"
      subtitle="Manage users, roles, status, verification, and account actions."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="exporting" @click="handleExport">
          <Download class="h-4 w-4" />
          Export
        </AppButton>

        <AppButton v-if="authStore.hasPermission('user.create')" @click="openCreateModal">
          <UserPlus class="h-4 w-4" />
          Add User
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage
      v-if="errorMessage"
      type="error"
      title="Unable to load users"
      :message="errorMessage"
    />

    <!-- Stats -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        class="motion-delay-50"
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
        class="motion-delay-100"
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
        class="motion-delay-150"
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
        class="motion-delay-200"
        title="Verified Emails"
        :value="stats.verified_users || 0"
        subtitle="Users with verified emails"
        tone="success"
      >
        <template #badge>
          <div
            class="rounded-xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
          >
            <Mail class="h-5 w-5" />
          </div>
        </template>
      </StatsCard>
    </div>

    <!-- Filters -->
    <FilterBar
      title="Filters"
      subtitle="Search and filter user accounts."
      class="motion-fade-up motion-delay-200"
    >
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
        <AppButton variant="secondary" :loading="loading" @click="handleRefresh">
          <RefreshCcw class="h-4 w-4" />
          Refresh
        </AppButton>
      </template>
    </FilterBar>

    <!-- Users table -->
    <DataTable
      class="motion-fade-up motion-delay-300"
      :columns="columns"
      :rows="users"
      :loading="loading"
      empty-title="No users found"
      empty-message="Try changing your filters or create a new user."
      sticky-header
    >
      <template #cell-user="{ row }">
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
          >
            {{ row.name?.charAt(0)?.toUpperCase() || "U" }}
          </div>

          <div class="min-w-0">
            <p class="truncate text-sm font-bold text-ui">
              {{ row.name }}
            </p>
            <p class="truncate text-sm text-muted">
              {{ row.email }}
            </p>
          </div>
        </div>
      </template>

      <template #cell-role="{ row }">
        <AppBadge v-if="row.role" variant="info">
          {{ row.role }}
        </AppBadge>

        <span v-else class="text-sm text-muted"> No Role </span>
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
        <AppDropdown
          width="w-72"
          :items="[
            {
              label: 'Resend Verification',
              value: 'resend-verification',
              icon: Mail,
              description: 'Send verification email again',
              visible: authStore.hasPermission('user.update') && !row.is_email_verified,
            },
            {
              label: 'Activate User',
              value: 'activate',
              icon: CheckCircle2,
              variant: 'success',
              description: 'Allow user access',
              visible: authStore.hasPermission('user.update') && row.status !== 'active',
            },
            {
              label: 'Set Pending',
              value: 'pending',
              icon: Timer,
              variant: 'warning',
              description: 'Move user to pending status',
              visible: authStore.hasPermission('user.update') && row.status !== 'pending',
            },
            {
              label: 'Suspend User',
              value: 'suspend',
              icon: ShieldAlert,
              variant: 'warning',
              description: 'Temporarily restrict account',
              visible:
                authStore.hasPermission('user.update') && row.status !== 'suspended',
            },
            {
              label: 'Block User',
              value: 'block',
              icon: Ban,
              variant: 'danger',
              description: 'Block this account',
              visible: authStore.hasPermission('user.update') && row.status !== 'blocked',
            },
            {
              label: 'Edit User',
              value: 'edit',
              icon: Pencil,
              description: 'Update user information',
              visible: authStore.hasPermission('user.update'),
            },
            {
              label: 'Delete User',
              value: 'delete',
              icon: Trash2,
              variant: 'danger',
              description: 'Remove this account',
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
      @previous="goPrevious"
      @next="goNext"
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
