<script setup lang="ts">
withDefaults(
  defineProps<{
    currentPage: number;
    lastPage: number;
    total: number;
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);

const emit = defineEmits<{
  (e: "previous"): void;
  (e: "next"): void;
}>();
</script>

<template>
  <div
    class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between"
  >
    <p>Page {{ currentPage }} of {{ lastPage }} | Total records: {{ total }}</p>

    <div class="flex items-center gap-2">
      <AppButton
        variant="secondary"
        size="sm"
        :disabled="currentPage <= 1 || loading"
        @click="emit('previous')"
      >
        Previous
      </AppButton>

      <AppButton
        variant="secondary"
        size="sm"
        :disabled="currentPage >= lastPage || loading"
        @click="emit('next')"
      >
        Next
      </AppButton>
    </div>
  </div>
</template>
