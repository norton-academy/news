<script setup lang="ts">
definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "Terms of Service",
  description: "Review the terms that apply to using the COBO-NEWS website and services.",
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
        <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">Legal</p>
        <h1 class="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Terms of Service</h1>
        <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
          These terms govern your use of COBO-NEWS content, features, and related services.
        </p>

        <div class="mt-10 space-y-8 text-sm leading-7 text-slate-600 dark:text-slate-300">
          <section>
            <h2 class="text-lg font-bold text-slate-950 dark:text-white">Acceptable use</h2>
            <p class="mt-2">Use the site lawfully and do not attempt to disrupt, scrape, or misuse the platform.</p>
          </section>
          <section>
            <h2 class="text-lg font-bold text-slate-950 dark:text-white">Content ownership</h2>
            <p class="mt-2">Articles, images, and brand materials are owned by COBO-NEWS or used with permission.</p>
          </section>
          <section>
            <h2 class="text-lg font-bold text-slate-950 dark:text-white">Changes</h2>
            <p class="mt-2">We may update these terms when our services or policies change.</p>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>
