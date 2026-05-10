<script setup lang="ts">
import { ChevronRight, Home } from "lucide-vue-next";
import type { MenuItem } from "~/composables/useMenu";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

const route = useRoute();
const menuStore = useMenuStore();

const flattenMenus = (menus: MenuItem[]): MenuItem[] => {
  return menus.flatMap((menu) => [
    menu,
    ...(menu.children ? flattenMenus(menu.children) : []),
  ]);
};

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const menus = flattenMenus(menuStore.menus);
  const currentMenu = menus.find((menu) => menu.route === route.path);

  if (currentMenu) {
    const items: BreadcrumbItem[] = [{ label: "Dashboard", to: "/dashboard" }];

    if (currentMenu.group && currentMenu.group !== "Main") {
      items.push({
        label: currentMenu.group,
      });
    }

    if (currentMenu.route !== "/dashboard") {
      items.push({
        label: currentMenu.label,
      });
    }

    return items;
  }

  return [
    { label: "Dashboard", to: "/dashboard" },
    { label: (route.meta?.title as string) || "Page" },
  ];
});
</script>

<template>
  <nav class="flex items-center gap-1 text-sm text-muted" aria-label="Breadcrumb">
    <NuxtLink
      to="/dashboard"
      class="inline-flex items-center rounded-lg p-1.5 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
    >
      <Home class="h-4 w-4" />
    </NuxtLink>

    <template v-for="(item, index) in breadcrumbs" :key="`${item.label}-${index}`">
      <ChevronRight
        v-if="index > 0 || item.label !== 'Dashboard'"
        class="h-4 w-4 text-slate-300 dark:text-slate-700"
      />

      <NuxtLink
        v-if="item.to && index !== breadcrumbs.length - 1"
        :to="item.to"
        class="rounded-lg px-2 py-1 font-medium transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
      >
        {{ item.label }}
      </NuxtLink>

      <span
        v-else
        class="rounded-lg px-2 py-1 font-semibold text-ui"
      >
        {{ item.label }}
      </span>
    </template>
  </nav>
</template>
