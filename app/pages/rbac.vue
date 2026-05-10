<script setup lang="ts">
import type {
  RbacStats,
  RbacRoleOverview,
  PermissionModuleOverview,
} from "~/composables/useRbac";
import {
  AlertCircle,
  ArrowRight,
  KeyRound,
  Plus,
  RefreshCcw,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "role.view",
  title: "RBAC",
});

const { getRbacDashboard } = useRbac();
const authStore = useAuthStore();
const toast = useToast();

const loading = ref(false);
const errorMessage = ref("");

const stats = ref<RbacStats>({
  total_users: 0,
  active_users: 0,
  inactive_users: 0,
  pending_users: 0,
  total_roles: 0,
  total_permissions: 0,
});

const roles = ref<RbacRoleOverview[]>([]);
const permissionModules = ref<PermissionModuleOverview[]>([]);

const fetchDashboard = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await getRbacDashboard();

    stats.value = response.data.stats;
    roles.value = response.data.roles;
    permissionModules.value = response.data.permission_modules;
  } catch (error: any) {
    errorMessage.value = error.message || "Failed to load RBAC dashboard";
    toast.error("Failed to load RBAC dashboard", errorMessage.value);
  } finally {
    loading.value = false;
  }
};

const topRoles = computed(() => {
  return [...roles.value]
    .sort((a, b) => b.permissions_count - a.permissions_count)
    .slice(0, 5);
});

const totalAssignedPermissions = computed(() => {
  return roles.value.reduce((total, role) => {
    return total + role.permissions_count;
  }, 0);
});

const roleCoveragePercent = (permissionCount: number) => {
  if (!stats.value.total_permissions) return 0;

  return Math.min(
    Math.round((permissionCount / stats.value.total_permissions) * 100),
    100
  );
};

