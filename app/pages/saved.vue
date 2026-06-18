<script setup lang="ts">
definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "អត្ថបទដែលបានរក្សាទុក",
  description: "មើលអត្ថបទ COBO-NEWS ដែលបានរក្សាទុក និងបញ្ជីអានរបស់អ្នក។",
})

// Mapped data structured with reading time or dates to replicate a top-tier news desk
const savedArticles = [
  {
    title: "សេដ្ឋកិច្ចឌីជីថលរបស់កម្ពុជាត្រូវបានរំពឹងថានឹងកើនឡើងបីដងត្រឹមឆ្នាំ២០២៦",
    category: "បច្ចេកវិទ្យា",
    readTime: "អាន ៤ នាទី",
    to: "/article/1",
  },
  {
    title: "សេដ្ឋកិច្ចកម្ពុជាបង្ហាញពីការងើបឡើងវិញយ៉ាងខ្លាំងក្លាជាមួយកំណើន ៦% ក្នុងត្រីមាសទី១",
    category: "ធុរកិច្ច",
    readTime: "អាន ៥ នាទី",
    to: "/article/2",
  },
  {
    title: "ក្រុមបាល់ទាត់ជម្រើសជាតិកម្ពុជាឡើងទៅវគ្គពាក់កណ្តាលផ្តាច់ព្រ័ត្រពានរង្វាន់ AFF Cup",
    category: "កីឡា",
    readTime: "អាន ៣ នាទី",
    to: "/article/3",
  },
]

// Optional method handler placeholder for interactive professional UX
const removeArticle = (e: Event, title: string) => {
  e.preventDefault(); // Prevents navigation when clicking the remove button
  // Handle unsave logic here
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
    
    <!-- Top Editorial Line Accent -->

    <main class="m-10 px-10 py-10 bg-white dark:bg-slate-900/40 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
      
      <!-- Premium Dashboard Header -->
      <header class="border-b border-neutral-200 pb-10 dark:border-neutral-800 animate-fade-in">
        <div class="flex items-center gap-x-3 text-xs font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
          <span>គណនីរបស់អ្នក</span>
          <span class="text-neutral-300 dark:text-neutral-700">&bull;</span>
          <span>បណ្ណាល័យផ្ទាល់ខ្លួន</span>
        </div>
        
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-4xl font-serif">
          អត្ថបទដែលបានរក្សាទុក
        </h1>
        
        <p class="mt-4 text-base leading-8 text-neutral-600 dark:text-neutral-400 max-w-2xl font-normal">
          អត្ថបទដែលអ្នកបានរក្សាទុកនឹងបង្ហាញនៅទីនេះ ដើម្បីងាយស្រួលចូលមើលយ៉ាងរហ័សនៅពេលអ្នកត្រឡប់មកវិញ។
        </p>
      </header>

      <!-- Saved Articles Feed Wrapper -->
      <div class="mt-10 divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
        <div 
          v-for="(article, index) in savedArticles" 
          :key="article.title"
          class="group relative py-6 transition-all duration-300 first:pt-2 last:pb-0 animate-fade-in-up"
          :style="{ animationDelay: `${index * 80}ms` }"
        >
          <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            
            <!-- Link Content Node Area -->
            <NuxtLink :to="article.to" class="flex-1 space-y-2">
              <div class="flex items-center gap-x-3 text-xs font-bold text-neutral-500 dark:text-neutral-400">
                <span class="px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-900 font-medium text-neutral-800 dark:text-neutral-300">
                  {{ article.category }}
                </span>
                <span class="text-neutral-300 dark:text-neutral-700">&bull;</span>
                <span class="font-normal">{{ article.readTime }}</span>
              </div>

              <!-- Title with expanded leading-9 for immaculate Khmer typography line-height layout -->
              <h2 class="text-lg font-bold tracking-normal text-neutral-950 group-hover:text-neutral-700 dark:text-white dark:group-hover:text-neutral-300 transition-colors leading-9">
                {{ article.title }}
              </h2>
            </NuxtLink>

            <!-- Dashboard Utility Action Bar (Unsave/Remove) -->
            <div class="flex items-center justify-end pt-2 sm:pt-0">
              <button 
                @click="removeArticle($event, article.title)"
                class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200/80 bg-white text-neutral-400 transition-all hover:border-neutral-300 hover:text-neutral-600 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-500 dark:hover:border-neutral-700 dark:hover:text-neutral-300"
                title="លុបចេញពីបញ្ជីអាន"
              >
                <!-- Modern Micro-Trashcan Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>