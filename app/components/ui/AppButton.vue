<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";

const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    type: "button",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
  }
);

const buttonClass = computed(() => {
  const variants = {
    primary:
      "bg-slate-900 text-white shadow-sm shadow-slate-900/10 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200",
    secondary:
      "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
    danger:
      "bg-red-600 text-white shadow-sm shadow-red-600/20 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500",
    success:
      "bg-green-600 text-white shadow-sm shadow-green-600/20 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };

  return [
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold outline-none",
    "transition-smooth active-press hover:-translate-y-0.5",
    "focus-visible:ring-4 focus-visible:ring-blue-100 dark:focus-visible:ring-blue-950",
    "disabled:pointer-events-none disabled:opacity-60 disabled:hover:translate-y-0",
    variants[props.variant],
    sizes[props.size],
  ];
});
</script>

<template>
  <button :type="type" :disabled="disabled || loading" :class="buttonClass">
    <Loader2 v-if="loading" class="h-4 w-4 animate-spin" />

    <slot />
  </button>
</template>
