<script setup lang="ts">
defineProps<{
  summary: string[];
}>();
</script>

<template>
  <section class="rounded-2xl border border-blue-200 bg-blue-50 p-5">
    <div class="mb-4 flex items-center justify-between gap-3">
      <div>
        <h2 class="font-black text-blue-900">
          សង្ខេបដោយ AI
        </h2>
        <p class="text-sm text-blue-700/70">
          ៣ ប្រយោគសំខាន់ៗសម្រាប់អានលឿន
        </p>
      </div>

      <span class="rounded-lg bg-blue-700 px-3 py-1 text-xs font-black text-white">
        AI Summary
      </span>
    </div>

    <ul v-if="summary.length" class="space-y-3">
      <li
        v-for="(sentence, index) in summary"
        :key="index"
        class="flex gap-3 rounded-xl bg-white/70 p-3 text-sm leading-7 text-slate-700"
      >
        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-black text-white">
          {{ index + 1 }}
        </span>

        <span>{{ sentence }}</span>
      </li>
    </ul>

    <p v-else class="text-sm text-blue-700/70">
      មិនទាន់មានសង្ខេប AI សម្រាប់អត្ថបទនេះ។
    </p>
  </section>
</template>