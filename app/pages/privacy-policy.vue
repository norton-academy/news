<script setup lang="ts">
definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "គោលការណ៍ឯកជនភាព",
  description: "អានអំពីរបៀបដែល COBO-NEWS ប្រមូល ប្រើប្រាស់ និងការពារព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក។",
})

// Enhanced data structure to support a modern card grid layout with icons
const policySections = [
  {
    title: "ព័ត៌មានដែលយើងប្រមូល",
    icon: "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11.314V7.314a4 4 0 00-6.22-3.327M12 11a13.916 13.916 0 004.753 9.571M16.24 18.57l-.054-.09a13.916 13.916 0 00-2.52-10.166V7.314a4 4 0 016.22-3.327M16 11V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6",
    content: "យើងអាចប្រមូលព័ត៌មានលម្អិតទំនាក់ទំនងដែលអ្នកបានដាក់ជូន ព័ត៌មានឧបករណ៍ និងទិន្នន័យវិភាគការប្រើប្រាស់ជាមូលដ្ឋាន ដើម្បីកែលម្អសេវាកម្មរបស់យើង។"
  },
  {
    title: "របៀបដែលយើងប្រើប្រាស់វា",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    content: "ព័ត៌មានទាំងនេះត្រូវបានប្រើប្រាស់ដើម្បីឆ្លើយតបទៅនឹងការស្នើសុំ ផ្ញើបច្ចុប្បន្នភាពនានាតាមការចង់បានរបស់អ្នក រក្សាសន្តិសុខគេហទំព័រ និងលើកកម្ពស់បទពិសោធន៍មាតិកា។"
  },
  {
    title: "ជម្រើសរបស់អ្នក",
    icon: "M10.05 4.575a1 1 0 01.896-.553h2.108a1 1 0 01.896.553l1.476 2.953a1 1 0 00.737.536l3.26.474a1 1 0 01.554 1.707l-2.36 2.3a1 1 0 00-.287.885l.557 3.246a1 1 0 01-1.45 1.054L13.22 16.24a1 1 0 00-.93 0l-2.915 1.533a1 1 0 01-1.45-1.054l.557-3.246a1 1 0 00-.287-.885l-2.36-2.3a1 1 0 01.554-1.707l3.26-.474a1 1 0 00.737-.536l1.476-2.953z",
    content: "អ្នកអាចស្នើសុំចូលពិនិត្យ កែតម្រូវ ឬលុបទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកបាន ដោយធ្វើការទាក់ទងមកកាន់ក្រុមការងាររបស់យើង។"
  }
]
</script>

<template>
  <div class="min-h-screen bg-neutral-50/50 text-neutral-900 antialiased dark:bg-slate-950 dark:text-neutral-50 selection:bg-rose-500 selection:text-white">
    <main class="m-10 px-10 py-10 dark:bg-slate-900/40 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
      
      <!-- Top Header Area -->
      <header class="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
          <span class="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"></span>
          មជ្ឈមណ្ឌលឯកជនភាព
        </span>
        <h1 class="mt-4 text-4xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-5xl lg:text-6xl">
          គោលការណ៍ឯកជនភាព
        </h1>
        <p class="mt-6 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          នៅ <span class="font-semibold text-neutral-900 dark:text-white">COBO-NEWS</span> តម្លាភាពគឺជាអាទិភាពចម្បងរបស់យើង។ ស្វែងយល់ឱ្យបានច្បាស់ពីរបៀបដែលយើងគ្រប់គ្រង ដំណើរការ និងការពារទិន្នន័យរបស់អ្នក។
        </p>
      </header>

      <!-- Grid Layout for Content -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        <section 
          v-for="(section, index) in policySections" 
          :key="index"
          class="animate-fade-in-up group relative flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-500/30 hover:shadow-md hover:shadow-rose-500/5 dark:border-neutral-800/80 dark:bg-slate-900 dark:hover:border-rose-400/20"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div>
            <!-- Glassmorphic Icon Wrapper -->
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-50 text-neutral-600 ring-1 ring-neutral-200/50 transition-colors group-hover:bg-rose-50 group-hover:text-rose-600 dark:bg-slate-800 dark:text-neutral-400 dark:ring-neutral-700/50 dark:group-hover:bg-rose-500/10 dark:group-hover:text-rose-400">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" :d="section.icon" />
              </svg>
            </div>
            
            <h2 class="mt-4 text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              {{ section.title }}
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {{ section.content }}
            </p>
          </div>
          
          <!-- Subtle clean visual anchor -->
          <div class="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center text-xs font-semibold text-neutral-400 group-hover:text-rose-500 transition-colors">
            ផ្នែកទី 0{{ index + 1 }}
          </div>
        </section>
      </div>

      <!-- Footer contact hint -->
      <footer class="mt-16 text-center animate-fade-in" style="animation-delay: 400ms">
        <p class="text-xs text-neutral-500 dark:text-neutral-500">
          មានសំណួរ ឬការស្នើសុំផ្សេងៗទាក់ទងនឹងទិន្នន័យរបស់អ្នកមែនទេ? 
          <a href="#contact" class="font-medium text-neutral-900 dark:text-neutral-300 underline underline-offset-4 hover:text-rose-500 dark:hover:text-rose-400">ទាក់ទងមកក្រុមការងារការពារទិន្នន័យរបស់យើង</a>។
        </p>
      </footer>

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
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>