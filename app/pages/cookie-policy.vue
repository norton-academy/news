<script setup lang="ts">
definePageMeta({
  layout: "public",
})

useSeoMeta({
  title: "គោលការណ៍ប្រើប្រាស់ឃុកឃី (Cookie Policy)",
  description: "ស្វែងយល់ពីរបៀបដែល COBO-NEWS ប្រើប្រាស់ឃុកឃី (Cookies) និងបច្ចេកវិទ្យាស្រដៀងគ្នានៅលើគេហទំព័រនេះ។",
})

// Data array structured cleanly for modern tables and scannable compliance reading
const cookieCategories = [
  {
    name: "ឃុកឃីចាំបាច់ (Essential Cookies)",
    purpose: "តម្រូវជាដាច់ខាតសម្រាប់មុខងារមូលដ្ឋានរបស់គេហទំព័រ ការផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវរបស់អ្នកប្រើប្រាស់ និងការគ្រប់គ្រងវគ្គដំណើរការ (Sessions) ប្រកបដោយសុវត្ថិភាព។",
    duration: "វគ្គដំណើរការ / ថេរ",
    type: "ភាគីទីមួយ (First-Party)"
  },
  {
    name: "ការវិភាគ និងដំណើរការ (Analytics & Performance)",
    purpose: "ប្រមូលផ្តុំទិន្នន័យស្ថិតិនៃការប្រើប្រាស់អនាមិករបស់អ្នកប្រើប្រាស់ ដើម្បីកែលម្អប្លង់អត្ថបទ រយៈពេលផ្ទុកទំព័រ និងការបង្កើតលិបិក្រមគេហទំព័រ (Site indexing)។",
    duration: "៣០ ថ្ងៃ ទៅ ១ ឆ្នាំ",
    type: "ភាគីទីបី (Third-Party)"
  },
  {
    name: "ចំណូលចិត្ត និងមុខងារ (Preference & Functional)",
    purpose: "ចងចាំប៉ារ៉ាម៉ែត្រគេហទំព័រដែលបានកំណត់តាមបំណង ដូចជាជម្រើសស្បែក (Light/Dark mode) ឬតម្រងប្លង់ផ្សេងៗ។",
    duration: "ថេរ",
    type: "ភាគីទីមួយ (First-Party)"
  }
]
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-900 antialiased dark:bg-slate-950 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
  
    <main class="m-10 px-10 py-10 dark:bg-slate-900/40 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">      
      <header class="border-b border-neutral-200 pb-10 dark:border-neutral-800">
        <div class="flex items-center gap-x-3 text-xs font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
          <span>ប្រតិបត្តិការអនុលោមភាព</span>
          <span class="text-neutral-300 dark:text-neutral-700">&bull;</span>
          <span>កែសម្រួល មិថុនា ២០២៦</span>
        </div>
        
        <h1 class="mt-4 text-4xl font-serif font-bold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">
          ការប្រកាសអំពីឃុកឃី (Cookie Declaration)
        </h1>
        
        <p class="mt-5 text-base leading-7 text-neutral-600 dark:text-neutral-400 max-w-2xl font-normal">
          COBO-NEWS ប្រើប្រាស់ឧបករណ៍តាមដានស្វ័យប្រវត្តិកម្រិតស្តង់ដារ ឃុកឃី (Cookies) និងវ៉ិចទ័រវាស់ស្ទង់ទិន្នន័យ (Telemetry vectors) ដើម្បីរក្សាស្ថិរភាពស្ថានភាពដំណើរការ រក្សាទុកចំណូលចិត្តមូលដ្ឋានរបស់អ្នកប្រើប្រាស់ និងប្រមូលទិន្នន័យវិភាគឥរិយាបថលើគេហទំព័រ។
        </p>
      </header>

      <section class="mt-12">
        <h2 class="text-xl font-semibold tracking-tight text-neutral-950 dark:text-white">
          ០១. ការបែងចែកប្រភេទ និងតារាងនៃការដាក់ឱ្យប្រើប្រាស់
        </h2>
        <p class="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
          យើងបែងចែករចនាសម្ព័ន្ធតាមដានគេហទំព័ររបស់យើងជាបីក្រុមគោលដាច់ដោយឡែកពីគ្នា៖
        </p>

        <div class="mt-6 overflow-x-auto rounded-xl border border-neutral-200/70 bg-white shadow-sm dark:border-neutral-800 dark:bg-slate-900">
          <table class="w-full text-left text-sm border-collapse">
            <thead>
              <tr class="bg-neutral-50 text-xs font-bold uppercase tracking-wider text-neutral-500 border-b border-neutral-200/70 dark:bg-slate-900/60 dark:text-neutral-400 dark:border-neutral-800">
                <th class="px-6 py-4 font-semibold">ការចាត់ថ្នាក់</th>
                <th class="px-6 py-4 font-semibold">គោលបំណងប្រតិបត្តិការ</th>
                <th class="px-6 py-4 font-semibold hidden sm:table-cell">អាយុកាល</th>
                <th class="px-6 py-4 font-semibold hidden md:table-cell">អាជ្ញាធរគ្រប់គ្រង</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              <tr v-for="item in cookieCategories" :key="item.name" class="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-colors">
                <td class="px-6 py-4 font-semibold text-neutral-950 dark:text-white whitespace-nowrap">
                  {{ item.name }}
                </td>
                <td class="px-6 py-4 text-neutral-600 dark:text-neutral-400 max-w-xs sm:max-w-md">
                  {{ item.purpose }}
                </td>
                <td class="px-6 py-4 text-xs font-mono text-neutral-500 dark:text-neutral-500 whitespace-nowrap hidden sm:table-cell">
                  {{ item.duration }}
                </td>
                <td class="px-6 py-4 text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap hidden md:table-cell">
                  {{ item.type }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div class="mt-14 grid gap-10 md:grid-cols-2 border-t border-neutral-200/60 pt-10 dark:border-neutral-800/60">
        <section>
          <h2 class="text-lg font-semibold tracking-tight text-neutral-950 dark:text-white">
            ០២. ការគ្រប់គ្រងរបស់អ្នកប្រើប្រាស់ និងការលុបចោលទាំងស្រុង
          </h2>
          <p class="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
            អ្នករក្សាសិទ្ធិដាច់ខាតលើការតាមដានទិន្នន័យមេតា (Metadata) របស់កម្មវិធីរុករក (Browser)។ អ្នកប្រើប្រាស់អាចកែសម្រួលប៉ារ៉ាម៉ែត្រឧបករណ៍ដើម្បីរារាំង ឬលុបសម្អាតទិន្នន័យដែលបានរក្សាទុកបណ្តោះអាសន្ន (Cache) បានយ៉ាងងាយស្រួល។ ទោះជាយ៉ាងណា ការបិទឃុកឃីចាំបាច់អាចធ្វើឱ្យដំណើរការគេហទំព័រធ្លាក់ចុះ។
          </p>
        </section>

        <section>
          <h2 class="text-lg font-semibold tracking-tight text-neutral-950 dark:text-white">
            ០៣. ការផ្លាស់ប្តូរក្របខ័ណ្ឌ និងអនុលោមភាព
          </h2>
          <p class="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
            គោលការណ៍នេះកែប្រែទៅតាមការកំណត់រចនាសម្ព័ន្ធ API របស់ភាគីទីបី និងច្បាប់ឯកជនភាពសកលជាបន្តបន្ទាប់។ រាល់ការកែប្រែទម្រង់រចនាសម្ព័ន្ធណាមួយ នឹងត្រូវបង្ហាញពេលវេលាកែប្រែយ៉ាងច្បាស់លាស់នៅក្នុងបញ្ជីទិន្នន័យជាសាធារណៈនៅទីនេះ។
          </p>
        </section>
      </div>

    </main>
  </div>
</template>