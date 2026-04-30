<script setup lang="ts">
import { Bell, Menu, Search } from "lucide-vue-next";

const emit = defineEmits<{
  (e: "toggle-sidebar"): void;
}>();

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
  <header
    class="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl transition-colors dark:border-slate-800 dark:bg-slate-950/80"
  >
    <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-3">
        <button
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
          @click="emit('toggle-sidebar')"
        >
          <Menu class="h-5 w-5" />
        </button>

        <div>
          <h2 class="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
            {{ pageTitle }}
          </h2>
          <p class="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
            Manage your system with secure access control
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 sm:gap-3">
        <button
          class="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-500 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 md:inline-flex"
        >
          <Search class="h-4 w-4" />
          Search
        </button>

        <button
          class="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Bell class="h-5 w-5" />
          <span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <ThemeToggle />

        <UserDropdown />
      </div>
    </div>
  </header>
</template>
