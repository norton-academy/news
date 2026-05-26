<script setup lang="ts">
import { Bell, Bookmark, Search, Square } from "lucide-vue-next";

const homeStore = usePublicHomeStore();

const categories = computed(() => homeStore.categories);
const breakingNews = computed(() => homeStore.breakingNews);
const exchangeRate = computed(() => homeStore.exchangeRate);

const navItems = [
  "ទំព័រដើម",
  "ព័ត៌មាន",
  "សេដ្ឋកិច្ច",
  "សង្គម",
  "បច្ចេកវិទ្យា",
  "កីឡា",
  "កម្សាន្ត",
  "សុខភាព",
];

const router = useRouter();
const searchKeyword = ref("");

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
    <!-- Top Navbar -->
    <div class="border-b border-slate-200 bg-[#fbfaf7]/95 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2">
        <NuxtLink to="/" class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-lg font-black text-white"
          >
            ក
          </div>

          <div class="leading-tight">
            <p class="text-sm font-semibold text-slate-500">Cambodia</p>
            <p class="text-sm font-bold text-slate-700">News Hub</p>
          </div>
        </NuxtLink>

        <nav class="hidden flex-1 items-center justify-center gap-2 lg:flex">
          <NuxtLink
            v-for="item in navItems"
            :key="item"
            to="/"
            class="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
          >
            {{ item }}
          </NuxtLink>
        </nav>

        <div class="ml-auto flex items-center gap-2">
          <button
            class="hidden rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50 md:block"
          >
            <Bookmark class="h-5 w-5" />
          </button>

          <button
            class="hidden rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50 md:block"
          >
            <Bell class="h-5 w-5" />
          </button>

          <form
            class="flex w-52 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2"
            @submit.prevent="submitSearch"
          >
            <Search class="h-4 w-4 text-slate-400" />

            <input
              v-model="searchKeyword"
              type="text"
              placeholder="ស្វែងរក..."
              class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </form>
        </div>
      </div>
    </div>

    <!-- Breaking ticker -->
    <section class="bg-blue-800 text-white">
      <div class="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden px-4 py-2">
        <div
          class="flex shrink-0 items-center gap-2 rounded-lg bg-blue-950/40 px-3 py-1 text-sm font-bold"
        >
          <Square class="h-3 w-3" />
          ព័ត៌មានបន្ទាន់
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
            • មិនទាន់មានព័ត៌មានបន្ទាន់
          </span>
        </div>

        <div class="hidden shrink-0 text-sm font-semibold opacity-90 md:block">
          {{ exchangeRate?.label || "USD to KHR" }}:
          {{ exchangeRate?.usd_khr || "4,100" }}៛
        </div>
      </div>
    </section>

    <!-- Category tabs -->
    <section class="border-b border-slate-200 bg-[#fbfaf7]">
      <div class="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4">
        <NuxtLink
          to="/"
          class="border-b-2 border-blue-700 px-1 py-4 text-sm font-black text-blue-700"
        >
          ទាំងអស់
        </NuxtLink>

        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/categories/${category.slug}`"
          class="border-b-2 border-transparent px-1 py-4 text-sm font-bold text-slate-500 transition hover:border-blue-300 hover:text-blue-700"
        >
          {{ category.name_km || category.name_en }}
        </NuxtLink>
      </div>
    </section>
  </header>
</template>
