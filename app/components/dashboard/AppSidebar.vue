<script setup lang="ts">
import {
  Activity,
  ChevronDown,
  Gauge,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-vue-next";
import type { MenuItem } from "~/composables/useMenu";

defineProps<{
  open: boolean;
  collapsed?: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "toggle-collapse"): void;
}>();

const route = useRoute();
const authStore = useAuthStore();

const isActive = (href: string) => {
  return route.path === href || route.path.startsWith(`${href}/`);
};

const menuStore = useMenuStore();

const visibleNavigation = computed(() => menuStore.menus);

const groupedNavigation = computed(() => {
  const groups: Record<string, MenuItem[]> = {};

  visibleNavigation.value.forEach((item) => {
    const group = item.group || "Main";

    if (!groups[group]) {
      groups[group] = [];
    }

    groups[group].push(item);
  });

  return Object.entries(groups).map(([label, items]) => ({
    label,
    items,
  }));
});

const openGroups = ref<Record<string, boolean>>({
  Main: true,
  Administration: true,
  System: true,
  Account: true,
});

const toggleGroup = (label: string) => {
  openGroups.value[label] = !openGroups.value[label];
};

const isGroupOpen = (label: string) => {
  return openGroups.value[label] !== false;
};

onMounted(async () => {
  if (!menuStore.initialized) {
    await menuStore.fetchMenus();
  }
});
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
              <h1 class="text-sm font-bold text-ui">Admin Panel</h1>
              <p class="text-xs text-muted">RBAC Management</p>
            </div>
          </div>

          <button
            class="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            @click="emit('close')"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <div v-if="menuStore.loading" class="space-y-2 p-4">
          <div
            v-for="i in 6"
            :key="i"
            class="h-11 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800"
          />
        </div>

        <nav v-else class="space-y-1 p-4">
          <div v-for="group in groupedNavigation" :key="group.label" class="space-y-4">
            <div
              class="px-3 text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500"
            >
              {{ group.label }}
            </div>

            <div class="space-y-1">
              <NuxtLink
                v-for="item in group.items"
                :key="item.route"
                :to="item.route"
                class="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition"
                :class="
                  isActive(item.route)
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                "
                @click="emit('close')"
              >
                <MenuIcon :name="item.icon" />
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>
        </nav>
      </aside>
    </transition>

    <!-- Desktop sidebar -->
    <aside
      class="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white/80 lg:backdrop-blur-xl lg:transition-all lg:duration-300 dark:lg:border-slate-800 dark:lg:bg-slate-950/80"
      :class="collapsed ? 'lg:w-24' : 'lg:w-72'"
    >
      <!-- sidebar header -->
      <div
        class="flex h-16 items-center border-b border-slate-200 px-4 dark:border-slate-800"
        :class="collapsed ? 'justify-center' : 'justify-between'"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900"
          >
            <Gauge class="h-5 w-5" />
          </div>

          <Transition name="sidebar-label">
            <div v-if="!collapsed">
              <h1 class="text-base font-bold text-ui">Admin Panel</h1>
              <p class="text-xs text-muted">Enterprise RBAC</p>
            </div>
          </Transition>
        </div>

        <button
          v-if="!collapsed"
          type="button"
          class="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          @click="emit('toggle-collapse')"
        >
          <PanelLeftClose class="h-5 w-5" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div v-if="menuStore.loading" class="space-y-2 p-4">
          <div
            v-for="i in 6"
            :key="i"
            class="h-11 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800"
          />
        </div>

        <nav
          class="flex-1 overflow-y-auto p-4"
          :class="collapsed ? 'space-y-3' : 'space-y-5'"
        >
          <div v-for="group in groupedNavigation" :key="group.label" class="space-y-2">
            <button
              v-if="!collapsed"
              type="button"
              class="flex w-full items-center justify-between px-3 text-xs font-bold uppercase tracking-wider text-slate-400 transition hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              @click="toggleGroup(group.label)"
            >
              <span>{{ group.label }}</span>

              <ChevronDown
                class="h-4 w-4 transition"
                :class="isGroupOpen(group.label) ? 'rotate-0' : '-rotate-90'"
              />
            </button>

            <Transition name="sidebar-group">
              <div v-if="collapsed || isGroupOpen(group.label)" class="space-y-1">
                <NuxtLink
                  v-for="item in group.items"
                  :key="item.route"
                  :to="item.route"
                  class="group relative flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition"
                  :class="[
                    collapsed ? 'justify-center px-3' : 'gap-3',
                    isActive(item.route)
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
                  ]"
                >
                  <MenuIcon :name="item.icon" />

                  <Transition name="sidebar-label">
                    <span v-if="!collapsed">
                      {{ item.label }}
                    </span>
                  </Transition>

                  <span
                    v-if="collapsed"
                    class="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 opacity-0 shadow-xl transition group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  >
                    {{ item.label }}
                  </span>
                </NuxtLink>
              </div>
            </Transition>
          </div>
        </nav>
      </div>

      <!-- User Info -->
      <div class="border-t border-slate-200 p-4 dark:border-slate-800">
        <div
          class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"
          :class="collapsed ? 'flex items-center justify-center p-3' : ''"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white dark:bg-white dark:text-slate-900"
            :title="authStore.user?.name || 'User'"
          >
            {{ authStore.user?.name?.charAt(0)?.toUpperCase() || "U" }}
          </div>

          <Transition name="sidebar-label">
            <div v-if="!collapsed" class="mt-3">
              <p
                class="text-xs font-semibold uppercase tracking-wide text-muted"
              >
                Signed in as
              </p>
              <p class="mt-1 truncate text-sm font-bold text-ui">
                {{ authStore.user?.name || "User" }}
              </p>
              <p class="truncate text-xs text-muted">{{ authStore.user?.email }}</p>
            </div>
          </Transition>
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

.sidebar-group-enter-active,
.sidebar-group-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.sidebar-group-enter-from,
.sidebar-group-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.sidebar-label-enter-active,
.sidebar-label-leave-active {
  transition: opacity 0.16s ease, transform 0.16s ease;
}

.sidebar-label-enter-from,
.sidebar-label-leave-to {
  opacity: 0;
  transform: translateX(-4px);
}
</style>
