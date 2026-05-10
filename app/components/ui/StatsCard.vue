<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    value: string | number;
    subtitle?: string;
    tone?: "default" | "info" | "success" | "warning" | "danger";
  }>(),
  {
    subtitle: "",
    tone: "default",
  }
);

const toneClass = computed(() => {
  return {
    default: "from-slate-50 to-white dark:from-slate-900 dark:to-slate-950",
    info: "from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-950",
    success: "from-green-50 to-white dark:from-green-950/30 dark:to-slate-950",
    warning: "from-amber-50 to-white dark:from-amber-950/30 dark:to-slate-950",
    danger: "from-red-50 to-white dark:from-red-950/30 dark:to-slate-950",
  }[props.tone];
});
</script>

<template>
  <div
    :class="[
      'motion-card hover-lift overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br p-5 shadow-sm',
      'dark:border-slate-800',
      toneClass,
    ]"
  >
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-muted">
          {{ title }}
        </p>

        <p class="mt-3 text-3xl font-bold tracking-tight text-ui">
          {{ value }}
        </p>

        <p v-if="subtitle" class="mt-2 text-sm text-muted">
          {{ subtitle }}
        </p>
      </div>

      <div class="transition-smooth group-hover:scale-110">
        <slot name="badge" />
      </div>
    </div>
  </div>
</template>
