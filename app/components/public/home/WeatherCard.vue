<script setup lang="ts">
import { CloudSun, Square } from "lucide-vue-next";

defineProps<{
  weather: {
    city: string;
    temperature: string;
    condition: string;
  } | null;
}>();

const languageStore = usePublicLanguageStore();
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
      <h3 class="flex items-center gap-2 font-black text-slate-700">
        <Square class="h-3 w-3 text-slate-400" />
        {{ languageStore.isKhmer ? "អាកាសធាតុ" : "Weather" }}
      </h3>

      <span class="text-sm text-slate-400">
        {{ weather?.city || "ភ្នំពេញ" }}
      </span>
    </div>

    <div class="p-5">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-4xl font-black text-slate-800">
            {{ weather?.temperature || "32°C" }}
          </p>

          <p class="mt-1 text-sm font-semibold text-slate-500">
            {{ weather?.condition || "ភ្លៀងតិច" }}
          </p>
        </div>

        <CloudSun class="h-12 w-12 text-blue-500" />
      </div>

      <div class="mt-4 grid grid-cols-2 gap-2">
        <div class="rounded-xl bg-[#f3f1eb] p-3">
          <p class="text-xs text-slate-400">{{ languageStore.isKhmer ? "សំណើម" : "Humidity" }}</p>
          <p class="font-bold text-slate-700">78%</p>
        </div>

        <div class="rounded-xl bg-[#f3f1eb] p-3">
          <p class="text-xs text-slate-400">{{ languageStore.isKhmer ? "ខ្យល់" : "Wind" }}</p>
          <p class="font-bold text-slate-700">12 km/h</p>
        </div>
      </div>
    </div>
  </section>
</template>
