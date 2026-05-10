<script setup lang="ts">
import type { AuditLogItem, AuditLogPagination } from "~/composables/useAuditLog";
import { Eye, FileClock, RefreshCcw, Download } from "lucide-vue-next";
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "audit.view",
  title: "Audit Logs",
});

const { getAuditLogs, exportAuditLogs } = useAuditLog();
const toast = useToast();
const authStore = useAuthStore();
const exporting = ref(false);

const logs = ref<AuditLogItem[]>([]);
const search = ref("");
const module = ref("");
const action = ref("");
const page = ref(1);
const perPage = ref(10);
const loading = ref(false);
const errorMessage = ref("");

const moduleFilter = ref("");
const actionFilter = ref("");
const dateFrom = ref("");
const dateTo = ref("");

const selectedLog = ref<AuditLogItem | null>(null);
const detailsOpen = ref(false);

const pagination = ref<AuditLogPagination>({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
});

const fetchLogs = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await getAuditLogs({
      search: search.value || undefined,
      module: moduleFilter.value || undefined,
      action: actionFilter.value || undefined,
      date_from: dateFrom.value || undefined,
      date_to: dateTo.value || undefined,
      page: page.value,
      per_page: perPage.value,
    });

    logs.value = response.data.logs;
    pagination.value = response.data.pagination;
  } catch (error: any) {
    errorMessage.value = error.message || "Failed to load audit logs";
    toast.error("Failed to load audit logs", errorMessage.value);
  } finally {
    loading.value = false;
  }
};

const resetFilters = async () => {
  search.value = "";
  moduleFilter.value = "";
  actionFilter.value = "";
  dateFrom.value = "";
  dateTo.value = "";
  page.value = 1;
  await fetchLogs();
};

const openDetails = (log: AuditLogItem) => {
  selectedLog.value = log;
  detailsOpen.value = true;
};

const closeDetails = () => {
  selectedLog.value = null;
  detailsOpen.value = false;
};

const handleExport = async () => {
  exporting.value = true;

  try {
    await exportAuditLogs({
      search: search.value || undefined,
      module: moduleFilter.value || undefined,
      action: actionFilter.value || undefined,
      date_from: dateFrom.value || undefined,
      date_to: dateTo.value || undefined,
    });

    toast.success("Export started", "Audit logs CSV has been downloaded.");
  } catch (error: any) {
    toast.error("Export failed", error.message || "Failed to export audit logs");
  } finally {
    exporting.value = false;
  }
};

const columns = [
  {
    key: "action",
    label: "Action",
  },
  {
    key: "module",
    label: "Module",
  },
  {
    key: "user",
    label: "User",
  },
  {
    key: "ip_address",
    label: "IP",
  },
  {
    key: "created_at",
    label: "Date",
  },
  {
    key: "actions",
    label: "Details",
    align: "right" as const,
  },
];

const moduleOptions = [
  { label: "Users", value: "users" },
  { label: "Roles", value: "roles" },
  { label: "Permissions", value: "permissions" },
  { label: "Settings", value: "settings" },
  { label: "Profile", value: "profile" },
];

const actionOptions = [
  { label: "User Created", value: "user.created" },
  { label: "User Updated", value: "user.updated" },
  { label: "User Deleted", value: "user.deleted" },
  { label: "User Status Updated", value: "user.status_updated" },
  { label: "User Verification Resent", value: "user.verification_resent" },

  { label: "Role Created", value: "role.created" },
  { label: "Role Updated", value: "role.updated" },
  { label: "Role Deleted", value: "role.deleted" },
  { label: "Role Permissions Synced", value: "role.permissions.synced" },

  { label: "Permission Created", value: "permission.created" },
  { label: "Permission Updated", value: "permission.updated" },
  { label: "Permission Deleted", value: "permission.deleted" },

  { label: "Settings Updated", value: "settings.updated" },
  { label: "Profile Updated", value: "profile.updated" },
  { label: "Profile Password Updated", value: "profile.password_updated" },
];

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, async () => {
  page.value = 1;
  await fetchLogs();
});

watch([module, action], async () => {
  page.value = 1;
  await fetchLogs();
});

