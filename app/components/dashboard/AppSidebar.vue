<script setup lang="ts">
import {
  Activity,
  Gauge,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  ScrollText,
  Settings,
  ShieldCheck,
  UserCog,
  Users,
  X,
} from "lucide-vue-next";

defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const route = useRoute();
const authStore = useAuthStore();

const navigation = computed(() => [
  {
    name: "Dashboard",
    href: "/dashboard",
    permission: "dashboard.view",
    icon: LayoutDashboard,
  },
  {
    name: "RBAC Overview",
    href: "/rbac",
    permission: "role.view",
    icon: ShieldCheck,
  },
  {
    name: "Users",
    href: "/users",
    permission: "user.view",
    icon: Users,
  },
  {
    name: "Roles",
    href: "/roles",
    permission: "role.view",
    icon: UserCog,
  },
  {
    name: "Permissions",
    href: "/permissions",
    permission: "permission.view",
    icon: KeyRound,
  },
  {
    name: "Audit Logs",
    href: "/audit-logs",
    permission: "audit.view",
    icon: ScrollText,
  },
  {
    name: "Profile",
    href: "/profile",
    permission: "profile.view",
    icon: LockKeyhole,
  },
  {
    name: "Settings",
    href: "/settings",
    permission: "setting.view",
    icon: Settings,
  },
]);

const visibleNavigation = computed(() => {
  return navigation.value.filter((item) => authStore.hasPermission(item.permission));
});

const isActive = (href: string) => {
  return route.path === href || route.path.startsWith(`${href}/`);
};
</script>

<template>
  <div>
    <!-- Mobile overlay -->
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        @click="emit('close')"
      />
    </transition>

    <!-- Mobile sidebar -->
    <transition name="slide">
      <aside
        v-if="open"
        class="fixed inset-y-0 left-0 z-50 w-80 border-r border-slate-200 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden"
      >
        <div
          class="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            >
              <Activity class="h-5 w-5" />
            </div>
            <div>
              <h1 class="text-sm font-bold text-slate-900 dark:text-white">
                Admin Panel
              </h1>
              <p class="text-xs text-slate-500 dark:text-slate-400">RBAC Management</p>
            </div>
          </div>

          <button
            class="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            @click="emit('close')"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <nav class="space-y-1 p-4">
          <NuxtLink
            v-for="item in visibleNavigation"
            :key="item.href"
            :to="item.href"
            class="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition"
            :class="
              isActive(item.href)
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
            "
            @click="emit('close')"
          >
            <component :is="item.icon" class="h-5 w-5" />
            {{ item.name }}
          </NuxtLink>
        </nav>
      </aside>
    </transition>

    <!-- Desktop sidebar -->
    <aside
      class="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white/80 lg:backdrop-blur-xl dark:lg:border-slate-800 dark:lg:bg-slate-950/80"
    >
      <div
        class="flex h-16 items-center border-b border-slate-200 px-6 dark:border-slate-800"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900"
          >
            <Gauge class="h-5 w-5" />
          </div>

          <div>
            <h1 class="text-base font-bold text-slate-900 dark:text-white">
              Admin Panel
            </h1>
            <p class="text-xs text-slate-500 dark:text-slate-400">Enterprise RBAC</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 space-y-1 overflow-y-auto p-4">
        <NuxtLink
          v-for="item in visibleNavigation"
          :key="item.href"
          :to="item.href"
          class="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition"
          :class="
            isActive(item.href)
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
          "
        >
          <component :is="item.icon" class="h-5 w-5" />
          {{ item.name }}
        </NuxtLink>
      </nav>

      <div class="border-t border-slate-200 p-4 dark:border-slate-800">
        <div
          class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <p
            class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Signed in as
          </p>
          <p class="mt-1 truncate text-sm font-bold text-slate-900 dark:text-white">
            {{ authStore.user?.name || "User" }}
          </p>
          <p class="truncate text-xs text-slate-500 dark:text-slate-400">
            {{ authStore.user?.email }}
          </p>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
