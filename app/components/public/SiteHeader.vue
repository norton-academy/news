<script setup lang="ts">
import {
  Bell,
  Bookmark,
  Languages,
  Search,
  Square,
} from "lucide-vue-next";

const homeStore = usePublicHomeStore();
const languageStore = usePublicLanguageStore();

const categories = computed(() => homeStore.categories);
const breakingNews = computed(() => homeStore.breakingNews);
const exchangeRate = computed(() => homeStore.exchangeRate);

const router = useRouter();
const searchKeyword = ref("");

const navItems = computed(() => {
  if (languageStore.isKhmer) {
    return [
      { label: "ទំព័រដើម", to: "/" },
      { label: "ព័ត៌មាន", to: "/news" },
      { label: "សេដ្ឋកិច្ច", to: "/categories/business" },
      { label: "សង្គម", to: "/categories/province-news" },
      { label: "បច្ចេកវិទ្យា", to: "/categories/technology" },
      { label: "កីឡា", to: "/categories/sports" },
      { label: "កម្សាន្ត", to: "/categories/entertainment" },
      { label: "សុខភាព", to: "/categories/health" },
    ];
  }

  return [
    { label: "Home", to: "/" },
    { label: "News", to: "/news" },
    { label: "Business", to: "/categories/business" },
    { label: "Society", to: "/categories/province-news" },
    { label: "Technology", to: "/categories/technology" },
    { label: "Sports", to: "/categories/sports" },
    { label: "Entertainment", to: "/categories/entertainment" },
    { label: "Health", to: "/categories/health" },
  ];
});

const submitSearch = async () => {
  if (!searchKeyword.value.trim()) return;

  await router.push({
    path: "/search",
    query: {
      q: searchKeyword.value.trim(),
    },
  });
};
</script>

<template>
  <header class="sticky top-0 z-50">
    <div class="border-b border-slate-200 bg-[#fbfaf7]/95 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2">
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-lg font-black text-white">
            ក
          </div>

          <div class="leading-tight">
            <p class="text-sm font-semibold text-slate-500">
              Cambodia
            </p>
            <p class="text-sm font-bold text-slate-700">
              News Hub
            </p>
          </div>
        </NuxtLink>

        <nav class="hidden flex-1 items-center justify-center gap-2 lg:flex">
          <NuxtLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            class="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="ml-auto flex items-center gap-2">
          <button class="hidden rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50 md:block">
            <Bookmark class="h-5 w-5" />
          </button>

          <button class="hidden rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50 md:block">
            <Bell class="h-5 w-5" />
          </button>

          <button
            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-600 hover:bg-slate-50"
            @click="languageStore.toggleLanguage()"
          >
            <Languages class="h-4 w-4" />
            {{ languageStore.isKhmer ? "EN" : "ខ្មែរ" }}
          </button>

          <form
            class="hidden w-52 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 md:flex"
            @submit.prevent="submitSearch"
          >
            <Search class="h-4 w-4 text-slate-400" />

            <input
              v-model="searchKeyword"
              type="text"
              :placeholder="languageStore.isKhmer ? 'ស្វែងរក...' : 'Search...'"
              class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </form>
        </div>
      </div>
    </div>

    <section class="bg-blue-800 text-white">
      <div class="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden px-4 py-2">
        <div class="flex shrink-0 items-center gap-2 rounded-lg bg-blue-950/40 px-3 py-1 text-sm font-bold">
          <Square class="h-3 w-3" />
          {{ languageStore.isKhmer ? "ព័ត៌មានបន្ទាន់" : "Breaking News" }}
        </div>

        <div class="flex min-w-0 flex-1 gap-6 overflow-x-auto whitespace-nowrap text-sm">
          <NuxtLink
            v-for="article in breakingNews"
            :key="article.id"
            :to="`/news/${article.slug}`"
            class="opacity-90 hover:opacity-100 hover:underline"
          >
            • {{ article.title }}
          </NuxtLink>

          <span v-if="!breakingNews.length" class="opacity-80">
            • {{ languageStore.isKhmer ? "មិនទាន់មានព័ត៌មានបន្ទាន់" : "No breaking news yet" }}
          </span>
        </div>

        <div class="hidden shrink-0 text-sm font-semibold opacity-90 md:block">
          {{ exchangeRate?.label || "USD to KHR" }}:
          {{ exchangeRate?.usd_khr || "4,100" }}៛
        </div>
      </div>
    </section>

    <section class="border-b border-slate-200 bg-[#fbfaf7]">
      <div class="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4">
        <NuxtLink
          to="/"
          class="border-b-2 border-blue-700 px-1 py-4 text-sm font-black text-blue-700"
        >
          {{ languageStore.isKhmer ? "ទាំងអស់" : "All" }}
        </NuxtLink>

        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/categories/${category.slug}`"
          class="border-b-2 border-transparent px-1 py-4 text-sm font-bold text-slate-500 transition hover:border-blue-300 hover:text-blue-700"
        >
          {{ languageStore.text(category.name_km, category.name_en) }}
        </NuxtLink>
      </div>
    </section>
  </header>
</template>