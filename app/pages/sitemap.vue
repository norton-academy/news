<script setup lang="ts">
definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "Sitemap",
  description: "Browse the COBO-NEWS sitemap and quickly find key public pages.",
})

const pages = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Careers", to: "/career" },
  { label: "Advertise", to: "/advertise" },
  { label: "Press Kit", to: "/press-kit" },
  { label: "Saved", to: "/saved" },
  { label: "Politics", to: "/politics" },
  { label: "Business", to: "/business" },
  { label: "Technology", to: "/technology" },
  { label: "Sports", to: "/sports" },
  { label: "Health", to: "/health" },
  { label: "Entertainment", to: "/entertainment" },
  { label: "Education", to: "/education" },
  { label: "Agriculture", to: "/agriculture" },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
        <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">Utility</p>
        <h1 class="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Sitemap</h1>
        <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
          Find the main pages on COBO-NEWS quickly.
        </p>

        <div class="mt-10 grid gap-3 sm:grid-cols-2">
          <NuxtLink
            v-for="page in pages"
            :key="page.to"
            :to="page.to"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-red-200 hover:text-red-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-red-800 dark:hover:text-red-300"
          >
            {{ page.label }}
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>
