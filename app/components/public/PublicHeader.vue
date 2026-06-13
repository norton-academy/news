<script setup lang="ts">
import { ref } from "vue";
import {
  Bookmark,
  LogOut,
  Menu,
  NotebookPen,
  Search,
  Settings,
  User,
} from "lucide-vue-next";

interface NavItem {
  name: string;
  href: string;
}

interface Props {
  noteCount?: number;
}

withDefaults(defineProps<Props>(), {
  noteCount: 0,
});

const emit = defineEmits<{
  search: [];
  notes: [];
  logout: [];
}>();

const route = useRoute();
const isMobileMenuOpen = ref(false);

// Removed "Home" navigation item
const navItems: NavItem[] = [
  {
    name: "Politics",
    href: "/politics",
  },
  {
    name: "Business",
    href: "/business",
  },
  {
    name: "Technology",
    href: "/technology",
  },
  {
    name: "Sports",
    href: "/sports",
  },
  {
    name: "Health",
    href: "/health",
  },
  {
    name: "Entertainment",
    href: "/entertainment",
  },
  {
    name: "Education",
    href: "/education",
  },
  {
    name: "Agriculture",
    href: "/agriculture",
  },
];

function openMobileMenu() {
  isMobileMenuOpen.value = true;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

function isActiveLink(href: string) {
  return route.path === href || route.path.startsWith(`${href}/`);
}
</script>

<template>
  <header
    class="px-5 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/80 shadow-sm transition-all duration-300 dark:bg-slate-900/80 dark:border-slate-800"
  >
    <div class="flex h-16 items-center justify-between lg:h-20">
      <NuxtLink to="/" class="flex items-center space-x-2 group cursor-pointer select-none">
        <div class="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-md transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3">
          <span class="text-white font-bold text-lg">C</span>
        </div>
        <span class="text-2xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent tracking-tight dark:from-white dark:to-slate-400 transition-all duration-300 group-hover:opacity-90">
          COBO-NEWS
        </span>
      </NuxtLink>

      <nav class="hidden items-center overflow-x-auto scroll-smooth lg:flex">
        <div class="flex items-center gap-1 whitespace-nowrap px-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.href"
            class="rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 ease-in-out hover:bg-red-50 hover:text-red-600 active:scale-95 dark:text-slate-300 dark:hover:bg-red-950/40 dark:hover:text-red-400"
            :class="isActiveLink(item.href) ? 'bg-red-50 text-red-600 font-semibold dark:bg-red-950/40 dark:text-red-400' : ''"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </nav>

      <div class="hidden items-center gap-2 lg:flex">
        <IconButton 
          label="Search" 
          variant="ghost" 
          class="transition-transform duration-150 active:scale-95"
          @click="emit('search')"
        >
          <Search class="size-5 transition-colors duration-200 hover:text-red-600 dark:hover:text-red-400" />
        </IconButton>

        <button
          type="button"
          class="relative inline-flex size-10 items-center justify-center rounded-xl text-slate-600 transition-all duration-200 ease-in-out hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950/10 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-white/10"
          aria-label="Saved notes"
          @click="emit('notes')"
        >
          <NotebookPen class="size-5" />

          <span v-if="noteCount > 0" class="absolute -right-1 -top-1 flex size-5 items-center justify-center">
            <span class="animate-pulse absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span class="relative inline-flex size-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm">
              {{ noteCount }}
            </span>
          </span>
        </button>

<ThemeToggle />
        <!-- <Dropdown width="w-64" align="end">
          <template #trigger>
            <button
              class="inline-flex items-center gap-2 rounded-xl p-1.5 transition-all duration-200 ease-in-out hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95"
            >
              <Avatar
                name="COBO Admin"
                src="https://randomuser.me/api/portraits/women/68.jpg"
                size="sm"
                class="ring-2 ring-transparent transition-all duration-200 hover:ring-red-500/50"
              />
            </button>
          </template>

          <DropdownItem to="/profile" class="transition-colors duration-150">
            <User class="size-4" />
            My Account
          </DropdownItem>

          <DropdownItem to="/saved" class="transition-colors duration-150">
            <Bookmark class="size-4" />
            Saved Articles
          </DropdownItem>

          <DropdownItem to="/settings" class="transition-colors duration-150">
            <Settings class="size-4" />
            Settings
          </DropdownItem>

          <Separator />

          <DropdownItem variant="danger" class="transition-colors duration-150" @click="emit('logout')">
            <LogOut class="size-4" />
            Sign Out
          </DropdownItem>
        </Dropdown> -->
      </div>

      <IconButton
        label="Open menu"
        variant="ghost"
        class="lg:hidden transition-transform duration-150 active:scale-95"
        @click="openMobileMenu"
      >
        <Menu class="size-6" />
      </IconButton>
    </div>

    <Drawer
      v-model="isMobileMenuOpen"
      side="right"
      title="Navigation"
      description="Browse COBO-NEWS sections."
    >
      <div class="space-y-5">
        <Logo name="COBO-NEWS" subtitle="Cambodia News" mark="C" />

        <Separator />

        <nav class="space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.href"
            class="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 ease-in-out hover:bg-red-50 hover:text-red-600 active:translate-x-1 dark:text-slate-300 dark:hover:bg-red-950/30 dark:hover:text-red-400"
            :class="isActiveLink(item.href) ? 'bg-red-50 text-red-600 font-semibold dark:bg-red-950/30 dark:text-red-400' : ''"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>

        <Separator />

        <div class="grid gap-3">
          <Button variant="outline" block class="transition-all duration-200 active:scale-[0.98]" @click="emit('search')">
            <Search class="size-4" />
            Search News
          </Button>
        </div>
      </div>
    </Drawer>
  </header>
</template>
