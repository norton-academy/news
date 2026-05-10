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
const dropdownRef = ref<HTMLElement | null>(null);

const visibleItems = computed(() => {
  return props.items.filter((item) => item.visible !== false);
});

const itemClass = (variant?: ActionDropdownItem["variant"]) => {
  const variants: Record<string, string> = {
    default: "text-ui hover:bg-surface-soft",
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

const handleClickOutside = (event: MouseEvent) => {
  if (!dropdownRef.value) return;

  if (!dropdownRef.value.contains(event.target as Node)) {
    open.value = false;
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block text-left">
    <button
      type="button"
      class="transition-smooth active-press inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ui bg-surface text-muted shadow-sm hover:-translate-y-0.5 hover:bg-surface-soft hover:text-ui"
      :class="open ? 'bg-surface-soft text-ui' : ''"
      aria-label="Open actions"
      @click.stop="open = !open"
    >
      <MoreHorizontal class="h-5 w-5" />
    </button>

    <Transition name="dropdown">
      <div
        v-if="open"
        class="ui-card absolute right-0 z-40 mt-2 w-60 overflow-hidden rounded-3xl p-2 shadow-xl"
      >
        <div v-if="visibleItems.length" class="space-y-1">
          <button
            v-for="item in visibleItems"
            :key="item.action"
            type="button"
            :disabled="item.disabled"
            :class="[
              'transition-smooth flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold',
              'disabled:cursor-not-allowed disabled:opacity-50',
              itemClass(item.variant),
            ]"
            @click="handleSelect(item)"
          >
            <span
              v-if="item.icon"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-ui bg-surface"
            >
              <component :is="item.icon" class="h-4 w-4" />
            </span>

            <span class="min-w-0 flex-1 truncate">
              {{ item.label }}
            </span>
          </button>
        </div>

        <div v-else class="px-4 py-6 text-center">
          <p class="text-sm font-semibold text-ui">No actions</p>
          <p class="mt-1 text-xs text-muted">There are no available actions.</p>
        </div>
      </div>
    </Transition>
  </div>
</template>
