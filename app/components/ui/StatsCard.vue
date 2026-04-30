<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    value: string | number;
    subtitle?: string;
    tone?: "default" | "success" | "warning" | "danger" | "info";
  }>(),
  {
    subtitle: "",
    tone: "default",
  }
);

const toneClass = computed(() => {
  return {
    default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    success: "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    danger: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  }[props.tone];
});
</script>

<template>
  <div
    class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
  >
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
          {{ title }}
        </p>

        <h3 class="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
          {{ value }}
        </h3>

        <p v-if="subtitle" class="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {{ subtitle }}
        </p>
      </div>

      <slot name="badge">
        <div
          :class="['rounded-xl px-3 py-2 text-xs font-semibold capitalize', toneClass]"
        >
          {{ tone }}
        </div>
      </slot>
    </div>
  </div>
</template>
