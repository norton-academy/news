<script setup lang="ts">
definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "ប្លង់គេហទំព័រ (Sitemap)",
  description: "រុករកប្លង់គេហទំព័ររបស់ COBO-NEWS និងស្វែងរកទំព័រសាធារណៈសំខាន់ៗបានយ៉ាងរហ័ស។",
})

// Categorized data structure for a more organized, modern directory look
const sitemapGroups = [
  {
    title: "ទូទៅ",
    pages: [
      { label: "ទំព័រដើម", to: "/" },
      { label: "អំពីយើង", to: "/about" },
      { label: "ទាក់ទងយើង", to: "/contact" },
      { label: "អត្ថបទដែលបានរក្សាទុក", to: "/saved" },
    ]
  },
  {
    title: "ប្រធានបទព័ត៌មាន",
    pages: [
      { label: "នយោបាយ", to: "/politics" },
      { label: "អាជីវកម្ម", to: "/business" },
      { label: "បច្ចេកវិទ្យា", to: "/technology" },
      { label: "កីឡា", to: "/sports" },
      { label: "សុខភាព", to: "/health" },
      { label: "កម្សាន្ត", to: "/entertainment" },
      { label: "ការអប់រំ", to: "/education" },
      { label: "កសិកម្ម", to: "/agriculture" },
    ]
  },
  {
    title: "ក្រុមហ៊ុន",
    pages: [
      { label: "ឱកាសការងារ", to: "/career" },
      { label: "ផ្សព្វផ្សាយពាណិជ្ជកម្ម", to: "/advertise" },
      { label: "កញ្ចប់ព័ត៌មានសារព័ត៌មាន (Press Kit)", to: "/press-kit" },
    ]
  }
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
    <main class="m-10 px-10 py-10 dark:bg-slate-900/40 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
       
      <div class="animate-fade-in-up rounded-3xl border border-slate-200/60 bg-white p-8 shadow-xl shadow-slate-100/40 dark:border-slate-800/60 dark:bg-slate-900 dark:shadow-none sm:p-12">
         
        <header class="border-b border-slate-100 pb-8 dark:border-slate-800">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-red-600 dark:text-red-400">
            ការរុករកគេហទំព័រ
          </p>
          <h1 class="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            ប្លង់គេហទំព័រ
          </h1>
          <p class="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-400">
            រុករកបញ្ជីទំព័ររបស់ COBO-NEWS និងស្វែងរកទំព័រសាធារណៈសំខាន់ៗបានយ៉ាងរហ័ស។
          </p>
        </header>

        <div class="mt-12 space-y-12">
          <div 
            v-for="(group, groupIndex) in sitemapGroups" 
            :key="groupIndex"
            class="space-y-4"
          >
            <h2 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {{ group.title }}
            </h2>
             
            <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <NuxtLink
                v-for="page in group.pages"
                :key="page.to"
                :to="page.to"
                class="group relative flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-slate-200 hover:bg-white hover:shadow-md hover:shadow-slate-100 dark:border-slate-800/40 dark:bg-slate-950/40 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:shadow-none"
              >
                <span class="text-sm font-medium text-slate-700 transition-colors group-hover:text-red-600 dark:text-slate-300 dark:group-hover:text-red-400">
                  {{ page.label }}
                </span>
                 
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  class="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-red-600 dark:text-red-400"
                >
                  <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.63l-4.22-4.22a.75.75 0 1 1 1.06-1.06l5.5 5.5a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 1 1-1.06-1.06l4.22-4.22H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </div>
          </div>
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