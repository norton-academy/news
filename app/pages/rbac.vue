<script setup lang="ts">
import type {
  RbacStats,
  RbacRoleOverview,
  PermissionModuleOverview,
} from "~/composables/useRbac";

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
      class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
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
        />

        <StatsCard
          title="Roles"
          :value="stats.total_roles"
          subtitle="System access groups"
          tone="default"
        />

        <StatsCard
          title="Permissions"
          :value="stats.total_permissions"
          subtitle="Fine-grained controls"
          tone="success"
        />

        <StatsCard
          title="Assigned Permissions"
          :value="totalAssignedPermissions"
          subtitle="Across all roles"
          tone="warning"
        />
      </div>

      <!-- User status -->
      <div class="grid gap-4 lg:grid-cols-3">
        <div
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1"
        >
          <h2 class="text-lg font-bold text-slate-900">User Status</h2>
          <p class="mt-1 text-sm text-slate-500">Account status summary.</p>

          <div class="mt-5 space-y-4">
            <div
              class="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3"
            >
              <span class="text-sm font-medium text-green-700">Active</span>
              <span class="text-sm font-bold text-green-700">
                {{ stats.active_users }}
              </span>
            </div>

            <div
              class="flex items-center justify-between rounded-xl bg-amber-50 px-4 py-3"
            >
              <span class="text-sm font-medium text-amber-700">Pending</span>
              <span class="text-sm font-bold text-amber-700">
                {{ stats.pending_users }}
              </span>
            </div>

            <div
              class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
            >
              <span class="text-sm font-medium text-slate-700">Inactive</span>
              <span class="text-sm font-bold text-slate-700">
                {{ stats.inactive_users }}
              </span>
            </div>
          </div>
        </div>

        <!-- Top roles -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-slate-900">Role Coverage</h2>
              <p class="mt-1 text-sm text-slate-500">
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
              class="rounded-xl border border-slate-200 p-4"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-bold text-slate-900">
                    {{ role.name }}
                  </p>
                  <p class="mt-1 text-xs text-slate-500">
                    {{ role.users_count }} users · {{ role.guard_name }} guard
                  </p>
                </div>

                <span
                  class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  {{ role.permissions_count }} permissions
                </span>
              </div>

              <div class="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  class="h-full rounded-full bg-slate-900"
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
              class="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500"
            >
              No roles found.
            </div>
          </div>
        </div>
      </div>

      <!-- Permission modules -->
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-bold text-slate-900">Permission Modules</h2>
            <p class="mt-1 text-sm text-slate-500">Permissions grouped by module name.</p>
          </div>

          <NuxtLink
            to="/permissions"
            class="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Manage permissions
          </NuxtLink>
        </div>

        <div class="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="module in permissionModules"
            :key="module.module"
            class="rounded-2xl border border-slate-200 p-4"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold capitalize text-slate-900">
                {{ module.module }}
              </h3>

              <span
                class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
              >
                {{ module.total }}
              </span>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="permission in module.permissions.slice(0, 5)"
                :key="permission"
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {{ permission }}
              </span>

              <span
                v-if="module.permissions.length > 5"
                class="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white"
              >
                +{{ module.permissions.length - 5 }} more
              </span>
            </div>
          </div>

          <div
            v-if="permissionModules.length === 0"
            class="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500"
          >
            No permission modules found.
          </div>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="grid gap-4 md:grid-cols-3">
        <NuxtLink
          v-if="authStore.hasPermission('user.create')"
          to="/users"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:bg-slate-50"
        >
          <p class="text-sm font-bold text-slate-900">Create User</p>
          <p class="mt-2 text-sm text-slate-500">
            Add a new user and assign role access.
          </p>
        </NuxtLink>

        <NuxtLink
          v-if="authStore.hasPermission('role.create')"
          to="/roles"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:bg-slate-50"
        >
          <p class="text-sm font-bold text-slate-900">Create Role</p>
          <p class="mt-2 text-sm text-slate-500">Create a new role for your system.</p>
        </NuxtLink>

        <NuxtLink
          v-if="authStore.hasPermission('permission.create')"
          to="/permissions"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:bg-slate-50"
        >
          <p class="text-sm font-bold text-slate-900">Create Permission</p>
          <p class="mt-2 text-sm text-slate-500">Add fine-grained permission rules.</p>
        </NuxtLink>
      </div>
    </template>
  </div>
</template>
