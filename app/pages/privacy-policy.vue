<script setup lang="ts">
definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "Privacy Policy",
  description: "Read how COBO-NEWS collects, uses, and protects personal information.",
})

// Structural data to keep the template clean, maintainable, and dry
const policySections = [
  {
    title: "Information we collect",
    content: "We may collect contact details you submit, device information, and basic usage analytics to improve our services."
  },
  {
    title: "How we use it",
    content: "Information is used to respond to requests, send updates you request, maintain site security, and improve content experience."
  },
  {
    title: "Your choices",
    content: "You can request access, corrections, or deletion of personal data by contacting our team."
  }
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      
      <div class="animate-fade-in-up rounded-3xl border border-slate-200/60 bg-white p-8 shadow-xl shadow-slate-100/40 dark:border-slate-800/60 dark:bg-slate-900 dark:shadow-none sm:p-12">
        
        <header class="border-b border-slate-100 pb-8 dark:border-slate-800">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-red-600 dark:text-red-400">
            Legal Document
          </p>
          <h1 class="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p class="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-400">
            This page explains how COBO-NEWS handles information when you visit our website, contact us, or subscribe to updates.
          </p>
        </header>

        <div class="mt-10 divide-y divide-slate-100/80 space-y-8 dark:divide-slate-800/50">
          <section 
            v-for="(section, index) in policySections" 
            :key="index"
            class="pt-8 first:pt-0"
          >
            <h2 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {{ section.title }}
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {{ section.content }}
            </p>
          </section>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>