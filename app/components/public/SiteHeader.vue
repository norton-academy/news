<script setup lang="ts">
import {
  Bell,
  Bookmark,
  ChevronDown,
  Languages,
  Menu,
  Search,
  Square,
  X,
} from "lucide-vue-next";

const homeStore = usePublicHomeStore();
const languageStore = usePublicLanguageStore();

const router = useRouter();

const searchKeyword = ref("");
const mobileOpen = ref(false);

const breakingNews = computed(() => homeStore.breakingNews);
const exchangeRate = computed(() => homeStore.exchangeRate);

const moreLabel = computed(() => {
  return languageStore.isKhmer ? "ច្រើនទៀត" : "More";
});

const navItems = computed(() => {
  if (languageStore.isKhmer) {
    return [
      { label: "ទំព័រដើម", to: "/" },
      { label: "នយោបាយ", to: "/politics" },
      { label: "សេដ្ឋកិច្ច", to: "/business" },
      { label: "បច្ចេកវិទ្យា", to: "/technology" },
      { label: "កីឡា", to: "/sports" },
    ];
  }

  return [
    { label: "Home", to: "/" },
    { label: "Politics", to: "/politics" },
    { label: "Business", to: "/business" },
    { label: "Technology", to: "/technology" },
    { label: "Sports", to: "/sports" },
  ];
});

const moreItems = computed(() => {
  if (languageStore.isKhmer) {
    return [
      { label: "សុខភាព", to: "/health" },
      { label: "កម្សាន្ត", to: "/entertainment" },
    ];
  }

  return [
    { label: "Health", to: "/health" },
    { label: "Entertainment", to: "/entertainment" },
  ];
});

const searchPlaceholder = computed(() => {
  return languageStore.isKhmer ? "ស្វែងរកព័ត៌មាន..." : "Search news...";
});

const breakingLabel = computed(() => {
  return languageStore.isKhmer ? "ព័ត៌មានបន្ទាន់" : "Breaking";
});

const noBreakingLabel = computed(() => {
  return languageStore.isKhmer
    ? "មិនទាន់មានព័ត៌មានបន្ទាន់"
    : "No breaking news yet";
});

const submitSearch = async () => {
  const keyword = searchKeyword.value.trim();

  if (!keyword) return;

  closeMobile();

  await router.push({
    path: "/search",
    query: {
      q: keyword,
    },
  });
};

const closeMobile = () => {
  mobileOpen.value = false;
};

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    closeMobile();
  }
);
</script>

<template>
  <header class="sticky top-0 z-50">
    <!-- Main Header -->
    <div class="relative z-50 border-b border-slate-200 bg-[#fbfaf7]/95 backdrop-blur supports-[backdrop-filter]:bg-[#fbfaf7]/80">
      <div class="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex min-w-0 shrink-0 items-center gap-3"
          @click="closeMobile"
        >
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-lg font-black text-white shadow-sm">
            ក
          </div>

          <div class="hidden min-w-0 leading-tight sm:block">
            <p class="truncate text-xs font-semibold text-slate-500">
              Cambodia
            </p>

            <p class="truncate text-base font-black text-slate-800">
              News Hub
            </p>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="shrink-0 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            active-class="bg-blue-50 text-blue-700"
          >
            {{ item.label }}
          </NuxtLink>

          <div
            v-if="moreItems.length"
            class="group relative shrink-0"
          >
            <button
              type="button"
              class="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition group-hover:bg-blue-50 group-hover:text-blue-700"
            >
              {{ moreLabel }}
              <ChevronDown class="h-4 w-4 transition group-hover:rotate-180" />
            </button>

            <div class="invisible absolute left-0 top-full h-3 w-full group-hover:visible" />

            <div
              class="invisible absolute right-0 top-full z-[80] mt-3 w-64 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
            >
              <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl ring-1 ring-black/5">
                <NuxtLink
                  v-for="item in moreItems"
                  :key="item.to"
                  :to="item.to"
                  class="block rounded-2xl px-3 py-3 text-sm font-black text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  {{ item.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </nav>

        <!-- Right Actions -->
        <div class="ml-auto flex shrink-0 items-center gap-2">
          <form
            class="hidden w-56 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100 lg:flex"
            @submit.prevent="submitSearch"
          >
            <Search class="h-4 w-4 shrink-0 text-slate-400" />

            <input
              v-model="searchKeyword"
              type="text"
              :placeholder="searchPlaceholder"
              class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </form>

          <button
            class="hidden rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-blue-700 md:block"
            type="button"
            aria-label="Bookmarks"
          >
            <Bookmark class="h-5 w-5" />
          </button>

          <button
            class="hidden rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-blue-700 md:block"
            type="button"
            aria-label="Notifications"
          >
            <Bell class="h-5 w-5" />
          </button>

          <button
            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-blue-700"
            type="button"
            @click="languageStore.toggleLanguage()"
          >
            <Languages class="hidden h-4 w-4 sm:block" />
            {{ languageStore.isKhmer ? "EN" : "ខ្មែរ" }}
          </button>

          <button
            class="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm xl:hidden"
            type="button"
            aria-label="Open menu"
            @click="mobileOpen = !mobileOpen"
          >
            <X
              v-if="mobileOpen"
              class="h-5 w-5"
            />
            <Menu
              v-else
              class="h-5 w-5"
            />
          </button>
        </div>
      </div>

      <!-- Tablet / Mobile Menu -->
      <div
        v-if="mobileOpen"
        class="border-t border-slate-200 bg-[#fbfaf7] px-4 py-4 xl:hidden"
      >
        <form
          class="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm"
          @submit.prevent="submitSearch"
        >
          <Search class="h-4 w-4 shrink-0 text-slate-400" />

          <input
            v-model="searchKeyword"
            type="text"
            :placeholder="searchPlaceholder"
            class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </form>

        <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <NuxtLink
            v-for="item in [...navItems, ...moreItems]"
            :key="item.to"
            :to="item.to"
            class="rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            active-class="bg-blue-50 text-blue-700"
            @click="closeMobile"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Breaking Ticker -->
    <section class="relative z-10 bg-blue-800 text-white">
      <div class="mx-auto flex max-w-7xl items-center gap-3 overflow-hidden px-4 py-2">
        <div class="flex shrink-0 items-center gap-2 rounded-lg bg-blue-950/40 px-3 py-1 text-xs font-black md:text-sm">
          <Square class="h-3 w-3" />
          {{ breakingLabel }}
        </div>

        <div class="flex min-w-0 flex-1 gap-6 overflow-x-auto whitespace-nowrap text-sm">
          <NuxtLink
            v-for="article in breakingNews"
            :key="article.id"
            :to="`/news/${article.slug}`"
            class="opacity-90 transition hover:opacity-100 hover:underline"
          >
            • {{ article.title }}
          </NuxtLink>

          <span
            v-if="!breakingNews.length"
            class="opacity-80"
          >
            • {{ noBreakingLabel }}
          </span>
        </div>

        <div class="hidden shrink-0 text-sm font-semibold opacity-90 md:block">
          {{ exchangeRate?.label || "USD to KHR" }}:
          {{ exchangeRate?.usd_khr || "4,100" }}៛
        </div>
      </div>
    </section>
  </header>
</template>
