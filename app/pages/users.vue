<script setup lang="ts">
import type { UserItem, UserPagination, UserStats } from "~/composables/useUser";
import { useUserManagementStore } from "~/stores/userManagement";
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
  Download,
} from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "user.view",
  title: "Users",
});

const { resendUserVerification, updateUserStatus, exportUsers } = useUser();
const userStore = useUserManagementStore();
const toast = useToast();

const search = ref("");
const status = ref("");
const page = ref(1);
const perPage = ref(10);
const emailVerified = ref("");
const exporting = ref(false);

const createModalOpen = ref(false);

const fetchUsers = async (opts: { force?: boolean; silent?: boolean } = {}) => {
  await userStore.fetchUsers(
    {
      search: search.value || undefined,
      status: status.value || undefined,
      email_verified: emailVerified.value || undefined,
      page: page.value,
      per_page: perPage.value,
    },
    { force: opts.force, silent: opts.silent }
  );

  if (userStore.errorMessage) {
    toast.error("Failed to load users", userStore.errorMessage);
  }
};

const editModalOpen = ref(false);
const selectedUser = ref<UserItem | null>(null);

const deleteModalOpen = ref(false);
const selectedDeleteUser = ref<UserItem | null>(null);

const handleRefresh = async () => {
  await fetchUsers({ force: true, silent: true });
};

const openCreateModal = () => {
  createModalOpen.value = true;
};

const closeCreateModal = () => {
  createModalOpen.value = false;
};

const handleCreated = async () => {
  createModalOpen.value = false;
  // store was updated by modal; reflect state
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
  // store updated in-place by modal
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
  // user removed from cache by modal
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

  if (action === "edit") {
    openEditModal(user);
    return;
  }

  if (
    action === "activate" ||
    action === "pending" ||
    action === "suspend" ||
    action === "block" ||
    action === "delete"
  ) {
    openConfirmDialog(user, action);
  }
};

const handleConfirmAction = async () => {
  if (!confirmUser.value || !confirmAction.value) return;

  confirmLoading.value = true;

  try {
    if (confirmAction.value === "activate") {
      await handleStatusChange(confirmUser.value, "active");
    }

    if (confirmAction.value === "pending") {
      await handleStatusChange(confirmUser.value, "pending");
    }

    if (confirmAction.value === "suspend") {
      await handleStatusChange(confirmUser.value, "suspended");
    }

    if (confirmAction.value === "block") {
      await handleStatusChange(confirmUser.value, "blocked");
    }

    if (confirmAction.value === "delete") {
      selectedDeleteUser.value = confirmUser.value;

      /*
       If you already have DeleteUserModal and want to keep it,
       use this:
      */
      confirmOpen.value = false;
      deleteModalOpen.value = true;
      return;
    }

    closeConfirmDialog();
  } finally {
    confirmLoading.value = false;
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

type ConfirmAction = "activate" | "pending" | "suspend" | "block" | "delete" | null;

const confirmOpen = ref(false);
const confirmLoading = ref(false);
const confirmAction = ref<ConfirmAction>(null);
const confirmUser = ref<UserItem | null>(null);

const confirmConfig = computed(() => {
  const userName = confirmUser.value?.name || "this user";

  if (confirmAction.value === "activate") {
    return {
      title: "Activate User",
      message: `Are you sure you want to activate ${userName}? This user will be able to access the system.`,
      confirmLabel: "Activate",
      variant: "success" as const,
    };
  }

  if (confirmAction.value === "pending") {
    return {
      title: "Set User as Pending",
      message: `Are you sure you want to set ${userName} as pending?`,
      confirmLabel: "Set Pending",
      variant: "warning" as const,
    };
  }

  if (confirmAction.value === "suspend") {
    return {
      title: "Suspend User",
      message: `Are you sure you want to suspend ${userName}? This will temporarily restrict their account.`,
      confirmLabel: "Suspend",
      variant: "warning" as const,
    };
  }

  if (confirmAction.value === "block") {
    return {
      title: "Block User",
      message: `Are you sure you want to block ${userName}? This user will not be able to access the system.`,
      confirmLabel: "Block",
      variant: "danger" as const,
    };
  }

  if (confirmAction.value === "delete") {
    return {
      title: "Delete User",
      message: `Are you sure you want to delete ${userName}? This action cannot be undone.`,
      confirmLabel: "Delete",
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

const openConfirmDialog = (user: UserItem, action: ConfirmAction) => {
  confirmUser.value = user;
  confirmAction.value = action;
  confirmOpen.value = true;
};

const closeConfirmDialog = () => {
  if (confirmLoading.value) return;

  confirmOpen.value = false;
  confirmUser.value = null;
  confirmAction.value = null;
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
        <AppButton variant="secondary" :loading="exporting" @click="handleExport">
          <Download class="mr-2 h-4 w-4" />
          Export
        </AppButton>
        <AppButton v-if="authStore.hasPermission('user.create')" @click="openCreateModal">
          <UserPlus class="mr-2 h-4 w-4" />
          Add New User
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage
      v-if="userStore.errorMessage"
      type="error"
      :message="userStore.errorMessage"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Users"
        :delay="50"
        :value="userStore.stats.total_users"
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
        title="Total Users"
        :value="userStore.stats.total_users"
        subtitle="Registered users"
      />

      <StatsCard
        title="Active Users"
        :value="userStore.stats.active_users"
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
        :value="userStore.stats.pending_users"
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
        :value="userStore.stats.inactive_users"
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
        :value="userStore.stats.verified_users || 0"
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
        class=""
        :value="userStore.stats.unverified_users || 0"
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
      :rows="userStore.users"
      :loading="userStore.loading"
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
      :current-page="userStore.pagination.current_page"
      :last-page="userStore.pagination.last_page"
      :total="userStore.pagination.total"
      :loading="userStore.loading"
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