watch([moduleFilter, actionFilter, dateFrom, dateTo], async () => {
  page.value = 1;
  await fetchLogs();
});

onMounted(fetchLogs);
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Audit Logs"
      subtitle="Track important RBAC and user management actions."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="exporting" @click="handleExport">
          <Download class="mr-2 h-4 w-4" />
          Export
        </AppButton>

        <AppButton variant="secondary" :loading="loading" @click="fetchLogs">
          <RefreshCcw class="mr-2 h-4 w-4" />
          Refresh
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage v-if="errorMessage" type="error" :message="errorMessage" />

    <FilterBar
      title="Advanced Filters"
      subtitle="Search by user, module, action, IP address, or date range."
      columns="4"
    >
      <AppInput
        v-model="search"
        label="Search"
        placeholder="Search action, module, user, IP..."
      />

      <AppSelect
        v-model="moduleFilter"
        label="Module"
        placeholder="All Modules"
        :options="moduleOptions"
      />

      <AppSelect
        v-model="actionFilter"
        label="Action"
        placeholder="All Actions"
        :options="actionOptions"
      />

      <AppInput v-model="dateFrom" label="Date From" type="date" />

      <AppInput v-model="dateTo" label="Date To" type="date" />

      <template #actions>
        <AppButton variant="secondary" @click="resetFilters"> Reset </AppButton>

        <AppButton variant="secondary" :loading="loading" @click="fetchLogs">
          Refresh
        </AppButton>
      </template>
    </FilterBar>

    <DataTable
      :columns="columns"
      :rows="logs"
      :loading="loading"
      empty-title="No audit logs found"
      empty-message="RBAC actions will appear here after changes are made."
    >
      <template #cell-action="{ row }">
        <AppBadge variant="default">
          {{ row.action }}
        </AppBadge>
      </template>

      <template #cell-module="{ row }">
        {{ row.module || "-" }}
      </template>

      <template #cell-user="{ row }">
        <div v-if="row.user">
          <p class="text-sm font-semibold text-ui">
            {{ row.user.name }}
          </p>
          <p class="text-xs text-slate-500">
            {{ row.user.email }}
          </p>
        </div>

        <span v-else class="text-sm text-slate-500"> System </span>
      </template>

      <template #cell-ip_address="{ row }">
        {{ row.ip_address || "-" }}
      </template>

      <template #cell-actions="{ row }">
        <AppButton size="sm" variant="secondary" @click="openDetails(row)">
          <Eye class="mr-2 h-4 w-4" />
          View
        </AppButton>
      </template>
    </DataTable>

    <TablePagination
      :current-page="pagination.current_page"
      :last-page="pagination.last_page"
      :total="pagination.total"
      :loading="loading"
      @previous="
        page--;
        fetchLogs();
      "
      @next="
        page++;
        fetchLogs();
      "
    />

    <AppModal
      :open="detailsOpen"
      title="Audit Details"
      :subtitle="selectedLog?.action || ''"
      size="lg"
      @close="closeDetails"
    >
      <template #icon>
        <FileClock class="h-5 w-5" />
      </template>
      <div class="space-y-5">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <p class="text-xs font-semibold uppercase text-muted">
              Module
            </p>
            <p class="mt-1 text-sm font-medium text-ui">
              {{ selectedLog?.module || "-" }}
            </p>
          </div>

          <div class="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <p class="text-xs font-semibold uppercase text-muted">
              IP Address
            </p>
            <p class="mt-1 text-sm font-medium text-ui">
              {{ selectedLog?.ip_address || "-" }}
            </p>
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
          <p class="mb-3 text-sm font-bold text-ui">Old Values</p>
          <pre
            class="overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-white dark:bg-slate-950"
            >{{ JSON.stringify(selectedLog?.old_values, null, 2) }}</pre
          >
        </div>

        <div class="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
          <p class="mb-3 text-sm font-bold text-ui">New Values</p>
          <pre
            class="overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-white dark:bg-slate-950"
            >{{ JSON.stringify(selectedLog?.new_values, null, 2) }}</pre
          >
        </div>
      </div>
    </AppModal>
  </div>
</template>
