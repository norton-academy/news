<script setup lang="ts">
import type {
  DashboardStats,
  DashboardRecentUser,
  DashboardRecentAuditLog,
  DashboardRoleDistribution,
  DashboardSystem,
} from "~/composables/useDashboard";
import { Activity, Clock, Database, ShieldCheck, Users } from "lucide-vue-next";
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "dashboard.view",
});

const { getDashboardSummary } = useDashboard();
const toast = useToast();

const loading = ref(false);
const errorMessage = ref("");

const stats = ref<DashboardStats>({
  total_users: 0,
  active_users: 0,
  pending_users: 0,
  inactive_users: 0,
  total_roles: 0,
  total_permissions: 0,
  total_audit_logs: 0,
});

const recentUsers = ref<DashboardRecentUser[]>([]);
const recentAuditLogs = ref<DashboardRecentAuditLog[]>([]);
const roleDistribution = ref<DashboardRoleDistribution[]>([]);

const system = ref<DashboardSystem>({
  status: "Unknown",
  environment: "-",
  timezone: "-",
});

const fetchDashboard = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await getDashboardSummary();

    stats.value = response.data.stats;
    recentUsers.value = response.data.recent_users;
    recentAuditLogs.value = response.data.recent_audit_logs;
    roleDistribution.value = response.data.role_distribution;
    system.value = response.data.system;
  } catch (error: any) {
    errorMessage.value = error.message || "Failed to load dashboard";
    toast.error("Dashboard failed", errorMessage.value);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchDashboard);
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Dashboard"
      subtitle="Overview of users, roles, permissions, and system activity."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="loading" @click="fetchDashboard">
          Refresh
        </AppButton>
      </template>
    </PageHeader>

    <AlertMessage
      v-if="errorMessage"
      type="error"
      :message="errorMessage"
    />

    <div
      v-if="loading"
      class="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500 shadow-sm"
    >
      Loading dashboard...
    </div>

    <template v-else>
      <!-- Stats -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Users"
          :value="stats.total_users"
          :subtitle="`${stats.active_users} active users`"
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
          title="Roles"
          :value="stats.total_roles"
          subtitle="System access groups"
          tone="default"
        >
          <template #badge>
            <div
              class="rounded-xl bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <ShieldCheck class="h-5 w-5" />
            </div>
          </template>
        </StatsCard>

        <StatsCard
          title="Permissions"
          :value="stats.total_permissions"
          subtitle="Fine-grained controls"
          tone="success"
        >
          <template #badge>
            <div
              class="rounded-xl bg-green-100 p-2 text-green-700 dark:bg-green-950/50 dark:text-green-300"
            >
              <KeyRound class="h-5 w-5" />
            </div>
          </template>
        </StatsCard>

        <StatsCard
          title="Assigned Permissions"
          :value="totalAssignedPermissions"
          subtitle="Across all roles"
          tone="warning"
        >
          <template #badge>
            <div
              class="rounded-xl bg-amber-100 p-2 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
            >
              <Workflow class="h-5 w-5" />
            </div>
          </template>
        </StatsCard>
      </div>

      <!-- System status -->
      <div class="grid gap-4 lg:grid-cols-3">
        <AppCard title="System Status" subtitle="Current application health.">
          <div class="space-y-4">
            <div
              class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60"
            >
              <span class="text-sm font-medium text-slate-600 dark:text-slate-400"
                >Status</span
              >
              <AppBadge :variant="system.status === 'Healthy' ? 'success' : 'warning'">
                {{ system.status }}
              </AppBadge>
            </div>

            <div
              class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60"
            >
              <span class="text-sm font-medium text-slate-600 dark:text-slate-400"
                >Environment</span
              >
              <span class="text-sm font-bold text-slate-900 dark:text-white">
                {{ system.environment }}
              </span>
            </div>

            <div
              class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60"
            >
              <span class="text-sm font-medium text-slate-600 dark:text-slate-400"
                >Timezone</span
              >
              <span class="text-sm font-bold text-slate-900 dark:text-white">
                {{ system.timezone }}
              </span>
            </div>
          </div>
        </AppCard>

        <AppCard title="User Status" subtitle="Account status summary.">
          <div class="space-y-4">
            <div
              class="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3 dark:bg-green-950/30"
            >
              <span class="text-sm font-medium text-green-700 dark:text-green-400"
                >Active</span
              >
              <span class="text-sm font-bold text-green-700 dark:text-green-400">
                {{ stats.active_users }}
              </span>
            </div>

            <div
              class="flex items-center justify-between rounded-xl bg-amber-50 px-4 py-3 dark:bg-amber-950/30"
            >
              <span class="text-sm font-medium text-amber-700 dark:text-amber-400"
                >Pending</span
              >
              <span class="text-sm font-bold text-amber-700 dark:text-amber-400">
                {{ stats.pending_users }}
              </span>
            </div>

            <div
              class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60"
            >
              <span class="text-sm font-medium text-slate-700 dark:text-slate-300"
                >Inactive</span
              >
              <span class="text-sm font-bold text-slate-700 dark:text-slate-300">
                {{ stats.inactive_users }}
              </span>
            </div>
          </div>
        </AppCard>

        <AppCard title="Role Distribution" subtitle="Users grouped by role.">
          <div class="space-y-4">
            <div
              v-for="role in roleDistribution"
              :key="role.id"
              class="rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800"
            >
              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold text-slate-900 dark:text-white">
                  {{ role.name }}
                </p>

                <span class="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {{ role.users_count }}
                </span>
              </div>

              <div
                class="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
              >
                <div
                  class="h-full rounded-full bg-slate-900 dark:bg-white"
                  :style="{
                    width: stats.total_users
                      ? `${Math.min((role.users_count / stats.total_users) * 100, 100)}%`
                      : '0%',
                  }"
                />
              </div>
            </div>

            <EmptyState
              v-if="roleDistribution.length === 0"
              title="No role data"
              message="Assign roles to users to see distribution."
            />
          </div>
        </AppCard>
      </div>

      <!-- Recent sections -->
      <div class="grid gap-4 lg:grid-cols-2">
        <AppCard title="Recent Users" subtitle="Latest registered accounts.">
          <div class="space-y-3">
            <div
              v-for="user in recentUsers"
              :key="user.id"
              class="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800"
            >
              <div>
                <p class="text-sm font-semibold text-slate-900 dark:text-white">
                  {{ user.name }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  {{ user.email }}
                </p>
              </div>

              <AppBadge
                :variant="
                  user.status === 'active'
                    ? 'success'
                    : user.status === 'pending'
                    ? 'warning'
                    : 'default'
                "
              >
                {{ user.status }}
              </AppBadge>
            </div>

            <EmptyState
              v-if="recentUsers.length === 0"
              title="No users yet"
              message="New users will appear here."
            />
          </div>
        </AppCard>

        <AppCard title="Recent Audit Logs" subtitle="Latest recorded system actions.">
          <div class="space-y-3">
            <div
              v-for="log in recentAuditLogs"
              :key="log.id"
              class="rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800"
            >
              <div class="flex items-center justify-between gap-4">
                <div>
                  <AppBadge variant="default">
                    {{ log.action }}
                  </AppBadge>

                  <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {{ log.user?.name || "System" }} · {{ log.created_at }}
                  </p>
                </div>

                <span class="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {{ log.module || "-" }}
                </span>
              </div>
            </div>

            <EmptyState
              v-if="recentAuditLogs.length === 0"
              title="No audit logs yet"
              message="System actions will appear here."
            />
          </div>
        </AppCard>
      </div>
    </template>
  </div>
</template>
