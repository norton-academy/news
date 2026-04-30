<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";

export interface ActionDropdownItem {
  label: string;
  action: string;
  icon?: any;
  variant?: "default" | "danger" | "success" | "warning";
  disabled?: boolean;
  visible?: boolean;
}

const props = defineProps<{
  items: ActionDropdownItem[];
}>();

const emit = defineEmits<{
  (e: "select", action: string): void;
}>();

const open = ref(false);

const visibleItems = computed(() => {
  return props.items.filter((item) => item.visible !== false);
});

const itemClass = (variant?: string) => {
  const variants: Record<string, string> = {
    default:
      "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
    success:
      "text-green-700 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-950/40",
    warning:
      "text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-950/40",
    danger: "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40",
  };

  return variants[variant || "default"];
};

const handleSelect = (item: ActionDropdownItem) => {
  if (item.disabled) return;

  emit("select", item.action);
  open.value = false;
};
</script>

<template>
  <div class="relative inline-block text-left">
    <button
      type="button"
      class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      @click="open = !open"
    >
      <MoreHorizontal class="h-5 w-5" />
    </button>

    <div
      v-if="open"
      class="absolute right-0 z-30 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      <button
        v-for="item in visibleItems"
        :key="item.action"
        type="button"
        :disabled="item.disabled"
        :class="[
          'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50',
          itemClass(item.variant),
        ]"
        @click="handleSelect(item)"
      >
        <component :is="item.icon" v-if="item.icon" class="h-4 w-4" />
        {{ item.label }}
      </button>

      <div
        v-if="visibleItems.length === 0"
        class="px-3 py-2 text-sm text-slate-500 dark:text-slate-400"
      >
        No actions
      </div>
    </div>
  </div>
</template>
