<script setup lang="ts">
const emit = defineEmits<{
  (e: "toggle-sidebar"): void;
}>();

const authStore = useAuthStore();
const route = useRoute();

const pageTitle = computed(() => {
  const map: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/rbac": "RBAC Overview",
    "/users": "Users",
    "/roles": "Roles",
    "/permissions": "Permissions",
    "/audit-logs": "Audit Logs",
    "/profile": "Profile",
    "/settings": "Settings",
  };

  return map[route.path] || "Dashboard";
});
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-3">
        <button
          class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 lg:hidden"
          @click="emit('toggle-sidebar')"
        >
          Menu
        </button>

        <div>
          <h2 class="text-lg font-semibold text-slate-900">
            {{ pageTitle }}
          </h2>
          <p class="text-sm text-slate-500">Welcome back to your admin dashboard</p>
        </div>
      </div>

      <UserDropdown :user="authStore.user" />
    </div>
  </header>
</template>
