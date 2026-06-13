<script setup lang="ts">
definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "Saved Articles",
  description: "View your saved COBO-NEWS articles and reading list.",
})

const savedArticles = [
  {
    title: "Cambodia's Digital Economy Set to Triple by 2026",
    category: "Technology",
    to: "/article/1",
  },
  {
    title: "Cambodia's Economy Shows Strong Recovery with 6% Growth in Q1",
    category: "Business",
    to: "/article/2",
  },
  {
    title: "Cambodian Football Team Advances to AFF Cup Semifinals",
    category: "Sports",
    to: "/article/3",
  },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
        <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">Reading list</p>
        <h1 class="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Saved Articles</h1>
        <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
          Your saved stories appear here for quick access when you return.
        </p>

        <div class="mt-10 grid gap-4">
          <NuxtLink
            v-for="article in savedArticles"
            :key="article.title"
            :to="article.to"
            class="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition-colors duration-200 hover:border-red-200 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:hover:border-red-800 dark:hover:bg-slate-900"
          >
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {{ article.category }}
            </p>
            <h2 class="mt-2 text-lg font-bold text-slate-950 dark:text-white">
              {{ article.title }}
            </h2>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>
