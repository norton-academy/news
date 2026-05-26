<script setup lang="ts">
import { Copy, Facebook, Share2, Send } from "lucide-vue-next";

const copied = ref(false);

const copyLink = async () => {
  if (!process.client) return;

  await navigator.clipboard.writeText(window.location.href);
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 1500);
};
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
      <button class="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-black text-white hover:bg-blue-800">
        <Facebook class="h-4 w-4" />
        Facebook
      </button>

      <button class="flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-black text-white hover:bg-sky-600">
        <Send class="h-4 w-4" />
        Telegram
      </button>

      <button
        class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50"
        @click="copyLink"
      >
        <Copy class="h-4 w-4" />
        {{ copied ? "Copied" : "Copy" }}
      </button>

      <button class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">
        <Share2 class="h-4 w-4" />
        Share
      </button>
    </div>
  </section>
</template>