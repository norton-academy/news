<script setup lang="ts">
import { Send } from "lucide-vue-next";
</script>

<template>
  <section class="rounded-2xl bg-blue-700 p-5 text-white shadow-sm">
    <div class="flex items-center gap-3">
      <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
        <Send class="h-5 w-5" />
      </div>

      <div>
        <h3 class="font-black">ចូលរួម Telegram</h3>
        <p class="text-sm text-blue-100">ទទួលព័ត៌មានបន្ទាន់រាល់ថ្ងៃ</p>
      </div>
    </div>

    <button class="mt-5 w-full rounded-xl bg-white px-4 py-3 text-sm font-black text-blue-700 hover:bg-blue-50">
      Join Channel
    </button>
  </section>
</template>