<script setup lang="ts">
import { Square } from "lucide-vue-next";
import type { Province } from "~/types/news";

defineProps<{
  provinces: Province[];
}>();
</script>

<template>
  <div class="mb-5 flex flex-wrap items-center gap-2">
    <span class="flex items-center gap-2 text-sm font-bold text-slate-500">
      <Square class="h-3 w-3 text-red-400" />
      ជ្រើសរើសខេត្ត
    </span>

    <NuxtLink
      v-for="province in provinces"
      :key="province.id"
      :to="`/provinces/${province.slug}`"
      class="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    >
      {{ province.name_km }}
    </NuxtLink>
  </div>
</template>