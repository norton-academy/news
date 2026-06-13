<script setup lang="ts">
definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "Privacy Policy",
  description:
    "Read how COBO-NEWS collects, uses, and protects personal information.",
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
        <p class="text-sm font-bold uppercase tracking-[0.24em] text-red-600 dark:text-red-400">
          Legal
        </p>
        <h1 class="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p class="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
          This page explains how COBO-NEWS handles information when you visit our website, contact us, or subscribe to updates.
        </p>

        <div class="mt-10 space-y-8 text-sm leading-7 text-slate-600 dark:text-slate-300">
          <section>
            <h2 class="text-lg font-bold text-slate-950 dark:text-white">Information we collect</h2>
            <p class="mt-2">We may collect contact details you submit, device information, and basic usage analytics to improve our services.</p>
          </section>
          <section>
            <h2 class="text-lg font-bold text-slate-950 dark:text-white">How we use it</h2>
            <p class="mt-2">Information is used to respond to requests, send updates you request, maintain site security, and improve content experience.</p>
          </section>
          <section>
            <h2 class="text-lg font-bold text-slate-950 dark:text-white">Your choices</h2>
            <p class="mt-2">You can request access, corrections, or deletion of personal data by contacting our team.</p>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>
