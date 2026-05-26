<script setup lang="ts">
import { Bell, Bookmark, Search } from "lucide-vue-next";

const homeStore = usePublicHomeStore();

const categories = computed(() => homeStore.categories);
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
      <NuxtLink to="/" class="flex items-center gap-2">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-lg font-black text-primary-foreground">
          C
        </div>

        <div>
          <p class="text-lg font-black leading-none text-foreground">
            Cobo News
          </p>
          <p class="text-xs text-muted-foreground">
            Cambodia Today
          </p>
        </div>
      </NuxtLink>

      <nav class="hidden flex-1 items-center gap-1 lg:flex">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/categories/${category.slug}`"
          class="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {{ category.name_en }}
        </NuxtLink>
      </nav>

      <div class="hidden w-72 items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 md:flex">
        <Search class="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search news..."
          class="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <button class="rounded-2xl border border-border p-2.5 hover:bg-muted">
        <Bookmark class="h-5 w-5" />
      </button>

      <button class="rounded-2xl border border-border p-2.5 hover:bg-muted">
        <Bell class="h-5 w-5" />
      </button>
    </div>
  </header>
</template>