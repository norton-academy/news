<script setup lang="ts">
const languageStore = usePublicLanguageStore();
</script>

<template>
  <footer class="mt-10 border-t border-slate-200 bg-[#fbfaf7]">
    <div class="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
      <div>
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-lg font-black text-white">
            ក
          </div>

          <div>
            <p class="font-black text-slate-800">Cambodia News Hub</p>
            <p class="text-sm text-slate-500">
              {{ languageStore.isKhmer ? "ព័ត៌មានកម្ពុជា ថ្មីៗ ប្រចាំថ្ងៃ" : "Daily Cambodia news updates" }}
            </p>
          </div>
        </div>

        <p class="mt-4 max-w-md text-sm leading-7 text-slate-500">
          Clean Cambodia news portal with breaking news, province filters,
          source controls, weather, and trending articles.
        </p>
      </div>

      <div>
        <h4 class="mb-3 font-black text-slate-700">ព័ត៌មាន</h4>
        <div class="space-y-2 text-sm text-slate-500">
          <NuxtLink to="/" class="block hover:text-blue-700">ទំព័រដើម</NuxtLink>
          <NuxtLink to="/" class="block hover:text-blue-700">ព័ត៌មានថ្មីៗ</NuxtLink>
          <NuxtLink to="/" class="block hover:text-blue-700">និន្នាការ</NuxtLink>
        </div>
      </div>

      <div>
        <h4 class="mb-3 font-black text-slate-700">ក្រុមហ៊ុន</h4>
        <div class="space-y-2 text-sm text-slate-500">
          <NuxtLink to="/" class="block hover:text-blue-700">
            {{ languageStore.isKhmer ? "អំពីយើង" : "About Us" }}
          </NuxtLink>
          <NuxtLink to="/" class="block hover:text-blue-700">
            {{ languageStore.isKhmer ? "ទំនាក់ទំនង" : "Contact" }}
          </NuxtLink>
          <NuxtLink to="/" class="block hover:text-blue-700">
            {{ languageStore.isKhmer ? "ផ្សាយពាណិជ្ជកម្ម" : "Advertise" }}
          </NuxtLink>
        </div>
      </div>

      <div>
        <h4 class="mb-3 font-black text-slate-700">តាមដាន</h4>
        <div class="space-y-2 text-sm text-slate-500">
          <NuxtLink to="/" class="block hover:text-blue-700">Facebook</NuxtLink>
          <NuxtLink to="/" class="block hover:text-blue-700">Telegram</NuxtLink>
          <NuxtLink to="/" class="block hover:text-blue-700">YouTube</NuxtLink>
        </div>
      </div>
    </div>

    <div class="border-t border-slate-200">
      <div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© ២០២៦ ខេមបូឌា ព័ត៌មាន</p>

        <div class="flex gap-5">
          <NuxtLink to="/" class="hover:text-blue-700">លក្ខខណ្ឌ</NuxtLink>
          <NuxtLink to="/" class="hover:text-blue-700">ឯកជនភាព</NuxtLink>
          <NuxtLink to="/" class="hover:text-blue-700">ប្រភពព័ត៌មាន</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
