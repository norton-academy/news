<script setup lang="ts">
import { Eye, Search, Square } from "lucide-vue-next";
import type { Article } from "~/types/news";

defineProps<{
  title: string;
  subtitle?: string;
  articles: Article[];
  loading?: boolean;
  errorMessage?: string | null;
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}>();

const emit = defineEmits<{
  pageChange: [page: number];
  search: [keyword: string];
}>();

const keyword = ref("");

const imageFallback =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=900&auto=format&fit=crop";

const submitSearch = () => {
  emit("search", keyword.value);
};
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <section class="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="flex items-center gap-2 text-2xl font-black text-slate-800 md:text-3xl">
            <Square class="h-3 w-3 text-blue-700" />
            {{ title }}
          </h1>

          <p v-if="subtitle" class="mt-1 text-sm text-slate-500">
            {{ subtitle }}
          </p>
        </div>

        <form
          class="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-[#fbfaf7] px-3 py-2 md:w-80"
          @submit.prevent="submitSearch"
        >
          <Search class="h-4 w-4 text-slate-400" />

          <input
            v-model="keyword"
            type="text"
            placeholder="ស្វែងរកព័ត៌មាន..."
            class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </form>
      </div>
    </section>

    <div
      v-if="errorMessage"
      class="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
    >
      {{ errorMessage }}
    </div>

    <div
      v-if="loading"
      class="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500"
    >
      Loading articles...
    </div>

    <section v-else class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="article in articles"
        :key="article.id"
        :to="`/news/${article.slug}`"
        class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <div class="relative h-48 bg-[#efeee9]">
          <img
            :src="article.hero_image || imageFallback"
            :alt="article.title"
            class="h-full w-full object-cover"
          />

          <div class="absolute left-4 top-4 rounded-lg bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
            {{ article.category?.name_km || article.category?.name_en || "ព័ត៌មាន" }}
          </div>
        </div>

        <div class="p-5">
          <div class="mb-3 flex items-center justify-between text-sm">
            <span class="font-bold text-slate-500">
              ● {{ article.source?.name || "Cobo News" }}
            </span>

            <span class="text-slate-400">
              {{ article.published_time || "ថ្មីៗ" }}
            </span>
          </div>

          <h2 class="line-clamp-2 text-lg font-black leading-8 text-slate-800 group-hover:text-blue-700">
            {{ article.title }}
          </h2>

          <p class="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {{ article.excerpt }}
          </p>

          <div class="mt-4 flex items-center justify-between text-sm text-slate-400">
            <span>{{ article.province?.name_km || "កម្ពុជា" }}</span>

            <span class="flex items-center gap-1">
              <Eye class="h-4 w-4" />
              {{ article.views_count }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </section>

    <div
      v-if="!loading && !articles.length"
      class="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500"
    >
      មិនទាន់មានព័ត៌មាន។
    </div>

    <div
      v-if="pagination && pagination.last_page > 1"
      class="mt-6 flex items-center justify-center gap-2"
    >
      <button
        class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="pagination.current_page <= 1"
        @click="emit('pageChange', pagination.current_page - 1)"
      >
        Previous
      </button>

      <span class="rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-600">
        Page {{ pagination.current_page }} / {{ pagination.last_page }}
      </span>

      <button
        class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="pagination.current_page >= pagination.last_page"
        @click="emit('pageChange', pagination.current_page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>