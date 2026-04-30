<script setup lang="ts">
import type {
  RbacStats,
  RbacRoleOverview,
  PermissionModuleOverview,
} from "~/composables/useRbac";
import { KeyRound, ShieldCheck, Users, Workflow } from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
  permission: "role.view",
});

const { getRbacDashboard } = useRbac();
const authStore = useAuthStore();

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

onMounted(fetchDashboard);
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->

    <SectionHeader
      title="Role Coverage"
      subtitle="Roles with the highest permission coverage."
    >
      <template #actions>
        <NuxtLink
          v-if="authStore.hasPermission('role.view')"
          to="/roles"
          class="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Manage Roles
        </NuxtLink>

        <NuxtLink
          v-if="authStore.hasPermission('permission.view')"
          to="/permissions"
          class="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          Manage Permissions
        </NuxtLink>
      </template>
    </SectionHeader>

    <!-- Error -->
    <div
      v-if="errorMessage"
      class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
    >
      {{ errorMessage }}
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500 shadow-sm"
    >
      Loading RBAC overview...
    </div>

    <template v-else>
      <!-- Stats card group-->
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

      <!-- User status -->
      <div class="grid gap-4 lg:grid-cols-3">
        <div
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1 dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">User Status</h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Account status summary.
          </p>

          <div class="mt-5 space-y-4">
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
        </div>

        <!-- Top roles -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
        >
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">
                Role Coverage
              </h2>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Roles with the highest permission coverage.
              </p>
            </div>

            <NuxtLink
              to="/roles"
              class="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all
            </NuxtLink>
          </div>

          <div class="mt-5 space-y-4">
            <div
              v-for="role in topRoles"
              :key="role.id"
              class="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">
                    {{ role.name }}
                  </p>
                  <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {{ role.users_count }} users · {{ role.guard_name }} guard
                  </p>
                </div>

                <AppBadge> {{ role.permissions_count }} permissions </AppBadge>
              </div>

              <div
                class="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
              >
                <div
                  class="h-full rounded-full bg-slate-900 dark:bg-white"
                  :style="{
                    width: stats.total_permissions
                      ? `${Math.min(
                          (role.permissions_count / stats.total_permissions) * 100,
                          100
                        )}%`
                      : '0%',
                  }"
                />
              </div>
            </div>

            <div
              v-if="topRoles.length === 0"
              class="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:bg-slate-800/60 dark:text-slate-400"
            >
              No roles found.
            </div>
          </div>
        </div>
      </div>

      <!-- Permission modules -->
      <div
        v-for="module in permissionModules"
        :key="module.module"
        class="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold capitalize text-slate-900 dark:text-white">
            {{ module.module }}
          </h3>

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
            class="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-slate-900"
          >
            +{{ module.permissions.length - 5 }} more
          </span>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="grid gap-4 md:grid-cols-3">
        <NuxtLink
          v-if="authStore.hasPermission('user.create')"
          to="/users"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          <p class="text-sm font-bold text-slate-900 dark:text-white">Create User</p>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add a new user and assign role access.
          </p>
        </NuxtLink>

        <NuxtLink
          v-if="authStore.hasPermission('role.create')"
          to="/roles"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          <p class="text-sm font-bold text-slate-900 dark:text-white">Create Role</p>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Create a new role for your system.
          </p>
        </NuxtLink>

        <NuxtLink
          v-if="authStore.hasPermission('permission.create')"
          to="/permissions"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          <p class="text-sm font-bold text-slate-900 dark:text-white">
            Create Permission
          </p>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add fine-grained permission rules.
          </p>
        </NuxtLink>
      </div>
    </template>
  </div>
</template>
