<script setup lang="ts">
import { Newspaper } from "lucide-vue-next";

defineProps<{
  title?: string;
  message?: string;
}>();
</script>

<template>
  <div class="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
    <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
      <Newspaper class="h-7 w-7" />
    </div>

    <h3 class="mt-4 font-black text-slate-800">
      {{ title || "No news found" }}
    </h3>

    <p class="mt-2 text-sm leading-6 text-slate-500">
      {{ message || "There is no content available right now." }}
    </p>
  </div>
</template>