<script setup lang="ts">
import { Square } from "lucide-vue-next";
import type { Province } from "~/types/news";

defineProps<{
  provinces: Province[];
}>();

const languageStore = usePublicLanguageStore();
</script>

<template>
  <div class="mb-5 flex flex-wrap items-center gap-2">
    <span class="flex items-center gap-2 text-sm font-bold text-slate-500">
      <Square class="h-3 w-3 text-red-400" />
      {{ languageStore.isKhmer ? "ជ្រើសរើសខេត្ត" : "Choose Province" }}
    </span>

    <NuxtLink
      v-for="province in provinces"
      :key="province.id"
      :to="`/provinces/${province.slug}`"
      class="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    >
      {{ languageStore.text(province.name_km, province.name_en) }}
    </NuxtLink>
  </div>
</template>