onMounted(fetchDashboard);
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="RBAC Overview"
      subtitle="Monitor users, roles, permissions, and system access coverage."
    >
      <template #actions>
        <AppButton variant="secondary" :loading="loading" @click="fetchDashboard">
          <RefreshCcw class="h-4 w-4" />
          Refresh
        </AppButton>

        <NuxtLink v-if="authStore.hasPermission('role.view')" to="/roles">
          <AppButton variant="secondary">
            <ShieldCheck class="h-4 w-4" />
            Manage Roles
          </AppButton>
        </NuxtLink>

        <NuxtLink v-if="authStore.hasPermission('permission.view')" to="/permissions">
          <AppButton>
            <KeyRound class="h-4 w-4" />
            Manage Permissions
          </AppButton>
        </NuxtLink>
      </template>
    </PageHeader>

    <AlertMessage
      v-if="errorMessage"
      type="error"
      title="RBAC dashboard error"
      :message="errorMessage"
    />

    <template v-else>
      <!-- Stats -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          class="motion-delay-50"
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
          class="motion-delay-100"
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
          class="motion-delay-150"
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
          class="motion-delay-200"
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

      <!-- Main content -->
      <div class="grid gap-4 lg:grid-cols-3">
        <!-- User Status -->
        <div class="motion-card ui-card rounded-3xl p-6 lg:col-span-1">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-ui">User Status</h2>
              <p class="mt-1 text-sm text-muted">Account status summary.</p>
            </div>

            <div
              class="rounded-2xl bg-blue-100 p-2 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
            >
              <Users class="h-5 w-5" />
            </div>
          </div>

          <div v-if="loading" class="mt-5 space-y-4">
            <div
              v-for="i in 3"
              :key="i"
              class="h-14 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800"
            />
          </div>

          <div v-else class="mt-5 space-y-4">
            <div
              class="flex items-center justify-between rounded-2xl bg-green-50 px-4 py-3 dark:bg-green-950/30"
            >
              <span class="text-sm font-semibold text-green-700 dark:text-green-400">
                Active
              </span>
              <span class="text-sm font-bold text-green-700 dark:text-green-400">
                {{ stats.active_users }}
              </span>
            </div>

            <div
              class="flex items-center justify-between rounded-2xl bg-amber-50 px-4 py-3 dark:bg-amber-950/30"
            >
              <span class="text-sm font-semibold text-amber-700 dark:text-amber-400">
                Pending
              </span>
              <span class="text-sm font-bold text-amber-700 dark:text-amber-400">
                {{ stats.pending_users }}
              </span>
            </div>

            <div
              class="flex items-center justify-between rounded-2xl bg-surface-soft px-4 py-3"
            >
              <span class="text-sm font-semibold text-muted"> Inactive </span>
              <span class="text-sm font-bold text-ui">
                {{ stats.inactive_users }}
              </span>
            </div>
          </div>
        </div>

        <!-- Top roles -->
        <div class="motion-card motion-delay-100 ui-card rounded-3xl p-6 lg:col-span-2">
          <div class="flex items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-ui">Role Coverage</h2>
              <p class="mt-1 text-sm text-muted">
                Roles with the highest permission coverage.
              </p>
            </div>

            <NuxtLink
              to="/roles"
              class="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-smooth hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all
              <ArrowRight class="h-4 w-4" />
            </NuxtLink>
          </div>

          <div v-if="loading" class="mt-5 space-y-4">
            <div
              v-for="i in 5"
              :key="i"
              class="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800"
            />
          </div>

          <div v-else-if="topRoles.length" class="mt-5 space-y-4">
            <div
              v-for="role in topRoles"
              :key="role.id"
              class="motion-row rounded-2xl border border-ui bg-surface-soft p-4 transition-smooth hover:bg-surface"
            >
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-sm font-bold text-ui">
                    {{ role.name }}
                  </p>
                  <p class="mt-1 text-xs text-muted">
                    {{ role.users_count }} users · {{ role.guard_name }} guard
                  </p>
                </div>

                <AppBadge variant="info">
                  {{ role.permissions_count }} permissions
                </AppBadge>
              </div>

              <div class="mt-4">
                <div class="mb-2 flex items-center justify-between text-xs">
                  <span class="text-muted">Coverage</span>
                  <span class="font-semibold text-ui">
                    {{ roleCoveragePercent(role.permissions_count) }}%
                  </span>
                </div>

                <div
                  class="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                >
                  <div
                    class="h-full rounded-full bg-blue-600 transition-all duration-500 dark:bg-blue-400"
                    :style="{ width: `${roleCoveragePercent(role.permissions_count)}%` }"
                  />
                </div>
              </div>
            </div>
          </div>

          <EmptyState
            v-else
            title="No roles found"
            message="Create roles to start managing permission coverage."
          />
        </div>
      </div>

      <!-- Permission modules -->
      <div class="motion-fade-up motion-delay-150 space-y-4">
        <SectionHeader
          title="Permission Modules"
          subtitle="Permissions grouped by module."
        />

        <div v-if="loading" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="i in 6"
            :key="i"
            class="h-32 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800"
          />
        </div>

        <div
          v-else-if="permissionModules.length"
          class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          <div
            v-for="module in permissionModules"
            :key="module.module"
            class="motion-card hover-lift ui-card rounded-3xl p-5"
          >
            <div class="flex items-center justify-between gap-4">
              <div>
                <h3 class="text-sm font-bold capitalize text-ui">
                  {{ module.module }}
                </h3>
                <p class="mt-1 text-xs text-muted">Permission module</p>
              </div>

              <AppBadge variant="info">
                {{ module.total }}
              </AppBadge>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              <AppBadge
                v-for="permission in module.permissions.slice(0, 5)"
                :key="permission"
                variant="default"
              >
                {{ permission }}
              </AppBadge>

              <span
                v-if="module.permissions.length > 5"
                class="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-slate-900"
              >
                +{{ module.permissions.length - 5 }} more
              </span>
            </div>
          </div>
        </div>

        <EmptyState
          v-else
          title="No permission modules found"
          message="Create permissions to organize your RBAC modules."
        />
      </div>

      <!-- Quick actions -->
      <div class="motion-fade-up motion-delay-200 space-y-4">
        <SectionHeader
          title="Quick Actions"
          subtitle="Jump into common RBAC management tasks."
        />

        <div class="grid gap-4 md:grid-cols-3">
          <NuxtLink
            v-if="authStore.hasPermission('user.create')"
            to="/users"
            class="group hover-lift ui-card rounded-3xl p-5 transition-smooth"
          >
            <div class="flex items-center justify-between">
              <div
                class="rounded-2xl bg-blue-100 p-3 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
              >
                <Users class="h-5 w-5" />
              </div>

              <ArrowRight
                class="h-5 w-5 text-muted transition-smooth group-hover:translate-x-1 group-hover:text-ui"
              />
            </div>

            <p class="mt-4 text-sm font-bold text-ui">Create User</p>
            <p class="mt-2 text-sm text-muted">Add a new user and assign role access.</p>
          </NuxtLink>

          <NuxtLink
            v-if="authStore.hasPermission('role.create')"
            to="/roles"
            class="group hover-lift ui-card rounded-3xl p-5 transition-smooth"
          >
            <div class="flex items-center justify-between">
              <div
                class="rounded-2xl bg-purple-100 p-3 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300"
              >
                <ShieldCheck class="h-5 w-5" />
              </div>

              <ArrowRight
                class="h-5 w-5 text-muted transition-smooth group-hover:translate-x-1 group-hover:text-ui"
              />
            </div>

            <p class="mt-4 text-sm font-bold text-ui">Create Role</p>
            <p class="mt-2 text-sm text-muted">Create a new role for your system.</p>
          </NuxtLink>

          <NuxtLink
            v-if="authStore.hasPermission('permission.create')"
            to="/permissions"
            class="group hover-lift ui-card rounded-3xl p-5 transition-smooth"
          >
            <div class="flex items-center justify-between">
              <div
                class="rounded-2xl bg-green-100 p-3 text-green-700 dark:bg-green-950/50 dark:text-green-300"
              >
                <KeyRound class="h-5 w-5" />
              </div>

              <ArrowRight
                class="h-5 w-5 text-muted transition-smooth group-hover:translate-x-1 group-hover:text-ui"
              />
            </div>

            <p class="mt-4 text-sm font-bold text-ui">Create Permission</p>
            <p class="mt-2 text-sm text-muted">Add fine-grained permission rules.</p>
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>
